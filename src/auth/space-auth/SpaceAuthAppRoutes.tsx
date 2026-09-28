import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PublicLayout } from "@/components/PublicLayout";
import { PublicOnlyRoute } from "@/components/PublicOnlyRoute";
import { IgoldSite } from "@/igold/IgoldSite";
import { ViktorProductAuthProvider } from "@/lib/viktor-spaces-access/ViktorProductAuthProvider";
import { DashboardPage, LoginPage, SettingsPage, SignupPage } from "@/pages";

const HomePage = lazy(() =>
  import("@/landing/HomePage").then(module => ({ default: module.HomePage })),
);

export function ProductAuthRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={null}>
            <HomePage />
          </Suspense>
        }
      />
      <Route path="/learn" element={<IgoldSite />} />

      <Route element={<PublicLayout />}>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export function SpaceAuthAppRoutes() {
  return (
    <ViktorProductAuthProvider enabled>
      <ProductAuthRoutes />
    </ViktorProductAuthProvider>
  );
}
