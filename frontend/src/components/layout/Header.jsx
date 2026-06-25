import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, X, LogOut, User, Bell, Sparkles, Plus, LayoutDashboard } from 'lucide-react';
import { logoutUser } from '../../redux/thunks/authThunks';
import { fetchNotifications } from '../../redux/thunks/notificationThunks';
import NotificationPanel from '../common/NotificationPanel';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { notifications } = useSelector(state => state.notifications);

  useEffect(() => {
    // Fetch notifications on component mount
    dispatch(fetchNotifications());
    
    // Refresh notifications every 30 seconds
    const interval = setInterval(() => {
      dispatch(fetchNotifications());
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/75 backdrop-blur-xl">
        <nav className="container mx-auto flex items-center justify-between px-4 py-4">
          <div
            className="group flex cursor-pointer items-center gap-3"
            onClick={() => navigate('/dashboard')}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 transition-transform duration-300 group-hover:scale-105">
              <Sparkles size={18} />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-950">PinIt</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => navigate('/create-organization')}
              className="btn btn-primary"
            >
              <Plus size={18} />
              New Organization
            </button>
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
              title="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-[10px] font-bold text-white shadow">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
                {(user?.name || 'User').slice(0, 1).toUpperCase()}
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-slate-950">{user?.name || 'User'}</p>
                <p className="text-xs text-slate-500">Team member</p>
              </div>
              <button
                onClick={() => navigate('/profile')}
                className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                title="Profile"
              >
                <User size={18} />
              </button>
              <button
                onClick={handleLogout}
                className="rounded-xl border border-slate-200 p-2 text-red-600 transition hover:border-red-200 hover:bg-red-50"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-xl border border-slate-200 bg-white/90 p-2 text-slate-700 shadow-sm md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t border-white/60 bg-white/90 backdrop-blur-xl md:hidden">
            <div className="container mx-auto flex flex-col gap-3 px-4 py-4">
              <button
                onClick={() => {
                  navigate('/create-organization');
                  setIsOpen(false);
                }}
                className="btn btn-primary justify-start"
              >
                <Plus size={18} />
                New Organization
              </button>
              <button
                onClick={() => {
                  setIsNotificationsOpen(true);
                  setIsOpen(false);
                }}
                className="btn btn-secondary justify-start relative"
              >
                <Bell size={18} />
                Notifications
                {unreadCount > 0 && (
                  <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-[10px] font-bold text-white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  navigate('/profile');
                  setIsOpen(false);
                }}
                className="btn btn-secondary justify-start"
              >
                <LayoutDashboard size={18} />
                Profile
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="btn justify-start border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Notification Panel */}
      <NotificationPanel isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
    </>
  );
}
