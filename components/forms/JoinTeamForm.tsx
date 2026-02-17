"use client";

import { joinTeam } from "@/app/actions/onboarding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";

const initialState = {
  error: null,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className="w-full"
    >
      {pending ? "Joining Team..." : "Join Team"}
    </Button>
  );
}

export function JoinTeamForm({ onSuccess }: { onSuccess: () => void }) {
  const [state, formAction] = useActionState(joinTeam, initialState);

  useEffect(() => {
    if (state.success) {
      onSuccess();
    }
  }, [state.success, onSuccess]);

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="inviteCode">Invite Code</Label>
        <Input
          required
          type="text"
          id="inviteCode"
          name="inviteCode"
          placeholder="AN50FMS7"
        />
      </div>
      {state.error && <p className="text-sm text-red-500">{state.error}</p>}
      <SubmitButton />
    </form>
  );
}
