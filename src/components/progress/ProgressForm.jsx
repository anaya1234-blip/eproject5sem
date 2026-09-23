import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, TrendingUp } from 'lucide-react';

const ProgressForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    bodyFat: '',
    chest: '',
    waist: '',
    hips: '',
    notes: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAdd) onAdd(form);
    setForm({ date: new Date().toISOString().split('T')[0], weight: '', bodyFat: '', chest: '', waist: '', hips: '', notes: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
    >
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-emerald-500" />
        Log Measurements
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input
            name="date"
            value={form.date}
            onChange={handleChange}
            type="date"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
            <input
              name="weight"
              value={form.weight}
              onChange={handleChange}
              type="number"
              step="0.1"
              placeholder="72.5"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Body Fat (%)</label>
            <input
              name="bodyFat"
              value={form.bodyFat}
              onChange={handleChange}
              type="number"
              step="0.1"
              placeholder="18.5"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Chest (cm)', name: 'chest', ph: '98' },
            { label: 'Waist (cm)', name: 'waist', ph: '82' },
            { label: 'Hips (cm)', name: 'hips', ph: '95' },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 mb-2">{f.label}</label>
              <input
                name={f.name}
                value={form[f.name]}
                onChange={handleChange}
                type="number"
                placeholder={f.ph}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 outline-none transition-all"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={2}
            placeholder="How are you feeling? Any changes noticed?"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 outline-none transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors mt-2"
        >
          <Plus className="h-5 w-5 mr-2" />
          Save Measurements
        </button>
      </form>
    </motion.div>
  );
};

export default ProgressForm;
