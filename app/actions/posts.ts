// src/app/actions/posts.ts
"use server";

import { getAuth } from "@/lib/getAuth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const { userId, teamId } = await getAuth();
  if (!userId) {
    return { error: "Not authenticated", success: false };
  }

  if (!teamId) {
    return { error: "You must belong to a team to post.", success: false };
  }

  // Extract and Validate Content
  const content = formData.get("content") as string;
  if (!content || content.length < 3) {
    return { error: "Post content is too short." };
  }

  // Insert Post (Scoped to Team)
  const supabase = await createClient();
  const { error: postError } = await supabase.from("posts").insert({
    content,
    team_id: teamId,
    // created_at is handled by DB default now()
  });

  if (postError) return { error: postError.message };

  // Refresh the feed and return
  revalidatePath("/");
  return { success: true };
}
