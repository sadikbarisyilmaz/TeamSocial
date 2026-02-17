import { createClient } from "@/lib/supabase/server";
import { HomeIcon, User } from "lucide-react";
import { LogoutButton } from "./logout-button";
import Link from "next/link";
import { NewPostButton } from "./new-post-button";

export async function NavMenu() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  return (
    <div className=" w-72 h-screen flex flex-col gap-2">
      <div className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
          <h1 className=" text-xl font-semibold ">TeamSocial</h1>
        </div>
      </div>
      <div className="py-3 flex flex-col gap-4 px-4 h-screen justify-between">
        <div className="flex flex-col w-full gap-4">
          <span className="flex gap-2">
            <HomeIcon size={22} strokeWidth={1.25} />
            <Link href={"/"}>Home</Link>
          </span>
          <span>
            {user && (
              <div className="flex gap-2">
                <User size={22} strokeWidth={1.25} />
                <Link href={"/profile"}>Profile</Link>
              </div>
            )}
          </span>
          <span className="flex gap-2">
            <NewPostButton />
          </span>
        </div>

        <span className="flex gap-2 w-full justify-end pb-4">
          {user && (
            <div className="flex w-full gap-2">
              <LogoutButton />
            </div>
          )}
        </span>
      </div>
    </div>
  );
}
