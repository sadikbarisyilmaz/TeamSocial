import Link from "next/link";
import { Button } from "./ui/button";
import { CreatePostForm } from "./forms/CreatePostForm";
import { getAuth } from "@/lib/getAuth";

export async function NewPostButton() {
  const { isLoggedIn, teamId } = await getAuth();

  return (
    <div className="w-full">
      {/* If guest: Show Login. If logged in but no team: Show "Finish Setup"  */}
      {!isLoggedIn && (
        <Button asChild className="w-full flex">
          <Link className="w-full" href="/auth/login">
            Sign in
          </Link>
        </Button>
      )}
      {isLoggedIn && !teamId && (
        <Button asChild className="w-full flex">
          <Link href="/onboarding">Complete Team Setup</Link>
        </Button>
      )}
      {isLoggedIn && teamId && <CreatePostForm />}
    </div>
  );
}
