import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import OnboardingSteps from "./onboarding-steps";

export default async function Onboarding() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }
  // return JSON.stringify(data.claims, null, 2);

  return <OnboardingSteps />;
}
