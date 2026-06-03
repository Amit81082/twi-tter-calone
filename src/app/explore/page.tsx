"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import useCurrentUser from "@/hooks/useCurrentUser";
import UsersFeed from "@/components/users/UsersFeed";

const ExplorePage = () => {
  const router = useRouter();
  const { data: currentUser, isLoading: currentUserLoading } = useCurrentUser();

  useEffect(() => {
    if (!currentUserLoading && !currentUser) {
      router.push("/");
    }
  }, [currentUser, currentUserLoading, router]);

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Header label="Explore Users" showBackArrow />
      <UsersFeed />
    </>
  );
};

export default ExplorePage;
