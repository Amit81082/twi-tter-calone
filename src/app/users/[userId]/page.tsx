"use client";

import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import useUser from "@/hooks/useUser";
import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";

const UserView = () => {
  const { userId } = useParams();
  const { data: fetchedUser, isLoading } = useUser(userId as string);
  if (!isLoading && !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }
  return (
    <>
      <Header label={`${fetchedUser?.name}`} showBackArrow />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  );
};

export default UserView;
