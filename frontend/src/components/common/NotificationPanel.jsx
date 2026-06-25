import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Trash2, CheckCircle2 } from 'lucide-react';
import { fetchNotifications, markNotificationRead, removeNotification } from '../../redux/thunks/notificationThunks';
import toast from 'react-hot-toast';

export default function NotificationPanel({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { notifications, loading } = useSelector(state => state.notifications);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchNotifications());
    }
  }, [isOpen, dispatch]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await dispatch(markNotificationRead(notificationId));
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      await dispatch(removeNotification(notificationId));
      toast.success('Notification deleted');
    } catch (error) {
      toast.error('Failed to delete notification');
    }
  };

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Notification Panel */}
      <div className="fixed right-0 top-0 z-50 h-screen w-full max-w-md overflow-y-auto border-l border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 border-b border-slate-200 bg-white/95 backdrop-blur-sm p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Notifications</h2>
            {unreadCount > 0 && (
              <p className="text-sm text-slate-600">{unreadCount} unread</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="divide-y divide-slate-100">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="space-y-3">
                <div className="h-4 w-32 rounded-full bg-slate-200 animate-pulse" />
                <div className="h-4 w-48 rounded-full bg-slate-200 animate-pulse" />
              </div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <X size={24} className="text-slate-400" />
              </div>
              <p className="text-slate-500">No notifications yet</p>
              <p className="text-sm text-slate-400 mt-1">
                You're all caught up!
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 transition-colors hover:bg-slate-50 ${
                  notification.isRead ? 'bg-white' : 'bg-blue-50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-950">{notification.type}</p>
                    <p className="mt-1 text-sm text-slate-600 break-words">
                      {notification.message}
                    </p>
                    <p className="mt-2 text-xs text-slate-400">
                      {new Date(notification.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!notification.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-100"
                        title="Mark as read"
                      >
                        <CheckCircle2 size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-100"
                      title="Delete notification"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
