import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Info, AlertTriangle } from "lucide-react";
import { getAuth } from "@/lib/getAuth";
import { getLatestFollows, type FollowedTeam } from "@/app/actions/follows";

export default async function FollowingSidebar() {
  const { teamId, isLoggedIn } = await getAuth();

  if (!isLoggedIn || !teamId)
    return (
      <div className="w-full sticky top-4 hidden lg:block min-w-80 max-w-sm  border-muted-foreground/20 m-4 h-fit"></div>
    );

  const { data: following, error } = await getLatestFollows();

  if (error || !following || following.length === 0) {
    return (
      <Card className="w-full sticky top-4 hidden lg:block min-w-80 max-w-sm  border-muted-foreground/20 m-4 h-fit">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text">
            Recenty Followed Teams
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p
            className={`text-xs flex gap-2 items-center ${
              error ? "text-destructive" : "text-muted-foreground"
            }`}
          >
            {error ? <AlertTriangle size={16} /> : <Info size={16} />}
            {error || "You aren't following any teams yet."}
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
        {following.map((record: FollowedTeam) =>
          record.following ? (
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
                  View team
                </span>
              </div>
            </Link>
          ) : null,
        )}
      </CardContent>
    </Card>
  );
}
