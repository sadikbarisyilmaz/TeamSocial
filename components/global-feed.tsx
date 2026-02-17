// src/components/posts/GlobalFeed.tsx

import { createClient } from "@/lib/supabase/server";
import { PostCard, type PostWithTeam } from "./post-card";

export default async function GlobalFeed() {
  const supabase = await createClient();

  // Fetch posts with team details
  // Note: 'teams!inner' ensures we only get posts that have a valid team
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      content,
      created_at,
      teams (
        id,
        name
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    return <p className="text-red-500">Error loading feed: {error.message}</p>;
  }

  if (!posts || posts.length === 0) {
    return (
      <p className="text-gray-500 text-center py-10">
        No posts yet. Be the first to share something!
      </p>
    );
  }

  return (
    <div className="">
      {(posts as unknown as PostWithTeam[]).map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
