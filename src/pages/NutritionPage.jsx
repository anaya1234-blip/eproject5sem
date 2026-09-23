import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NutritionForm from '../components/nutrition/NutritionForm';
import Meallog from '../components/nutrition/Meallog';
import NutritionCard from '../components/nutrition/NutritionCard';
import Sidebar from '../components/common/Sidebar';
import { Apple, Flame, Droplets, Target, Camera, ChevronRight } from 'lucide-react';

// Healthy food inspiration cards
const FOOD_INSPIRATION = [
  {
    name: 'Greek Salad Bowl',
    calories: 320,
    protein: '18g',
    time: '10 min',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80&fit=crop',
    tag: 'Lunch',
    tagColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    name: 'Grilled Salmon',
    calories: 410,
    protein: '42g',
    time: '20 min',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=80&fit=crop',
    tag: 'Dinner',
    tagColor: 'bg-blue-100 text-blue-700',
  },
  {
    name: 'Protein Smoothie',
    calories: 280,
    protein: '30g',
    time: '5 min',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&q=80&fit=crop',
    tag: 'Breakfast',
    tagColor: 'bg-yellow-100 text-yellow-700',
  },
  {
    name: 'Avocado Toast',
    calories: 350,
    protein: '14g',
    time: '8 min',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=500&q=80&fit=crop',
    tag: 'Breakfast',
    tagColor: 'bg-yellow-100 text-yellow-700',
  },
  {
    name: 'Chicken Rice Bowl',
    calories: 520,
    protein: '45g',
    time: '25 min',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80&fit=crop',
    tag: 'Lunch',
    tagColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    name: 'Mixed Berry Oatmeal',
    calories: 290,
    protein: '12g',
    time: '7 min',
    image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=500&q=80&fit=crop',
    tag: 'Breakfast',
    tagColor: 'bg-yellow-100 text-yellow-700',
  },
];

const NutritionPage = () => {
  const [meals, setMeals] = useState({
    breakfast: [
      { name: 'Oatmeal with Berries', cal: 300 },
      { name: 'Black Coffee', cal: 5 },
      { name: 'Boiled Egg', cal: 145 },
    ],
    lunch: [
      { name: 'Grilled Chicken Salad', cal: 500 },
      { name: 'Olive Oil Dressing', cal: 150 },
      { name: 'Apple', cal: 100 },
    ],
    dinner: [
      { name: 'Baked Salmon', cal: 400 },
      { name: 'Brown Rice', cal: 200 },
      { name: 'Steamed Broccoli', cal: 50 },
    ],
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 p-6 lg:p-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <Apple className="h-8 w-8 text-emerald-500" />
              Nutrition Tracker
            </h1>
            <p className="text-gray-500 mt-2">Monitor your daily food intake and macronutrients.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-6">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-500">Daily Calorie Goal</p>
              <p className="text-2xl font-bold text-slate-900">2,400 kcal</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-500">Consumed Today</p>
              <p className="text-2xl font-bold text-emerald-600">1,850 kcal</p>
            </div>
          </div>
        </div>

        {/* Macro Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <NutritionCard title="Calories" value="1,850" total="2,400" unit="kcal" icon={<Flame className="h-6 w-6 text-orange-500" />} color="bg-orange-500" />
          <NutritionCard title="Protein" value="120" total="160" unit="g" icon={<Target className="h-6 w-6 text-rose-500" />} color="bg-rose-500" />
          <NutritionCard title="Carbs" value="200" total="250" unit="g" icon={<Apple className="h-6 w-6 text-emerald-500" />} color="bg-emerald-500" />
          <NutritionCard title="Fats" value="55" total="70" unit="g" icon={<Droplets className="h-6 w-6 text-yellow-500" />} color="bg-yellow-500" />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Log Form */}
          <div className="lg:col-span-1">
            <NutritionForm />
          </div>

          {/* Meal Log */}
          <div className="lg:col-span-2 space-y-5">
            <Meallog
              mealType="Breakfast"
              calories="450"
              items={meals.breakfast}
            />
            <Meallog
              mealType="Lunch"
              calories="750"
              items={meals.lunch}
            />
            <Meallog
              mealType="Dinner"
              calories="650"
              items={meals.dinner}
            />
          </div>
        </div>

        {/* Food Inspiration Section */}
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Healthy Meal Ideas</h2>
              <p className="text-gray-500 text-sm mt-1">Quick, nutritious meals to fuel your fitness journey.</p>
            </div>
            <span className="text-sm text-emerald-600 font-medium flex items-center gap-1 cursor-pointer hover:text-emerald-700">
              See all <ChevronRight className="h-4 w-4" />
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FOOD_INSPIRATION.map((food, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group cursor-pointer"
              >
                {/* Food Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${food.tagColor}`}>
                    {food.tag}
                  </span>
                  <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-lg hover:bg-white transition-colors">
                    <Camera className="h-3.5 w-3.5 text-gray-600" />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-base mb-3">{food.name}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <span className="font-semibold text-slate-900">{food.calories}</span> kcal
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="h-4 w-4 text-rose-500" />
                      <span className="font-semibold text-slate-900">{food.protein}</span> protein
                    </span>
                    <span className="text-gray-500">⏱ {food.time}</span>
                  </div>
                  <button className="mt-4 w-full bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-100 text-gray-700 text-sm font-medium py-2.5 rounded-xl transition-all">
                    + Add to Log
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Water Intake Tracker */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Droplets className="h-6 w-6 text-blue-500" />
                Water Intake
              </h2>
              <p className="text-sm text-gray-500 mt-1">Goal: 8 glasses (2.5L) per day</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold text-blue-600">6 / 8</p>
              <p className="text-sm text-gray-500">glasses today</p>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                whileTap={{ scale: 0.9 }}
                className={`w-12 h-16 rounded-xl border-2 flex items-center justify-center cursor-pointer transition-all ${
                  i < 6
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <Droplets className={`h-6 w-6 ${i < 6 ? 'text-blue-500' : 'text-gray-300'}`} />
              </motion.div>
            ))}
          </div>
          <div className="mt-4 w-full bg-gray-100 rounded-full h-2">
            <div className="h-2 rounded-full bg-blue-500 transition-all" style={{ width: '75%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionPage;
