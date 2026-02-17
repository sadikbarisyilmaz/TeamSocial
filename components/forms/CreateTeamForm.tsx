"use client";

import { createTeam } from "@/app/actions/onboarding";
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
      {pending ? "Creating Team..." : "Create Team"}
    </Button>
  );
}

export function CreateTeamForm({ onSuccess }: { onSuccess: () => void }) {
  const [state, formAction] = useActionState(createTeam, initialState);

  useEffect(() => {
    if (state.success) {
      onSuccess();
    }
  }, [state.success, onSuccess]);

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="teamName">Team Name</Label>
        <Input
          required
          type="text"
          id="teamName"
          name="teamName"
          placeholder="Acme Inc."
        />
      </div>
      {state.error && <p className="text-sm text-red-500">{state.error}</p>}
      <SubmitButton />
    </form>
  );
}
