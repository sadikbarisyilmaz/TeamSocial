import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import OnboardingSteps from "./OnboardingSteps";
import { getAuth } from "@/lib/getAuth";

export default async function Onboarding() {
  const { isLoggedIn, teamId } = await getAuth();

  // if no user logged in
  if (!isLoggedIn) {
    redirect("/auth/login");
  }
  // if user does belong to a team
  if (teamId) {
    redirect("/");
  }

  return <OnboardingSteps />;
}
