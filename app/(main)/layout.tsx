import FollowingSidebar from "@/components/FollowingSidebar";
import { Navbar } from "@/components/Navbar";
import QueryProvider from "@/components/providers/QueryProvider";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full flex h-screen lg:justify-center">
      <Navbar />
      <QueryProvider>{children}</QueryProvider>
      <Suspense
        fallback={
          <div className="w-full sticky top-4 hidden lg:block min-w-80 max-w-sm  border-muted-foreground/20 m-4 h-fit"></div>
        }
      >
        <FollowingSidebar />
      </Suspense>
    </main>
  );
}
