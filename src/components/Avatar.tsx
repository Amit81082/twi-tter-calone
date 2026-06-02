"use client";

import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface AvatarProps {
  userId?: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const { data: fetchedUser } = useUser(userId);
  const router = useRouter();
  const onClick = useCallback(() => {
    const url = `/users/${userId}`;
    router.push(url);
  }, [router, userId]);

  const src = fetchedUser?.profileImage || "/images/placeholder.jpg";

  return (
    <div
      className={`
        ${hasBorder ? "border-4 border-black" : ""}
        ${isLarge ? "h-32" : "h-12"}
        ${isLarge ? "w-32" : "w-12"}
        rounded-full hover:opacity-90 transition cursor-pointer relative
      `}
    >
      <Image
        fill
        className="rounded-full object-cover"
        alt="Avatar"
        onClick={onClick}
        sizes={isLarge ? "128px" : "48px"}
        src={fetchedUser?.profileImage || "/images/placeholder.jpg"}
        priority
      />
    </div>
  );
};

export default Avatar;
