"use client";

import React, { useCallback, useState } from "react";
import useLoginModal from "@/hooks/useLoginModal";
import UseRegisterModal from "@/hooks/useRegisterModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../Button";
import Avatar from "../Avatar";
import usePost from "@/hooks/usePost";

interface PostModalProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const PostModal: React.FC<PostModalProps> = ({
  placeholder,
  isComment,
  postId,
}) => {
  const registerModal = UseRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutateFetchedPost } = usePost(postId as string);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url =
        isComment && postId ? `/api/comments?postId=${postId}` : "/api/posts";

      const res = await axios.post(url, { body });

      const newPost = res.data;
      toast.success("Tweet created");

      setBody("");

      // ✅ INSTANT UPDATE (IMPORTANT)
      mutatePosts((prev: any[] = []) => [newPost, ...prev], false);
      mutateFetchedPost();
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.error ||
            error.message ||
            "Something went wrong",
        );
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  }, [body, isComment, postId, mutatePosts, mutateFetchedPost]);
  return (
    <div className="py-2 px-5 border-b border-neutral-800">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className="disabled:opacity-80 disabled:cursor-not-allowed peer resize-none mt-3 w-full bg-black text-white focus:outline-none"
              placeholder={placeholder}
            ></textarea>
            <hr className="opacity-0 peer-focus:opacity-100 h-px w-full border-neutral-800 transition" />
            <div className="mt-4 flex flex-row justify-end">
              <Button disabled={isLoading} label="Tweet" onClick={onSubmit} />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">
            Welcome to My Twi-tter
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostModal;
