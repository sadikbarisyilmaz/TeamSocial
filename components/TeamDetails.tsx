import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function TeamDetails({ teamId }: { teamId: string }) {
  const supabase = await createClient();
  console.log(teamId);

  const { data, error: authError } = await supabase.auth.getClaims();
  if (authError || !data?.claims) {
    redirect("/auth/login");
  }

  const { data: team, error: teamError } = await supabase
    .from("teams")
    .select("*")
    .eq("id", teamId)
    .single();

  return JSON.stringify(team, null, 2);
}
