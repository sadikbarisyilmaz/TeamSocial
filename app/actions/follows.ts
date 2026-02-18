"use server";

import { getAuth } from "@/lib/getAuth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleFollow(
  targetTeamId: string,
  isFollowing: boolean,
): Promise<{ success: boolean; error: string | null }> {
  try {
    const { userId, teamId } = await getAuth();
    if (!userId) {
      throw new Error("Not authenticated");
    }
    if (!teamId) {
      throw new Error("User has no team");
    }

    const supabase = await createClient();
    const myTeamId = teamId;

    // Prevent self-following (Logic layer check)
    if (myTeamId === targetTeamId) {
      throw new Error("You cannot follow your own team");
    }

    if (isFollowing) {
      // Unfollow
      const { error } = await supabase
        .from("follows")
        .delete()
        .eq("follower_team_id", myTeamId)
        .eq("following_team_id", targetTeamId);
      if (error) throw error;
    } else {
      // Follow
      const { error } = await supabase.from("follows").insert({
        follower_team_id: myTeamId,
        following_team_id: targetTeamId,
      });
      if (error) throw error;
    }

    revalidatePath(`/team/${targetTeamId}`);
    revalidatePath("/");
    return { success: true, error: null };
  } catch (e) {
    const error = e as Error;
    // Log the full error for debugging on the server
    console.error(`toggleFollow Error: ${error.message}`);
    // Return the error message to the client.
    return { error: error.message, success: false };
  }
}
