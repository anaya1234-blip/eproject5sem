import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Scale, Target } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import ProgressForm from '../components/progress/ProgressForm';
import ProgressChart from '../components/progress/ProgressChart';

const INITIAL_ENTRIES = [
  { date: 'Sep 1', weight: '78.5', bodyFat: '22.0', chest: '100', waist: '88', hips: '97', notes: '' },
  { date: 'Sep 5', weight: '78.0', bodyFat: '21.5', chest: '100', waist: '87', hips: '96', notes: '' },
  { date: 'Sep 8', weight: '77.2', bodyFat: '21.0', chest: '101', waist: '86', hips: '96', notes: '' },
  { date: 'Sep 12', weight: '76.8', bodyFat: '20.5', chest: '101', waist: '85', hips: '95', notes: '' },
  { date: 'Sep 15', weight: '76.3', bodyFat: '20.2', chest: '102', waist: '84', hips: '95', notes: '' },
  { date: 'Sep 18', weight: '75.9', bodyFat: '19.8', chest: '102', waist: '83', hips: '94', notes: '' },
  { date: 'Sep 20', weight: '75.5', bodyFat: '19.5', chest: '103', waist: '82', hips: '94', notes: '' },
];

const milestones = [
  { label: 'First 5kg Lost', achieved: true, icon: Award },
  { label: 'Logged 30 Days Straight', achieved: true, icon: Target },
  { label: 'Reached Body Fat Goal', achieved: false, icon: Scale },
  { label: 'Lost 10kg Total', achieved: false, icon: TrendingUp },
];

const ProgressPage = () => {
  const [entries, setEntries] = useState(INITIAL_ENTRIES);

  const handleAdd = (entry) => {
    const dateStr = new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    setEntries((prev) => [...prev, { ...entry, date: dateStr }]);
  };

  const latest = entries[entries.length - 1];
  const first = entries[0];
  const weightLost = (parseFloat(first.weight) - parseFloat(latest.weight)).toFixed(1);
  const fatLost = (parseFloat(first.bodyFat) - parseFloat(latest.bodyFat)).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 p-6 lg:p-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-emerald-500" />
              Progress Tracker
            </h1>
            <p className="text-gray-500 mt-1">Track your body measurements and transformations over time.</p>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { label: 'Current Weight', value: `${latest.weight} kg`, sub: `Started at ${first.weight} kg`, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Weight Lost', value: `${weightLost} kg`, sub: 'Since you started', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Body Fat', value: `${latest.bodyFat}%`, sub: `Down ${fatLost}% from start`, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Waist', value: `${latest.waist} cm`, sub: `Started at ${first.waist} cm`, color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`${s.bg} p-5 rounded-2xl border border-white`}
            >
              <p className="text-xs font-medium text-gray-500 mb-1">{s.label}</p>
              <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1 space-y-6">
            <ProgressForm onAdd={handleAdd} />

            {/* Milestones */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Milestones
              </h3>
              <div className="space-y-3">
                {milestones.map(({ label, achieved, icon: Icon }, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${achieved ? 'bg-emerald-50' : 'bg-gray-50'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${achieved ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                      <Icon className={`h-4 w-4 ${achieved ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    <span className={`text-sm font-medium ${achieved ? 'text-emerald-700' : 'text-gray-500'}`}>{label}</span>
                    {achieved && <span className="ml-auto text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">Done</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Charts + History */}
          <div className="lg:col-span-2 space-y-6">
            <ProgressChart entries={entries} />

            {/* History Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-slate-900">Measurement History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
                      {['Date', 'Weight (kg)', 'Body Fat (%)', 'Waist (cm)', 'Chest (cm)'].map((h) => (
                        <th key={h} className="px-5 py-3 text-left font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[...entries].reverse().map((e, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3 font-medium text-slate-900">{e.date}</td>
                        <td className="px-5 py-3 text-gray-700">{e.weight}</td>
                        <td className="px-5 py-3 text-gray-700">{e.bodyFat}</td>
                        <td className="px-5 py-3 text-gray-700">{e.waist}</td>
                        <td className="px-5 py-3 text-gray-700">{e.chest}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
