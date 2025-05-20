import { useState, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Users } from 'lucide-react';
import { useOrganizationStore } from '../stores/organizationStore';

const JoinOrganization = () => {
  const { inviteCode: urlInviteCode } = useParams<{ inviteCode: string }>();
  const [inviteCode, setInviteCode] = useState(urlInviteCode !== 'unknown' ? urlInviteCode : '');
  const [error, setError] = useState('');
  
  const { joinOrganization } = useOrganizationStore();
  const navigate = useNavigate();
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!inviteCode.trim()) {
      setError('Please enter an invite code');
      return;
    }
    
    const success = joinOrganization(inviteCode.trim());
    
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid invite code. Please check and try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto fade-in">
      <div className="flex items-center mb-8">
        <Users className="h-6 w-6 text-primary-600 mr-2" />
        <h1 className="text-3xl font-bold text-gray-900">Join Organization</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-700 mb-1">
              Invite Code
            </label>
            <input
              id="inviteCode"
              type="text"
              value={inviteCode}
              onChange={(e) => {
                setInviteCode(e.target.value);
                setError('');
              }}
              className={`input ${error ? 'border-red-500' : ''}`}
              placeholder="Enter invite code"
              required
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Enter the invite code provided by the organization administrator
            </p>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!inviteCode.trim()}
            >
              Join Organization
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinOrganization;