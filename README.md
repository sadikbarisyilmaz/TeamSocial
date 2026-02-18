# TeamSocial – Social Multi-Tenant Platform

A modern team-based social media web application with authentication, team ownership,
posting, and basic social relationships.

## 🚀 Technical Stack

- **Framework:** Next.js 16 (App Router)
- **Auth & Database:** Supabase (PostgreSQL)
- **State Management:** TanStack Query v5 (React Query)
- **UI Components:** shadcn/ui + Tailwind CSS

## 🛠️ Features

- **Global Feed:** A public, infinite scrolling Global Feed using TanStack Query.
- **Auth:** Signup with Credentials and Google OAuth
- **Team-Based:** Each user belongs to exactly one team, All users in a team share the same permissions.
- **Onboarding Redirect:** Automatic redirect for new users to set up their team profile.
- **Relational Posting:** Posts are tied to both the User and their Team, allowing for "Team-only" filtering logic.
- **Follow System**: Teams can follow other teams.

---

## ⚖️ Key Assumptions & Trade-offs

- **Auth Memoization over Context:** \* **Decision:** Used React `cache()` for server-side auth instead of passing user data through complex prop drilling or a heavy Client Context provider.
  - **Trade-off:** This prioritizes server-side performance but requires components that need user data on the client to either fetch it via TanStack Query or receive it as props from a Server Component.
- **Client-Side Querying vs. Hydration:** \* **Decision:** I chose to implement TanStack Query strictly on the client side rather than using Server-side Hydration.
  - **Trade-off:** While this introduces a brief loading state on initial mount, it significantly simplifies the architecture and ensures a more consistent "Single Page App" feel for the Infinite Scroll, avoiding the complexity of isomorphic Supabase clients during the initial render.

---

## 🚀 Future Improvements

- **Advanced Image Handling:** Integration with Supabase Storage to allow teams to attach images to their posts, including client-side compression and blur-hash placeholders for optimized loading.
- **Enhanced Loading States (Skeletons):** Replace standard loading spinners with skeleton components that mirror the actual layout of the posts, reducing perceived latency and eliminating layout shifts.
- **Team Details:** Expand the application to display a team's profile and post history, allowing users to deep-dive into a single organization's content.
- **Social Interaction (Follow System):** Integrate a "Follow" button directly onto the Global Feed cards, leveraging the existing `follows` table to allow users to build a custom feed of teams they care about.
- **Account Management:** Add a user settings dashboard allowing individuals to update their account information (email, password) and manage their team membership details.
- **Temporary Invite Code:** Instead of hardcoded invite codes in DB, apply a temporary code strategy.
- **Auto Invite Feature:** Add an option to invite a user to the team via email.
- **Robust Form Validation:** Implement **Zod** for schema-based validation on both the client and server. This would provide real-time feedback to users and ensure that data (like post length or invite codes) strictly adheres to business rules before hitting the database.

---

## 🗺️ The New User Flow

We've designed the signup process to be seamless, ensuring every user is correctly set up with a team before they start posting.

## **1\. Quick Sign-In**

A new user arrives at the homepage and signs in instantly using their **Google account** or email and password. User gets a confirmation mail with email signup.

## **2\. The "Team Check"**

As soon as the user logs in, the app checks if they already belong to a team.

- **Returning users** are sent straight to their feed.

- **New users** are automatically guided to an onboarding page.

## **3\. Setting Up the Team**

If it's a user's first time, they are prompted to create or a join a team. This step is mandatory---the app won't let user, use core functions of the app until their team is ready. This ensures every post in the feed is officially tied to an organization.

## **4\. Welcome to the Feed**

Once the team is created, the user is redirected to the **Global Feed**. They can now see what other teams are doing and share their first update.

---

## 📊 Database Schema

The system uses a relational PostgreSQL schema designed for multi-tenancy. Row Level Security (RLS) ensures that team members can only modify their own teams content.

### Tables

#### **1\. Teams & Profiles**

- **`public.teams`**: The core entity. Every post and member belongs to a team.
  - `id`: Primary Key (UUID).

  - `name`: The display name of the team.

  - `invite_code`: A unique string used for onboarding and joining teams.

- **`public.profiles`**: Extends Supabase Auth users to include team associations.
  - `id`: References `auth.users`.

  - `team_id`: References `public.teams`. This is used to gate-keep access to team-specific dashboards.

#### **2\. Content & Social Graph**

- **`public.posts`**: Content is owned by the **Team** entity.
  - `team_id`: Enables the Global Feed to aggregate content from different organizations.

  - `content`: The text body of the post.

- **`public.follows`**: A self-referencing join table that manages the "Social Graph."
  - `follower_team_id` & `following_team_id`: Creates a many-to-many relationship allowing teams to follow other teams.

---

## 🚦 Getting Started

1.  **Environment Variables:**
    Create a `.env.local` with your Supabase credentials:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
    ```
2.  **Database Setup:**
    Run the SQL migration scripts located in `/supabase/migrations`.
3.  **Install & Run:**
    ```bash
    npm install
    npm run dev
    ```

---
