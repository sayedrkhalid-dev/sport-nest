"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "@/components/UI/LoadingSpinner/LoadingSpinner";

/**
 * Wraps any page that requires authentication.
 * Shows spinner while session resolves, redirects to /login if unauthenticated.
 */
export default function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) return <LoadingSpinner fullPage />;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
