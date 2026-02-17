"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleFollow(targetTeamId: string, isFollowing: boolean) {
  const supabase = await createClient();

  // Get current user's team
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    throw new Error("Not authenticated");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("team_id")
    .eq("id", data.claims.sub)
    .single();

  if (!profile?.team_id) throw new Error("User has no team");

  const myTeamId = profile.team_id;

  // Prevent self-following (Logic layer check)
  if (myTeamId === targetTeamId)
    throw new Error("You cannot follow your own team");

  if (isFollowing) {
    // Unfollow
    await supabase
      .from("follows")
      .delete()
      .eq("follower_team_id", myTeamId)
      .eq("following_team_id", targetTeamId);
  } else {
    // Follow
    await supabase.from("follows").insert({
      follower_team_id: myTeamId,
      following_team_id: targetTeamId,
    });
  }

  revalidatePath(`/teams/${targetTeamId}`);
  revalidatePath("/");
}
