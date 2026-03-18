import { useEffect, useState } from "react";
import { notificationService } from "../api/NotificationApi";
import { useNotificationContext } from "../context/NotificationContext";

export function useNotification(userId?: string) {

  const {
    notifications,
    setNotifications,
    unreadCount,
    setUnreadCount
  } = useNotificationContext();

  const [loading, setLoading] = useState(false);

  
  const fetchNotifications = async () => {
    if (!userId) return;

    try {
      setLoading(true);

      const res = await notificationService.getNotifications({
        userId,
        page: 1,
        limit: 10
      });

      setNotifications(res.data);

    } finally {
      setLoading(false);
    }
  };

  
  const fetchUnreadCount = async () => {
    if (!userId) return;

    const res = await notificationService.getUnreadCount(userId);
    setUnreadCount(res.data.unreadCount);
  };

 
  const createNotification = async (data: {
    message: string;
    targetRoles: string[];
  }) => {

    const res = await notificationService.createNotification(data);

    
    alert(res.message); 

    fetchNotifications();
    fetchUnreadCount();

    return res;
  };

  
  const markAsRead = async (id: string) => {

    if (!userId) return;

    const res = await notificationService.markAsRead(id, userId);

    
    fetchNotifications();
    fetchUnreadCount();

    alert(res.message);

    return res;
  };

  
  const markAllAsRead = async () => {

    if (!userId) return;

    const res = await notificationService.markAllAsRead(userId);

    fetchNotifications();
    fetchUnreadCount();

    alert(res.message);

    return res;
  };

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, [userId]);

  return {
    notifications,
    unreadCount,
    loading,

    createNotification,
    markAsRead,
    markAllAsRead,

    refresh: fetchNotifications
  };
}