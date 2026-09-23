import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const NutritionForm = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
    >
      <h2 className="text-xl font-bold text-slate-900 mb-6">Log New Meal</h2>
      
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Meal Type</label>
          <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 outline-none transition-all">
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Food Item</label>
          <input 
            type="text" 
            placeholder="e.g. Grilled Chicken Breast"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Calories</label>
            <input 
              type="number" 
              placeholder="kcal"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Protein (g)</label>
            <input 
              type="number" 
              placeholder="grams"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 outline-none transition-all"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors mt-6"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Food Entry
        </button>
      </form>
    </motion.div>
  );
};

export default NutritionForm;
