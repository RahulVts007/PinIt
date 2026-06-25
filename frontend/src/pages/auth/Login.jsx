import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/thunks/authThunks';
import { Mail, Lock, Sparkles, ShieldCheck, Layers3, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    const success = await dispatch(login(email, password));
    if (success) {
      toast.success('Login successful');
      navigate('/dashboard');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 p-4 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.28),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(249,115,22,0.20),_transparent_28%),linear-gradient(135deg,#020617_0%,#0f172a_55%,#111827_100%)]" />
      <div className="absolute inset-0 soft-grid opacity-15" />

      <div className="relative mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden lg:block">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur">
            <Sparkles size={16} />
            Organized work, clear motion
          </div>

          <h1 className="hero-title !text-white">Run your team like a polished product, not a checklist.</h1>
          <p className="hero-copy mt-6 max-w-2xl !text-slate-300">
            PinIt is moving toward a command-center style workflow: invite codes, reminders, posts, and org-level collaboration in one place.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
              <ShieldCheck className="mb-3 text-cyan-300" size={24} />
              <p className="text-lg font-semibold text-white">Protected access</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">Secure sessions, token-backed auth, and role-aware surfaces for members.</p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
              <Layers3 className="mb-3 text-orange-300" size={24} />
              <p className="text-lg font-semibold text-white">Layered collaboration</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">Organizations, posts, reminders, and notifications can evolve into a full workspace.</p>
            </div>
          </div>
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
                  <h2 className="text-2xl font-black text-slate-950">Welcome back</h2>
                </div>
              </div>
              <div className="gradient-chip">
                <Sparkles size={14} />
                Live
              </div>
            </div>

            <p className="mb-8 text-sm leading-6 text-slate-600">Sign in to continue into your workspace and pick up where your team left off.</p>

            {error && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input pl-11 text-slate-900 placeholder:text-slate-400"
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
                    className="input pl-11 text-slate-900 placeholder:text-slate-400"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary mt-2 w-full py-3 text-base"
              >
                {loading ? 'Signing in...' : 'Enter Workspace'}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/90 p-4 text-sm text-slate-600">
              New here?{' '}
              <button
                onClick={() => navigate('/register')}
                className="font-semibold text-blue-700 hover:text-blue-800"
              >
                Create an account
              </button>
              {' '}to start organizing teams.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
