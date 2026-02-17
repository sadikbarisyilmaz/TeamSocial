"use server";

import { getAuth } from "@/lib/getAuth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleFollow(targetTeamId: string, isFollowing: boolean) {
  const { userId, teamId } = await getAuth();
  if (!userId) {
    return { error: "Not authenticated", success: false };
  }
  if (!teamId) {
    return { error: "User has no team", success: false };
  }

  const supabase = await createClient();
  const myTeamId = teamId;

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

  revalidatePath(`/team/${targetTeamId}`);
  revalidatePath("/");
}
