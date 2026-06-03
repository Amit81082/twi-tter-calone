"use client";

import React from "react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FaUser, FaUsers } from "react-icons/fa";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";

const Sidebar = () => {
  const { data: currentUser, isLoading } = useCurrentUser();
  const items = [
    {
      label: "Home",
      href: "/",
      icons: BsHouseFill,
    },
    {
      label: "Explore",
      href: "/explore",
      icons: FaUsers,
      auth: true,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icons: BsBellFill,
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icons: FaUser,
      auth: true,
    },
  ];
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-57.5">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icons}
              auth={item.auth}
              alert={item.alert}
            />
          ))}
          {!isLoading && currentUser && (
            <SidebarItem
              onClick={() => signOut()}
              icon={BiLogOut}
              label="Logout"
              auth={true}
            />
          )}

          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
