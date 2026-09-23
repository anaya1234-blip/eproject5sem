import api from './api';

/**
 * workoutService — CRUD operations for workouts.
 * Currently uses mock data. Replace api.get/post/put/delete calls
 * with your real backend endpoints when ready.
 */

const MOCK_WORKOUTS = [
  { id: '1', name: 'Upper Body Power', category: 'Strength', duration: 50, calories: 380, sets: 5, date: 'Sep 20, 2026' },
  { id: '2', name: 'Morning Run', category: 'Cardio', duration: 35, calories: 310, sets: 1, date: 'Sep 19, 2026' },
  { id: '3', name: 'HIIT Blast', category: 'HIIT', duration: 25, calories: 420, sets: 6, date: 'Sep 18, 2026' },
  { id: '4', name: 'Leg Day', category: 'Strength', duration: 60, calories: 440, sets: 6, date: 'Sep 17, 2026' },
  { id: '5', name: 'Yoga & Stretch', category: 'Flexibility', duration: 40, calories: 150, sets: 1, date: 'Sep 16, 2026' },
];

const workoutService = {
  /**
   * Get all workouts for the current user.
   */
  getAll: async () => {
    // Replace with: return api.get('/workouts');
    await new Promise((res) => setTimeout(res, 400));
    return MOCK_WORKOUTS;
  },

  /**
   * Get a single workout by id.
   */
  getById: async (id) => {
    // Replace with: return api.get(`/workouts/${id}`);
    await new Promise((res) => setTimeout(res, 300));
    return MOCK_WORKOUTS.find((w) => w.id === id) || null;
  },

  /**
   * Create a new workout entry.
   */
  create: async (workoutData) => {
    // Replace with: return api.post('/workouts', workoutData);
    await new Promise((res) => setTimeout(res, 500));
    return { id: Date.now().toString(), ...workoutData, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) };
  },

  /**
   * Update an existing workout.
   */
  update: async (id, updates) => {
    // Replace with: return api.put(`/workouts/${id}`, updates);
    await new Promise((res) => setTimeout(res, 500));
    return { id, ...updates };
  },

  /**
   * Delete a workout.
   */
  delete: async (id) => {
    // Replace with: return api.delete(`/workouts/${id}`);
    await new Promise((res) => setTimeout(res, 400));
    return { success: true };
  },

  /**
   * Get weekly summary stats.
   */
  getWeeklySummary: async () => {
    // Replace with: return api.get('/workouts/summary/weekly');
    await new Promise((res) => setTimeout(res, 400));
    return {
      totalSessions: 4,
      totalCalories: 2450,
      totalMinutes: 320,
      goal: 5,
      byCategory: { Strength: 2, Cardio: 1, HIIT: 1 },
    };
  },
};

export default workoutService;
