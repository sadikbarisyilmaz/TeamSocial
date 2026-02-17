// src/lib/auth.ts
import { cache } from "react";
import { createClient } from "./supabase/server";

export const getAuth = cache(async () => {
  const supabase = await createClient();

  // Get the session (checks cookies/JWT)
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { user: null, userId: null, teamId: null, isLoggedIn: false };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("team_id")
    .eq("id", user.id)
    .single();

  // Combine Metadata with a Profile check

  return {
    userId: user.id,
    teamId: profile?.team_id ?? null,
    email: user.email,
    isLoggedIn: true,
  };
});
