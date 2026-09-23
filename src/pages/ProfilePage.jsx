import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  User, MapPin, Mail, Phone, Dumbbell, Apple, TrendingUp,
  Award, Settings, Calendar, Flame, CheckCircle, Lock
} from 'lucide-react';
import Sidebar from '../components/common/Sidebar';

const stats = [
  { label: 'Workouts', value: '124', icon: Dumbbell, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  { label: 'Calories Burned', value: '48.2k', icon: Flame, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
  { label: 'Meals Logged', value: '310', icon: Apple, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
  { label: 'Days Active', value: '87', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
];

const achievements = [
  { title: '🔥 30-Day Streak', desc: 'Logged activity 30 days in a row', earned: true },
  { title: '💪 First PR', desc: 'Hit a new personal record', earned: true },
  { title: '🥗 Nutrition Master', desc: 'Logged all meals for 2 weeks straight', earned: true },
  { title: '🏃 Cardio King', desc: 'Ran 50km total', earned: false },
  { title: '🏋️ Iron Will', desc: 'Completed 100 strength workouts', earned: false },
  { title: '⚡ HIIT Champion', desc: 'Completed 50 HIIT sessions', earned: false },
];

const recentActivity = [
  { type: 'workout', label: 'Upper Body Power — 50 min', date: 'Today, 7:00 AM', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=80&h=80&fit=crop' },
  { type: 'nutrition', label: 'Logged Breakfast — 450 kcal', date: 'Today, 8:30 AM', img: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=80&h=80&fit=crop' },
  { type: 'progress', label: 'Logged weight — 75.5 kg', date: 'Yesterday', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=80&h=80&fit=crop' },
  { type: 'workout', label: 'Morning Run — 35 min', date: 'Sep 19', img: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=80&h=80&fit=crop' },
];

const typeColor = {
  workout: 'bg-emerald-500',
  nutrition: 'bg-rose-500',
  progress: 'bg-blue-500',
};

const typeIcon = {
  workout: <Dumbbell className="h-3.5 w-3.5 text-white" />,
  nutrition: <Apple className="h-3.5 w-3.5 text-white" />,
  progress: <TrendingUp className="h-3.5 w-3.5 text-white" />,
};

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-8 space-y-6 max-w-6xl">

          {/* ── Profile Hero Card ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Banner Image */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&h=400&fit=crop"
                alt="Profile Banner"
                className="w-full h-full object-cover"
              />
              {/* dark overlay so text is readable */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/40 to-slate-900/70" />

              {/* Edit button — absolute top-right of banner */}
              <Link
                to="/settings"
                className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-semibold shadow transition-all"
              >
                <Settings className="h-4 w-4" />
                Edit Profile
              </Link>
            </div>

            {/* Avatar + Info — BELOW banner, no negative margin overlap */}
            <div className="px-8 pt-0 pb-8">
              {/* Avatar sits at top, pulled up with negative margin safely */}
              <div className="flex flex-col sm:flex-row items-start gap-5 -mt-14 relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop"
                  alt="Avatar"
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-xl flex-shrink-0"
                />
                {/* Name + meta — pushed down to align with bottom of avatar */}
                <div className="pt-14 sm:pt-16 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">Alex Johnson</h1>
                      <p className="text-gray-400 text-sm mt-0.5">Fitness Enthusiast · Member since Jan 2026</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5"><Mail className="h-4 w-4 text-gray-400" /> alex@fittrackpro.com</span>
                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-gray-400" /> New York, USA</span>
                    <span className="flex items-center gap-1.5"><Phone className="h-4 w-4 text-gray-400" /> +1 (555) 234-5678</span>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-gray-500 text-sm leading-relaxed max-w-2xl">
                Fitness enthusiast committed to building strength, improving endurance, and living a healthier life.
                Currently focused on cutting body fat while maintaining muscle mass.
              </p>
            </div>
          </motion.div>

          {/* ── Stats Row ─────────────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ label, value, icon: Icon, color, bg, border }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className={`${bg} border ${border} p-5 rounded-2xl`}
              >
                <Icon className={`h-6 w-6 ${color} mb-3`} />
                <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
                <p className="text-xs text-gray-500 font-medium mt-1">{label}</p>
              </motion.div>
            ))}
          </div>

          {/* ── Achievements + Recent Activity ────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Achievements */}
            <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-extrabold text-slate-900 mb-5 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Achievements
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {achievements.map(({ title, desc, earned }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06 }}
                    className={`p-4 rounded-2xl border flex flex-col gap-1 ${
                      earned
                        ? 'bg-emerald-50 border-emerald-100'
                        : 'bg-gray-50 border-gray-100'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className={`font-bold text-sm ${earned ? 'text-slate-900' : 'text-gray-400'}`}>{title}</p>
                      {earned
                        ? <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        : <Lock className="h-4 w-4 text-gray-300 flex-shrink-0 mt-0.5" />
                      }
                    </div>
                    <p className={`text-xs leading-snug ${earned ? 'text-gray-500' : 'text-gray-400'}`}>{desc}</p>
                    {earned && (
                      <span className="mt-1 self-start text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                        Earned
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-extrabold text-slate-900 mb-5">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.map((act, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                  >
                    {/* Activity image with icon overlay */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={act.img}
                        alt={act.type}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${typeColor[act.type]} rounded-full flex items-center justify-center shadow`}>
                        {typeIcon[act.type]}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{act.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{act.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Goals mini cards */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 p-4 rounded-2xl">
                  <p className="text-xs text-gray-500 font-medium">Fitness Goal</p>
                  <p className="text-sm font-extrabold text-slate-900 mt-1">Build Muscle</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 p-4 rounded-2xl">
                  <p className="text-xs text-gray-500 font-medium">Target Weight</p>
                  <p className="text-sm font-extrabold text-slate-900 mt-1">72 kg</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
