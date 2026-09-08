export const PRODUCT_CONFIG = {
  sku: "tempo-3ml",
  name: "TEMPO 3ML by V2JOY",
  shortName: "TEMPO 3ML",
  price: 499_000,
  currency: "VND",
  maxQuantity: 2,
  inventoryCapacity: 1_000,
  fulfillment: "COD",
} as const;

export function formatVnd(value: number) {
  return `${value.toLocaleString("vi-VN")}đ`;
}
