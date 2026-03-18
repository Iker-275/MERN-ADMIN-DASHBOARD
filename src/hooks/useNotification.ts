
import { useEffect, useState } from "react";
import { notificationService } from "../api/NotificationApi";
import { useNotificationContext } from "../context/NotificationContext";

interface Options {
  page?: number;
  limit?: number;
}

export function useNotification(userId?: string, options?: Options) {

  const {
    notifications,
    setNotifications,
    unreadCount,
    setUnreadCount,
    pagination,
    setPagination
  } = useNotificationContext();

  const [loading, setLoading] = useState(false);

  const page = options?.page || 1;
  const limit = options?.limit || 10;

  // 📥 FETCH NOTIFICATIONS
  const fetchNotifications = async () => {
    if (!userId) return;

    try {
      setLoading(true);

      const res = await notificationService.getNotifications({
        userId,
        page,
        limit
      });

      setNotifications(res.data);
      setPagination(res.pagination); // ✅ IMPORTANT

    } finally {
      setLoading(false);
    }
  };

  // 🔢 UNREAD COUNT
  const fetchUnreadCount = async () => {
    if (!userId) return;

    const res = await notificationService.getUnreadCount(userId);
    setUnreadCount(res.data.unreadCount);
  };

  // ➕ CREATE
  const createNotification = async (data: {
    message: string;
    targetRoles: string[];
  }) => {

    const res = await notificationService.createNotification(data);

    fetchNotifications();
    fetchUnreadCount();

    return res;
  };

  // ✅ MARK ONE
  const markAsRead = async (id: string) => {
    if (!userId) return;

    const res = await notificationService.markAsRead(id, userId);

    fetchNotifications();
    fetchUnreadCount();

    return res;
  };

  // ✅ MARK ALL
  const markAllAsRead = async () => {
    if (!userId) return;

    const res = await notificationService.markAllAsRead(userId);

    fetchNotifications();
    fetchUnreadCount();

    return res;
  };

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, [userId, page]); // ✅ page dependency

  return {
    notifications,
    unreadCount,
    pagination,
    loading,

    createNotification,
    markAsRead,
    markAllAsRead,

    refresh: fetchNotifications
  };
}