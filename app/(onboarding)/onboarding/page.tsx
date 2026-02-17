import Onboarding from "@/components/onboarding";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense>
      <Onboarding />
    </Suspense>
  );
}
