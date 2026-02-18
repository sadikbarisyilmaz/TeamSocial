"use server";

import { getAuth } from "@/lib/getAuth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type FollowedTeam = {
  created_at: string;
  following: {
    id: string;
    name: string;
  } | null;
};

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

export async function getLatestFollows(): Promise<{
  success: boolean;
  error: string | null;
  data: FollowedTeam[] | null;
}> {
  try {
    const { teamId } = await getAuth();
    // If no team, there are no follows. This is not an error.
    if (!teamId) {
      return { success: true, error: null, data: [] };
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("follows")
      .select(
        `
        created_at,
        following:teams!following_team_id (
          id,
          name
        )
      `,
      )
      .eq("follower_team_id", teamId)
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) {
      throw error;
    }

    // Ensure data is explicitly FollowedTeam[] or null to satisfy the return type
    const resultData: FollowedTeam[] | null = data
      ? data.map((item: any) => ({
          created_at: item.created_at,
          following: Array.isArray(item.following)
            ? item.following[0]
            : item.following,
        }))
      : null;

    return { success: true, error: null, data: resultData };
  } catch (e) {
    const error = e as Error;
    console.error(`getLatestFollows Error: ${error.message}`);
    return {
      success: false,
      error: "Could not fetch followed teams.",
      data: null,
    };
  }
}
