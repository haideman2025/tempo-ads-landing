/** TEMPO app shell — keeps the public landing page in a light theme with intentional graphite sections. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

const Home = lazy(() => import("./pages/Home"));
const TempoUpgradeStaging = lazy(() => import("./pages/TempoUpgradeStaging"));
const TempoRestoreV2Staging = lazy(() => import("./pages/TempoRestoreV2Staging"));
const TempoUpgradeProduction = () => <TempoUpgradeStaging mode="production" />;
const TempoUpgradePreview = () => <TempoUpgradeStaging mode="staging" />;
const TempoRestoreV2Production = () => <TempoRestoreV2Staging mode="production" />;
const TempoRestoreV2Preview = () => <TempoRestoreV2Staging mode="staging" />;

function LoadingFallback() {
  return (
    <main className="tempo-boot-fallback" aria-busy="true" aria-live="polite" aria-label="Đang tải nội dung TEMPO">
      <div className="tempo-boot-fallback__mark">V2JOY</div>
      <p>TEMPO 3ML</p>
      <h1>Đang mở<br /><em>nội dung TEMPO.</em></h1>
      <span aria-hidden="true" />
    </main>
  );
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/staging/tempo-restore-v2" component={TempoRestoreV2Preview} />
      <Route path="/staging/tempo-upgrade" component={TempoUpgradePreview} />
      <Route path="/" component={TempoRestoreV2Production} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Suspense fallback={<LoadingFallback />}>
            <Router />
          </Suspense>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
