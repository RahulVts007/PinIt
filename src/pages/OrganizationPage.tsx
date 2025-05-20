import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, Share2, Copy, CheckIcon, Calendar, Users } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useOrganizationStore } from '../stores/organizationStore';
import { usePostStore } from '../stores/postStore';
import PostCard from '../components/posts/PostCard';
import CreatePostForm from '../components/posts/CreatePostForm';
import PostFilter from '../components/posts/PostFilter';
import { PostType } from '../types';

const OrganizationPage = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchOrganizationById, setCurrentOrganization } = useOrganizationStore();
  const { 
    fetchPostsByOrganization, 
    filteredPosts, 
    activeFilters,
    filterPosts 
  } = usePostStore();
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  
  const organization = fetchOrganizationById(id || '');
  
  useEffect(() => {
    if (id) {
      setCurrentOrganization(id);
      fetchPostsByOrganization(id);
    }
  }, [id, setCurrentOrganization, fetchPostsByOrganization]);
  
  if (!organization) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Organization not found</h2>
        <p className="text-gray-600 mb-6">The organization you're looking for doesn't exist or you don't have access.</p>
        <Link to="/dashboard" className="btn btn-primary">
          Return to Dashboard
        </Link>
      </div>
    );
  }
  
  const copyInviteLink = () => {
    const inviteUrl = `${window.location.origin}/join/${organization.inviteCode}`;
    navigator.clipboard.writeText(inviteUrl)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
        toast.success('Invite link copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy invite link');
      });
  };
  
  const handleFilter = (type: PostType | null, tags: string[], search: string) => {
    filterPosts(type, tags, search);
  };

  return (
    <div className="fade-in">
      <div className="relative bg-white rounded-lg shadow-sm border overflow-hidden mb-8">
        {organization.logo ? (
          <div className="h-48 md:h-64 w-full relative">
            <img 
              src={organization.logo} 
              alt={organization.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
        ) : (
          <div className="h-48 md:h-64 w-full bg-gradient-to-r from-primary-500 to-primary-700 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        )}
        
        <div className="p-6 relative">
          <h1 className="text-3xl font-bold text-gray-900">{organization.name}</h1>
          <p className="text-gray-600 mt-2 max-w-3xl">{organization.description}</p>
          
          <div className="flex flex-wrap items-center mt-4 text-sm text-gray-500 gap-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Created on {new Date(organization.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{organization.members.length} members</span>
            </div>
          </div>
          
          <div className="absolute top-6 right-6 flex space-x-2">
            <button
              onClick={() => setShowInviteModal(true)}
              className="btn btn-secondary flex items-center text-sm"
            >
              <Share2 className="h-4 w-4 mr-1" />
              Invite
            </button>
            <button
              onClick={() => setShowCreateForm(true)}
              className="btn btn-primary flex items-center text-sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              Create Post
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PostFilter 
            onFilter={handleFilter}
            activeFilters={activeFilters}
          />
          
          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No posts found
              </h3>
              <p className="text-gray-500 mb-6">
                {activeFilters.type || activeFilters.tags.length > 0 || activeFilters.search
                  ? 'No posts match your current filters. Try adjusting your search criteria.'
                  : 'There are no posts in this organization yet. Create the first one!'}
              </p>
              
              {!(activeFilters.type || activeFilters.tags.length > 0 || activeFilters.search) && (
                <button 
                  onClick={() => setShowCreateForm(true)}
                  className="btn btn-primary"
                >
                  Create First Post
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="font-medium text-lg mb-4">About This Organization</h3>
            <p className="text-gray-600 text-sm mb-4">{organization.description}</p>
            
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Members</h4>
              <div className="flex -space-x-2 overflow-hidden">
                {Array.from({ length: Math.min(5, organization.members.length) }).map((_, i) => (
                  <div 
                    key={i}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-primary-100 flex items-center justify-center text-primary-700"
                  >
                    {i + 1}
                  </div>
                ))}
                
                {organization.members.length > 5 && (
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-gray-700 text-xs">
                    +{organization.members.length - 5}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="font-medium text-lg mb-4">Invite Members</h3>
            <p className="text-gray-600 text-sm mb-4">
              Share this invite code with others to allow them to join this organization.
            </p>
            
            <div className="flex mt-2">
              <input
                type="text"
                value={organization.inviteCode}
                readOnly
                className="input rounded-r-none border-r-0 bg-gray-50"
              />
              <button
                onClick={copyInviteLink}
                className="btn btn-primary rounded-l-none px-3 flex items-center"
              >
                {copySuccess ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
            
            <div className="mt-4">
              <p className="text-xs text-gray-500">
                Invite link:
              </p>
              <div className="flex items-center mt-1">
                <div className="text-xs text-gray-600 truncate flex-1">
                  {window.location.origin}/join/{organization.inviteCode}
                </div>
                <button
                  onClick={copyInviteLink}
                  className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                >
                  {copySuccess ? (
                    <CheckIcon className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showCreateForm && (
        <CreatePostForm
          organizationId={organization.id}
          onClose={() => setShowCreateForm(false)}
        />
      )}
      
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Invite Members</h2>
              <p className="text-gray-600 mb-4">
                Share this link with others to invite them to join <strong>{organization.name}</strong>.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <p className="text-sm font-medium text-gray-700 mb-2">Invite Link</p>
                <div className="flex">
                  <input
                    type="text"
                    value={`${window.location.origin}/join/${organization.inviteCode}`}
                    readOnly
                    className="input rounded-r-none border-r-0"
                  />
                  <button
                    onClick={copyInviteLink}
                    className="btn btn-primary rounded-l-none px-3 flex items-center"
                  >
                    {copySuccess ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Or share the code</p>
                  <div className="flex">
                    <input
                      type="text"
                      value={organization.inviteCode}
                      readOnly
                      className="input rounded-r-none border-r-0 font-mono"
                    />
                    <button
                      onClick={copyInviteLink}
                      className="btn btn-primary rounded-l-none px-3 flex items-center"
                    >
                      {copySuccess ? (
                        <CheckIcon className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="btn btn-primary"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationPage;