import { trpc } from "@/lib/trpc";
import { COOKIE_NAME, UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import superjson from "superjson";
import App from "./App";
import { startLogin } from "./const";
import "./index.css";

const queryClient = new QueryClient();

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  startLogin();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      headers() {
        // Preview auto-login fallback: when the browser blocks iframe cookies
        // (Safari ITP / private browsing / WebView), the runtime mirrors the
        // session into sessionStorage so we can forward it as a Bearer token.
        // The regular OAuth cookie flow keeps working and takes priority server-side.
        try {
          const raw = sessionStorage.getItem("manus-cookie");
          if (raw) {
            const prefix = `${COOKIE_NAME}=`;
            const pair = raw.split(";").find(s => s.trim().startsWith(prefix));
            const token = pair?.trim().slice(prefix.length);
            if (token) {
              return { Authorization: `Bearer ${token}` };
            }
          }
        } catch {
          // sessionStorage unavailable
        }
        return {};
      },
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

function recordBootIssue(kind: "missing_root" | "render_error" | "recoverable_error", error?: unknown) {
  const detail = { kind, at: new Date().toISOString(), message: error instanceof Error ? error.message : undefined };
  console.error("[TEMPO boot]", detail);
  window.dispatchEvent(new CustomEvent("tempo:boot-issue", { detail }));
}

function showDetachedFallback() {
  if (document.getElementById("tempo-detached-fallback")) return;
  const fallback = document.createElement("main");
  fallback.id = "tempo-detached-fallback";
  fallback.className = "tempo-boot-fallback";
  fallback.setAttribute("role", "alert");
  fallback.innerHTML = "<div class=\"tempo-boot-fallback__mark\">V2JOY</div><p>TEMPO 3ML</p><h1>Không thể mở trang<br><em>ngay lúc này.</em></h1><span aria-hidden=\"true\"></span><p class=\"tempo-boot-fallback__support\">Vui lòng tải lại trang. Thao tác COD sẽ không được ghi nhận cho đến khi nội dung hiển thị đầy đủ.</p>";
  document.body.appendChild(fallback);
}

function BootMarker() {
  useEffect(() => {
    document.getElementById("root")?.setAttribute("data-app-mounted", "true");
    window.dispatchEvent(new CustomEvent("tempo:boot-ready", { detail: { at: new Date().toISOString() } }));
  }, []);
  return null;
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  recordBootIssue("missing_root");
  showDetachedFallback();
} else {
  try {
    createRoot(rootElement, {
      onRecoverableError(error) { recordBootIssue("recoverable_error", error); },
    }).render(
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <BootMarker />
          <App />
        </QueryClientProvider>
      </trpc.Provider>,
    );
  } catch (error) {
    recordBootIssue("render_error", error);
    rootElement.innerHTML = "";
    showDetachedFallback();
  }
}
