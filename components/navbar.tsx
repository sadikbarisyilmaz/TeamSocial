import { Suspense } from "react";
import { NavMenu } from "./navmenu";

export const Navbar = () => {
  return (
    <nav className=" w-full max-w-sm h-screen border-r border-muted-foreground/20 flex flex-col items-end">
      <Suspense>
        <NavMenu />
      </Suspense>
    </nav>
  );
};
