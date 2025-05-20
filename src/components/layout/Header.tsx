import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  PinIcon, 
  BellIcon, 
  MenuIcon, 
  UserIcon, 
  LogOutIcon,
  X,
  Plus,
  Home
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useOrganizationStore } from '../../stores/organizationStore';
import { useNotificationStore } from '../../stores/notificationStore';
import NotificationDropdown from './NotificationDropdown';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { organizations, currentOrganization, setCurrentOrganization } = useOrganizationStore();
  const { getUnreadCount } = useNotificationStore();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  
  const [unreadCount, setUnreadCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setUnreadCount(getUnreadCount());
    
    // Check scroll position to change header appearance
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [getUnreadCount]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const switchOrganization = (id: string) => {
    setCurrentOrganization(id);
    setOrgDropdownOpen(false);
    navigate(`/organization/${id}`);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center">
            <PinIcon className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">PinIt</span>
          </Link>

          {/* Current Organization (Desktop) */}
          <div className="hidden md:flex items-center">
            {currentOrganization && (
              <div 
                className="relative"
                onMouseEnter={() => setOrgDropdownOpen(true)}
                onMouseLeave={() => setOrgDropdownOpen(false)}
              >
                <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                  {currentOrganization.logo && (
                    <img 
                      src={currentOrganization.logo} 
                      alt={currentOrganization.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  )}
                  <span>{currentOrganization.name}</span>
                </button>
                
                {orgDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 overflow-hidden">
                    <div className="py-1">
                      {organizations.map(org => (
                        <button
                          key={org.id}
                          onClick={() => switchOrganization(org.id)}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            org.id === currentOrganization.id 
                              ? 'bg-primary-50 text-primary-700' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center">
                            {org.logo ? (
                              <img 
                                src={org.logo} 
                                alt={org.name}
                                className="w-5 h-5 rounded-full object-cover mr-2"
                              />
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center mr-2">
                                {org.name.charAt(0)}
                              </div>
                            )}
                            {org.name}
                          </div>
                        </button>
                      ))}
                      <Link
                        to="/create-organization"
                        className="block w-full text-left px-4 py-2 text-sm text-primary-600 hover:bg-gray-100 font-medium"
                      >
                        <div className="flex items-center">
                          <Plus className="w-4 h-4 mr-2" />
                          Create new organization
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/dashboard" className="p-2 text-gray-700 hover:text-primary-600">
              <Home className="h-5 w-5" />
            </Link>
            
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
                className="p-2 text-gray-700 hover:text-primary-600 relative"
              >
                <BellIcon className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              
              {notificationDropdownOpen && (
                <NotificationDropdown 
                  onClose={() => setNotificationDropdownOpen(false)}
                />
              )}
            </div>
            
            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2"
              >
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                    {user?.name.charAt(0)}
                  </div>
                )}
              </button>
              
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 overflow-hidden">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <UserIcon className="w-4 h-4 mr-2" />
                        Profile
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <LogOutIcon className="w-4 h-4 mr-2" />
                        Logout
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg py-4 px-6">
          <div className="space-y-3">
            {currentOrganization && (
              <div className="pb-3 border-b">
                <p className="text-xs text-gray-500 mb-2">Current Organization</p>
                <div className="flex items-center space-x-2">
                  {currentOrganization.logo && (
                    <img 
                      src={currentOrganization.logo} 
                      alt={currentOrganization.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  )}
                  <span className="font-medium">{currentOrganization.name}</span>
                </div>
              </div>
            )}
            
            <div className="pb-3 border-b">
              <p className="text-xs text-gray-500 mb-2">Organizations</p>
              <div className="space-y-2">
                {organizations.map(org => (
                  <button
                    key={org.id}
                    onClick={() => {
                      switchOrganization(org.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-2 w-full text-left py-1 px-2 rounded ${
                      org.id === currentOrganization?.id 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-gray-700'
                    }`}
                  >
                    {org.logo ? (
                      <img 
                        src={org.logo} 
                        alt={org.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                        {org.name.charAt(0)}
                      </div>
                    )}
                    <span>{org.name}</span>
                  </button>
                ))}
                <Link
                  to="/create-organization"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 w-full text-left py-1 px-2 rounded text-primary-600"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create new organization</span>
                </Link>
              </div>
            </div>
            
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 py-2 text-gray-700"
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 py-2 text-gray-700"
            >
              <UserIcon className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 py-2 text-red-600 w-full text-left"
            >
              <LogOutIcon className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;