import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Copy, ArrowLeft, Users, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function OrganizationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { organizations } = useSelector(state => state.organization);
  const organization = organizations.find(org => org.id === id);

  const handleCopyInviteCode = () => {
    if (organization) {
      navigator.clipboard.writeText(organization.inviteCode);
      toast.success('Invite code copied to clipboard');
    }
  };

  if (!organization) {
    return (
      <div className="surface-card mx-auto max-w-lg py-12 text-center">
        <h1 className="mb-4 text-2xl font-black text-slate-950">Organization not found</h1>
        <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
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
          Organization overview
        </div>
        <h1 className="text-4xl font-black tracking-tight text-slate-950 mb-2">{organization.name}</h1>
        <p className="max-w-2xl text-slate-600">{organization.description || 'No description yet.'}</p>
      </div>

      <div className="surface-card p-6 md:p-8">
        <h2 className="mb-4 text-lg font-black text-slate-950">Invite Team Members</h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={organization.inviteCode}
            readOnly
            className="input flex-1 font-mono"
          />
          <button
            onClick={handleCopyInviteCode}
            className="btn btn-primary"
          >
            <Copy size={18} />
            Copy
          </button>
        </div>
      </div>

      <div className="surface-card p-6 md:p-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-950">Team Members</h2>
          <span className="tag bg-blue-100 text-blue-700">
            <Users size={14} />
            {organization.members?.length || 0}
          </span>
        </div>
        {organization.members && organization.members.length > 0 ? (
          <div className="space-y-4">
            {organization.members.map(member => (
              <div key={member.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div>
                  <p className="font-semibold text-slate-950">{member.User?.name}</p>
                  <p className="text-sm text-slate-600">{member.User?.email}</p>
                </div>
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-600">No team members yet.</p>
        )}
      </div>
    </div>
  );
}
