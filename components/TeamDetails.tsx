import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FollowButton } from "./FollowButton";
import { getAuth } from "@/lib/getAuth";
import { getTeam } from "@/app/actions/teams";

export async function TeamDetails({ teamId }: { teamId: string }) {
  const { teamId: myTeamId } = await getAuth();

  if (myTeamId === teamId) {
    redirect("/team");
  }
  if (!myTeamId) {
    redirect("/onboarding");
  }

  const { data, error } = await getTeam(teamId);

  if (error || !data) {
    return (
      <p className="p-4 text-red-500">
        {error || "Error loading team details."}
      </p>
    );
  }

  const { team, isFollowing } = data;

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>{team.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <FollowButton teamId={teamId} isInitiallyFollowing={isFollowing} />
      </CardContent>
    </Card>
  );
}
