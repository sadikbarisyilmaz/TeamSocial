import { Suspense } from "react";
import { Navmenu } from "@/components/Navmenu";

export const Navbar = () => {
  return (
    <nav className=" w-full max-w-sm h-screen border-r border-muted-foreground/20 flex flex-col items-end">
      <Suspense>
        <Navmenu />
      </Suspense>
    </nav>
  );
};
