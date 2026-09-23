import React, { useState } from 'react';
import { Settings, User, Bell, Shield, CreditCard } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import ProfileSettings from '../components/settings/ProfileSettings';
import PreferencesForm from '../components/settings/PreferencesForm';

const TABS = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'preferences', label: 'Preferences', icon: Settings },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'security', label: 'Security', icon: Shield },
];

const SecurityTab = () => (
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
      <Shield className="h-5 w-5 text-emerald-500" />
      Security
    </h2>
    <div className="space-y-4">
      {['Current Password', 'New Password', 'Confirm New Password'].map((label) => (
        <div key={label}>
          <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 bg-gray-50 outline-none text-sm max-w-md"
          />
        </div>
      ))}
      <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors">
        Update Password
      </button>
    </div>
    <div className="border-t border-gray-100 pt-6">
      <h3 className="font-semibold text-slate-900 mb-3">Two-Factor Authentication</h3>
      <p className="text-sm text-gray-500 mb-4">Add an extra layer of security to your account.</p>
      <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors">
        Enable 2FA
      </button>
    </div>
  </div>
);

const NotificationsTab = () => (
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
      <Bell className="h-5 w-5 text-emerald-500" />
      Notification Settings
    </h2>
    <p className="text-sm text-gray-500">Manage how and when FitTrack Pro sends you alerts.</p>
    <div className="mt-6 space-y-3">
      {[
        'New workout logged',
        'Weekly summary ready',
        'Goal milestone reached',
        'New feature released',
        'Nutrition log reminder',
      ].map((item) => (
        <div key={item} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
          <span className="text-sm text-slate-900 font-medium">{item}</span>
          <input type="checkbox" defaultChecked className="h-4 w-4 accent-emerald-500 cursor-pointer" />
        </div>
      ))}
    </div>
  </div>
);

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderTab = () => {
    switch (activeTab) {
      case 'profile': return <ProfileSettings />;
      case 'preferences': return <PreferencesForm />;
      case 'security': return <SecurityTab />;
      case 'notifications': return <NotificationsTab />;
      default: return <ProfileSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 p-6 lg:p-10 space-y-8">
        {/* Header */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <Settings className="h-8 w-8 text-emerald-500" />
            Settings
          </h1>
          <p className="text-gray-500 mt-1">Manage your account, preferences, and security.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tab Nav */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 space-y-1">
              {TABS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                    activeTab === key
                      ? 'bg-slate-900 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-3">{renderTab()}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
