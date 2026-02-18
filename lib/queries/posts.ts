import { createClient } from "../supabase/client";
export const POSTS_PER_PAGE = 6;

export const fetchPostsPage = async ({ pageParam = 0 }) => {
  const supabase = createClient();

  const from = pageParam * POSTS_PER_PAGE;
  const to = from + POSTS_PER_PAGE - 1;

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id, 
      content, 
      created_at, 
      teams (id, name)
    `,
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return data;
};
