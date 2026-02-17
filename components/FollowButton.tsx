"use client";

import { Button } from "@/components/ui/button";

export function FollowButton({ teamId }: { teamId: string }) {
  const handleFollow = () => {
    // In a real application, this would trigger a server action to follow the team.
    alert(`Follow functionality for team ${teamId} is not implemented yet.`);
  };

  return (
    <Button onClick={handleFollow} className="w-full">
      Follow Team
    </Button>
  );
}
