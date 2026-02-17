import { Banner } from "@/components/Banner";
import GlobalFeed from "@/components/GlobalFeed";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-[100dvh] w-full lg:min-w-[600px] md:max-w-[600px] flex-col flex overflow-auto">
      <Banner text="Recent Posts" />
      <Suspense>
        <GlobalFeed />
      </Suspense>
    </main>
  );
}
