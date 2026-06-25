import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserOrganizations } from '../redux/thunks/organizationThunks';
import { Plus, FolderKanban, Users, BellRing, ArrowUpRight, Sparkles, LayoutGrid } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { organizations, loading, error } = useSelector(state => state.organization);
  const organizationCount = organizations.length;
  const memberCount = organizations.reduce((count, org) => count + (org.members?.length || 0), 0);
  const completionRate = organizationCount === 0 ? 0 : Math.min(100, 48 + organizationCount * 8);

  useEffect(() => {
    dispatch(fetchUserOrganizations());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="space-y-8">
      <section className="surface-card relative overflow-hidden p-6 md:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-orange-500/10" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="section-eyebrow mb-4">
              <Sparkles size={14} />
              Workspace overview
            </div>
            <h1 className="hero-title mb-4">Your command center for projects, teams, and follow-through.</h1>
            <p className="hero-copy max-w-2xl">
              PinIt is designed to grow into a place where teams can create organizations, track reminders, and coordinate work without losing context.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:min-w-[260px]">
            <button
              onClick={() => navigate('/create-organization')}
              className="btn btn-primary"
            >
              <Plus size={18} />
              New Organization
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="stat-card">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
              <FolderKanban size={20} />
            </div>
            <span className="tag bg-blue-100 text-blue-700">Organizations</span>
          </div>
          <p className="text-3xl font-black text-slate-950">{organizationCount}</p>
          <p className="mt-1 text-sm text-slate-500">Active spaces you can manage</p>
        </div>

        <div className="stat-card">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
              <Users size={20} />
            </div>
            <span className="tag bg-emerald-100 text-emerald-700">Members</span>
          </div>
          <p className="text-3xl font-black text-slate-950">{memberCount}</p>
          <p className="mt-1 text-sm text-slate-500">People connected across workspaces</p>
        </div>

        <div className="stat-card">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-2xl bg-orange-50 p-3 text-orange-700">
              <BellRing size={20} />
            </div>
            <span className="tag bg-orange-100 text-orange-700">Momentum</span>
          </div>
          <p className="text-3xl font-black text-slate-950">{completionRate}%</p>
          <p className="mt-1 text-sm text-slate-500">A simple activity score for the dashboard</p>
        </div>

        <div className="stat-card">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
              <LayoutGrid size={20} />
            </div>
            <span className="tag bg-slate-200 text-slate-700">Next</span>
          </div>
          <p className="text-3xl font-black text-slate-950">Ideas</p>
          <p className="mt-1 text-sm text-slate-500">Posts, reminders, analytics, and timelines</p>
        </div>
      </section>

      {loading ? (
        <div className="surface-card py-16 text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-slate-600">Loading organizations...</p>
        </div>
      ) : organizations.length === 0 ? (
        <div className="surface-card overflow-hidden p-0">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 md:p-10">
              <div className="section-eyebrow mb-4">
                <Sparkles size={14} />
                Empty workspace
              </div>
              <h2 className="text-3xl font-black text-slate-950">Start with your first organization.</h2>
              <p className="mt-4 max-w-xl text-slate-600">
                Once you create an organization, this dashboard can evolve into a more powerful workspace with posts, reminders, and member activity.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => navigate('/create-organization')}
                  className="btn btn-primary"
                >
                  <Plus size={18} />
                  Create organization
                </button>
              </div>
            </div>
            <div className="soft-grid flex items-center justify-center bg-slate-50 p-8">
              <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
                <div className="mb-4 h-3 w-24 rounded-full bg-slate-200" />
                <div className="mb-4 h-24 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100" />
                <div className="space-y-3">
                  <div className="h-4 w-2/3 rounded-full bg-slate-200" />
                  <div className="h-4 w-full rounded-full bg-slate-100" />
                  <div className="h-4 w-5/6 rounded-full bg-slate-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-950">Organizations</h2>
              <p className="text-sm text-slate-500">Open a workspace to manage members and ideas.</p>
            </div>
            <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
              {organizationCount} total
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {organizations.map((org, index) => (
              <button
                key={org.id}
                onClick={() => navigate(`/organization/${org.id}`)}
                className="org-card text-left"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 p-3 text-white shadow-lg shadow-blue-500/25">
                      <FolderKanban size={22} />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      ID #{org.id}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black tracking-tight text-slate-950">{org.name}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {org.description || 'A new organization waiting to be shaped into a workspace.'}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Invite</p>
                      <p className="mt-1 font-mono text-sm font-semibold text-slate-900">{org.inviteCode}</p>
                    </div>
                    <div className="rounded-2xl bg-blue-50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Members</p>
                      <p className="mt-1 text-sm font-semibold text-blue-950">{org.members?.length || 0} joined</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between text-sm font-semibold text-slate-500">
                    <span>Open workspace</span>
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
