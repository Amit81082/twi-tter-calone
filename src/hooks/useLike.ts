// src/hooks/useLike.ts

import { useMemo, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import useCurrentUser from "@/hooks/useCurrentUser";
import usePost from "@/hooks/usePost";
import usePosts from "@/hooks/usePosts";
import useLoginModal from "@/hooks/useLoginModal";
import useNotification from "./useNotifications";

const useLike = (postId: string) => {
  const loginModal = useLoginModal();

  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();

  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateAllPosts } = usePosts();
  const { mutate: mutateNotifications } = useNotification(currentUser?.id);


  const hasLiked = useMemo(() => {
    const likedIds = fetchedPost?.likedIds || [];

    return likedIds.includes(currentUser?.id);
  }, [fetchedPost?.likedIds, currentUser?.id]);

  const likeCount = useMemo(() => {
    return fetchedPost?.likedIds?.length || 0;
  }, [fetchedPost?.likedIds]);

  const toggleLike = useCallback(async () => {
    if (!currentUser || !fetchedPost) {
      loginModal.onOpen();
      return;
    }

    const oldLikedIds = fetchedPost.likedIds || [];

    const updatedLikedIds = hasLiked
      ? oldLikedIds.filter((id: string) => id !== currentUser.id)
      : [...oldLikedIds, currentUser.id];

    // 🚀 Optimistic Update
    mutateFetchedPost(
      {
        ...fetchedPost,
        likedIds: updatedLikedIds,
      },
      false,
    );


    mutateAllPosts(
      (posts: any[] = []) =>
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likedIds: updatedLikedIds,
              }
            : post,
        ),
      false,
    );

    try {
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

      // Background Sync
      mutateFetchedPost();
      mutateAllPosts();
      mutateNotifications();
    } catch (error: any) {
      // Rollback
      mutateFetchedPost();

      toast.error(error?.response?.data?.error || "Something went wrong");
    }
  }, [
    currentUser,
    fetchedPost,
    hasLiked,
    postId,
    loginModal,
    mutateFetchedPost,
    mutateAllPosts,
  ]);

  return {
    hasLiked,
    toggleLike,
    likeCount,
  };
};

export default useLike;
