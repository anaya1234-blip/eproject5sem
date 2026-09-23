import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, Dumbbell, Apple, TrendingUp, Clock, Flame, ChevronRight } from 'lucide-react';

const ACTIVITIES = [
  {
    id: 1,
    type: 'workout',
    title: 'Upper Body Power',
    detail: '50 min · 380 kcal',
    time: 'Today, 7:00 AM',
    badge: 'Strength',
    badgeColor: 'bg-blue-100 text-blue-700',
    icon: Dumbbell,
    iconBg: 'bg-blue-500',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=80&h=80&fit=crop',
  },
  {
    id: 2,
    type: 'nutrition',
    title: 'Breakfast Logged',
    detail: 'Oatmeal, Egg, Coffee · 450 kcal',
    time: 'Today, 8:30 AM',
    badge: 'Breakfast',
    badgeColor: 'bg-yellow-100 text-yellow-700',
    icon: Apple,
    iconBg: 'bg-rose-500',
    image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=80&h=80&fit=crop',
  },
  {
    id: 3,
    type: 'workout',
    title: 'Morning Run',
    detail: '35 min · 310 kcal',
    time: 'Yesterday, 6:30 AM',
    badge: 'Cardio',
    badgeColor: 'bg-orange-100 text-orange-700',
    icon: Activity,
    iconBg: 'bg-orange-500',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=80&h=80&fit=crop',
  },
  {
    id: 4,
    type: 'progress',
    title: 'Weight Updated',
    detail: '75.5 kg · −0.4 kg from last entry',
    time: 'Yesterday',
    badge: 'Progress',
    badgeColor: 'bg-purple-100 text-purple-700',
    icon: TrendingUp,
    iconBg: 'bg-purple-500',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=80&h=80&fit=crop',
  },
  {
    id: 5,
    type: 'nutrition',
    title: 'Lunch Logged',
    detail: 'Chicken Salad, Apple · 750 kcal',
    time: 'Yesterday, 1:00 PM',
    badge: 'Lunch',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    icon: Apple,
    iconBg: 'bg-emerald-500',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=80&h=80&fit=crop',
  },
];

const RecentActivity = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
        <Link
          to="/workouts"
          className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 transition-colors"
        >
          View All <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-gray-50">
        {ACTIVITIES.map((act, i) => {
          const Icon = act.icon;
          return (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/70 transition-colors group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative flex-shrink-0">
                <img
                  src={act.image}
                  alt={act.title}
                  className="w-12 h-12 rounded-xl object-cover shadow group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${act.iconBg} rounded-full flex items-center justify-center shadow`}>
                  <Icon className="h-3 w-3 text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-slate-900 truncate">{act.title}</p>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${act.badgeColor}`}>
                    {act.badge}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                  <span>{act.detail}</span>
                </p>
              </div>

              {/* Time */}
              <div className="flex-shrink-0 text-right">
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {act.time}
                </p>
              </div>

              <ChevronRight className="h-4 w-4 text-gray-200 group-hover:text-emerald-500 transition-colors flex-shrink-0" />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default RecentActivity;
