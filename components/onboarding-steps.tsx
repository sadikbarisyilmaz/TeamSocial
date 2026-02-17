"use client";

import { CreateTeamForm } from "@/app/(onboarding)/onboarding/create-team";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OnboardingSteps() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => {
        // remove after done
        setStep(1);
        router.push("/");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [step, router]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center border p-10 w-full max-w-md mx-auto rounded-md">
      {step === 1 && (
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-2xl font-bold">Welcome to TeamSocial!</h1>
          <p className="text-muted-foreground">
            Do you want to create a new team or join an existing one?
          </p>
          <div className="flex gap-4 mt-4">
            <Button onClick={() => setStep(3)}>Create a Team</Button>
            <Button onClick={() => setStep(2)} variant="outline">
              Join a Team
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-2xl font-bold">Join a Team</h1>
          <p className="text-muted-foreground">
            This is where the invite code form will go.
          </p>
          {/* TODO: Onboarding form will be added here */}
          <div className="flex gap-4 mt-4">
            <Button onClick={() => setStep(1)} variant="outline">
              Go Back
            </Button>
            <Button onClick={() => setStep(4)}>Complete Setup</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-2xl font-bold">Create a Team</h1>
          <p className="text-muted-foreground">Give your team a name.</p>
          <CreateTeamForm onSuccess={() => setStep(4)} />
          <div className="mt-2">
            <Button onClick={() => setStep(1)} variant="outline">
              Go Back
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-2xl font-bold">
            Congratulations, profile setup complete!
          </h1>
          <p className="text-muted-foreground">Redirecting to home...</p>
        </div>
      )}
    </div>
  );
}
