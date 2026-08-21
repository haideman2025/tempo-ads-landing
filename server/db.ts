import { eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, tempoWaitlistEntries, users } from "../drizzle/schema";
import { ENV } from './_core/env';
import { getRemainingSlots, hasRemainingCapacity, WAITLIST_CAPACITY, type WaitlistInput } from "./waitlist";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getTempoWaitlistStatus() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");

  const [result] = await db
    .select({ claimed: sql<number>`coalesce(sum(${tempoWaitlistEntries.quantity}), 0)` })
    .from(tempoWaitlistEntries);
  const claimed = Number(result?.claimed ?? 0);
  return { claimed, remaining: getRemainingSlots(claimed), capacity: WAITLIST_CAPACITY };
}

export async function getTempoWaitlistEntryByPhone(phone: string) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const rows = await db.select().from(tempoWaitlistEntries).where(eq(tempoWaitlistEntries.phone, phone)).limit(1);
  return rows[0];
}

export async function reserveTempoWaitlistSlot(input: WaitlistInput) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");

  const existing = await getTempoWaitlistEntryByPhone(input.phone);
  if (existing) return { kind: "existing" as const, entry: existing };

  // The unique slot constraint is the final guard against two simultaneous form submissions.
  // A rare collision is re-read and retried, keeping the 1,000-seat cap database-enforced.
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const { claimed } = await getTempoWaitlistStatus();
    if (!hasRemainingCapacity(claimed, input.quantity)) return { kind: "full" as const };

    const slotNumber = claimed + 1;
    try {
      await db.insert(tempoWaitlistEntries).values({
        slotNumber,
        fullName: input.fullName,
        phone: input.phone,
        email: input.email || null,
        preferredSku: input.preferredSku,
        quantity: input.quantity,
        note: input.note || null,
        marketingConsent: true,
        consentedAt: new Date(),
        utmSource: input.utmSource || null,
        utmMedium: input.utmMedium || null,
        utmCampaign: input.utmCampaign || null,
        utmContent: input.utmContent || null,
        utmTerm: input.utmTerm || null,
        fbclid: input.fbclid || null,
      });
      const entry = await getTempoWaitlistEntryByPhone(input.phone);
      if (!entry) throw new Error("Waitlist entry could not be confirmed");
      return {
        kind: "reserved" as const,
        entry,
        quantity: input.quantity,
        totalValue: input.quantity * 349_000,
      };
    } catch (error) {
      const duplicate = await getTempoWaitlistEntryByPhone(input.phone);
      if (duplicate) return { kind: "existing" as const, entry: duplicate };
      if (attempt === 3) throw error;
    }
  }

  throw new Error("Could not reserve a waitlist slot");
}
