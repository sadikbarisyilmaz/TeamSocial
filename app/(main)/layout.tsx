import { Navbar } from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full flex h-screen lg:justify-center">
      <Navbar />
      {children}
      {/* Dummy Side */}
      <div className="hidden lg:flex min-w-80  border-l w-full max-w-sm h-screen border-muted-foreground/20  flex-col  items-end p-4">
        <div className="w-full h-60 border rounded-xl"></div>
      </div>
    </main>
  );
}
