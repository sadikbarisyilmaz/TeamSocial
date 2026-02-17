import { Banner } from "@/components/Banner";
import { TeamDetails } from "@/components/TeamDetails";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ teamId: string }>; // 2. Define params as a Promise;
}) {
  const { teamId } = await params;

  return (
    <div className="min-h-[100dvh] w-full lg:min-w-[600px] md:max-w-[600px] flex-col flex overflow-auto">
      <Banner text="Team Details" />
      <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
        <Suspense>
          <TeamDetails teamId={teamId} />
        </Suspense>
      </pre>
    </div>
  );
}
