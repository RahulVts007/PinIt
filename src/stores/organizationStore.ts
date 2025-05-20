import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { Organization } from '../types';
import { ORGANIZATIONS } from '../data/mockData';
import { useAuthStore } from './authStore';

interface OrganizationState {
  organizations: Organization[];
  currentOrganization: Organization | null;
  loading: boolean;
  error: string | null;
  fetchUserOrganizations: () => void;
  fetchOrganizationById: (id: string) => Organization | null;
  createOrganization: (name: string, description: string, logo?: string) => void;
  joinOrganization: (inviteCode: string) => boolean;
  setCurrentOrganization: (id: string | null) => void;
}

export const useOrganizationStore = create<OrganizationState>((set, get) => {
  // Load organizations from localStorage if available
  const storedOrgs = localStorage.getItem('pinit-organizations');
  const initialOrgs: Organization[] = storedOrgs 
    ? JSON.parse(storedOrgs) 
    : [...ORGANIZATIONS]; // Use mock data initially

  return {
    organizations: initialOrgs,
    currentOrganization: null,
    loading: false,
    error: null,

    fetchUserOrganizations: () => {
      const { user } = useAuthStore.getState();
      
      if (!user) {
        set({ organizations: [] });
        return;
      }
      
      // In a real app, this would fetch from an API based on the user's ID
      // For demo, filter organizations where user is a member
      const userOrgs = get().organizations.filter(org => 
        org.members.includes(user.id) || org.createdBy === user.id
      );
      
      set({ organizations: userOrgs });
      
      // Set current organization to the first one if none is selected
      if (!get().currentOrganization && userOrgs.length > 0) {
        set({ currentOrganization: userOrgs[0] });
      }
    },

    fetchOrganizationById: (id) => {
      const org = get().organizations.find(o => o.id === id) || null;
      return org;
    },

    createOrganization: (name, description, logo) => {
      const { user } = useAuthStore.getState();
      
      if (!user) {
        toast.error('You must be logged in to create an organization');
        return;
      }
      
      // Generate a unique invite code
      const inviteCode = uuidv4().substring(0, 8);
      
      const newOrg: Organization = {
        id: uuidv4(),
        name,
        description,
        logo,
        inviteCode,
        members: [user.id],
        createdAt: new Date(),
        createdBy: user.id
      };
      
      set(state => {
        const updatedOrgs = [...state.organizations, newOrg];
        // Save to localStorage
        localStorage.setItem('pinit-organizations', JSON.stringify(updatedOrgs));
        return {
          organizations: updatedOrgs,
          currentOrganization: newOrg
        };
      });
      
      toast.success('Organization created successfully!');
    },

    joinOrganization: (inviteCode) => {
      const { user } = useAuthStore.getState();
      
      if (!user) {
        toast.error('You must be logged in to join an organization');
        return false;
      }
      
      // Find the organization with the given invite code
      const orgIndex = get().organizations.findIndex(o => o.inviteCode === inviteCode);
      
      if (orgIndex === -1) {
        toast.error('Invalid invite code');
        return false;
      }
      
      // Check if user is already a member
      if (get().organizations[orgIndex].members.includes(user.id)) {
        toast.info('You are already a member of this organization');
        set({ currentOrganization: get().organizations[orgIndex] });
        return true;
      }
      
      // Add user to the organization's members
      set(state => {
        const updatedOrgs = [...state.organizations];
        updatedOrgs[orgIndex].members.push(user.id);
        
        // Save to localStorage
        localStorage.setItem('pinit-organizations', JSON.stringify(updatedOrgs));
        
        return {
          organizations: updatedOrgs,
          currentOrganization: updatedOrgs[orgIndex]
        };
      });
      
      toast.success('Joined organization successfully!');
      return true;
    },

    setCurrentOrganization: (id) => {
      if (!id) {
        set({ currentOrganization: null });
        return;
      }
      
      const org = get().organizations.find(o => o.id === id) || null;
      set({ currentOrganization: org });
    }
  };
});