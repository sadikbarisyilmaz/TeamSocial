"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export type PostWithTeam = {
  id: string;
  content: string;
  created_at: string;
  teams: {
    id: string;
    name: string;
  } | null;
};

interface PostCardProps {
  post: PostWithTeam;
}

export function PostCard({ post }: PostCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const characterLimit = 280;

  const teamName = post.teams?.name || "Unknown Team";
  const teamInitials =
    teamName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "??";

  const isLongPost = post.content.length > characterLimit;
  return (
    <Card className="rounded-none space-y-2">
      <CardHeader className="flex flex-row justify-between space-x-4 pb-2">
        <Link
          key={post.id}
          href={`/team/${post.teams?.id}`}
          className="flex items-center gap-3 group"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-[10px] bg-blue-100 text-blue-700">
              {post.teams?.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium group-hover:underline leading-none">
              {post.teams?.name}
            </span>
            <span className="text-[10px] text-muted-foreground">View team</span>
          </div>
        </Link>
        <div className="flex">
          <span className="text-xs text-gray-500 whitespace-nowrap">
            {formatDistanceToNow(new Date(post.created_at), {
              addSuffix: true,
            })}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap font-thin text-sm">
          {isLongPost && !isExpanded
            ? `${post.content.substring(0, characterLimit)}...`
            : post.content}
        </p>
        {isLongPost && !isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="hover:underline text-blue-700 text-sm mt-2 font-bold"
          >
            Show more
          </button>
        )}
        {isLongPost && isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="hover:underline text-blue-700 text-sm mt-2 font-bold"
          >
            Show less
          </button>
        )}
      </CardContent>
    </Card>
  );
}
