import GlobalFeed from "@/components/global-feed";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-[100dvh] w-full lg:min-w-[600px] md:max-w-[600px] flex-col flex overflow-auto">
      <div className="sticky top-0 z-10 w-full border-b bg-background/95 p-6 backdrop-blur supports-[backdrop-filter]:bg-background/85">
        <h1 className="text-center text-xl font-semibold">Recent Posts</h1>
      </div>
      <Suspense>
        <GlobalFeed />
      </Suspense>
    </main>
  );
}
