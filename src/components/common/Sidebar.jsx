import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, LayoutDashboard, Dumbbell, Apple, TrendingUp, User, Settings, LogOut } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Workouts', path: '/workouts', icon: Dumbbell },
  { label: 'Nutrition', path: '/nutrition', icon: Apple },
  { label: 'Progress', path: '/progress', icon: TrendingUp },
  { label: 'Profile', path: '/profile', icon: User },
  { label: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col min-h-screen">
      <div className="p-6 flex flex-col h-full">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 mb-10">
          <Activity className="h-8 w-8 text-emerald-400" />
          <span className="text-xl font-bold tracking-wide">FitTrack Pro</span>
        </Link>

        {/* Nav */}
        <nav className="flex-1 space-y-1">
          {navItems.map(({ label, path, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  active
                    ? 'bg-emerald-500/20 text-emerald-400 font-semibold'
                    : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom User */}
        <div className="border-t border-slate-700 pt-6 mt-6">
          <div className="flex items-center gap-3 px-2 mb-4">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=80&h=80&fit=crop"
              alt="User"
              className="w-9 h-9 rounded-xl object-cover"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">Alex Johnson</p>
              <p className="text-xs text-gray-500 truncate">alex@fittrack.com</p>
            </div>
          </div>
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:bg-slate-800 hover:text-rose-400 transition-all text-sm"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
