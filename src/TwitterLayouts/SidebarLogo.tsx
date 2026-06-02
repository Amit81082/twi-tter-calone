"use client";
import React from "react";
import { BsTwitter } from "react-icons/bs";
import { useRouter } from "next/navigation";

const SidebarLogo = () => {
  const router = useRouter();

  return (
    <div
      className="rounded-full h-12 w-12 flex items-center justify-center hover:bg-sky-600/10  cursor-pointer transition"
      onClick={() => router.push("/")}
    >
      <BsTwitter size={28} color="white" />
    </div>
  );
};

export default SidebarLogo;
