import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import OnboardingSteps from "./OnboardingSteps";

export default async function Onboarding() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("team_id")
    .eq("id", data?.claims?.sub)
    .single();

  // if user does belong to a team
  if (profile?.team_id) {
    return redirect("/");
  }

  return <OnboardingSteps />;
}
