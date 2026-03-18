import { useState } from "react";
import { useNotification } from "../../hooks/useNotification";
import { useAuth } from "../../hooks/useAuth";

import NotificationViewModal from "../../components/customComponents/NotificationModal";

export default function NotificationsPage() {

  const { user } = useAuth();
  const [page, setPage] = useState(1);

const {
  notifications,
  unreadCount,
  pagination,
  markAsRead,
  markAllAsRead,
  loading,
  refresh
} = useNotification(user?._id, { page, limit: 10 });



  const [selectedNotification, setSelectedNotification] = useState<any>(null);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <h1 className="text-xl font-semibold">
          Notifications
        </h1>

        <div className="flex items-center gap-3">

          <span className="text-sm text-gray-500">
            {unreadCount} unread
          </span>

          <button
            onClick={markAllAsRead}
            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg"
          >
            Mark All as Read
          </button>

        </div>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-xl border">

        {loading && (
          <div className="flex justify-center py-10">
            <div className="animate-spin h-8 w-8 border-b-2 border-blue-600 rounded-full"></div>
          </div>
        )}

        {!loading && notifications?.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No notifications found
          </div>
        )}

        <ul>

          {notifications?.map((notif) => {

            const isRead = false;
            //notif.readBy?.includes(user?._id);

            return (
              <li
                key={notif._id}
                onClick={() => setSelectedNotification(notif)}
                className={`cursor-pointer border-b p-4 hover:bg-gray-50 ${
                  !isRead ? "bg-blue-50" : ""
                }`}
              >

                <div className="flex justify-between items-start">

                  <div>
                    <p className="text-sm font-medium">
                      {notif.message}
                    </p>

                    <p className="text-xs text-gray-500">
                      {new Date(notif.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {!isRead && (
                    <span className="text-xs text-blue-600 font-semibold">
                      New
                    </span>
                  )}

                </div>

              </li>
            );
          })}

        </ul>

      </div>

      {/* MODAL */}
      <NotificationViewModal
        notification={selectedNotification}
        onClose={() => setSelectedNotification(null)}
        onRead={async (id) => {
          await markAsRead(id);
          refresh();
        }}
      />
      <div className="flex justify-between items-center mt-4">

  <span className="text-sm text-gray-500">
    Page {pagination?.page} of {pagination?.totalPages}
  </span>

  <div className="flex gap-2">

    <button
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Prev
    </button>

    <button
      disabled={!pagination?.hasNextPage}
      onClick={() => setPage(page + 1)}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Next
    </button>

  </div>
</div>

    </div>
    
  );
}