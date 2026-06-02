// src/app/notifications/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

import useCurrentUser from "@/hooks/useCurrentUser";
import NotificationsFeed from "@/components/NotificationsFeed";

const NotificationsPage = () => {
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
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
    </>
  );
};

export default NotificationsPage;
