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
