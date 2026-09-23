import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, Flame, Clock, Dumbbell, ChevronRight } from 'lucide-react';

/* ── Reusable SVG Bar Chart ────────────────────────────────────────── */
const BarChart = ({ data, color, unit }) => {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-2 h-28">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-xs font-semibold text-slate-700">{d.value > 0 ? d.value : ''}</span>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(d.value / max) * 88}px` }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: 'easeOut' }}
            className={`w-full rounded-t-lg ${color}`}
            style={{ minHeight: d.value > 0 ? 6 : 0 }}
            title={`${d.label}: ${d.value}${unit}`}
          />
          <span className="text-xs text-gray-400 font-medium">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

/* ── Donut Chart (category distribution) ──────────────────────────── */
const DonutChart = ({ segments }) => {
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  let cumulative = 0;
  const r = 36, cx = 44, cy = 44, strokeW = 14;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="flex items-center gap-6">
      <svg width={88} height={88} viewBox="0 0 88 88">
        {/* Background ring */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={strokeW} />
        {segments.map((seg, i) => {
          const pct = seg.value / total;
          const dashArray = `${pct * circumference} ${circumference}`;
          const rotation = (cumulative / total) * 360 - 90;
          cumulative += seg.value;
          return (
            <motion.circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeW}
              strokeDasharray={dashArray}
              strokeLinecap="round"
              transform={`rotate(${rotation} ${cx} ${cy})`}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1, delay: i * 0.2 }}
              style={{ strokeDashoffset: 0 }}
            />
          );
        })}
        <text x={cx} y={cy + 5} textAnchor="middle" className="text-xs font-bold" fontSize="11" fill="#0f172a">
          {total}
        </text>
      </svg>
      <div className="space-y-2">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: seg.color }} />
            <span className="text-xs text-gray-600 font-medium">{seg.label}</span>
            <span className="text-xs font-bold text-slate-900 ml-auto">{Math.round((seg.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Main WorkoutAnalytics ─────────────────────────────────────────── */
const WorkoutAnalytics = ({ workouts = [] }) => {
  const [period, setPeriod] = useState('week');

  /* ── Weekly frequency (Mon–Sun) ── */
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeklyData = dayLabels.map((label, i) => ({
    label,
    value: workouts.filter((_, wi) => wi % 7 === i).length,
  }));
  // fallback sample if no real data
  const sampleWeekly = [
    { label: 'Mon', value: 1 }, { label: 'Tue', value: 2 }, { label: 'Wed', value: 1 },
    { label: 'Thu', value: 2 }, { label: 'Fri', value: 1 }, { label: 'Sat', value: 0 }, { label: 'Sun', value: 0 },
  ];
  const freqData = workouts.length ? weeklyData : sampleWeekly;

  /* ── Calories burned per day ── */
  const calData = dayLabels.map((label, i) => ({
    label,
    value: workouts.filter((_, wi) => wi % 7 === i).reduce((a, w) => a + (Number(w.calories) || 0), 0),
  }));
  const sampleCal = [
    { label: 'Mon', value: 380 }, { label: 'Tue', value: 420 }, { label: 'Wed', value: 310 },
    { label: 'Thu', value: 440 }, { label: 'Fri', value: 150 }, { label: 'Sat', value: 0 }, { label: 'Sun', value: 0 },
  ];
  const calChartData = workouts.length ? calData : sampleCal;

  /* ── Category distribution ── */
  const cats = ['Strength', 'Cardio', 'HIIT', 'Flexibility', 'Recovery'];
  const catColors = ['#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#06b6d4'];
  const sourceWorkouts = workouts.length ? workouts : [
    { category: 'Strength' }, { category: 'Strength' }, { category: 'Cardio' },
    { category: 'HIIT' }, { category: 'Strength' }, { category: 'Flexibility' },
  ];
  const segments = cats
    .map((cat, i) => ({
      label: cat,
      color: catColors[i],
      value: sourceWorkouts.filter((w) => w.category === cat).length,
    }))
    .filter((s) => s.value > 0);

  /* ── Summary stats ── */
  const totalWorkouts = sourceWorkouts.length;
  const totalCals = sourceWorkouts.reduce((a, w) => a + (Number(w.calories) || 350), 0);
  const totalMins = sourceWorkouts.reduce((a, w) => a + (Number(w.duration) || 45), 0);
  const avgDuration = Math.round(totalMins / totalWorkouts) || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-emerald-500" />
          Workout Analytics
        </h2>
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {['week', 'month'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${
                period === p ? 'bg-white text-slate-900 shadow' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="p-7 space-y-7">
        {/* Summary row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: <Dumbbell className="h-4 w-4 text-emerald-600" />, label: 'Total Sessions', value: totalWorkouts, bg: 'bg-emerald-50' },
            { icon: <Flame className="h-4 w-4 text-orange-600" />, label: 'Calories Burned', value: `${totalCals.toLocaleString()} kcal`, bg: 'bg-orange-50' },
            { icon: <Clock className="h-4 w-4 text-blue-600" />, label: 'Avg Duration', value: `${avgDuration} min`, bg: 'bg-blue-50' },
          ].map((s, i) => (
            <div key={i} className={`${s.bg} rounded-2xl p-4`}>
              {s.icon}
              <p className="text-lg font-extrabold text-slate-900 mt-2 leading-none">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Frequency bar chart */}
        <div>
          <p className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            Workout Frequency
          </p>
          <BarChart data={freqData} color="bg-emerald-500" unit=" sessions" />
        </div>

        {/* Calories bar chart */}
        <div>
          <p className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-500" />
            Calories Burned Per Day
          </p>
          <BarChart data={calChartData} color="bg-orange-400" unit=" kcal" />
        </div>

        {/* Category donut */}
        <div>
          <p className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-purple-500" />
            Workout Type Distribution
          </p>
          <DonutChart segments={segments} />
        </div>
      </div>
    </motion.div>
  );
};

export default WorkoutAnalytics;
