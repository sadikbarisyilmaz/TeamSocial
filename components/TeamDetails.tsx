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
import { FollowButton } from "./FollowButton";
import { getAuth } from "@/lib/getAuth";

export async function TeamDetails({ teamId }: { teamId: string }) {
  const supabase = await createClient();
  const { teamId: myTeamId } = await getAuth();

  // fetch team data
  const { data: team, error: teamError } = await supabase
    .from("teams")
    .select("name")
    .eq("id", teamId)
    .single();
  if (teamError) {
    return <p className="p-4 text-red-500">Error loading team details.</p>;
  }

  if (!team) {
    return <p className="p-4">Team not found.</p>;
  }

  // check if user follows this team
  let isFollowing = false;
  if (myTeamId) {
    const { data: followRecord } = await supabase
      .from("follows")
      .select("*")
      .eq("follower_team_id", myTeamId)
      .eq("following_team_id", teamId)
      .single();

    isFollowing = !!followRecord;
  }

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
