"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OnboardingSteps() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
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
            Let's get your profile set up.
          </p>
          <Button onClick={() => setStep(2)} className="mt-4">
            Get Started
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-2xl font-bold">Create Your Profile</h1>
          <p className="text-muted-foreground">
            This is where the signup form will go.
          </p>
          {/* TODO: Onboarding form will be added here */}
          <Button onClick={() => setStep(3)} className="mt-4">
            Complete Setup
          </Button>
        </div>
      )}

      {step === 3 && (
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
