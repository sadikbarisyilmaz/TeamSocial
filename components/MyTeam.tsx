import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CopyInviteCode } from "./CopyInviteCode";

export async function MyTeam() {
  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.getClaims();
  if (authError || !data?.claims) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("team_id")
    .eq("id", data.claims.sub)
    .single();

  // if user doesn't belong to a team
  if (!profile?.team_id) {
    return redirect("/onboarding");
  }

  const { data: team, error: teamError } = await supabase
    .from("teams")
    .select("name, invite_code")
    .eq("id", profile?.team_id)
    .single();

  if (teamError) {
    return <p className="p-4 text-red-500">Error loading team details.</p>;
  }

  if (!team) {
    return <p className="p-4">Team not found.</p>;
  }

  const inviteCode = (team as { invite_code?: string | null })?.invite_code;

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>{team.name}</CardTitle>

        <CardDescription>Here are your team details.</CardDescription>
      </CardHeader>
      <CardContent>
        <>
          <h3 className="text-sm font-medium">Invite Code</h3>
          <p className="text-sm text-muted-foreground">
            Share this code with others to let them join your team.
          </p>
          {inviteCode ? (
            <CopyInviteCode code={inviteCode} />
          ) : (
            <p className="text-sm text-muted-foreground mt-2">
              No invite code for this team.
            </p>
          )}
        </>
      </CardContent>
    </Card>
  );
}
