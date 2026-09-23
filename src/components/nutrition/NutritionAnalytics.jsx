import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Flame, TrendingUp, Droplets } from 'lucide-react';

/* ── SVG Donut / Pie chart ─────────────────────────────────────────── */
const DonutChart = ({ segments, centerLabel, centerSub }) => {
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  const r = 52, cx = 60, cy = 60, strokeW = 18;
  const circumference = 2 * Math.PI * r;
  let cumulative = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <svg width={120} height={120} viewBox="0 0 120 120" className="flex-shrink-0">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={strokeW} />
        {segments.map((seg, i) => {
          const pct = seg.value / total;
          const dash = `${pct * circumference} ${circumference}`;
          const rotation = (cumulative / total) * 360 - 90;
          cumulative += seg.value;
          return (
            <motion.circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeW}
              strokeDasharray={dash}
              strokeLinecap="butt"
              transform={`rotate(${rotation} ${cx} ${cy})`}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.9, delay: i * 0.15 }}
              style={{ strokeDashoffset: 0 }}
            />
          );
        })}
        {/* Center text */}
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a">
          {centerLabel}
        </text>
        <text x={cx} y={cy + 13} textAnchor="middle" fontSize="9" fill="#64748b">
          {centerSub}
        </text>
      </svg>

      {/* Legend */}
      <div className="flex flex-col gap-2.5 flex-1">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: seg.color }} />
            <span className="text-sm text-gray-600 flex-1">{seg.label}</span>
            <span className="text-sm font-bold text-slate-900">{seg.value}{seg.unit}</span>
            <span className="text-xs text-gray-400 w-8 text-right">{Math.round((seg.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── SVG Mini Line Chart (7-day trend) ─────────────────────────────── */
const TrendLine = ({ data, color, unit }) => {
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values, min + 1);
  const W = 280, H = 80, pad = 12;

  const pts = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (W - pad * 2);
    const y = H - pad - ((v - min) / (max - min)) * (H - pad * 2);
    return `${x},${y}`;
  });

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 80 }}>
        {/* Area */}
        <defs>
          <linearGradient id={`tg-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points={`${pad},${H - pad} ${pts.join(' ')} ${W - pad},${H - pad}`}
          fill={`url(#tg-${color})`}
        />
        <polyline
          points={pts.join(' ')}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {pts.map((p, i) => {
          const [x, y] = p.split(',');
          return <circle key={i} cx={x} cy={y} r="3.5" fill={color} stroke="white" strokeWidth="2" />;
        })}
      </svg>
      <div className="flex justify-between text-xs text-gray-400 mt-1 px-1">
        {data.map((d) => <span key={d.label}>{d.label}</span>)}
      </div>
    </div>
  );
};

/* ── Main NutritionAnalytics ───────────────────────────────────────── */
const NutritionAnalytics = () => {
  const macros = [
    { label: 'Protein', value: 120, unit: 'g', color: '#f43f5e' },
    { label: 'Carbs', value: 200, unit: 'g', color: '#10b981' },
    { label: 'Fats', value: 55, unit: 'g', color: '#f59e0b' },
  ];

  const calorieTrend = [
    { label: 'Mon', value: 2100 }, { label: 'Tue', value: 1950 },
    { label: 'Wed', value: 2300 }, { label: 'Thu', value: 1850 },
    { label: 'Fri', value: 2050 }, { label: 'Sat', value: 1700 }, { label: 'Sun', value: 2200 },
  ];

  const proteinTrend = [
    { label: 'Mon', value: 140 }, { label: 'Tue', value: 120 },
    { label: 'Wed', value: 155 }, { label: 'Thu', value: 110 },
    { label: 'Fri', value: 130 }, { label: 'Sat', value: 95 }, { label: 'Sun', value: 145 },
  ];

  const avgCalories = Math.round(calorieTrend.reduce((a, d) => a + d.value, 0) / calorieTrend.length);
  const goalCalories = 2400;
  const goalPct = Math.round((avgCalories / goalCalories) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <PieChart className="h-5 w-5 text-rose-500" />
          Nutrition Analytics
        </h2>
        <span className="text-xs font-semibold bg-rose-50 text-rose-600 px-3 py-1.5 rounded-full">
          This Week
        </span>
      </div>

      <div className="p-7 space-y-7">

        {/* Weekly summary stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: <Flame className="h-4 w-4 text-orange-500" />, label: 'Avg Calories', value: `${avgCalories}`, sub: `/ ${goalCalories} kcal`, bg: 'bg-orange-50' },
            { icon: <TrendingUp className="h-4 w-4 text-emerald-600" />, label: 'Goal Hit', value: `${goalPct}%`, sub: 'of daily target', bg: 'bg-emerald-50' },
            { icon: <Droplets className="h-4 w-4 text-blue-500" />, label: 'Avg Water', value: '6.2', sub: 'glasses / day', bg: 'bg-blue-50' },
          ].map((s, i) => (
            <div key={i} className={`${s.bg} rounded-2xl p-4`}>
              {s.icon}
              <p className="text-lg font-extrabold text-slate-900 mt-2 leading-none">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Macronutrient Donut */}
        <div>
          <p className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <PieChart className="h-4 w-4 text-purple-500" />
            Macronutrient Distribution — Today
          </p>
          <DonutChart
            segments={macros}
            centerLabel="375g"
            centerSub="total macros"
          />
        </div>

        {/* Calorie intake trend */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              Calorie Intake — 7 Day Trend
            </p>
            <span className="text-xs text-gray-400">Goal: {goalCalories} kcal</span>
          </div>
          {/* Goal line indicator */}
          <div className="mb-2 flex items-center gap-2">
            <div className="h-px flex-1 border-t-2 border-dashed border-orange-300" />
            <span className="text-xs text-orange-400 font-semibold">Goal</span>
          </div>
          <TrendLine data={calorieTrend} color="#f97316" unit=" kcal" />
        </div>

        {/* Protein trend */}
        <div>
          <p className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-rose-500" />
            Protein Intake — 7 Day Trend
          </p>
          <TrendLine data={proteinTrend} color="#f43f5e" unit="g" />
        </div>

        {/* Macro progress bars */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-900">Today's Macro Goals</p>
          {[
            { label: 'Protein', current: 120, goal: 160, color: 'bg-rose-500', pct: 75 },
            { label: 'Carbohydrates', current: 200, goal: 250, color: 'bg-emerald-500', pct: 80 },
            { label: 'Fats', current: 55, goal: 70, color: 'bg-yellow-500', pct: 79 },
            { label: 'Fiber', current: 22, goal: 30, color: 'bg-blue-500', pct: 73 },
          ].map((m) => (
            <div key={m.label}>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-gray-700">{m.label}</span>
                <span className="text-gray-500">{m.current}g / {m.goal}g</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${m.pct}%` }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className={`h-full rounded-full ${m.color}`}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </motion.div>
  );
};

export default NutritionAnalytics;
