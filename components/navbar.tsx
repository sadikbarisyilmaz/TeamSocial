import { Separator } from "./ui/separator";
import Link from "next/link";
import { HomeIcon } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="w-1/4  border-r border-muted-foreground/20 flex flex-col  items-end">
      <div className="w-64 h-screen flex flex-col px-2 pt-4  gap-2">
        <div className=" flex flex-col ">
          <h1 className=" text-xl font-semibold ">TeamSocial</h1>
        </div>
        <Separator />
        <div className="py-3 flex flex-col ">
          <span className="flex gap-2">
            <HomeIcon size={22} strokeWidth={1.25} />
            <Link href={"/"}>Home</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
