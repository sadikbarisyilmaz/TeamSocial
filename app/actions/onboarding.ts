"use server";

import { customAlphabet } from "nanoid";
import { createClient } from "@/lib/supabase/server";
import { getAuth } from "@/lib/getAuth";

const generateInviteCode = customAlphabet(
  "23456789ABCDEFGHJKLMNPQRSTUVWXYZ",
  8,
);

export async function createTeam(
  prevState: any,
  formData: FormData,
): Promise<{ error: string | null; success: boolean }> {
  try {
    const supabase = await createClient();
    const teamName = (formData.get("teamName") as string)?.trim();

    if (!teamName || teamName.length < 3) {
      throw new Error("Team name must be at least 3 characters.");
    }

    const { userId } = await getAuth();
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Create the team
    const { data: team, error: teamError } = await supabase
      .from("teams")
      .insert({
        name: teamName,
        invite_code: generateInviteCode(),
      })
      .select()
      .single();

    if (teamError) throw teamError;
    if (!team) throw new Error("Failed to create team.");

    // Link the user to the team
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ team_id: team.id })
      .eq("id", userId);

    if (profileError) throw profileError;

    return { error: null, success: true };
  } catch (e) {
    const error = e as Error;
    console.error(`createTeam Error: ${error.message}`);
    return { error: error.message, success: false };
  }
}

export async function joinTeam(
  prevState: any,
  formData: FormData,
): Promise<{ error: string | null; success: boolean }> {
  try {
    const supabase = await createClient();
    const inviteCode = (formData.get("inviteCode") as string)
      ?.trim()
      .toUpperCase();

    if (!inviteCode) {
      throw new Error("Invite code is required.");
    }

    const { userId } = await getAuth();
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Find the team by code
    const { data: team, error: findError } = await supabase
      .from("teams")
      .select("id")
      .eq("invite_code", inviteCode)
      .single();

    if (findError) throw findError;
    if (!team) {
      throw new Error("Invalid invite code. Please check and try again.");
    }

    // Link the user to the found team
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ team_id: team.id })
      .eq("id", userId);

    if (updateError) throw updateError;

    return { error: null, success: true };
  } catch (e) {
    const error = e as Error;
    console.error(`joinTeam Error: ${error.message}`);
    return { error: error.message, success: false };
  }
}
