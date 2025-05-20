import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { BuildingIcon } from 'lucide-react';
import { useOrganizationStore } from '../stores/organizationStore';

const CreateOrganization = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState('');
  
  const { createOrganization } = useOrganizationStore();
  const navigate = useNavigate();
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    createOrganization(name, description, logo);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto fade-in">
      <div className="flex items-center mb-8">
        <BuildingIcon className="h-6 w-6 text-primary-600 mr-2" />
        <h1 className="text-3xl font-bold text-gray-900">Create Organization</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Organization Name *
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Enter organization name"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              This will be the display name for your organization
            </p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input min-h-[120px]"
              placeholder="Describe your organization"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Provide details about what your organization is about
            </p>
          </div>
          
          <div className="mb-8">
            <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
              Logo URL (optional)
            </label>
            <input
              id="logo"
              type="url"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              className="input"
              placeholder="Enter logo URL"
            />
            <p className="mt-1 text-xs text-gray-500">
              Provide a URL to an image for your organization logo
            </p>
            
            {logo && (
              <div className="mt-3">
                <p className="text-xs text-gray-700 mb-1">Preview:</p>
                <img 
                  src={logo} 
                  alt="Logo preview"
                  className="w-16 h-16 object-cover rounded-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Invalid+URL';
                  }}
                />
              </div>
            )}
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
              disabled={!name || !description}
            >
              Create Organization
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrganization;