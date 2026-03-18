export type NotificationType =
   "ADMIN_NOTIFICATION"
   ;

export interface Notification {
  _id: string;
  type: NotificationType;
  message: string;

  targetRoles?: string[];
  targetUsers?: string[];

  readBy?: string[];

  createdAt: string;
  updatedAt: string;
}

export interface NotificationResponse {
  success: boolean;
  message: string;
  data: Notification | Notification[] | any;
  pagination?: Pagination | null;
}

export interface NotificationFilters {
  userId: string;
  page?: number;
  limit?: number;
}

export interface UnreadCount {
  unreadCount: number;
}
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
}