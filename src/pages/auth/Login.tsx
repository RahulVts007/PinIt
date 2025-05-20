import { Link } from 'react-router-dom';
import { PinIcon } from 'lucide-react';
import LoginForm from '../../components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="relative">
              <PinIcon className="h-12 w-12 text-white" />
              <div className="absolute top-0 right-0">
                <div className="h-4 w-4 rounded-full bg-accent-500"></div>
              </div>
            </div>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-white">PinIt</h1>
          <p className="mt-2 text-white/80">Your Organization Notice Board</p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;