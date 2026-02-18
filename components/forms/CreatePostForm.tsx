"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { createPost } from "@/app/actions/posts";
import { Textarea } from "../ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const CreatePostForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  const queryClient = useQueryClient();

  // Define the Mutation
  const mutation = useMutation({
    mutationFn: async (postContent: string) => {
      const formData = new FormData();
      formData.append("content", postContent);
      const result = await createPost(formData);

      if (result?.error) throw new Error(result.error);
      return result;
    },
    onSuccess: () => {
      // Clear cache and reset UI
      queryClient.invalidateQueries({ queryKey: ["global-feed"] });
      setOpen(false);
      setContent("");
      setError(null);
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    mutation.mutate(content);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) setError(null); // Clear errors when closing
      }}
    >
      <DialogTrigger asChild>
        <Button className="w-full flex mt-4">New Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create a new post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <div className="grid gap-4 py-4">
            <Textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              required
              disabled={mutation.isPending}
            />
          </div>
          {error && <p className="text-sm text-red-500 -mt-2 mb-4">{error}</p>}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Posting..." : "Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
