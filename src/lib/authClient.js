// src/lib/authClient.js
"use client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const fetcher = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || "Request failed");
  return json;
};

export const authClient = {
  signUp: {
    email: ({ name, email, password, image }) =>
      fetcher("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password, photoURL: image }),
      }),
  },
  signIn: {
    email: ({ email, password }) =>
      fetcher("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
    social: () => {
      // Google OAuth not supported by your Express server yet
      throw new Error("Google sign-in is not configured.");
    },
  },
  signOut: () => fetcher("/auth/logout", { method: "POST" }),
  useSession: () => {
    // Handled separately via useAuth hook — not used here
    return { data: null, isPending: false };
  },
};