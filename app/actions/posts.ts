"use server";

import { getAuth } from "@/lib/getAuth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createPost(
  formData: FormData,
): Promise<{ success: boolean; error: string | null }> {
  try {
    const { userId, teamId } = await getAuth();
    if (!userId) {
      throw new Error("Not authenticated");
    }

    if (!teamId) {
      throw new Error("You must belong to a team to post.");
    }

    // Extract and Validate Content
    const content = (formData.get("content") as string)?.trim();
    if (!content || content.length < 3) {
      throw new Error("Post content must be at least 3 characters.");
    }

    // Insert Post (Scoped to Team)
    const supabase = await createClient();
    const { error: postError } = await supabase.from("posts").insert({
      content,
      team_id: teamId,
      // created_at is handled by DB default now()
    });

    if (postError) throw postError;

    // Refresh the feed and return
    revalidatePath("/");
    return { success: true, error: null };
  } catch (e) {
    const error = e as Error;
    console.error(`createPost Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}
