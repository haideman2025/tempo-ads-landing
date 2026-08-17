const debugPort = process.env.TEMPO_CDP_PORT || "9223";
const inspectionDelayMs = 5500;

const targets = await fetch(`http://127.0.0.1:${debugPort}/json/list`).then((response) => response.json());
const page = targets.find((target) => target.type === "page" && target.url.includes("3000-ifj0tm2p7esw52cxv3n66-a251dfb8.sg1.manus.computer"));

if (!page?.webSocketDebuggerUrl) {
  throw new Error("Không tìm thấy tab TEMPO trong Chromium DevTools.");
}

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
  if (message.id && messages.has(message.id)) {
    const pending = messages.get(message.id);
    messages.delete(message.id);
    if (message.error) pending.reject(new Error(message.error.message));
    else pending.resolve(message.result);
  }
});

await new Promise((resolve) => setTimeout(resolve, inspectionDelayMs));
const result = await send("Runtime.evaluate", {
  expression: `(() => {
    const video = document.querySelector('.video-frame video');
    const frame = document.querySelector('.video-frame');
    return {
      frameState: frame?.dataset.playbackState ?? null,
      present: Boolean(video),
      paused: video?.paused ?? null,
      currentTime: Number((video?.currentTime ?? 0).toFixed(3)),
      readyState: video?.readyState ?? null,
      networkState: video?.networkState ?? null,
      muted: video?.muted ?? null,
      errorCode: video?.error?.code ?? null,
      errorMessage: video?.error?.message ?? null,
      currentSrc: video?.currentSrc ?? null,
    };
  })()`,
  returnByValue: true,
});

console.log(JSON.stringify(result.result.value, null, 2));
socket.close();
