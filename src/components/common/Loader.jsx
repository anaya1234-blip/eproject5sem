import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

/**
 * Loader — full-screen or inline loading spinner.
 * Props:
 *   fullScreen {boolean} — takes full viewport (default: true)
 *   message    {string}  — optional text below spinner
 */
const Loader = ({ fullScreen = true, message = 'Loading...' }) => {
  const wrapper = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm'
    : 'flex items-center justify-center py-16';

  return (
    <div className={wrapper}>
      <div className="flex flex-col items-center gap-5">
        {/* Spinning ring */}
        <div className="relative w-16 h-16">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-emerald-500/30"
          />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
          />
          {/* Logo in centre */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Activity className="h-6 w-6 text-emerald-400" />
            </motion.div>
          </div>
        </div>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-400 font-medium tracking-wide"
          >
            {message}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default Loader;
