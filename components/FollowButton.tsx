"use client";

import { useTransition } from "react";
import { toggleFollow } from "@/app/actions/follows";
import { Button } from "@/components/ui/button";

export function FollowButton({
  teamId,
  isInitiallyFollowing,
}: {
  teamId: string;
  isInitiallyFollowing: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const handleToggle = () => {
    startTransition(async () => {
      await toggleFollow(teamId, isInitiallyFollowing);
    });
  };
  return (
    <Button
      onClick={handleToggle}
      disabled={isPending}
      className={`w-full transition-all`}
    >
      {isPending ? "..." : isInitiallyFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}
