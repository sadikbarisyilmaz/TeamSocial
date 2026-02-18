import { Banner } from "@/components/Banner";
import { MyTeam } from "@/components/MyTeam";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="min-h-[100dvh] w-full lg:min-w-[600px] md:max-w-[600px] flex-col flex overflow-auto border-x border-muted-foreground/20">
      <Banner text="My Team" />
      <Suspense fallback={<Spinner />}>
        <MyTeam />
      </Suspense>
    </div>
  );
}
