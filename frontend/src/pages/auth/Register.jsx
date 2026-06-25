import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/thunks/authThunks';
import { Mail, Lock, User, Sparkles, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    const success = await dispatch(register(name, email, password));
    if (success) {
      toast.success('Account created successfully');
      navigate('/dashboard');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 p-4 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.22),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.24),_transparent_30%),linear-gradient(135deg,#020617_0%,#0f172a_55%,#111827_100%)]" />
      <div className="absolute inset-0 soft-grid opacity-15" />

      <div className="relative mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden lg:block">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur">
            <Sparkles size={16} />
            Build the workspace your team needs
          </div>
          <h1 className="hero-title text-white">Create an account and start turning ideas into organized work.</h1>
          <p className="hero-copy mt-6 max-w-xl text-slate-300">
            PinIt works best when every team has a clean entry point, clear ownership, and a place to capture everything that matters.
          </p>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="surface-card border-white/70 p-8 md:p-10">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25">
                  <span className="text-xl font-black">P</span>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">PinIt</p>
                  <h2 className="text-2xl font-black text-slate-950">Join PinIt</h2>
                </div>
              </div>
              <div className="gradient-chip">
                <Sparkles size={14} />
                New
              </div>
            </div>

            <p className="mb-8 text-sm leading-6 text-slate-600">Create your account to get started with a more organized team workspace.</p>

            {error && (
              <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input pl-11"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input pl-11"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input pl-11"
                    placeholder="••••••••"
                  />
                </div>
                <p className="mt-1 text-sm text-slate-500">At least 6 characters</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary mt-2 w-full py-3 text-base"
              >
                {loading ? 'Creating account...' : 'Create account'}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <p className="mt-8 text-center text-slate-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="font-semibold text-blue-700 hover:text-blue-800"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
