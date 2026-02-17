"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

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
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <Avatar>
          <AvatarFallback>{teamInitials}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base font-bold ">{teamName}</CardTitle>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {formatDistanceToNow(new Date(post.created_at), {
                addSuffix: true,
              })}
            </span>
          </div>
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
            className="hover:underline text-blue-500 text-sm mt-2 font-bold"
          >
            Show more
          </button>
        )}
        {isLongPost && isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="hover:underline text-blue-500 text-sm mt-2 font-bold"
          >
            Show less
          </button>
        )}
      </CardContent>
    </Card>
  );
}
