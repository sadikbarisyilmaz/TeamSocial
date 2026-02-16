import { ThemeProvider } from "next-themes";
import React from "react";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <main className="w-full flex h-screen lg:justify-center">{children}</main>
    </ThemeProvider>
  );
}
