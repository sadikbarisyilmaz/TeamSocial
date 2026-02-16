import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export async function CreatePostButton() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  return user ? (
    <div className="w-full">
      <Button className="w-full">Create Post</Button>
    </div>
  ) : (
    <div className="w-full">
      <Button asChild className="w-full flex">
        <Link className="w-full" href="/auth/login">
          Sign in
        </Link>
      </Button>
    </div>
  );
  //   return <Button className="w-full">Create Post</Button>;
}
