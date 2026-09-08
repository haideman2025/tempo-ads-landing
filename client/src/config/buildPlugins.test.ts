import { describe, expect, it } from "vitest";
import config from "../../../vite.config";

/** vite.config xuất ra hàm nhận { command }, nên gọi thẳng được để kiểm tra plugin thực nạp. */
function pluginNamesFor(command: "build" | "serve") {
  const resolved = typeof config === "function"
    ? config({ command, mode: command === "build" ? "production" : "development" })
    : config;
  const plugins = (resolved as { plugins: unknown[] }).plugins;
  return (plugins.flat(Infinity) as ({ name: string } | null)[])
    .filter((plugin): plugin is { name: string } => Boolean(plugin))
    .map(plugin => plugin.name);
}

describe("vite build plugin gating", () => {
  it("giữ runtime debug của Manus khi chạy dev để preview trong Manus vẫn hoạt động", () => {
    expect(pluginNamesFor("serve")).toContain("vite-plugin-manus-runtime");
  });

  it("không nhúng runtime debug 367KB vào bản build gửi cho khách quảng cáo", () => {
    // Runtime này nhúng inline vào index.html, mà HTML lại được trả kèm no-store,
    // nên mỗi lượt truy cập phải tải và parse lại toàn bộ trước khi trang kịp hiện.
    expect(pluginNamesFor("build")).not.toContain("vite-plugin-manus-runtime");
  });

  it("vẫn giữ các plugin dựng ứng dụng ở cả hai chế độ", () => {
    for (const command of ["build", "serve"] as const) {
      const names = pluginNamesFor(command);
      expect(names, command).toContain("vite:react-babel");
      expect(names.some(name => name.startsWith("@tailwindcss")), command).toBe(true);
    }
  });
});
