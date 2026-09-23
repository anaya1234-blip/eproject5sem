import React from 'react';
import { motion } from 'framer-motion';

const NutritionCard = ({ title, value, total, unit, icon, color }) => {
  const percentage = Math.min((parseInt(value.replace(/,/g, '')) / parseInt(total.replace(/,/g, ''))) * 100, 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between"
    >
      <div className="flex justify-between items-center mb-4">
        <div className={`p-3 rounded-2xl ${color.replace('bg-', 'bg-').replace('500', '100')} ${color.replace('bg-', 'text-').replace('500', '600')}`}>
          {icon}
        </div>
        <span className="text-sm font-semibold text-gray-500">{title}</span>
      </div>
      
      <div className="mb-4">
        <span className="text-3xl font-extrabold text-slate-900">{value}</span>
        <span className="text-gray-500 font-medium ml-1">/ {total} {unit}</span>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${color}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </motion.div>
  );
};

export default NutritionCard;
