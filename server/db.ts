import { eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, tempoCodOrders, tempoInventory, tempoWaitlistEntries, users } from "../drizzle/schema";
import { ENV } from './_core/env';
import { TEMPO_INITIAL_STOCK, TEMPO_SKU, TEMPO_UNIT_PRICE, type TempoCodOrderInput } from "./orders";
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

export async function getTempoCodOrderStatus() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const rows = await db.select().from(tempoInventory).where(eq(tempoInventory.sku, TEMPO_SKU)).limit(1);
  const inventory = rows[0];
  const capacity = inventory?.onHand ?? TEMPO_INITIAL_STOCK;
  const claimed = inventory?.reserved ?? 0;
  return { capacity, claimed, remaining: Math.max(0, capacity - claimed), unitPrice: TEMPO_UNIT_PRICE };
}

export async function getTempoCodOrderByPhone(phone: string) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const rows = await db.select().from(tempoCodOrders).where(eq(tempoCodOrders.phone, phone)).limit(1);
  return rows[0];
}

function makeTempoOrderNumber() {
  return `TMP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export type TempoCodOrderSignals = { clientIpAddress: string | null; clientUserAgent: string | null };

export async function createTempoCodOrder(input: TempoCodOrderInput, signals: TempoCodOrderSignals = { clientIpAddress: null, clientUserAgent: null }) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");

  const existing = await getTempoCodOrderByPhone(input.phone);
  if (existing) return { kind: "existing" as const, order: existing };

  const orderNumber = makeTempoOrderNumber();
  const result = await db.transaction(async tx => {
    await tx.insert(tempoInventory).values({ sku: TEMPO_SKU, onHand: TEMPO_INITIAL_STOCK, reserved: 0 })
      .onDuplicateKeyUpdate({ set: { sku: sql`${tempoInventory.sku}` } });

    const updateResult = await tx.update(tempoInventory)
      .set({ reserved: sql`${tempoInventory.reserved} + ${input.quantity}` })
      .where(sql`${tempoInventory.sku} = ${TEMPO_SKU} and ${tempoInventory.reserved} + ${input.quantity} <= ${tempoInventory.onHand}`);

    if (updateResult[0].affectedRows !== 1) return { kind: "full" as const };

    await tx.insert(tempoCodOrders).values({
      orderNumber,
      sku: TEMPO_SKU,
      fullName: input.fullName,
      phone: input.phone,
      address: input.address,
      quantity: input.quantity,
      unitPrice: TEMPO_UNIT_PRICE,
      totalValue: input.quantity * TEMPO_UNIT_PRICE,
      note: input.note || null,
      orderConsent: input.orderConsent,
      marketingConsent: input.marketingConsent,
      utmSource: input.utmSource || null,
      utmMedium: input.utmMedium || null,
      utmCampaign: input.utmCampaign || null,
      utmContent: input.utmContent || null,
      utmTerm: input.utmTerm || null,
      fbclid: input.fbclid || null,
      fbp: input.fbp || null,
      fbc: input.fbc || null,
      clientIpAddress: signals.clientIpAddress,
      clientUserAgent: signals.clientUserAgent,
    });
    return { kind: "created" as const };
  });

  if (result.kind === "full") return result;
  const orderRows = await db.select().from(tempoCodOrders).where(eq(tempoCodOrders.orderNumber, orderNumber)).limit(1);
  const order = orderRows[0];
  if (!order) throw new Error("COD order could not be confirmed");
  return { kind: "created" as const, order };
}

/**
 * Đánh dấu đơn đã giao và trả về đúng bản ghi cần báo Purchase.
 *
 * purchase_reported_at chỉ được đặt khi nó còn trống, và câu UPDATE đó là chốt chặn duy nhất
 * quyết định ai được gửi Purchase: hai lần bấm đồng thời thì chỉ một câu chạm được dòng.
 */
export async function markTempoCodOrderDelivered(orderNumber: string) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");

  const rows = await db.select().from(tempoCodOrders).where(eq(tempoCodOrders.orderNumber, orderNumber)).limit(1);
  const order = rows[0];
  if (!order) return { kind: "not_found" as const };

  const deliveredAt = new Date();
  const claim = await db
    .update(tempoCodOrders)
    .set({ status: "delivered", purchaseReportedAt: deliveredAt })
    .where(sql`${tempoCodOrders.orderNumber} = ${orderNumber} and ${tempoCodOrders.purchaseReportedAt} is null`);

  if (claim[0].affectedRows !== 1) return { kind: "already_reported" as const, order };
  return { kind: "delivered" as const, order, deliveredAt };
}
