import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { Organization } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface OrganizationCardProps {
  organization: Organization;
}

const OrganizationCard = ({ organization }: OrganizationCardProps) => {
  return (
    <Link to={`/organization/${organization.id}`} className="card hover:translate-y-[-4px]">
      <div className="relative">
        {organization.logo ? (
          <img 
            src={organization.logo} 
            alt={organization.name}
            className="w-full h-36 object-cover"
          />
        ) : (
          <div className="w-full h-36 bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {organization.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <h3 className="absolute bottom-3 left-4 text-white font-bold text-xl line-clamp-1">
          {organization.name}
        </h3>
      </div>
      
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {organization.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-500 text-sm">
            <Users className="h-4 w-4 mr-1" />
            <span>{organization.members.length} members</span>
          </div>
          <div className="text-gray-400 text-xs">
            Created {formatDistanceToNow(new Date(organization.createdAt), { addSuffix: true })}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrganizationCard;