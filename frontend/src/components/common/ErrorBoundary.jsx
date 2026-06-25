import { Component } from 'react';
import toast from 'react-hot-toast';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    toast.error('An unexpected error occurred. Please refresh the page.');
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4 text-white">
          <div className="absolute inset-0 soft-grid opacity-15" />
          <div className="relative surface-card max-w-xl p-8 text-center">
            <h1 className="mb-4 text-4xl font-black text-slate-950">Oops! Something went wrong</h1>
            <p className="mb-8 text-slate-600">An unexpected error occurred. Please try refreshing the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-left">
                <p className="font-bold text-red-800">Error Details (Dev Only):</p>
                <pre className="mt-2 overflow-auto text-sm text-red-700">
                  {this.state.error?.toString()}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
