-- 1. Create Teams Table
CREATE TABLE public.teams (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  invite_code text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- 2. Create Profiles Table (Linked to Supabase Auth)
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  team_id uuid REFERENCES public.teams(id) ON DELETE SET NULL,
  email text,
  updated_at timestamptz DEFAULT now()
);

-- 3. Create Posts Table (Owned by Team)
CREATE TABLE public.posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- 4. Create Follows Table (Team-to-Team)
CREATE TABLE public.follows (
  follower_team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  following_team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (follower_team_id, following_team_id),
  -- Rule: A team cannot follow itself
  CONSTRAINT cannot_follow_self CHECK (follower_team_id <> following_team_id)
);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created in auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

  -- Enable RLS on all tables
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

-- POSTS POLICIES
-- 1. Anyone (even logged out) can read posts (The Global Feed)
CREATE POLICY "Public can view all posts" ON public.posts
  FOR SELECT USING (true);

-- 2. Only team members can create posts for their team
CREATE POLICY "Team members can create posts" ON public.posts
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE team_id = posts.team_id
    )
  );

-- FOLLOWS POLICIES
-- 1. Anyone can see who follows whom
CREATE POLICY "Public can view follows" ON public.follows
  FOR SELECT USING (true);

-- 2. Only a team member can make their team follow another
CREATE POLICY "Teams can follow others" ON public.follows
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE team_id = follows.follower_team_id
    )
  );

-- 3. Only a team member can make their team unfollow
CREATE POLICY "Teams can unfollow" ON public.follows
  FOR DELETE USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE team_id = follows.follower_team_id
    )
  );