import Link from "next/link";
import { Button } from "./ui/button";
import { LogoutButton } from "./LogoutButton";
import { getAuth } from "@/lib/getAuth";

export async function AuthButton() {
  const { userId, teamId, isLoggedIn, email } = await getAuth();

  return isLoggedIn ? (
    <div className="flex items-center gap-4">
      Hey, {email}!
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
