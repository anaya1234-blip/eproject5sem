import api from './api';

/**
 * nutritionService — CRUD for meal logs and nutrition data.
 */

const MOCK_MEALS = [
  { id: '1', mealType: 'Breakfast', name: 'Oatmeal with Berries', calories: 300, protein: 12, carbs: 54, fats: 6, date: '2026-09-20' },
  { id: '2', mealType: 'Breakfast', name: 'Black Coffee', calories: 5, protein: 0, carbs: 0, fats: 0, date: '2026-09-20' },
  { id: '3', mealType: 'Breakfast', name: 'Boiled Egg', calories: 145, protein: 13, carbs: 1, fats: 10, date: '2026-09-20' },
  { id: '4', mealType: 'Lunch', name: 'Grilled Chicken Salad', calories: 500, protein: 45, carbs: 20, fats: 15, date: '2026-09-20' },
  { id: '5', mealType: 'Dinner', name: 'Baked Salmon', calories: 400, protein: 42, carbs: 0, fats: 22, date: '2026-09-20' },
];

const nutritionService = {
  /**
   * Get all meals for today or a specific date.
   */
  getMeals: async (date) => {
    // Replace with: return api.get(`/nutrition?date=${date}`);
    await new Promise((res) => setTimeout(res, 400));
    const filterDate = date || new Date().toISOString().split('T')[0];
    return MOCK_MEALS.filter((m) => m.date === filterDate);
  },

  /**
   * Log a new meal.
   */
  logMeal: async (mealData) => {
    // Replace with: return api.post('/nutrition', mealData);
    await new Promise((res) => setTimeout(res, 500));
    return {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      ...mealData,
    };
  },

  /**
   * Update a meal entry.
   */
  updateMeal: async (id, updates) => {
    // Replace with: return api.put(`/nutrition/${id}`, updates);
    await new Promise((res) => setTimeout(res, 400));
    return { id, ...updates };
  },

  /**
   * Delete a meal entry.
   */
  deleteMeal: async (id) => {
    // Replace with: return api.delete(`/nutrition/${id}`);
    await new Promise((res) => setTimeout(res, 300));
    return { success: true };
  },

  /**
   * Get daily macro totals.
   */
  getDailyTotals: async (date) => {
    // Replace with: return api.get(`/nutrition/totals?date=${date}`);
    await new Promise((res) => setTimeout(res, 350));
    return {
      calories: { consumed: 1850, goal: 2400 },
      protein: { consumed: 120, goal: 160 },
      carbs: { consumed: 200, goal: 250 },
      fats: { consumed: 55, goal: 70 },
      water: { consumed: 6, goal: 8 },
    };
  },

  /**
   * Search food items (mock).
   */
  searchFood: async (query) => {
    // Replace with: return api.get(`/nutrition/search?q=${encodeURIComponent(query)}`);
    await new Promise((res) => setTimeout(res, 300));
    const foods = [
      { name: 'Grilled Chicken Breast', calories: 165, protein: 31, carbs: 0, fats: 3.6, per: '100g' },
      { name: 'Brown Rice (cooked)', calories: 216, protein: 5, carbs: 45, fats: 1.8, per: '1 cup' },
      { name: 'Avocado', calories: 234, protein: 2.9, carbs: 12, fats: 21, per: '1 medium' },
      { name: 'Greek Yogurt', calories: 100, protein: 17, carbs: 6, fats: 0.7, per: '170g' },
      { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fats: 0.4, per: '1 medium' },
      { name: 'Almonds', calories: 164, protein: 6, carbs: 6, fats: 14, per: '28g' },
    ];
    return foods.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()));
  },
};

export default nutritionService;
