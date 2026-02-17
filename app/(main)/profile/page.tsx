import { Banner } from "@/components/Banner";
import { ProfileDetails } from "@/components/ProfileDetails";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="min-h-[100dvh] w-full lg:min-w-[600px] md:max-w-[600px] flex-col flex overflow-auto border-x border-muted-foreground/20">
      <Banner text="Profile Details" />
      <Suspense>
        <ProfileDetails />
      </Suspense>
    </div>
  );
}
