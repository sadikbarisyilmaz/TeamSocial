import {
  BriefcaseBusiness,
  HomeIcon,
  Settings,
  User,
  Users,
} from "lucide-react";
import { LogoutButton } from "./LogoutButton";
import Link from "next/link";
import { NewPostButton } from "./NewPostButton";
import { getAuth } from "@/lib/getAuth";

export async function Navmenu() {
  const { isLoggedIn } = await getAuth();

  return (
    <div className=" w-72 h-screen flex flex-col gap-2">
      <div className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 ">
          <h1 className=" text-xl font-semibold ">TeamSocial</h1>
        </div>
      </div>
      <div className="py-3 flex flex-col gap-4 px-4 h-screen justify-between">
        <div className="flex flex-col w-full gap-4">
          <span>
            <Link className="flex gap-2" href={"/"}>
              <HomeIcon size={22} strokeWidth={1.25} />
              Home
            </Link>
          </span>
          {isLoggedIn && (
            <span>
              <Link className="flex gap-2" href={"/team"}>
                <Users size={22} strokeWidth={1.25} />
                My Team
              </Link>
            </span>
          )}
          {isLoggedIn && (
            <span>
              <Link className="flex gap-2" href={"/account"}>
                <Settings size={22} strokeWidth={1.25} />
                Account
              </Link>
            </span>
          )}
          <span className="flex gap-2">
            <NewPostButton />
          </span>
        </div>
        <span className="flex gap-2 w-full justify-end pb-4">
          {isLoggedIn && (
            <div className="flex w-full gap-2">
              <LogoutButton />
            </div>
          )}
        </span>
      </div>
    </div>
  );
}
