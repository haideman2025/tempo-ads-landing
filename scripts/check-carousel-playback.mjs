const debugPort = process.env.TEMPO_CDP_PORT || "9223";
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

await evaluate(`document.querySelector('.motion-carousel')?.scrollIntoView({ block: 'center' })`);
await new Promise((resolve) => setTimeout(resolve, 2200));

const snapshot = () => evaluate(`(() => {
  const video = document.querySelector('.motion-carousel__stage video');
  const stage = document.querySelector('.motion-carousel__stage');
  const chapter = document.querySelector('.motion-carousel__copy small')?.textContent?.trim() ?? null;
  return {
    chapter,
    source: video?.currentSrc ?? null,
    playing: Boolean(video && !video.paused && video.currentTime > 0),
    currentTime: Number((video?.currentTime ?? 0).toFixed(3)),
    state: stage?.dataset.playbackState ?? null,
    errorCode: video?.error?.code ?? null,
  };
})()`);

const sequence = [await snapshot()];
for (let index = 0; index < 3; index += 1) {
  await evaluate(`(() => {
    const video = document.querySelector('.motion-carousel__stage video');
    video?.dispatchEvent(new Event('ended', { bubbles: true }));
  })()`);
  await new Promise((resolve) => setTimeout(resolve, 750));
  sequence.push(await snapshot());
}

console.log(JSON.stringify(sequence, null, 2));
socket.close();
