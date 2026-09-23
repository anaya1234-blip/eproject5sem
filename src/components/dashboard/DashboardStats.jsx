import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Flame, Clock, Target, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const cards = [
  {
    id: 'workouts',
    label: 'Workouts This Week',
    value: '4',
    sub: '+1 from last week',
    trend: 'up',
    icon: Dumbbell,
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'shadow-emerald-500/30',
    bg: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    border: 'border-emerald-100',
  },
  {
    id: 'calories',
    label: 'Calories Burned',
    value: '2,450',
    sub: 'kcal this week',
    trend: 'up',
    icon: Flame,
    gradient: 'from-orange-500 to-rose-500',
    glow: 'shadow-orange-500/30',
    bg: 'bg-orange-50',
    textColor: 'text-orange-600',
    border: 'border-orange-100',
  },
  {
    id: 'time',
    label: 'Active Time',
    value: '5h 20m',
    sub: 'Total this week',
    trend: 'same',
    icon: Clock,
    gradient: 'from-blue-500 to-indigo-500',
    glow: 'shadow-blue-500/30',
    bg: 'bg-blue-50',
    textColor: 'text-blue-600',
    border: 'border-blue-100',
  },
  {
    id: 'goal',
    label: 'Goal Progress',
    value: '68%',
    sub: 'Monthly target',
    trend: 'up',
    icon: Target,
    gradient: 'from-purple-500 to-pink-500',
    glow: 'shadow-purple-500/30',
    bg: 'bg-purple-50',
    textColor: 'text-purple-600',
    border: 'border-purple-100',
  },
];

const TrendIcon = ({ trend }) => {
  if (trend === 'up') return <TrendingUp className="h-3.5 w-3.5" />;
  if (trend === 'down') return <TrendingDown className="h-3.5 w-3.5" />;
  return <Minus className="h-3.5 w-3.5" />;
};

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={`relative overflow-hidden rounded-2xl border ${card.border} bg-white shadow-lg ${card.glow} p-6 cursor-default group`}
          >
            {/* 3D Glow blob */}
            <div className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br ${card.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />

            {/* Icon */}
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg ${card.glow} mb-4`}>
              <Icon className="h-6 w-6 text-white" />
            </div>

            <p className="text-sm font-medium text-gray-500 mb-1">{card.label}</p>
            <p className={`text-3xl font-extrabold ${card.textColor} mb-2 tracking-tight`}>{card.value}</p>

            <div className={`inline-flex items-center gap-1 text-xs font-semibold ${
              card.trend === 'up' ? 'text-emerald-600 bg-emerald-50' :
              card.trend === 'down' ? 'text-rose-600 bg-rose-50' :
              'text-gray-500 bg-gray-100'
            } px-2 py-1 rounded-lg`}>
              <TrendIcon trend={card.trend} />
              {card.sub}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
