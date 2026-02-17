import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Info } from "lucide-react";
import { getAuth } from "@/lib/getAuth";

export default async function FollowingSidebar() {
  const { userId, teamId, isLoggedIn, email } = await getAuth();

  if (!isLoggedIn)
    return (
      <div className="w-full sticky top-4 hidden lg:block min-w-80 max-w-sm  border-muted-foreground/20 m-4 h-fit"></div>
    );

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("team_id")
    .single();

  if (!teamId) return null;

  // Fetch last 3 followed teams
  const { data: following, error } = await supabase
    .from("follows")
    .select(
      `
      created_at,
      following:teams!following_team_id (
        id,
        name
      )
    `,
    )
    .eq("follower_team_id", teamId)
    .order("created_at", { ascending: false })
    .limit(3);

  if (error || !following || following.length === 0) {
    return (
      <Card className="w-full sticky top-4 hidden lg:block min-w-80 max-w-sm  border-muted-foreground/20 m-4 h-fit">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text">
            Recenty Followed Teams
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-muted-foreground flex gap-2 items-center">
            <Info size={16} /> You aren't following any teams yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full sticky top-4 hidden lg:block min-w-80 max-w-sm  border-muted-foreground/20 m-4 h-fit">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text">
          Recenty Followed Teams
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {following.map((record: any) => (
          <Link
            key={record.following.id}
            href={`/team/${record.following.id}`}
            className="flex items-center gap-3 group"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-[10px] bg-blue-100 text-blue-700">
                {record.following.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium group-hover:underline leading-none">
                {record.following.name}
              </span>
              <span className="text-[10px] text-muted-foreground">
                View profile
              </span>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
