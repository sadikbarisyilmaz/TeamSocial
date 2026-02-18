"use server";

import { getAuth } from "@/lib/getAuth";
import { createClient } from "@/lib/supabase/server";

export type TeamDetailsData = {
  team: {
    name: string;
  };
  isFollowing: boolean;
};

export type MyTeamDetailsData = {
  name: string;
  invite_code: string;
};

export async function getTeam(teamId: string): Promise<{
  success: boolean;
  error: string | null;
  data: TeamDetailsData | null;
}> {
  try {
    const { teamId: myTeamId } = await getAuth();
    if (!myTeamId) {
      // This is handled by redirect in the component, but good to have a check here.
      throw new Error("User has no team");
    }

    const supabase = await createClient();

    // Fetch team data
    const { data: team, error: teamError } = await supabase
      .from("teams")
      .select("name")
      .eq("id", teamId)
      .single();

    if (teamError) throw teamError;
    if (!team) {
      throw new Error("Team not found.");
    }

    // Check if user follows this team
    const { data: followRecord, error: followError } = await supabase
      .from("follows")
      .select("follower_team_id") // select something small
      .eq("follower_team_id", myTeamId)
      .eq("following_team_id", teamId)
      .single();

    // A "No rows found" error from .single() is expected if not following, so we don't throw it.
    if (followError && followError.code !== "PGRST116") {
      throw followError;
    }

    const isFollowing = !!followRecord;

    return {
      success: true,
      error: null,
      data: { team, isFollowing },
    };
  } catch (e) {
    const error = e as Error;
    console.error(`getTeam Error: ${error.message}`);
    return { success: false, error: error.message, data: null };
  }
}

export async function getMyTeam(teamId: string): Promise<{
  success: boolean;
  error: string | null;
  data: MyTeamDetailsData | null;
}> {
  try {
    const { teamId: myTeamId } = await getAuth();
    if (!myTeamId) {
      // This is handled by redirect in the component, but good to have a check here.
      throw new Error("User has no team");
    }

    const supabase = await createClient();

    // Fetch team data
    const { data: team, error: teamError } = await supabase
      .from("teams")
      .select("name, invite_code")
      .eq("id", teamId)
      .single();

    if (teamError) throw teamError;
    if (!team) {
      throw new Error("Team not found.");
    }

    return {
      success: true,
      error: null,
      data: { name: team.name, invite_code: team.invite_code },
    };
  } catch (e) {
    const error = e as Error;
    console.error(`getTeam Error: ${error.message}`);
    return { success: false, error: error.message, data: null };
  }
}
