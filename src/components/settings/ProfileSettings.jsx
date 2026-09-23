import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, Mail, Phone, MapPin, Save } from 'lucide-react';

const ProfileSettings = () => {
  const [form, setForm] = useState({
    name: 'Alex Johnson',
    email: 'alex@fittrackpro.com',
    phone: '+1 (555) 234-5678',
    location: 'New York, USA',
    bio: 'Fitness enthusiast committed to building strength and endurance.',
    avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
    >
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <User className="h-5 w-5 text-emerald-500" />
        Profile Information
      </h2>

      {/* Avatar */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <img
            src={form.avatar}
            alt="Profile"
            className="w-20 h-20 rounded-2xl object-cover shadow"
          />
          <button className="absolute -bottom-2 -right-2 bg-emerald-500 hover:bg-emerald-600 text-white p-1.5 rounded-lg transition-colors">
            <Camera className="h-3.5 w-3.5" />
          </button>
        </div>
        <div>
          <p className="font-semibold text-slate-900">{form.name}</p>
          <p className="text-sm text-gray-500">{form.email}</p>
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { label: 'Full Name', name: 'name', icon: User, type: 'text' },
            { label: 'Email', name: 'email', icon: Mail, type: 'email' },
            { label: 'Phone', name: 'phone', icon: Phone, type: 'tel' },
            { label: 'Location', name: 'location', icon: MapPin, type: 'text' },
          ].map(({ label, name, icon: Icon, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Icon className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  type={type}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 outline-none transition-all text-sm"
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 outline-none transition-all text-sm resize-none"
          />
        </div>

        <button
          type="submit"
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all ${
            saved
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-slate-900 hover:bg-slate-800 text-white'
          }`}
        >
          <Save className="h-4 w-4" />
          {saved ? 'Changes Saved!' : 'Save Changes'}
        </button>
      </form>
    </motion.div>
  );
};

export default ProfileSettings;
