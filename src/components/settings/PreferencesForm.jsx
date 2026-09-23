import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Scale, Target, Moon, Save } from 'lucide-react';

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-emerald-500' : 'bg-gray-300'}`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`}
    />
  </button>
);

const PreferencesForm = () => {
  const [prefs, setPrefs] = useState({
    emailNotifications: true,
    workoutReminders: true,
    weeklyReport: false,
    darkMode: false,
    units: 'metric',
    calorieGoal: 2400,
    weightGoal: 70,
    fitnessGoal: 'Build Muscle',
  });

  const [saved, setSaved] = useState(false);

  const toggle = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));
  const change = (e) => setPrefs((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8"
    >
      <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
        <Settings className="h-5 w-5 text-emerald-500" />
        Preferences
      </h2>

      {/* Notifications */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Bell className="h-4 w-4" /> Notifications
        </h3>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates and tips via email' },
            { key: 'workoutReminders', label: 'Workout Reminders', desc: 'Daily reminders to log your workouts' },
            { key: 'weeklyReport', label: 'Weekly Progress Report', desc: 'Summary of your week every Sunday' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-slate-900 text-sm">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
              </div>
              <Toggle checked={prefs[key]} onChange={() => toggle(key)} />
            </div>
          ))}
        </div>
      </div>

      {/* Units & Goals */}
      <form className="space-y-5" onSubmit={handleSave}>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
          <Scale className="h-4 w-4" /> Units & Goals
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Measurement System</label>
            <select
              name="units"
              value={prefs.units}
              onChange={change}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 bg-gray-50 outline-none text-sm"
            >
              <option value="metric">Metric (kg, cm)</option>
              <option value="imperial">Imperial (lbs, in)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Fitness Goal</label>
            <select
              name="fitnessGoal"
              value={prefs.fitnessGoal}
              onChange={change}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 bg-gray-50 outline-none text-sm"
            >
              {['Lose Weight', 'Build Muscle', 'Improve Endurance', 'Stay Healthy', 'Athletic Performance'].map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Target className="h-4 w-4 inline mr-1 text-emerald-500" />
              Daily Calorie Goal (kcal)
            </label>
            <input
              name="calorieGoal"
              value={prefs.calorieGoal}
              onChange={change}
              type="number"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 bg-gray-50 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Weight (kg)</label>
            <input
              name="weightGoal"
              value={prefs.weightGoal}
              onChange={change}
              type="number"
              step="0.5"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 bg-gray-50 outline-none text-sm"
            />
          </div>
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
          {saved ? 'Preferences Saved!' : 'Save Preferences'}
        </button>
      </form>
    </motion.div>
  );
};

export default PreferencesForm;
