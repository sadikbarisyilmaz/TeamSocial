import Onboarding from "@/components/onboarding";
import { Suspense } from "react";

export default async function Page() {
  // return JSON.stringify(data.claims, null, 2);

  return (
    <Suspense>
      <Onboarding />
    </Suspense>
  );
}
