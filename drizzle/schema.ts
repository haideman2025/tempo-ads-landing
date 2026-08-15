import { sql } from "drizzle-orm";
import { boolean, check, int, mysqlEnum, mysqlTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const tempoWaitlistEntries = mysqlTable("tempo_waitlist_entries", {
  id: int("id").autoincrement().primaryKey(),
  slotNumber: int("slot_number").notNull(),
  fullName: varchar("full_name", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 24 }).notNull(),
  email: varchar("email", { length: 320 }),
  preferredSku: mysqlEnum("preferred_sku", ["3ml", "5ml", "duo", "course-2x5ml"]).notNull(),
  note: text("note"),
  marketingConsent: boolean("marketing_consent").notNull().default(false),
  consentedAt: timestamp("consented_at").notNull(),
  source: varchar("source", { length: 80 }).notNull().default("night-confident-landing"),
  status: mysqlEnum("status", ["waitlisted", "contacted", "converted", "cancelled"]).notNull().default("waitlisted"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, table => [
  uniqueIndex("tempo_waitlist_phone_unique").on(table.phone),
  uniqueIndex("tempo_waitlist_slot_unique").on(table.slotNumber),
  check("tempo_waitlist_slot_range", sql`${table.slotNumber} between 1 and 1000`),
]);

export type TempoWaitlistEntry = typeof tempoWaitlistEntries.$inferSelect;
export type InsertTempoWaitlistEntry = typeof tempoWaitlistEntries.$inferInsert;
