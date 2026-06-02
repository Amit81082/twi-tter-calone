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
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [currentUser, userId]);

  const toggleFollow = useCallback(async () => {
    try {
      if (!currentUser) {
        loginModal.onOpen();
        return;
      }

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

      mutateCurrentUser();
      mutateFetchedUser();
    } catch (error: any) {
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
