# SportNest — Sports Facility Booking Platform (Client)

![SportNest Banner](https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80)

## 🏟️ Purpose

SportNest is a full-stack sports facility booking platform that lets athletes and recreational players discover, explore, and book premium sports venues — football turfs, badminton courts, swimming lanes, tennis courts, and more. This repository contains the **Next.js frontend** client.

## 🔗 Live URLs

| Service | URL |
|---------|-----|
| Frontend (Vercel) | _Add your Vercel URL here_ |
| Backend API (Render) | _Add your Render URL here_ |

---

## ✨ Features

### Authentication
- Email & password registration with validation (6+ chars, uppercase, lowercase)
- Google OAuth login via **Better Auth**
- Session-based authentication with secure cookies
- Protected private routes — unauthenticated users redirected to login
- Logged-in users stay authenticated on private route reload

### Facilities
- Browse all sports facilities (public)
- Search by facility name (live search)
- Filter by sport type and location
- View detailed facility information
- Featured facilities section on homepage (min. 6 cards from database)

### Bookings
- Book a facility by selecting a date and time slot
- View all personal bookings with status, date, time, and price
- Cancel pending bookings
- Booking confirmation with price breakdown (base + 5% service fee)

### Facility Management
- Add a new facility with image upload via **imgbb**
- Update facility details
- Delete facility (with confirmation dialog)
- Owner-only access enforcement

### UI / UX
- Dark / light theme toggle
- Smooth animations via **Framer Motion**
- Fully responsive — mobile, tablet, and desktop
- Mobile navbar — right-side sliding drawer
- Mobile filter — left-side sliding drawer on facilities page
- Toast notifications (no browser alerts)
- Loading spinners while data fetches
- Custom 404 "Out of Bounds" page

---

## 🛣️ Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Homepage with banner, featured facilities, extra sections |
| `/facilities` | Public | All facilities with search and filter |
| `/facilities/:id` | Private | Facility details + booking form |
| `/login` | Public | Login with email or Google |
| `/register` | Public | Register new account |
| `/my-bookings` | Private | View and cancel personal bookings |
| `/add-facility` | Private | Add a new facility |
| `/manage-my-facilities` | Private | Update or delete owned facilities |

---

## 📦 NPM Packages Used

| Package | Purpose |
|---------|---------|
| `next` | React framework with App Router |
| `react` / `react-dom` | UI library |
| `better-auth` | Authentication (email + Google OAuth) |
| `mongodb` | MongoDB client for better-auth adapter |
| `framer-motion` | Page and card animations |
| `react-hook-form` | Form state management and validation |
| `react-hot-toast` | Toast notifications |
| `react-icons` | Icon library (Feather, Heroicons, etc.) |
| `swiper` | Hero banner image carousel |
| `react-fast-marquee` | Sponsor ticker/marquee |
| `tailwindcss` | Utility-first CSS framework |

---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root:

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8080

# Better Auth
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_long_random_secret_here

# MongoDB (for better-auth session storage)
MONGODB_URI=mongodb://127.0.0.1:27017/sport-nest

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Image Upload
NEXT_PUBLIC_IMGBB_KEY=your_imgbb_api_key
```

> Generate `BETTER_AUTH_SECRET`: run `openssl rand -base64 32`

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.jsx
│   │   └── register/page.jsx
│   ├── (main)/
│   │   ├── (booking)/my-bookings/page.jsx
│   │   ├── (facilities)/
│   │   │   ├── facilities/
│   │   │   │   ├── [id]/page.jsx
│   │   │   │   ├── layout.jsx
│   │   │   │   └── page.jsx
│   │   │   ├── add-facility/page.jsx
│   │   │   └── manage-my-facilities/page.jsx
│   │   ├── layout.js
│   │   └── page.js
│   ├── api/auth/[...all]/route.js
│   ├── layout.js
│   └── not-found.jsx
├── components/
│   ├── Sections/
│   │   ├── Banner/
│   │   ├── FacilitiesHeader/
│   │   ├── FacilitiesList/
│   │   ├── FacilitiesSidebar/
│   │   ├── FeaturedFacilities/
│   │   ├── Footer/
│   │   ├── Navbar/
│   │   ├── ProCoaching/
│   │   └── WhyChooseUs/
│   └── UI/
│       ├── AddFacilityModal/
│       ├── BookingCard/
│       ├── FacilityCard/
│       ├── LoadingSpinner/
│       ├── LoginForm/
│       ├── MyBookingCard/
│       ├── PrivateRoute/
│       ├── RegisterForm/
│       └── ThemeController/
├── context/
│   └── ThemeContext.jsx
├── db.js
├── hooks/
│   └── useAuth.js
└── lib/
    ├── api.js
    ├── auth.js
    └── authClient.js
```

---

## 🔒 Authentication Flow

```
User logs in / registers
        ↓
Better Auth handles session (Next.js /api/auth/*)
        ↓
Session cookie stored in browser
        ↓
Frontend reads session via authClient.useSession()
        ↓
Backend verifies session by calling /api/auth/get-session
        ↓
Protected API routes respond with data
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Behavior |
|------------|---------|
| Mobile (`< lg`) | Single column, right-side nav drawer, left-side filter drawer |
| Tablet (`sm–lg`) | 2-column grid, stacked buttons |
| Desktop (`lg+`) | Full sidebar layout, dropdown nav |

---

## 🧩 Database Architecture

### Facilities Collection
| Field | Type |
|-------|------|
| `name` | String |
| `facility_type` | String (enum) |
| `image` | String (URL) |
| `location` | String |
| `price_per_hour` | Number |
| `capacity` | Number |
| `available_slots` | Array of `{ start_time, end_time }` |
| `description` | String |
| `owner_email` | String |
| `booking_count` | Number |

### Bookings Collection
| Field | Type |
|-------|------|
| `facility_id` | ObjectId (ref: Facility) |
| `user_email` | String |
| `booking_date` | String (YYYY-MM-DD) |
| `time_slot` | `{ start_time, end_time }` |
| `hours` | Number |
| `total_price` | Number |
| `status` | String (pending / confirmed / cancelled) |

---

## 📸 Screenshots

> Add screenshots of your live site here

---

## 🙏 Credits

- Design inspiration: [Playo](https://playo.co), [BookMyTurf](https://bookmyturf.com)
- Icons: [React Icons](https://react-icons.github.io/react-icons/)
- Stock images: [Unsplash](https://unsplash.com)
- Image hosting: [imgbb](https://imgbb.com)