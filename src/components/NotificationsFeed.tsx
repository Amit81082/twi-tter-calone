"use client";
import React, {useEffect} from 'react'
import useNotification from '@/hooks/useNotifications'
import  useCurrentUser  from '@/hooks/useCurrentUser'
import { BsTwitter } from 'react-icons/bs';
import axios from 'axios';

const NotificationsFeed = () => {

  const {data: currentUser, mutate: mutateCurrentUser} = useCurrentUser();
  const {data: fetchedNotifications = [], } = useNotification(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

   useEffect(() => {
     return () => {
       axios.post("/api/notifications/read");
     };
   }, []);



  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          className="flex flex-row items-center p-6 gap-4 border-b border-neutral-800"
        >
          <BsTwitter color="white" size={32} />
          <p className="text-white">{notification.body}</p>
        </div>
      ))}
    </div>
  );
}


export default NotificationsFeed
