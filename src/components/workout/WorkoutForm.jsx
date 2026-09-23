import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Dumbbell } from 'lucide-react';

const WorkoutForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: '',
    category: 'Strength',
    duration: '',
    calories: '',
    sets: '',
    notes: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAdd) onAdd(form);
    setForm({ name: '', category: 'Strength', duration: '', calories: '', sets: '', notes: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
    >
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Dumbbell className="h-5 w-5 text-emerald-500" />
        Log New Workout
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Workout Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder="e.g. Upper Body Power"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 outline-none transition-all"
          >
            {['Strength', 'Cardio', 'HIIT', 'Flexibility', 'Recovery'].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration (min)</label>
            <input
              name="duration"
              value={form.duration}
              onChange={handleChange}
              type="number"
              placeholder="45"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Calories</label>
            <input
              name="calories"
              value={form.calories}
              onChange={handleChange}
              type="number"
              placeholder="320"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sets</label>
            <input
              name="sets"
              value={form.sets}
              onChange={handleChange}
              type="number"
              placeholder="4"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            placeholder="How did it feel? Any PRs?"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 outline-none transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors mt-2"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Workout
        </button>
      </form>
    </motion.div>
  );
};

export default WorkoutForm;
