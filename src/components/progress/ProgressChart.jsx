import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

// Simple SVG-based line chart — no external chart library needed
const LineChart = ({ data, color, label, unit }) => {
  if (!data || data.length === 0) return null;

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const width = 400;
  const height = 120;
  const padding = 20;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((d.value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const polyline = points.join(' ');
  const lastValue = values[values.length - 1];
  const firstValue = values[0];
  const trend = lastValue - firstValue;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <div className="flex items-center gap-1 text-sm font-semibold">
          {trend > 0 ? (
            <><TrendingUp className="h-4 w-4 text-rose-500" /><span className="text-rose-500">+{trend.toFixed(1)}{unit}</span></>
          ) : trend < 0 ? (
            <><TrendingDown className="h-4 w-4 text-emerald-500" /><span className="text-emerald-500">{trend.toFixed(1)}{unit}</span></>
          ) : (
            <><Minus className="h-4 w-4 text-gray-400" /><span className="text-gray-400">No change</span></>
          )}
        </div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height: 120 }}>
        <defs>
          <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Area fill */}
        <polygon
          points={`${padding},${height - padding} ${polyline} ${padding + ((data.length - 1) / (data.length - 1)) * (width - padding * 2)},${height - padding}`}
          fill={`url(#grad-${label})`}
        />
        {/* Line */}
        <polyline points={polyline} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {/* Data points */}
        {points.map((p, i) => {
          const [x, y] = p.split(',');
          return (
            <circle key={i} cx={x} cy={y} r="4" fill={color} stroke="white" strokeWidth="2" />
          );
        })}
      </svg>
      <div className="flex justify-between text-xs text-gray-400">
        {data.map((d) => <span key={d.date}>{d.date}</span>)}
      </div>
    </div>
  );
};

const ProgressChart = ({ entries }) => {
  const [activeTab, setActiveTab] = useState('weight');

  const tabs = [
    { key: 'weight', label: 'Weight', unit: ' kg', color: '#10b981' },
    { key: 'bodyFat', label: 'Body Fat', unit: '%', color: '#f59e0b' },
    { key: 'waist', label: 'Waist', unit: ' cm', color: '#6366f1' },
  ];

  const activeTabData = tabs.find((t) => t.key === activeTab);

  const chartData = entries
    .filter((e) => e[activeTab])
    .map((e) => ({ date: e.date, value: parseFloat(e[activeTab]) }))
    .slice(-7);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
    >
      <h2 className="text-xl font-bold text-slate-900 mb-6">Progress Charts</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {chartData.length >= 2 ? (
        <LineChart
          data={chartData}
          color={activeTabData.color}
          label={activeTabData.label}
          unit={activeTabData.unit}
        />
      ) : (
        <div className="h-32 flex items-center justify-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-400 text-sm">Log at least 2 entries to see your chart</p>
        </div>
      )}
    </motion.div>
  );
};

export default ProgressChart;
