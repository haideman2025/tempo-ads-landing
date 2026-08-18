const debugPort = process.env.TEMPO_CDP_PORT || "9224";
const targetUrl = "3000-ifj0tm2p7esw52cxv3n66-a251dfb8.sg1.manus.computer";

const targets = await fetch(`http://127.0.0.1:${debugPort}/json/list`).then((response) => response.json());
const page = targets.find((target) => target.type === "page" && target.url.includes(targetUrl));
if (!page?.webSocketDebuggerUrl) throw new Error("Không tìm thấy tab TEMPO trong Chromium DevTools.");

const socket = new WebSocket(page.webSocketDebuggerUrl);
const messages = new Map();
let nextId = 1;

const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = nextId++;
  messages.set(id, { resolve, reject });
  socket.send(JSON.stringify({ id, method, params }));
});

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", () => reject(new Error("Không thể kết nối Chromium DevTools.")), { once: true });
});

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (!message.id || !messages.has(message.id)) return;
  const pending = messages.get(message.id);
  messages.delete(message.id);
  if (message.error) pending.reject(new Error(message.error.message));
  else pending.resolve(message.result);
});

const evaluate = async (expression) => {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  return result.result.value;
};

const chapters = [
  ["01", ".hero-night video"],
  ["02", ".cinema-section--lifestyle .section-video-backdrop video"],
  ["03", ".transparency-hero .section-video-backdrop video"],
  ["04", ".motion-bridge .section-video-backdrop video"],
  ["05", ".waitlist-cinema .section-video-backdrop video"],
];

const results = [];
for (const [scene, selector] of chapters) {
  await evaluate(`document.querySelector(${JSON.stringify(selector)})?.scrollIntoView({ block: "center" })`);
  await new Promise((resolve) => setTimeout(resolve, 1400));
  const snapshot = await evaluate(`(() => {
    const video = document.querySelector(${JSON.stringify(selector)});
    return {
      source: video?.currentSrc ?? null,
      currentTime: Number((video?.currentTime ?? 0).toFixed(3)),
      playing: Boolean(video && !video.paused && video.currentTime > 0),
      readyState: video?.readyState ?? null,
      errorCode: video?.error?.code ?? null,
    };
  })()`);
  results.push({ scene, ...snapshot });
}

console.log(JSON.stringify(results, null, 2));
if (!results.every((result) => result.playing && !result.errorCode && result.source)) process.exitCode = 1;
socket.close();
