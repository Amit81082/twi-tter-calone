"use client";

import { useRouter } from "next/navigation";
import PostItem from "@/components/posts/PostItem";
import Header from "@/components/Header";
import { ClipLoader } from "react-spinners";
import { useParams } from "next/navigation";
import PostModal from "@/components/PostModal";
import usePost from "@/hooks/usePost";
import CommentFeed from "@/components/posts/CommentFeed";

const PostView = () => {
  const router = useRouter();
  const { postId } = useParams();
  // console.log("postId =", postId);

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }
  return (
    <>
      <Header showBackArrow label="Tweet" />
      <PostItem userId={fetchedPost?.authorId} data={fetchedPost} />
      <PostModal
        placeholder="Create your reply"
        isComment
        postId={postId as string}
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
};

export default PostView;
