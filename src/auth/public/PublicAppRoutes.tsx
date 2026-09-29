import { ConvexProvider } from "convex/react";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { convex } from "@/auth/convexClient";
import { IgoldSite } from "@/igold/IgoldSite";

const HomePage = lazy(() =>
  import("@/landing/HomePage").then(module => ({ default: module.HomePage })),
);

const DlsPage = lazy(() =>
  import("@/dls/DlsPage").then(module => ({ default: module.DlsPage })),
);

function LandingFallback() {
  return (
    <div
      style={{ minHeight: "100svh", background: "#e8f2f7" }}
      aria-hidden="true"
    />
  );
}

export function PublicAppRoutes() {
  return (
    <ConvexProvider client={convex}>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<LandingFallback />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route path="/learn" element={<IgoldSite />} />
        <Route
          path="/dls"
          element={
            <Suspense fallback={<LandingFallback />}>
              <DlsPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ConvexProvider>
  );
}
