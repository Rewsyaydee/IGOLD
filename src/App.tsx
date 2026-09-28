import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthStrategyRoutes } from "./auth/AuthStrategyRoutes";
import ErrorBoundary from "./components/ErrorBoundary";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./contexts/ThemeContext";

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="system" switchable>
        <Toaster />
        <ScrollToTopOnRouteChange />
        <AuthStrategyRoutes />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
