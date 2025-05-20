import { PinIcon } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-600 to-primary-900 text-white">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <PinIcon size={80} className="text-white animate-bounce" />
          <div className="absolute top-0 right-0">
            <div className="h-6 w-6 rounded-full bg-accent-500 animate-pulse"></div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-2">PinIt</h1>
        <p className="text-lg text-primary-100 mb-8">Your Organization Notice Board</p>
        
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-white animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 rounded-full bg-white animate-pulse" style={{ animationDelay: '300ms' }}></div>
          <div className="w-3 h-3 rounded-full bg-white animate-pulse" style={{ animationDelay: '600ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;