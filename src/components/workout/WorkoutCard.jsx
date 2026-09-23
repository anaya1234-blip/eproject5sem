import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Flame, Dumbbell, ChevronRight } from 'lucide-react';

const categoryColors = {
  Strength: 'bg-blue-100 text-blue-700',
  Cardio: 'bg-orange-100 text-orange-700',
  Flexibility: 'bg-purple-100 text-purple-700',
  HIIT: 'bg-rose-100 text-rose-700',
  Recovery: 'bg-teal-100 text-teal-700',
};

const WorkoutCard = ({ workout, onClick }) => {
  const { name, category, duration, calories, sets, date, image } = workout;
  const badgeClass = categoryColors[category] || 'bg-gray-100 text-gray-700';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer group"
    >
      {/* Workout Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${badgeClass}`}>
          {category}
        </span>
        <span className="absolute bottom-3 left-3 text-white font-bold text-lg drop-shadow">{name}</span>
      </div>

      {/* Stats Row */}
      <div className="px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-emerald-500" />
            {duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="h-4 w-4 text-orange-500" />
            {calories} kcal
          </span>
          <span className="flex items-center gap-1">
            <Dumbbell className="h-4 w-4 text-blue-500" />
            {sets} sets
          </span>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-emerald-500 transition-colors" />
      </div>
      <div className="px-5 pb-4 text-xs text-gray-400">{date}</div>
    </motion.div>
  );
};

export default WorkoutCard;
