import Onboarding from "@/components/onboarding";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
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

  return (
    <Suspense>
      <Onboarding />
    </Suspense>
  );
}
