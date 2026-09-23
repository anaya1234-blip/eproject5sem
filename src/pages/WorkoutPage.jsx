import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Search, BarChart2, List } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import WorkoutForm from '../components/workout/WorkoutForm';
import WorkoutList from '../components/workout/WorkoutList';
import WorkoutAnalytics from '../components/workout/WorkoutAnalytics';

const DEFAULT_WORKOUTS = [
  {
    name: 'Upper Body Power',
    category: 'Strength',
    duration: 50,
    calories: 380,
    sets: 5,
    date: 'Today, 7:00 AM',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80&fit=crop',
  },
  {
    name: 'Morning Run',
    category: 'Cardio',
    duration: 35,
    calories: 310,
    sets: 1,
    date: 'Yesterday, 6:30 AM',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80&fit=crop',
  },
  {
    name: 'HIIT Blast',
    category: 'HIIT',
    duration: 25,
    calories: 420,
    sets: 6,
    date: 'Sep 18, 7:00 AM',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&fit=crop',
  },
  {
    name: 'Leg Day',
    category: 'Strength',
    duration: 60,
    calories: 440,
    sets: 6,
    date: 'Sep 17, 8:00 AM',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80&fit=crop',
  },
  {
    name: 'Yoga & Stretch',
    category: 'Flexibility',
    duration: 40,
    calories: 150,
    sets: 1,
    date: 'Sep 16, 7:30 AM',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80&fit=crop',
  },
  {
    name: 'Active Recovery',
    category: 'Recovery',
    duration: 30,
    calories: 120,
    sets: 1,
    date: 'Sep 15, 8:00 AM',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80&fit=crop',
  },
];

const CATEGORIES = ['All', 'Strength', 'Cardio', 'HIIT', 'Flexibility', 'Recovery'];

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState(DEFAULT_WORKOUTS);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [view, setView] = useState('log'); // 'log' | 'analytics'

  const handleAdd = (form) => {
    const categoryImages = {
      Strength: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80&fit=crop',
      Cardio: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80&fit=crop',
      HIIT: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&fit=crop',
      Flexibility: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80&fit=crop',
      Recovery: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80&fit=crop',
    };
    setWorkouts((prev) => [
      {
        ...form,
        date: 'Just now',
        image: categoryImages[form.category] || categoryImages.Strength,
      },
      ...prev,
    ]);
  };

  const filtered = workouts.filter((w) => {
    const matchCat = filter === 'All' || w.category === filter;
    const matchSearch = w.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalCalories = workouts.slice(0, 7).reduce((a, w) => a + (w.calories || 0), 0);
  const totalMinutes = workouts.slice(0, 7).reduce((a, w) => a + (w.duration || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 p-6 lg:p-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <Dumbbell className="h-8 w-8 text-emerald-500" />
              Workout Tracker
            </h1>
            <p className="text-gray-500 mt-1">Log your sessions and crush your goals.</p>
          </div>
          <div className="mt-4 md:mt-0 grid grid-cols-2 gap-4 text-right">
            <div>
              <p className="text-xs text-gray-500 font-medium">This Week</p>
              <p className="text-2xl font-bold text-slate-900">{workouts.slice(0, 7).length} sessions</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Calories Burned</p>
              <p className="text-2xl font-bold text-orange-500">{totalCalories.toLocaleString()} kcal</p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <WorkoutForm onAdd={handleAdd} />
          </div>

          {/* List */}
          <div className="lg:col-span-2 space-y-5">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search workouts..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      filter === c ? 'bg-slate-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <WorkoutList workouts={filtered} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPage;
