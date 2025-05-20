import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useOrganizationStore } from '../../stores/organizationStore';
import Header from './Header';

const Layout = () => {
  const location = useLocation();
  const { fetchUserOrganizations } = useOrganizationStore();
  
  useEffect(() => {
    // Fetch user organizations on initial load
    fetchUserOrganizations();
  }, [fetchUserOrganizations]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 mt-8">
          <Outlet />
        </div>
      </main>
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 PinIt. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-primary-600 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-primary-600 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-primary-600 text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;