import { createContext, useContext, useState } from "react";
import { Notification } from "../types/NotificationType";

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;

  setNotifications: (data: Notification[]) => void;
  setUnreadCount: (count: number) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: any) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        setNotifications,
        setUnreadCount
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotificationContext = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("NotificationContext not found");
  return ctx;
};