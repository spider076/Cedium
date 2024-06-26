"use client";

import { useGetBlog } from "@/hooks/queries";
import { cn, formatDate } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import BookmarkBtn from "../buttons/BookmarkBtn";
import { Skeleton } from "./skeleton";
import { useQuery } from "@tanstack/react-query";

const getBlog = async (blogId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APPURL}/api/blogs/${blogId}`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const BlogMiniBox = ({ className, id }: { className?: string; id: number }) => {
  const blogId = Number(id);
  const {
    data: blog,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: async () => await getBlog(blogId)
  });

  console.log("blogid : ", blog);

  if (!id || typeof id == "undefined") {
    return;
  }

  if (isLoading) {
    return (
      <div className="flex space-x-2">
        <Skeleton className="bg-gray-400 flex-1 w-full h-[20px] rounded-full" />
        <Skeleton className="bg-gray-400 w-full flex-[0.3] h-[20px] rounded-full" />
      </div>
    );
  }

  const comments = blog?.comments && blog?.comments.length;
  const bookmarks = blog?.bookmarks;

  return (
    <div
      className={cn("flex space-x-4 items-center justify-between", className)}
    >
      <div className="flex space-x-4 items-center">
        <p className="max-md:text-[0.9rem]">{formatDate(blog?.updatedAt)}</p>
        <p className="flex items-center">
          <MessageCircle className="mr-1" size={18} />
          {comments}
        </p>
      </div>
      <div className="flex space-x-1 items-center">
        <BookmarkBtn id={blogId} bookmarks={blog?.bookmarks} />
        <p className="text-gray-600 text-[0.8rem]">{bookmarks?.length}</p>
      </div>
    </div>
  );
};

export default BlogMiniBox;
