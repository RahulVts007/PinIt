import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, ArrowLeft, Sparkles, Lock, Eye, EyeOff } from 'lucide-react';
import { changePassword } from '../redux/thunks/authThunks';
import toast from 'react-hot-toast';

export default function UserProfile() {
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitPasswordChange = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error('All fields are required');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const result = await dispatch(changePassword(
        passwordForm.currentPassword,
        passwordForm.newPassword,
        passwordForm.confirmPassword
      ));

      if (result.success) {
        toast.success(result.message);
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setShowPasswordForm(false);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="surface-card p-6 md:p-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="section-eyebrow mb-4 w-fit">
          <Sparkles size={14} />
          Personal workspace
        </div>
        <h1 className="text-4xl font-black tracking-tight text-slate-950 mb-2">Profile</h1>
      </div>

      <div className="surface-card p-6 md:p-8">
        <div className="mb-8 flex items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/25">
            <User size={48} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-950">{user?.name}</h2>
            <p className="text-slate-600">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4 border-t border-slate-200 pt-8">
          <div className="flex items-center gap-4">
            <Mail className="text-slate-400" size={20} />
            <div>
              <p className="text-sm text-slate-600">Email</p>
              <p className="font-semibold text-slate-950">{user?.email}</p>
            </div>
          </div>

          {user?.createdAt && (
            <div className="flex items-center gap-4">
              <Calendar className="text-slate-400" size={20} />
              <div>
                <p className="text-sm text-slate-600">Member Since</p>
                <p className="font-semibold text-slate-950">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8">
          {showPasswordForm ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-950 mb-4">Change Password</h3>
                <form onSubmit={handleSubmitPasswordChange} className="space-y-4">
                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.current ? 'text' : 'password'}
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter your current password"
                        className="w-full rounded-lg border border-slate-200 px-4 py-2 pr-10 text-slate-950 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900"
                      >
                        {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.new ? 'text' : 'password'}
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter new password (min. 6 characters)"
                        className="w-full rounded-lg border border-slate-200 px-4 py-2 pr-10 text-slate-950 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900"
                      >
                        {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.confirm ? 'text' : 'password'}
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Confirm new password"
                        className="w-full rounded-lg border border-slate-200 px-4 py-2 pr-10 text-slate-950 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900"
                      >
                        {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Updating...' : 'Change Password'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordForm(false);
                        setPasswordForm({
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: '',
                        });
                      }}
                      disabled={isLoading}
                      className="btn border border-slate-200 bg-white text-slate-950 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div>
              <p className="mb-4 text-slate-600">Manage your account security.</p>
              <button
                onClick={() => setShowPasswordForm(true)}
                className="btn btn-primary flex items-center gap-2"
              >
                <Lock size={18} />
                Change Password
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8">
          <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
