const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ─── Core fetcher ────────────────────────────────────────────────────────────
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
  // Unwrap { data: ... } shape; fall back to the raw response
  return json?.data !== undefined ? json.data : json;
};

// ─── Facilities ───────────────────────────────────────────────────────────────

/** Fetch all facilities with optional search / filter params */
export const getFacilities = (params = {}) => {
  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== "" && v != null)
  );
  const qs = new URLSearchParams(clean).toString();
  return fetcher(`/facilities${qs ? `?${qs}` : ""}`);
};

/** Fetch a single facility by ID */
export const getFacilityById = (id) => fetcher(`/facilities/${id}`);

/** Fetch only the current owner's facilities */
export const getMyFacilities = async (ownerEmail) => {
  const all = await fetcher("/facilities");
  return all.filter((f) => f.owner_email === ownerEmail);
};

/** Create a new facility */
export const addFacility = (data) =>
  fetcher("/facilities", {
    method: "POST",
    body: JSON.stringify(data),
  });

/** Update an existing facility */
export const updateFacility = (id, data) =>
  fetcher(`/facilities/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

/** Delete a facility */
export const deleteFacility = (id) =>
  fetcher(`/facilities/${id}`, { method: "DELETE" });

// ─── Bookings ─────────────────────────────────────────────────────────────────

/** Fetch bookings for a specific user */
export const getMyBookings = () => fetcher("/bookings/my");

/** Create a new booking */
export const createBooking = (data) =>
  fetcher("/bookings", {
    method: "POST",
    body: JSON.stringify(data),
  });

/** Cancel a booking by ID */
export const cancelBooking = (id) =>
  fetcher(`/bookings/${id}/cancel`, { method: "PATCH" });
