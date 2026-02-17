import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { getAuth } from "@/lib/getAuth";

export async function ProfileDetails() {
  const { teamId, isLoggedIn, email } = await getAuth();

  if (!isLoggedIn) {
    redirect("/auth/login");
  }

  // if user doesn't belong to a team
  if (!teamId) {
    return redirect("/onboarding");
  }

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>Here are your profile details</CardTitle>
        <CardDescription>{email}</CardDescription>
      </CardHeader>
    </Card>
  );
}
