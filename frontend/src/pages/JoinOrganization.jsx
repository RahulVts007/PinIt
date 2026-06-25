import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { joinOrganization } from '../redux/thunks/organizationThunks';
import { CheckCircle, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function JoinOrganization() {
  const { inviteCode } = useParams();
  const [joined, setJoined] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.organization);

  const handleJoin = async () => {
    try {
      const result = await dispatch(joinOrganization(inviteCode));
      if (result) {
        setJoined(true);
        toast.success('Successfully joined organization');
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to join organization');
    }
  };

  if (joined) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="surface-card max-w-md p-8 text-center">
          <CheckCircle size={64} className="mx-auto mb-4 text-emerald-500" />
          <h1 className="text-2xl font-black text-slate-950 mb-2">Welcome!</h1>
          <p className="text-slate-600 mb-4">You've successfully joined the organization.</p>
          <p className="text-sm text-slate-500">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md space-y-8">
      <div className="surface-card p-6 md:p-8 text-center">
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="section-eyebrow mb-4 justify-center">
          <Sparkles size={14} />
          Invitation
        </div>
        <h1 className="text-4xl font-black tracking-tight text-slate-950 mb-2">Join Organization</h1>
        <p className="text-slate-600">You've been invited to join an organization.</p>
      </div>

      <div className="surface-card p-6 md:p-8">
        {error && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <p className="mb-2 text-sm font-semibold text-slate-600">Invite Code</p>
          <p className="flex items-center gap-2 text-lg font-mono font-bold text-blue-700">
            <KeyRound size={18} />
            {inviteCode}
          </p>
        </div>

        <button
          onClick={handleJoin}
          disabled={loading}
          className="btn btn-primary mb-4 w-full"
        >
          {loading ? 'Joining...' : 'Join Organization'}
        </button>

        <button
          onClick={() => navigate('/dashboard')}
          className="btn btn-secondary w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
