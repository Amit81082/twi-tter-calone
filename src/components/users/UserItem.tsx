"use client";

import React from "react";
import Avatar from "../Avatar";
import Button from "../Button";
import useFollow from "@/hooks/useFollow";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

interface UserItemProps {
  userId: string;
  name?: string;
  username?: string;
  bio?: string;
  profileImage?: string;
}

const UserItem: React.FC<UserItemProps> = ({
  userId,
  name,
  username,
  bio,
  profileImage,
}) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const { isFollowing, toggleFollow } = useFollow(userId);

  const handleUserClick = () => {
    router.push(`/users/${userId}`);
  };

  // Don't show current user
  if (currentUser?.id === userId) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between gap-4 p-4 border-b border-neutral-800 hover:bg-neutral-900/50 cursor-pointer transition">
      <div
        className="flex flex-row items-center gap-4 flex-1"
        onClick={handleUserClick}
      >
        <Avatar userId={userId} profileImage={profileImage} />
        <div className="flex flex-col gap-1">
          <p className="text-white font-semibold text-sm">{name}</p>
          <p className="text-neutral-400 text-sm">@{username}</p>
          {bio && (
            <p className="text-neutral-400 text-sm line-clamp-2">{bio}</p>
          )}
        </div>
      </div>
      <Button
        label={isFollowing ? "Unfollow" : "Follow"}
        onClick={(e) => {
          e.stopPropagation();
          toggleFollow();
        }}
        secondary={!isFollowing}
        outline={isFollowing}
      />
    </div>
  );
};

export default UserItem;
