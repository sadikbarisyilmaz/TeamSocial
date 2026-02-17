// src/app/actions/posts.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const supabase = await createClient();

  // 1. Auth Check
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // 2. Get the User's Team
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("team_id")
    .eq("id", user.id)
    .single();

  if (profileError || !profile?.team_id) {
    throw new Error("You must belong to a team to post.");
  }

  // 3. Extract and Validate Content
  const content = formData.get("content") as string;
  if (!content || content.length < 3) {
    return { error: "Post content is too short." };
  }

  // 4. Insert Post (Scoped to Team)
  const { error: postError } = await supabase.from("posts").insert({
    content,
    team_id: profile.team_id,
    // created_at is handled by DB default now()
  });

  if (postError) return { error: postError.message };

  // 5. Refresh the feed and return
  revalidatePath("/");
  return { success: true };
}
