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
  quantity: int("quantity").notNull().default(1),
  note: text("note"),
  marketingConsent: boolean("marketing_consent").notNull().default(false),
  consentedAt: timestamp("consented_at").notNull(),
  source: varchar("source", { length: 80 }).notNull().default("night-confident-landing"),
  utmSource: varchar("utm_source", { length: 120 }),
  utmMedium: varchar("utm_medium", { length: 120 }),
  utmCampaign: varchar("utm_campaign", { length: 180 }),
  utmContent: varchar("utm_content", { length: 180 }),
  utmTerm: varchar("utm_term", { length: 180 }),
  fbclid: varchar("fbclid", { length: 255 }),
  status: mysqlEnum("status", ["waitlisted", "contacted", "converted", "cancelled"]).notNull().default("waitlisted"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, table => [
  uniqueIndex("tempo_waitlist_phone_unique").on(table.phone),
  uniqueIndex("tempo_waitlist_slot_unique").on(table.slotNumber),
  check("tempo_waitlist_slot_range", sql`${table.slotNumber} between 1 and 1000`),
  check("tempo_waitlist_quantity_range", sql`${table.quantity} between 1 and 2`),
]);

export type TempoWaitlistEntry = typeof tempoWaitlistEntries.$inferSelect;
export type InsertTempoWaitlistEntry = typeof tempoWaitlistEntries.$inferInsert;

/** One durable row controls TEMPO stock with an atomic reserved <= onHand guard. */
export const tempoInventory = mysqlTable("tempo_inventory", {
  sku: varchar("sku", { length: 64 }).primaryKey(),
  onHand: int("on_hand").notNull(),
  reserved: int("reserved").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, table => [
  check("tempo_inventory_nonnegative", sql`${table.onHand} >= 0 and ${table.reserved} >= 0 and ${table.reserved} <= ${table.onHand}`),
]);

/** COD orders are deliberately separate from the prior waitlist, which remains historical evidence. */
export const tempoCodOrders = mysqlTable("tempo_cod_orders", {
  id: int("id").autoincrement().primaryKey(),
  orderNumber: varchar("order_number", { length: 32 }).notNull(),
  sku: varchar("sku", { length: 64 }).notNull().default("tempo-3ml"),
  fullName: varchar("full_name", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 24 }).notNull(),
  address: varchar("address", { length: 500 }).notNull(),
  quantity: int("quantity").notNull(),
  unitPrice: int("unit_price").notNull().default(499000),
  totalValue: int("total_value").notNull(),
  note: text("note"),
  orderConsent: boolean("order_consent").notNull(),
  marketingConsent: boolean("marketing_consent").notNull().default(false),
  status: mysqlEnum("status", ["pending_confirmation", "confirmed", "shipped", "delivered", "cancelled"]).notNull().default("pending_confirmation"),
  utmSource: varchar("utm_source", { length: 120 }),
  utmMedium: varchar("utm_medium", { length: 120 }),
  utmCampaign: varchar("utm_campaign", { length: 180 }),
  utmContent: varchar("utm_content", { length: 180 }),
  utmTerm: varchar("utm_term", { length: 180 }),
  fbclid: varchar("fbclid", { length: 255 }),
  // Cookie _fbp/_fbc lúc đặt đơn: Purchase chỉ được gửi sau khi giao, nên phải giữ lại
  // định danh của phiên đã click quảng cáo thì Meta mới quy đổi được về đúng chiến dịch.
  fbp: varchar("fbp", { length: 255 }),
  fbc: varchar("fbc", { length: 255 }),
  clientUserAgent: varchar("client_user_agent", { length: 500 }),
  clientIpAddress: varchar("client_ip_address", { length: 64 }),
  // Chốt chặn để một đơn chỉ sinh đúng một Purchase dù thao tác đánh dấu giao bị lặp.
  purchaseReportedAt: timestamp("purchase_reported_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, table => [
  uniqueIndex("tempo_cod_order_number_unique").on(table.orderNumber),
  check("tempo_cod_order_quantity_range", sql`${table.quantity} between 1 and 2`),
  check("tempo_cod_order_value_positive", sql`${table.unitPrice} > 0 and ${table.totalValue} = ${table.unitPrice} * ${table.quantity}`),
]);

export type TempoCodOrder = typeof tempoCodOrders.$inferSelect;
