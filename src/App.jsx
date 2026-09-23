import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';

// Layout
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import NutritionPage from './pages/NutritionPage';
import WorkoutPage from './pages/WorkoutPage';
import ProgressPage from './pages/ProgressPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

// Routes that use sidebar layout (no top navbar/footer)
const SIDEBAR_PATHS = ['/dashboard', '/workouts', '/nutrition', '/progress', '/profile', '/settings'];

function AppLayout() {
  const { pathname } = useLocation();
  const isSidebarPage = SIDEBAR_PATHS.some((p) => pathname.startsWith(p));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {!isSidebarPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/workouts" element={<WorkoutPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isSidebarPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <AppLayout />
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
