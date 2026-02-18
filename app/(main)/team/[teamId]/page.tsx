import { Banner } from "@/components/Banner";
import { TeamDetails } from "@/components/TeamDetails";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const { teamId } = await params;

  return (
    <div className="min-h-[100dvh] w-full lg:min-w-[600px] md:max-w-[600px] flex-col flex overflow-auto border-x border-muted-foreground/20">
      <Banner text="Team Details" />
      <Suspense fallback={<Spinner />}>
        <TeamDetails teamId={teamId} />
      </Suspense>
    </div>
  );
}
