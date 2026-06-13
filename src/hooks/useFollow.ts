// src/hooks/useFollow.ts

import { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useLoginModal from "@/hooks/useLoginModal";

const useFollow = (userId: string) => {
  const loginModal = useLoginModal();

  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();

  const { data: fetchedUser, mutate: mutateFetchedUser } = useUser(userId);

 const isFollowing = useMemo(() => {
   return currentUser?.followingIds?.includes(userId) || false;
 }, [currentUser?.followingIds, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }

    const oldFollowingIds = currentUser.followingIds || [];

    const updatedFollowingIds = isFollowing
      ? oldFollowingIds.filter((id: string) => id !== userId)
      : [...oldFollowingIds, userId];

    // 🚀 Optimistic update
    mutateCurrentUser(
      {
        ...currentUser,
        followingIds: updatedFollowingIds,
      },
      false,
    );

    try {
      if (isFollowing) {
        await axios.delete("/api/follow", {
          data: {
            userId,
          },
        });

        toast.success("Unfollowed");
      } else {
        await axios.post("/api/follow", {
          userId,
        });

        toast.success("Followed");
      }

      // ✅ sync with server
      mutateCurrentUser();
      mutateFetchedUser();
    } catch (error: any) {
      // ❌ rollback if request fails
      mutateCurrentUser();

      toast.error(error?.response?.data?.error || "Something went wrong");
    }
  }, [
    currentUser,
    isFollowing,
    userId,
    loginModal,
    mutateCurrentUser,
    mutateFetchedUser,
  ]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
