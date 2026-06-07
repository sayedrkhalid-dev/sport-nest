// src/hooks/useAuth.js
"use client";

import { authClient } from "@/lib/authClient";

export function useAuth() {
  const { data: session, isPending: isLoading } = authClient.useSession();

  return {
    user: session?.user ?? null,
    session,
    isLoading,
    isAuthenticated: !!session?.user,
  };
}