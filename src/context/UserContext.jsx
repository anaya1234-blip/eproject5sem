import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

const defaultStats = {
  totalWorkouts: 124,
  caloriesBurned: 48200,
  mealsLogged: 310,
  daysActive: 87,
  currentWeight: 75.5,
  targetWeight: 72,
  bodyFat: 19.5,
  weeklyGoal: 5,
  weeklyDone: 4,
};

export const UserProvider = ({ children }) => {
  const [stats, setStats] = useState(defaultStats);
  const [preferences, setPreferences] = useState({
    units: 'metric',
    calorieGoal: 2400,
    fitnessGoal: 'Build Muscle',
    darkMode: false,
  });
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'achievement', message: '🔥 You completed a 30-day streak!', time: '2h ago', read: false },
    { id: 2, type: 'reminder', message: '💧 Don\'t forget to log your water intake.', time: '4h ago', read: false },
    { id: 3, type: 'insight', message: '📊 Your weight dropped 0.4 kg this week!', time: '1d ago', read: true },
    { id: 4, type: 'reminder', message: '🏋️ Leg day is scheduled for today.', time: '1d ago', read: true },
  ]);

  const updateStats = (updates) => setStats((s) => ({ ...s, ...updates }));
  const updatePreferences = (updates) => setPreferences((p) => ({ ...p, ...updates }));
  const markAllRead = () => setNotifications((n) => n.map((item) => ({ ...item, read: true })));
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <UserContext.Provider value={{
      stats, updateStats,
      preferences, updatePreferences,
      notifications, markAllRead, unreadCount,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUserContext must be used within UserProvider');
  return ctx;
};

export default UserContext;
