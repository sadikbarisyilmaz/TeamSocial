import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CopyInviteCode } from "./CopyInviteCode";
import { getAuth } from "@/lib/getAuth";
import { Separator } from "./ui/separator";
import { getMyTeam } from "@/app/actions/teams";

export async function MyTeam() {
  const { teamId, isLoggedIn } = await getAuth();

  if (!isLoggedIn) {
    redirect("/auth/login");
  }
  if (!teamId) {
    redirect("/onboarding");
  }

  const { data: team, error: teamError } = await getMyTeam(teamId);

  if (!team) {
    return <p className="p-4 text-red-500">Team not found.</p>;
  }
  if (teamError) {
    return <p className="p-4 text-red-500">Error loading team details.</p>;
  }

  const inviteCode = (team as { invite_code?: string | null })?.invite_code;

  return (
    <Card className="m-4 space-y-2">
      <CardHeader>
        <CardTitle>{team.name}</CardTitle>
        <CardDescription>Here are your team details.</CardDescription>
      </CardHeader>
      <Separator />
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
