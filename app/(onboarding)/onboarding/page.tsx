import Onboarding from "@/components/Onboarding";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense>
      <Onboarding />
    </Suspense>
  );
}
