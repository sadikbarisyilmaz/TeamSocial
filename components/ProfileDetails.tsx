import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export async function ProfileDetails() {
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

  // if user doesn't belong to a team
  if (!profile?.team_id) {
    return redirect("/onboarding");
  }

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>Here are your profile details</CardTitle>
        <CardDescription>{data?.claims?.email}</CardDescription>
      </CardHeader>
    </Card>
  );
}
