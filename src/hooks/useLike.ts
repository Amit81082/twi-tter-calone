// src/hooks/useLike.ts

import { useMemo, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import useCurrentUser from "@/hooks/useCurrentUser";
import usePost from "@/hooks/usePost";
import usePosts from "@/hooks/usePosts";
import useLoginModal from "@/hooks/useLoginModal";

const useLike = (postId: string) => {
  const loginModal = useLoginModal();

  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();

  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateAllPosts } = usePosts();

  const hasLiked = useMemo(() => {
    const likedIds = fetchedPost?.likedIds || [];

    return likedIds.includes(currentUser?.id);
  }, [fetchedPost?.likedIds, currentUser?.id]);

  const toggleLike = useCallback(async () => {
    try {
      if (!currentUser) {
        loginModal.onOpen();
        return;
      }

      if (hasLiked) {
        await axios.delete("/api/like", {
          data: {
            postId,
          },
        });
        toast.success("Unliked");
      } else {
        await axios.post("/api/like", {
          postId,
        });
        toast.success("Liked");
      }
     await mutateFetchedPost();
     await mutateAllPosts();
      await mutateCurrentUser();
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    }
  }, [
    currentUser,
    hasLiked,
    postId,
    loginModal,
    mutateFetchedPost,
    mutateCurrentUser,
    mutateAllPosts,
  ]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
