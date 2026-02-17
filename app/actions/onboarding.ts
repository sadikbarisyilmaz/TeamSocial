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
  const supabase = await createClient();
  const teamName = formData.get("teamName") as string;

  const { userId } = await getAuth();
  if (!userId) {
    return { error: "Not authenticated", success: false };
  }

  // 1. Create the team
  const { data: team, error: teamError } = await supabase
    .from("teams")
    .insert({
      name: teamName,
      invite_code: generateInviteCode(),
    })
    .select()
    .single();

  if (teamError) return { error: teamError.message, success: false };

  // 2. Link the user to the team
  const { error: profileError } = await supabase
    .from("profiles")
    .update({ team_id: team.id })
    .eq("id", userId);

  if (profileError) return { error: profileError.message, success: false };

  return { error: null, success: true };
}

export async function joinTeam(
  prevState: any,
  formData: FormData,
): Promise<{ error: string | null; success: boolean }> {
  const supabase = await createClient();
  const inviteCode = (formData.get("inviteCode") as string).toUpperCase();

  const { userId } = await getAuth();
  if (!userId) {
    return { error: "Not authenticated", success: false };
  }

  // Find the team by code
  const { data: team, error: findError } = await supabase
    .from("teams")
    .select("id")
    .eq("invite_code", inviteCode)
    .single();

  if (!team || findError) {
    return {
      error: "Invalid invite code. Please check and try again.",
      success: false,
    };
  }

  // Link the user to the found team
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ team_id: team.id })
    .eq("id", userId);

  if (updateError) return { error: updateError.message, success: false };

  return { error: null, success: true };
}
