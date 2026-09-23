import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Activity, Plus, Dumbbell, Apple, TrendingUp, Flame,
  Clock, Target, ChevronRight
} from 'lucide-react';
import Sidebar from '../components/common/Sidebar';

const statCards = [
  {
    label: 'Workouts This Week',
    value: '4',
    sub: '+1 from last week',
    icon: Dumbbell,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    label: 'Calories Burned',
    value: '2,450',
    sub: 'kcal this week',
    icon: Flame,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
  },
  {
    label: 'Active Time',
    value: '5h 20m',
    sub: 'Total this week',
    icon: Clock,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    label: 'Goal Progress',
    value: '68%',
    sub: 'Monthly target',
    icon: Target,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
  },
];

const recentWorkouts = [
  { name: 'Upper Body Power', date: 'Today, 7:00 AM', duration: '50 min', calories: 380, category: 'Strength' },
  { name: 'Morning Run', date: 'Yesterday, 6:30 AM', duration: '35 min', calories: 310, category: 'Cardio' },
  { name: 'HIIT Blast', date: 'Sep 18, 7:00 AM', duration: '25 min', calories: 420, category: 'HIIT' },
  { name: 'Leg Day', date: 'Sep 17, 8:00 AM', duration: '60 min', calories: 440, category: 'Strength' },
];

const categoryColor = {
  Strength: 'bg-blue-100 text-blue-700',
  Cardio: 'bg-orange-100 text-orange-700',
  HIIT: 'bg-rose-100 text-rose-700',
};

const quickActions = [
  { label: 'Log Workout', to: '/workouts', icon: Dumbbell, color: 'bg-emerald-500 hover:bg-emerald-600' },
  { label: 'Log Meal', to: '/nutrition', icon: Apple, color: 'bg-rose-500 hover:bg-rose-600' },
  { label: 'Update Progress', to: '/progress', icon: TrendingUp, color: 'bg-blue-500 hover:bg-blue-600' },
];

// Simple bar chart using divs — no external library
const ActivityBar = ({ day, height, active }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="w-6 bg-gray-100 rounded-full overflow-hidden" style={{ height: 80 }}>
      <div
        className={`w-full rounded-full transition-all duration-700 ${active ? 'bg-emerald-500' : 'bg-slate-200'}`}
        style={{ height: `${height}%`, marginTop: `${100 - height}%` }}
      />
    </div>
    <span className="text-xs text-gray-500">{day}</span>
  </div>
);

const Dashboard = () => {
  const barData = [
    { day: 'M', height: 60, active: true },
    { day: 'T', height: 80, active: true },
    { day: 'W', height: 45, active: true },
    { day: 'T', height: 90, active: true },
    { day: 'F', height: 30, active: false },
    { day: 'S', height: 0, active: false },
    { day: 'S', height: 0, active: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Welcome back, Athlete! 👋</h1>
            <p className="text-gray-500 mt-1">Here's your fitness overview for today, Sep 20, 2026.</p>
          </div>
          <Link
            to="/workouts"
            className="mt-4 sm:mt-0 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-sm shadow-emerald-200 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Log Workout
          </Link>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statCards.map(({ label, value, sub, icon: Icon, color, bg, border }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`${bg} border ${border} p-6 rounded-2xl`}
            >
              <div className="flex justify-between items-start mb-3">
                <p className="text-sm font-medium text-gray-600">{label}</p>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
              <p className="text-xs text-gray-500 mt-1">{sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4">
          {quickActions.map(({ label, to, icon: Icon, color }) => (
            <Link
              key={label}
              to={to}
              className={`${color} text-white flex flex-col sm:flex-row items-center justify-center gap-2 p-4 rounded-2xl font-medium transition-colors shadow-sm`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm text-center">{label}</span>
            </Link>
          ))}
        </div>

        {/* Charts + Recent */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-1">Weekly Activity</h3>
            <p className="text-sm text-gray-500 mb-6">Workout sessions this week</p>
            <div className="flex items-end justify-around gap-2">
              {barData.map((b, i) => (
                <ActivityBar key={i} day={b.day} height={b.height} active={b.active} />
              ))}
            </div>
            <div className="mt-6 flex justify-between text-sm">
              <span className="text-gray-500">4 sessions logged</span>
              <span className="text-emerald-600 font-semibold">Goal: 5</span>
            </div>
          </motion.div>

          {/* Recent Workouts */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-gray-900">Recent Workouts</h3>
              <Link to="/workouts" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentWorkouts.map((w, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center flex-shrink-0">
                      <Activity className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{w.name}</p>
                      <p className="text-xs text-gray-500">{w.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-right">
                    <span className={`hidden sm:inline text-xs font-bold px-2 py-0.5 rounded-full ${categoryColor[w.category] || 'bg-gray-100 text-gray-700'}`}>
                      {w.category}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{w.duration}</p>
                      <p className="text-xs text-gray-500">{w.calories} kcal</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Today's Nutrition Snapshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Apple className="h-5 w-5 text-emerald-500" /> Today's Nutrition
            </h3>
            <Link to="/nutrition" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
              View Full Log <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Calories', value: '1,850', total: '2,400', unit: 'kcal', pct: 77, color: 'bg-orange-500' },
              { label: 'Protein', value: '120g', total: '160g', pct: 75, color: 'bg-rose-500' },
              { label: 'Carbs', value: '200g', total: '250g', pct: 80, color: 'bg-emerald-500' },
              { label: 'Fats', value: '55g', total: '70g', pct: 79, color: 'bg-yellow-500' },
            ].map((n) => (
              <div key={n.label} className="bg-gray-50 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-medium text-gray-600">{n.label}</p>
                  <p className="text-xs text-gray-500">{n.pct}%</p>
                </div>
                <p className="text-lg font-extrabold text-slate-900">{n.value}</p>
                <p className="text-xs text-gray-400">/ {n.total}</p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div className={`h-1.5 rounded-full ${n.color}`} style={{ width: `${n.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
