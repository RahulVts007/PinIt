import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrganization } from '../redux/thunks/organizationThunks';
import { ArrowLeft, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CreateOrganization() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.organization);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Organization name is required');
      return;
    }

    try {
      const result = await dispatch(createOrganization(name, description, null));
      if (result) {
        toast.success('Organization created successfully');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to create organization');
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
          New workspace
        </div>
        <h1 className="text-4xl font-black tracking-tight text-slate-950">Create Organization</h1>
        <p className="mt-3 max-w-xl text-slate-600">Set up a new organization to collaborate with your team.</p>
      </div>

      <div className="surface-card p-6 md:p-8">
        {error && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Organization Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="My Awesome Team"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input min-h-[120px]"
              placeholder="What's this organization about?"
              rows="4"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1"
            >
              {loading ? 'Creating...' : 'Create Organization'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-secondary px-6"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
