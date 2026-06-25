import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div className="min-h-screen relative overflow-hidden text-slate-900">
      <div className="pointer-events-none absolute inset-0 soft-grid opacity-30" />
      <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-blue-400/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-orange-400/10 blur-3xl" />
      <Header />
      <main className="relative container mx-auto px-4 py-8 md:py-10">
        <Outlet />
      </main>
    </div>
  );
}
