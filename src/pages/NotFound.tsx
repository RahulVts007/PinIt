import { Link } from 'react-router-dom';
import { PinIcon, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="animate-bounce mb-8">
        <PinIcon size={64} className="text-primary-600" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
      
      <p className="text-gray-600 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved to another URL.
      </p>
      
      <Link
        to="/"
        className="btn btn-primary flex items-center"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;