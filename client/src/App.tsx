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
const TempoUpgradeProduction = () => <TempoUpgradeStaging mode="production" />;
const TempoUpgradePreview = () => <TempoUpgradeStaging mode="staging" />;

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/staging/tempo-upgrade" component={TempoUpgradePreview} />
      <Route path="/" component={TempoUpgradeProduction} />
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
          <Suspense fallback={<main aria-busy="true" aria-label="Đang tải nội dung" />}>
            <Router />
          </Suspense>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
