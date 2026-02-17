import { Suspense } from "react";
import { Navmenu } from "./Navmenu";

export const Navbar = () => {
  return (
    <nav className=" w-full max-w-sm h-screen flex flex-col items-end">
      <Suspense>
        <Navmenu />
      </Suspense>
    </nav>
  );
};
