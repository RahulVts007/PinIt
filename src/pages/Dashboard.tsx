import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users, Pin, BellRing } from 'lucide-react';
import { useOrganizationStore } from '../stores/organizationStore';
import { useReminderStore } from '../stores/reminderStore';
import OrganizationCard from '../components/organization/OrganizationCard';
import RemindersList from '../components/posts/RemindersList';

const Dashboard = () => {
  const { organizations, fetchUserOrganizations } = useOrganizationStore();
  const { getUpcomingReminders } = useReminderStore();
  const [upcomingReminders, setUpcomingReminders] = useState(getUpcomingReminders(7));
  
  useEffect(() => {
    fetchUserOrganizations();
    setUpcomingReminders(getUpcomingReminders(7));
  }, [fetchUserOrganizations, getUpcomingReminders]);

  return (
    <div className="fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Your organizations and reminders</p>
        </div>
        
        <Link
          to="/create-organization"
          className="btn btn-primary mt-4 md:mt-0 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Organization
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="mb-6 flex items-center">
            <Users className="h-5 w-5 text-primary-600 mr-2" />
            <h2 className="text-xl font-semibold">Your Organizations</h2>
          </div>
          
          {organizations.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Pin className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No organizations yet
              </h3>
              <p className="text-gray-500 mb-6">
                Create an organization or join one with an invite link to get started.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link to="/create-organization" className="btn btn-primary">
                  Create Organization
                </Link>
                <Link to="/join/unknown" className="btn btn-secondary">
                  Join Organization
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {organizations.map(org => (
                <OrganizationCard key={org.id} organization={org} />
              ))}
              
              <Link 
                to="/create-organization"
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] hover:border-primary-400 hover:bg-primary-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                  <Plus className="h-6 w-6 text-primary-600" />
                </div>
                <p className="text-gray-700 font-medium text-center">
                  Create New Organization
                </p>
              </Link>
              
              <Link 
                to="/join/unknown"
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] hover:border-primary-400 hover:bg-primary-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <p className="text-gray-700 font-medium text-center">
                  Join Organization
                </p>
              </Link>
            </div>
          )}
        </div>
        
        <div>
          <div className="mb-6 flex items-center">
            <BellRing className="h-5 w-5 text-primary-600 mr-2" />
            <h2 className="text-xl font-semibold">Reminders</h2>
          </div>
          
          <RemindersList />
          
          {upcomingReminders.length > 0 && !upcomingReminders.every(r => r.isCompleted) && (
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-medium text-amber-800 mb-2 flex items-center">
                <BellRing className="h-4 w-4 mr-2" />
                Upcoming Reminders
              </h3>
              <ul className="space-y-2">
                {upcomingReminders
                  .filter(r => !r.isCompleted)
                  .map(reminder => (
                    <li key={reminder.id} className="text-sm text-amber-700">
                      • {reminder.title} - {new Date(reminder.date).toLocaleDateString()}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;