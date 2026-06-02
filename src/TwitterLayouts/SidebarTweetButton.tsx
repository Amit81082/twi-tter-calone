import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { FaFeather } from "react-icons/fa";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

const SidebarTweetButton = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const loginModal = useLoginModal();

  const onClick = useCallback(() => {
    if (currentUser) {
      router.push("/");
    }else{
      loginModal.onOpen();
    }
  }, [loginModal, router, currentUser]);

  return (
    <div onClick={onClick}>
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 flex items-center justify-center bg-sky-500 hover:bg-sky-600 transition cursor-pointer">
        <FaFeather size={24} color="white" />
      </div>

      <div className="mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover:bg-sky-500/90 transition cursor-pointer">
        <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
