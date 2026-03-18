import { createContext, useContext, useState } from "react";
import { Notification ,Pagination} from "../types/NotificationType";

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
pagination: Pagination | null;
  setNotifications: (data: Notification[]) => void;
  setUnreadCount: (count: number) => void;
  setPagination: (pagination: Pagination | null) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: any) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  return (
    <NotificationContext.Provider
      value={{
        pagination,
        notifications,
        unreadCount,
        setNotifications,
        setUnreadCount,
        setPagination
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