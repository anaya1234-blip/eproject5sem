import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Dumbbell, Apple, Target, Clock, Plus, Trash2, Save, CheckCircle } from 'lucide-react';

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${checked ? 'bg-emerald-500' : 'bg-gray-300'}`}
  >
    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const RemindersForm = () => {
  const [saved, setSaved] = useState(false);

  const [workoutReminder, setWorkoutReminder] = useState({
    enabled: true,
    time: '07:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    message: "Time to crush your workout! 💪",
  });

  const [mealReminders, setMealReminders] = useState([
    { id: 1, label: 'Breakfast', time: '08:00', enabled: true },
    { id: 2, label: 'Lunch', time: '13:00', enabled: true },
    { id: 3, label: 'Dinner', time: '19:00', enabled: true },
    { id: 4, label: 'Snack', time: '16:00', enabled: false },
  ]);

  const [goalReminders, setGoalReminders] = useState([
    { id: 1, label: 'Log daily weight', time: '09:00', enabled: true },
    { id: 2, label: 'Weekly progress check', time: '10:00', enabled: true, dayOnly: 'Sun' },
    { id: 3, label: 'Hydration reminder', time: '12:00', enabled: false },
  ]);

  const toggleDay = (day) => {
    setWorkoutReminder((r) => ({
      ...r,
      days: r.days.includes(day) ? r.days.filter((d) => d !== day) : [...r.days, day],
    }));
  };

  const updateMeal = (id, field, value) => {
    setMealReminders((meals) => meals.map((m) => m.id === id ? { ...m, [field]: value } : m));
  };

  const addMeal = () => {
    setMealReminders((meals) => [...meals, { id: Date.now(), label: 'Custom Meal', time: '12:00', enabled: true }]);
  };

  const removeMeal = (id) => {
    setMealReminders((meals) => meals.filter((m) => m.id !== id));
  };

  const updateGoal = (id, field, value) => {
    setGoalReminders((goals) => goals.map((g) => g.id === id ? { ...g, [field]: value } : g));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* ── Workout Reminders ─────────────────────────────── */}
      <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-emerald-500" />
            Workout Reminders
          </h2>
          <Toggle checked={workoutReminder.enabled} onChange={(v) => setWorkoutReminder((r) => ({ ...r, enabled: v }))} />
        </div>

        <div className={`space-y-5 transition-opacity ${workoutReminder.enabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
          {/* Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <Clock className="h-4 w-4 text-gray-400" /> Reminder Time
              </label>
              <input
                type="time"
                value={workoutReminder.time}
                onChange={(e) => setWorkoutReminder((r) => ({ ...r, time: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 bg-gray-50 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom Message</label>
              <input
                type="text"
                value={workoutReminder.message}
                onChange={(e) => setWorkoutReminder((r) => ({ ...r, message: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 bg-gray-50 outline-none text-sm"
              />
            </div>
          </div>

          {/* Day selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Repeat on Days</label>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    workoutReminder.days.includes(day)
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3 flex items-center gap-3">
            <Bell className="h-5 w-5 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-emerald-800">Reminder Preview</p>
              <p className="text-xs text-emerald-600 mt-0.5">
                Every {workoutReminder.days.join(', ')} at {workoutReminder.time} — "{workoutReminder.message}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Meal Time Reminders ───────────────────────────── */}
      <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Apple className="h-5 w-5 text-rose-500" />
            Meal Time Reminders
          </h2>
          <button
            type="button"
            onClick={addMeal}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-xl transition-colors"
          >
            <Plus className="h-3.5 w-3.5" /> Add Meal
          </button>
        </div>

        <div className="space-y-3">
          {mealReminders.map((meal) => (
            <motion.div
              key={meal.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl"
            >
              <Toggle checked={meal.enabled} onChange={(v) => updateMeal(meal.id, 'enabled', v)} />
              <input
                type="text"
                value={meal.label}
                onChange={(e) => updateMeal(meal.id, 'label', e.target.value)}
                className={`flex-1 bg-transparent text-sm font-semibold outline-none ${meal.enabled ? 'text-slate-900' : 'text-gray-400'}`}
              />
              <input
                type="time"
                value={meal.time}
                onChange={(e) => updateMeal(meal.id, 'time', e.target.value)}
                className={`text-sm font-mono border border-gray-200 rounded-xl px-3 py-1.5 bg-white outline-none focus:ring-2 focus:ring-emerald-500 ${meal.enabled ? '' : 'opacity-50'}`}
              />
              <button
                type="button"
                onClick={() => removeMeal(meal.id)}
                className="text-gray-300 hover:text-rose-400 transition-colors p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Goal & Fitness Reminders ──────────────────────── */}
      <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <Target className="h-5 w-5 text-purple-500" />
          Goal & Fitness Reminders
        </h2>

        <div className="space-y-3">
          {goalReminders.map((goal) => (
            <div key={goal.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
              <Toggle checked={goal.enabled} onChange={(v) => updateGoal(goal.id, 'enabled', v)} />
              <span className={`flex-1 text-sm font-semibold ${goal.enabled ? 'text-slate-900' : 'text-gray-400'}`}>
                {goal.label}
              </span>
              {goal.dayOnly && (
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-semibold">
                  {goal.dayOnly}
                </span>
              )}
              <input
                type="time"
                value={goal.time}
                onChange={(e) => updateGoal(goal.id, 'time', e.target.value)}
                className={`text-sm font-mono border border-gray-200 rounded-xl px-3 py-1.5 bg-white outline-none focus:ring-2 focus:ring-purple-400 ${goal.enabled ? '' : 'opacity-50'}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Save Button ───────────────────────────────────── */}
      <button
        type="button"
        onClick={handleSave}
        className={`flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm transition-all shadow ${
          saved
            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
            : 'bg-slate-900 hover:bg-slate-800 text-white hover:shadow-lg'
        }`}
      >
        {saved ? <CheckCircle className="h-4 w-4" /> : <Save className="h-4 w-4" />}
        {saved ? 'Reminders Saved!' : 'Save All Reminders'}
      </button>
    </motion.div>
  );
};

export default RemindersForm;
