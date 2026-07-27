import { ConvexProvider } from "convex/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { IgoldSite } from "@/igold/IgoldSite";
import { convex } from "@/auth/convexClient";

export function PublicAppRoutes() {
  return (
    <ConvexProvider client={convex}>
      <Routes>
        <Route path="/" element={<IgoldSite />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ConvexProvider>
  );
}
