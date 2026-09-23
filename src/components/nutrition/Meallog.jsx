import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Meallog = ({ mealType, calories, items }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="bg-slate-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900">{mealType}</h3>
        <span className="text-emerald-600 font-bold bg-emerald-100 px-3 py-1 rounded-full text-sm">
          {calories} kcal
        </span>
      </div>
      
      <div className="divide-y divide-gray-50">
        {items && items.map((item, idx) => (
          <div key={idx} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="flex flex-col">
              <span className="text-gray-900 font-medium">{item.name}</span>
              <span className="text-sm text-gray-500">{item.cal} kcal</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-emerald-500 transition-colors" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Meallog;
