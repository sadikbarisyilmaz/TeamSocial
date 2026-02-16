import { Separator } from "./ui/separator";
import Link from "next/link";
import { HomeIcon, User } from "lucide-react";
import { CreatePostButton } from "./create-post-button";
import { Suspense } from "react";

export const Navbar = () => {
  return (
    <nav className="w-1/4 border-r border-muted-foreground/20 flex flex-col  items-end">
      <div className="w-64 h-screen flex flex-col gap-2">
        <div className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <h1 className=" text-xl font-semibold ">TeamSocial</h1>
          </div>
        </div>
        <div className="py-3 flex flex-col gap-4 px-4 ">
          <span className="flex gap-2">
            <HomeIcon size={22} strokeWidth={1.25} />
            <Link href={"/"}>Home</Link>
          </span>
          {/* <span className="flex gap-2">
            <User size={22} strokeWidth={1.25} />
            <Link href={"/profile"}>Profile</Link>
          </span> */}
          <span className="flex gap-2">
            <Suspense>
              <CreatePostButton />
            </Suspense>
          </span>
        </div>
      </div>
    </nav>
  );
};
