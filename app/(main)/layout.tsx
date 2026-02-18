import FollowingSidebar from "@/components/FollowingSidebar";
import { Navbar } from "@/components/Navbar";
import { getAuth } from "@/lib/getAuth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { teamId, isLoggedIn } = await getAuth();
  if (isLoggedIn && !teamId) {
    console.log("redirecting to onboarding");
    redirect("/onboarding");
  }

  return (
    <main className="w-full flex h-screen lg:justify-center">
      <Navbar />
      {children}
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
