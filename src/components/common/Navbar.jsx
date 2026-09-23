import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, Menu, X, Bell, ChevronDown,
  LayoutDashboard, Dumbbell, Apple, TrendingUp,
  User, Settings, LogOut, Shield, Zap
} from 'lucide-react';

/* ── Only public-facing links in navbar ────────────────────────────── */
const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Features', path: '/#features' },
  { name: 'How It Works', path: '/#how' },
  { name: 'Testimonials', path: '/#testimonials' },
];

const NOTIFICATIONS = [
  { id: 1, icon: '🔥', text: '30-day streak achieved!', time: '2h ago', unread: true },
  { id: 2, icon: '💧', text: "Don't forget your water intake.", time: '4h ago', unread: true },
  { id: 3, icon: '📊', text: 'Weight dropped 0.4 kg this week!', time: '1d ago', unread: false },
  { id: 4, icon: '🏋️', text: 'New PR on Bench Press logged!', time: '2d ago', unread: false },
];

const MOCK_USER = {
  name: 'Alex Johnson',
  email: 'alex@fittrackpro.com',
  role: 'Premium Member',
  avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=80&h=80&fit=crop',
};

/* ── User panel sections (admin-panel style) ───────────────────────── */
const USER_MENU_SECTIONS = [
  {
    label: 'My Panel',
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, desc: 'Overview & stats' },
      { label: 'My Profile', path: '/profile', icon: User, desc: 'View & edit profile' },
    ],
  },
  {
    label: 'Fitness',
    items: [
      { label: 'Workouts', path: '/workouts', icon: Dumbbell, desc: 'Log & track sessions' },
      { label: 'Nutrition', path: '/nutrition', icon: Apple, desc: 'Meals & macros' },
      { label: 'Progress', path: '/progress', icon: TrendingUp, desc: 'Charts & measurements' },
    ],
  },
  {
    label: 'Account',
    items: [
      { label: 'Settings', path: '/settings', icon: Settings, desc: 'Preferences & alerts' },
    ],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const location = useLocation();
  const notifRef = useRef(null);
  const userRef = useRef(null);

  const unread = notifications.filter((n) => n.unread).length;
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const markAllRead = () => setNotifications((n) => n.map((i) => ({ ...i, unread: false })));
  const closeAll = () => { setNotifOpen(false); setUserOpen(false); };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/30'
        : 'bg-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.08 }}
              transition={{ duration: 0.2 }}
              className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30"
            >
              <Activity className="h-5 w-5 text-white" />
            </motion.div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              FitTrack<span className="text-emerald-400">Pro</span>
            </span>
          </Link>

          {/* ── Desktop Nav — public links only ── */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ name, path }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={name}
                  to={path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    active
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-xl"
                    />
                  )}
                  <span className="relative">{name}</span>
                </Link>
              );
            })}
          </div>

          {/* ── Right side ── */}
          <div className="flex items-center gap-1.5">

            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => { setNotifOpen((o) => !o); setUserOpen(false); }}
                className="relative p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                {unread > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-slate-900"
                  />
                )}
              </motion.button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute right-0 mt-2 w-84 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                    style={{ width: 320 }}
                  >
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-slate-700" />
                        <h3 className="font-bold text-slate-900 text-sm">Notifications</h3>
                        {unread > 0 && (
                          <span className="bg-emerald-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                            {unread}
                          </span>
                        )}
                      </div>
                      {unread > 0 && (
                        <button onClick={markAllRead} className="text-xs text-emerald-600 font-semibold hover:underline">
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                      {notifications.map((n) => (
                        <motion.div
                          key={n.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`flex items-start gap-3 px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer ${n.unread ? 'bg-emerald-50/50' : ''}`}
                        >
                          <span className="text-xl flex-shrink-0 mt-0.5">{n.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-slate-900 font-medium leading-snug">{n.text}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                          </div>
                          {n.unread && <span className="w-2 h-2 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0" />}
                        </motion.div>
                      ))}
                    </div>
                    <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 text-center">
                      <Link
                        to="/dashboard"
                        className="text-sm text-emerald-600 font-semibold hover:underline"
                        onClick={closeAll}
                      >
                        View all in Dashboard →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── User Panel Dropdown (Admin-panel style) ── */}
            <div className="relative hidden md:block" ref={userRef}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => { setUserOpen((o) => !o); setNotifOpen(false); }}
                className={`flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl transition-all ${
                  userOpen ? 'bg-white/15' : 'hover:bg-white/10'
                }`}
              >
                <div className="relative">
                  <img
                    src={MOCK_USER.avatar}
                    alt="User"
                    className="w-8 h-8 rounded-xl object-cover ring-2 ring-emerald-400/50"
                  />
                  {/* Online dot */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-900" />
                </div>
                <div className="hidden xl:flex flex-col items-start">
                  <span className="text-sm font-semibold text-white leading-tight">{MOCK_USER.name.split(' ')[0]}</span>
                  <span className="text-xs text-emerald-400 leading-tight">{MOCK_USER.role}</span>
                </div>
                <motion.div animate={{ rotate: userOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </motion.div>
              </motion.button>

              {/* ── Dropdown Panel ── */}
              <AnimatePresence>
                {userOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                  >
                    {/* User info header */}
                    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 px-5 py-5">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={MOCK_USER.avatar}
                            alt={MOCK_USER.name}
                            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-400/40"
                          />
                          <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full ring-2 ring-slate-900" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-white truncate">{MOCK_USER.name}</p>
                          <p className="text-xs text-gray-400 truncate">{MOCK_USER.email}</p>
                          <div className="flex items-center gap-1 mt-1.5">
                            <Zap className="h-3 w-3 text-emerald-400" />
                            <span className="text-xs text-emerald-400 font-semibold">{MOCK_USER.role}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sections */}
                    <div className="p-2 max-h-80 overflow-y-auto">
                      {USER_MENU_SECTIONS.map((section, si) => (
                        <div key={si}>
                          {/* Section label */}
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 py-2 mt-1">
                            {section.label}
                          </p>
                          {section.items.map(({ label, path, icon: Icon, desc }) => (
                            <Link
                              key={path}
                              to={path}
                              onClick={() => setUserOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                            >
                              <div className="w-8 h-8 bg-gray-100 group-hover:bg-emerald-100 rounded-xl flex items-center justify-center transition-colors flex-shrink-0">
                                <Icon className="h-4 w-4 text-gray-500 group-hover:text-emerald-600 transition-colors" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-900">{label}</p>
                                <p className="text-xs text-gray-400 truncate">{desc}</p>
                              </div>
                            </Link>
                          ))}
                          {si < USER_MENU_SECTIONS.length - 1 && (
                            <div className="border-t border-gray-100 my-1" />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Sign out footer */}
                    <div className="border-t border-gray-100 p-2">
                      <Link
                        to="/"
                        onClick={() => setUserOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-rose-50 transition-colors group"
                      >
                        <div className="w-8 h-8 bg-rose-50 group-hover:bg-rose-100 rounded-xl flex items-center justify-center transition-colors flex-shrink-0">
                          <LogOut className="h-4 w-4 text-rose-500" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-rose-500">Sign Out</p>
                          <p className="text-xs text-gray-400">See you next time!</p>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Auth buttons — for guests (no user) */}
            <div className="hidden md:flex items-center gap-2 ml-1">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-400 hover:text-white px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 px-4 py-2 rounded-xl transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen
                  ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="h-6 w-6" /></motion.span>
                  : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="h-6 w-6" /></motion.span>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-slate-800 border-t border-slate-700"
          >
            <div className="px-4 py-4 space-y-1">
              {/* Public nav links */}
              {NAV_LINKS.map(({ name, path }) => (
                <Link
                  key={name}
                  to={path}
                  className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  {name}
                </Link>
              ))}

              <div className="border-t border-slate-700 pt-3 mt-2 space-y-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest px-4 py-1">My Panel</p>
                {USER_MENU_SECTIONS.flatMap((s) => s.items).map(({ label, path, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    <Icon className="h-4 w-4 text-gray-500" />
                    {label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-slate-700 pt-3 mt-2 flex flex-col gap-2">
                <Link to="/login" className="px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white rounded-xl hover:bg-slate-700 transition-colors">
                  Log In
                </Link>
                <Link to="/register" className="px-4 py-2.5 text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl text-center transition-colors">
                  Get Started Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
