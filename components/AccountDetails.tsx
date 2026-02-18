import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "./ui/card";
import { getAuth } from "@/lib/getAuth";
import { Separator } from "./ui/separator";

export async function AccountDetails() {
  const { teamId, isLoggedIn, email } = await getAuth();

  // if no user is logged in
  if (!isLoggedIn) {
    redirect("/auth/login");
  }
  // if user doesn't belong to a team
  if (!teamId) {
    redirect("/onboarding");
  }

  return (
    <Card className="m-4">
      <CardHeader>
        <h2 className="text-xl">Here are your account details</h2>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4 pt-6">
        <p className="text-sm">
          <span className="font-bold"> Email:</span> {email}
        </p>
      </CardContent>
    </Card>
  );
}
