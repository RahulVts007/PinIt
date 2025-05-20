import { useState, FormEvent } from 'react';
import { User, Settings } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const UserProfile = () => {
  const { user, updateProfile } = useAuthStore();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    updateProfile({
      name,
      email,
      avatar
    });
    
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto fade-in">
      <div className="flex items-center mb-8">
        <User className="h-6 w-6 text-primary-600 mr-2" />
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6">
          {!isEditing ? (
            <div>
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-20 h-20 rounded-full object-cover mr-6"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-2xl font-bold mr-6">
                      {user?.name.charAt(0)}
                    </div>
                  )}
                  
                  <div>
                    <h2 className="text-2xl font-bold">{user?.name}</h2>
                    <p className="text-gray-600">{user?.email}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      Member since {new Date(user?.createdAt || '').toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-secondary flex items-center"
                >
                  <Settings className="h-4 w-4 mr-1" />
                  Edit Profile
                </button>
              </div>
              
              <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-semibold mb-4">Account Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 className="text-xl font-semibold mb-6">Edit Profile</h3>
              
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  required
                />
              </div>
              
              <div className="mb-8">
                <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
                  Avatar URL (optional)
                </label>
                <input
                  id="avatar"
                  type="url"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="input"
                  placeholder="Enter avatar URL"
                />
                
                {avatar && (
                  <div className="mt-3 flex items-center">
                    <p className="text-xs text-gray-700 mr-2">Preview:</p>
                    <img 
                      src={avatar} 
                      alt="Avatar preview"
                      className="w-10 h-10 object-cover rounded-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=!';
                      }}
                    />
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;