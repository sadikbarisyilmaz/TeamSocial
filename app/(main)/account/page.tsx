import { AccountDetails } from "@/components/AccountDetails";
import { Banner } from "@/components/Banner";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="min-h-[100dvh] w-full lg:min-w-[600px] md:max-w-[600px] flex-col flex overflow-auto border-x border-muted-foreground/20">
      <Banner text="Account Details" />
      <Suspense>
        <AccountDetails />
      </Suspense>
    </div>
  );
}
