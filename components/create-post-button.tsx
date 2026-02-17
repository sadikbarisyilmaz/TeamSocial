import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export async function CreatePostButton() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  let teamId = null;
  // Checks if user belogs to a team
  if (user) {
    const { data } = await supabase.from("profiles").select("team_id").single();
    teamId = data?.team_id;
  }
  return (
    <div className="w-full">
      {/* If guest: Show Login. If logged in but no team: Show "Finish Setup"  */}
      {!user && (
        <Button asChild className="w-full flex">
          <Link className="w-full" href="/auth/login">
            Sign in
          </Link>
        </Button>
      )}
      {user && !teamId && (
        <Button asChild className="w-full flex">
          <Link href="/onboarding">Complete Team Setup</Link>
        </Button>
      )}
      {user && teamId && <Button className="w-full">Create Post</Button>}
    </div>
  );
}
