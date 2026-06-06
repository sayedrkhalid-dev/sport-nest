"use client";

import { authClient } from "@/lib/authClient";

/**
 * Thin wrapper around Better Auth's useSession hook.
 * Returns { user, session, isLoading, isAuthenticated }
 */
export function useAuth() {
  const { data: session, isPending: isLoading } = authClient.useSession();

  return {
    user: session?.user ?? null,
    session,
    isLoading,
    isAuthenticated: !!session?.user,
  };
}
