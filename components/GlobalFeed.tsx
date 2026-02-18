"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPostsPage, POSTS_PER_PAGE } from "@/lib/queries/posts";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { PostCard, type PostWithTeam } from "./PostCard";
import { Spinner } from "./ui/spinner";

export default function GlobalFeed() {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["global-feed"],
      queryFn: fetchPostsPage,
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        // If the last page was full, assume there's more

        return lastPage.length === POSTS_PER_PAGE ? allPages.length : undefined;
      },
    });

  // Automatically fetch when the user scrolls to the bottom "ref"
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") return <Spinner />;
  if (status === "error")
    return (
      <p className="flex justify-center items-center w-full p-2 text-center text-xs">
        Error loading feed.
      </p>
    );

  return (
    <div className="">
      {data.pages.map((group, i) => (
        <div key={i} className="">
          {(group as unknown as PostWithTeam[]).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ))}

      {/* This div is the "trigger" for the next fetch */}
      <div ref={ref} className="">
        {isFetchingNextPage ? (
          <Spinner />
        ) : hasNextPage ? (
          ""
        ) : (
          <span className="flex justify-center items-center w-full p-2 text-center text-xs">
            No more posts!
          </span>
        )}
      </div>
    </div>
  );
}
