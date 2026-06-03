"use client";

import React from "react";
import useUsers from "@/hooks/useUsers";
import UserItem from "./UserItem";
import { ClipLoader } from "react-spinners";

const UsersFeed = () => {
  const { data: users = [], isLoading, error } = useUsers();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        Failed to load users
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No users available
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {users.map((user: Record<string, any>) => (
        <UserItem
          key={user.id}
          userId={user.id}
          name={user.name}
          username={user.username}
          bio={user.bio}
          profileImage={user.profileImage}
        />
      ))}
    </div>
  );
};

export default UsersFeed;
