"use server";

import { redirect } from "next/navigation";
import { customAlphabet } from "nanoid";
import { createClient } from "@/lib/supabase/server";

const generateInviteCode = customAlphabet(
  "23456789ABCDEFGHJKLMNPQRSTUVWXYZ",
  8,
);

export async function createTeam(formData: FormData) {
  const supabase = await createClient();
  const teamName = formData.get("teamName") as string;

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    Error("Not authenticated");
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

  if (teamError) return { error: teamError.message };

  // 2. Link the user to the team
  const { error: profileError } = await supabase
    .from("profiles")
    .update({ team_id: team.id })
    .eq("id", data?.claims?.sub);

  if (profileError) return { error: profileError.message };

  redirect("/");
}

export async function joinTeam(formData: FormData) {
  const supabase = await createClient();
  const inviteCode = (formData.get("inviteCode") as string).toUpperCase();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    Error("Not authenticated");
  }

  // 1. Find the team by code
  const { data: team, error: findError } = await supabase
    .from("teams")
    .select("id")
    .eq("invite_code", inviteCode)
    .single();

  if (!team || findError) {
    return { error: "Invalid invite code. Please check and try again." };
  }

  // 2. Link the user to the found team
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ team_id: team.id })
    .eq("id", !data?.claims.sub);

  if (updateError) return { error: updateError.message };

  redirect("/");
}
