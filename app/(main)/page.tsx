import GlobalFeed from "@/components/global-feed";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-[100dvh] w-full lg:min-w-[600px] md:max-w-[600px] flex-col flex overflow-auto p-6 gap-4">
      <Suspense>
        <GlobalFeed />
      </Suspense>
    </main>
  );
}
