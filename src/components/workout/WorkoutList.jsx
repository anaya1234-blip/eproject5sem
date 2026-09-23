import React from 'react';
import { motion } from 'framer-motion';
import WorkoutCard from './WorkoutCard';

const WorkoutList = ({ workouts }) => {
  if (!workouts || workouts.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
        <p className="text-gray-400 text-lg">No workouts logged yet. Add your first one!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {workouts.map((workout, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08 }}
        >
          <WorkoutCard workout={workout} />
        </motion.div>
      ))}
    </div>
  );
};

export default WorkoutList;
