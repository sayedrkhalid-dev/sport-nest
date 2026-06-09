// API_URL — server-side (no NEXT_PUBLIC prefix)
// NEXT_PUBLIC_API_URL — client-side
const BASE_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080";

// ─── Core fetcher ─────────────────────────────────────────────────────────────
const fetcher = async (endpoint, options = {}) => {
  const { headers: extraHeaders, ...rest } = options;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
    ...rest,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Request failed with status ${res.status}`);
  }

  const json = await res.json();
  return json?.data !== undefined ? json.data : json;
};

// ─── Facilities ───────────────────────────────────────────────────────────────

export const getFacilities = (params = {}) => {
  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== "" && v != null)
  );
  const qs = new URLSearchParams(clean).toString();
  return fetcher(`/facilities${qs ? `?${qs}` : ""}`);
};

export const getFacilityById = (id) => fetcher(`/facilities/${id}`);

export const getMyFacilities = async (ownerEmail) => {
  const all = await fetcher("/facilities");
  return all.filter((f) => f.owner_email === ownerEmail);
};

export const addFacility = (data) =>
  fetcher("/facilities", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateFacility = (id, data) =>
  fetcher(`/facilities/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteFacility = (id) =>
  fetcher(`/facilities/${id}`, { method: "DELETE" });

// ─── Bookings ─────────────────────────────────────────────────────────────────

export const getMyBookings = (email) => fetcher(`/bookings/my?email=${email}`);

export const createBooking = (data) =>
  fetcher("/bookings", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const cancelBooking = (id, user_email) =>
  fetcher(`/bookings/${id}/cancel`, {
    method: "PATCH",
    body: JSON.stringify({ user_email }),
  });
