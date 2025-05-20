import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Check, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useNotificationStore } from '../../stores/notificationStore';

interface NotificationDropdownProps {
  onClose: () => void;
}

const NotificationDropdown = ({ onClose }: NotificationDropdownProps) => {
  const { 
    getUserNotifications, 
    markAsRead, 
    markAllAsRead,
    deleteNotification 
  } = useNotificationStore();
  
  const notifications = getUserNotifications();

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.notification-dropdown')) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (notifications.length === 0) {
    return (
      <div className="notification-dropdown absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 overflow-hidden max-h-96">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Notifications</h3>
          </div>
        </div>
        <div className="p-4 text-center text-gray-500">
          <Bell className="h-12 w-12 mx-auto text-gray-300 mb-2" />
          <p>No notifications yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notification-dropdown absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 overflow-hidden max-h-96">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Notifications</h3>
          <button 
            onClick={markAllAsRead}
            className="text-xs text-primary-600 hover:text-primary-800"
          >
            Mark all as read
          </button>
        </div>
      </div>
      
      <div className="overflow-y-auto max-h-72">
        {notifications.map(notification => (
          <div 
            key={notification.id} 
            className={`p-4 border-b hover:bg-gray-50 transition-colors ${
              notification.read ? 'bg-white' : 'bg-blue-50'
            }`}
          >
            <div className="flex justify-between">
              <div className="flex-1">
                <p className="font-medium text-sm">{notification.title}</p>
                <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                <p className="text-gray-400 text-xs mt-2">
                  {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                </p>
              </div>
              <div className="flex ml-2 space-x-1">
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="p-1 text-gray-400 hover:text-primary-600 rounded"
                    title="Mark as read"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="p-1 text-gray-400 hover:text-red-600 rounded"
                  title="Delete notification"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {notification.link && (
              <Link
                to={notification.link}
                onClick={() => {
                  markAsRead(notification.id);
                  onClose();
                }}
                className="mt-2 text-xs text-primary-600 hover:text-primary-800 block"
              >
                View details →
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationDropdown;