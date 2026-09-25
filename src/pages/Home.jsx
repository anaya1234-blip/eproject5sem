import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Activity, TrendingUp, Heart, Dumbbell,
  Star, Shield, Zap, Users, Award, ChevronRight,
  Flame, Apple, Target, Clock, CheckCircle, Play
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── Hero image thumbnails shown on right side ─────────────────── */
const HERO_IMAGES = [
  {
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=85&fit=crop',
    label: 'Strength Training',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=85&fit=crop',
    label: 'HIIT & Cardio',
    color: 'from-orange-500 to-rose-500',
  },
  {
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=85&fit=crop',
    label: 'Nutrition Tracking',
    color: 'from-rose-500 to-pink-500',
  },
  {
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=85&fit=crop',
    label: 'Yoga & Recovery',
    color: 'from-purple-500 to-indigo-500',
  },
];

/* ─── Feature card ────────────────────────────────────────────────── */
const FeatureCard = ({ icon, title, desc, image, gradient, delay, link }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ delay, duration: 0.7, type: 'spring', stiffness: 100 }}
    whileHover={{ y: -8, scale: 1.01 }}
    className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer"
  >
    {/* Image container — fixed height, bg-slate-200 as fallback */}
    <div className="relative overflow-hidden" style={{ height: 220, backgroundColor: '#e2e8f0' }}>
      <img
        src={image}
        alt={title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        className="group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />
      {/* Icon badge */}
      <div className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-lg z-10`}>
        {icon}
      </div>
      {/* Title over image */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <h3 className="text-xl font-extrabold text-white drop-shadow">{title}</h3>
      </div>
    </div>
    <div className="px-6 py-5">
      <p className="text-gray-500 text-sm leading-relaxed mb-4">{desc}</p>
      <Link
        to={link}
        className="inline-flex items-center gap-1.5 text-emerald-600 text-sm font-bold hover:gap-3 transition-all duration-200"
      >
        Explore <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  </motion.div>
);

/* ─── Stat strip item ─────────────────────────────────────────────── */
const StatItem = ({ value, label, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="flex flex-col items-center text-center group"
  >
    <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-emerald-500/20 transition-colors">
      {icon}
    </div>
    <p className="text-3xl md:text-4xl font-extrabold text-white">{value}</p>
    <p className="text-gray-400 text-sm mt-1">{label}</p>
  </motion.div>
);

/* ─── Testimonial ─────────────────────────────────────────────────── */
const Testimonial = ({ name, role, avatar, text, rating, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -6 }}
    className="bg-white rounded-3xl p-7 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
  >
    <div className="flex gap-1 mb-4">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
      ))}
    </div>
    <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{text}"</p>
    <div className="flex items-center gap-3">
      <img src={avatar} alt={name} className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-100" />
      <div>
        <p className="font-bold text-slate-900 text-sm">{name}</p>
        <p className="text-xs text-gray-400">{role}</p>
      </div>
    </div>
  </motion.div>
);

/* ─── Main Home ───────────────────────────────────────────────────── */
const Home = () => {
  const [activeImg, setActiveImg] = useState(0);

  // Cycle active image thumbnail every 3s
  useEffect(() => {
    const t = setInterval(() => setActiveImg((i) => (i + 1) % HERO_IMAGES.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full overflow-x-hidden">

      {/* ════════════════════════════════════════════════════════
          HERO — YouTube Video Background + Image Cards
      ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">

        {/* ── YouTube iframe video background ── */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '130vw',
              height: '130vh',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/ml6cT4AZdqI?autoplay=1&mute=1&loop=1&playlist=ml6cT4AZdqI&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
              title="Fitness Background"
              allow="autoplay; encrypted-media"
              allowFullScreen={false}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                pointerEvents: 'none',
              }}
            />
          </div>
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />
          {/* Emerald bottom glow */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
        </div>

        {/* ── Main content ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT — Text content */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-sm font-semibold px-4 py-2 rounded-full mb-7"
              >
                <Zap className="h-4 w-4 fill-emerald-400 text-emerald-400" />
                Professional Fitness Analytics Platform
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.8 }}
                className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-none tracking-tight mb-6"
              >
                Elevate Your<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  Fitness Journey
                </span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-300 mb-8 leading-relaxed max-w-lg"
              >
                Track every rep, log every meal, and visualize your progress — all in one beautifully designed platform built for serious athletes.
              </motion.p>

              {/* Feature pills */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-2 mb-9"
              >
                {['Workout Tracking', 'Nutrition Logs', 'Progress Charts', 'Body Metrics', 'Goal Setting'].map((f, i) => (
                  <motion.span
                    key={f}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.75 + i * 0.08 }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 rounded-full"
                  >
                    <CheckCircle className="h-3 w-3" />
                    {f}
                  </motion.span>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 }}
                className="flex flex-col sm:flex-row gap-4 mb-10"
              >
                <Link
                  to="/register"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 shadow-[0_8px_32px_rgba(16,185,129,0.45)] hover:shadow-[0_12px_40px_rgba(16,185,129,0.65)] hover:-translate-y-1"
                >
                  <span className="relative z-10">Start Tracking Free</span>
                  <ArrowRight className="relative z-10 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/25 hover:bg-white/20 hover:border-white/45 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <Play className="h-5 w-5 fill-white" />
                  View Dashboard
                </Link>
              </motion.div>

              {/* Trust row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-wrap items-center gap-5 text-sm text-gray-400"
              >
                {[
                  { icon: <Shield className="h-4 w-4 text-emerald-400" />, label: 'Secure & Private' },
                  { icon: <Users className="h-4 w-4 text-cyan-400" />, label: '50K+ Athletes' },
                  { icon: <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />, label: '4.9 / 5 Rating' },
                ].map(({ icon, label }) => (
                  <span key={label} className="flex items-center gap-1.5">{icon} {label}</span>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — Image cards stack */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.9 }}
              className="hidden lg:flex flex-col gap-4"
            >
              {/* Big active image */}
              <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.7)] border border-white/10">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    src={HERO_IMAGES[activeImg].img}
                    alt={HERO_IMAGES[activeImg].label}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    style={{ width: '100%', height: 280, objectFit: 'cover', display: 'block' }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Active label */}
                <div className="absolute bottom-4 left-4 right-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImg}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${HERO_IMAGES[activeImg].color} inline-block`} />
                      <span className="text-white font-bold text-base">{HERO_IMAGES[activeImg].label}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* Live indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-white text-xs font-semibold">LIVE</span>
                </div>
              </div>

              {/* Thumbnail row */}
              <div className="grid grid-cols-4 gap-3">
                {HERO_IMAGES.map((item, i) => (
                  <motion.div
                    key={i}
                    onClick={() => setActiveImg(i)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                      activeImg === i
                        ? 'ring-2 ring-emerald-400 shadow-lg shadow-emerald-500/30'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={item.img}
                      alt={item.label}
                      style={{ width: '100%', height: 72, objectFit: 'cover', display: 'block' }}
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    {activeImg === i && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Stat mini cards */}
              <div className="grid grid-cols-3 gap-3 mt-1">
                {[
                  { icon: <Flame className="h-4 w-4 text-orange-500" />, value: '2,450', label: 'kcal burned', bg: 'bg-orange-50', border: 'border-orange-100' },
                  { icon: <Dumbbell className="h-4 w-4 text-emerald-600" />, value: '4 / 5', label: 'weekly goal', bg: 'bg-emerald-50', border: 'border-emerald-100' },
                  { icon: <TrendingUp className="h-4 w-4 text-blue-600" />, value: '-3.2kg', label: 'this month', bg: 'bg-blue-50', border: 'border-blue-100' },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + i * 0.12 }}
                    className={`${s.bg} border ${s.border} rounded-2xl p-3 flex flex-col gap-1`}
                  >
                    {s.icon}
                    <p className="text-base font-extrabold text-slate-900 leading-none">{s.value}</p>
                    <p className="text-xs text-gray-500">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="w-5 h-9 border-2 border-white/20 rounded-full flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-emerald-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════
          STATS STRIP
      ════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 py-16 border-y border-slate-800/60">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem value="50K+" label="Active Athletes" icon={<Users className="h-6 w-6 text-emerald-400" />} delay={0} />
            <StatItem value="2M+" label="Workouts Logged" icon={<Dumbbell className="h-6 w-6 text-blue-400" />} delay={0.1} />
            <StatItem value="98%" label="Satisfaction Rate" icon={<Heart className="h-6 w-6 text-rose-400" />} delay={0.2} />
            <StatItem value="4.9★" label="App Store Rating" icon={<Star className="h-6 w-6 text-yellow-400" />} delay={0.3} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FEATURES GRID
      ════════════════════════════════════════════════════════ */}
      <section id="features" className="py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
              Core Features
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
              Everything You Need to<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500">
                Crush Your Goals
              </span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              One platform to track, analyze, and optimize every aspect of your fitness journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            <FeatureCard
              delay={0}
              gradient="from-emerald-500 to-teal-600"
              icon={<Dumbbell className="h-6 w-6 text-white" />}
              title="Workout Tracker"
              desc="Log every exercise with sets, reps, weights, and duration. Filter by strength, cardio, HIIT or flexibility. Track personal records."
              image="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=700&q=85&fit=crop"
              link="/workouts"
            />
            <FeatureCard
              delay={0.12}
              gradient="from-rose-500 to-pink-600"
              icon={<Apple className="h-6 w-6 text-white" />}
              title="Nutrition Manager"
              desc="Track macros and calories for every meal. Explore a library of healthy recipes, log water intake, and hit your daily nutrition goals."
              image="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&q=85&fit=crop"
              link="/nutrition"
            />
            <FeatureCard
              delay={0.24}
              gradient="from-blue-500 to-indigo-600"
              icon={<TrendingUp className="h-6 w-6 text-white" />}
              title="Progress Analytics"
              desc="Visualize weight trends, body measurements, and performance stats with beautiful interactive charts and milestone tracking."
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=85&fit=crop"
              link="/progress"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          WORKOUT SHOWCASE — dark section
      ════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-600 rounded-full opacity-8 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-cyan-600 rounded-full opacity-8 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: image collage */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Main large image */}
              <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_-15px_rgba(0,0,0,0.8)]">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=90&fit=crop"
                  alt="Workout"
                  style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                {/* Overlay badge */}
                <div className="absolute bottom-5 left-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3">
                  <p className="text-white font-bold text-lg">Upper Body Power</p>
                  <p className="text-emerald-400 text-sm">50 min · 380 kcal burned</p>
                </div>
              </div>

              {/* Small floating cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-2xl p-4 z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Flame className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Calories Burned</p>
                    <p className="text-lg font-extrabold text-slate-900">2,450 kcal</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute -bottom-5 -left-5 bg-slate-900 rounded-2xl shadow-2xl p-4 z-10 border border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <Activity className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Weekly Sessions</p>
                    <p className="text-lg font-extrabold text-white">4 / 5 Done</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white space-y-7"
            >
              <span className="inline-block bg-emerald-500/15 text-emerald-400 text-xs font-bold px-4 py-1.5 rounded-full border border-emerald-500/30 uppercase tracking-widest">
                Smart Workout Tracking
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Train Smarter,<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Not Just Harder
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Our platform turns every sweat session into actionable data. Know exactly what's working, spot trends early, and make informed decisions about your training.
              </p>

              <div className="space-y-4">
                {[
                  'Log exercises with sets, reps & weights',
                  'Categorize by Strength, Cardio, HIIT, Flexibility',
                  'Track personal records & milestones',
                  'View weekly and monthly performance trends',
                  'Get insights to avoid plateaus',
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>

              <Link
                to="/workouts"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-1 group"
              >
                Start Logging Workouts
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          NUTRITION SHOWCASE — light section
      ════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-7 order-2 lg:order-1"
            >
              <span className="inline-block bg-rose-100 text-rose-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                Nutrition Management
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                Eat Right,<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400">
                  Perform Better
                </span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                From breakfast to dinner, log every meal with precision. Track calories, protein, carbs, and fats to fuel your training and reach your body composition goals.
              </p>

              {/* Macro mini-bars */}
              <div className="space-y-3">
                {[
                  { label: 'Protein', value: 120, goal: 160, color: 'bg-rose-500', pct: 75 },
                  { label: 'Carbs', value: 200, goal: 250, color: 'bg-emerald-500', pct: 80 },
                  { label: 'Fats', value: 55, goal: 70, color: 'bg-yellow-500', pct: 79 },
                  { label: 'Calories', value: 1850, goal: 2400, color: 'bg-orange-500', pct: 77 },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between text-sm font-medium text-slate-900 mb-1">
                      <span>{m.label}</span>
                      <span className="text-gray-500">{m.value} / {m.goal}{m.label === 'Calories' ? ' kcal' : 'g'}</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${m.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full rounded-full ${m.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/nutrition"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-rose-500/30 hover:-translate-y-1 group"
              >
                Track Your Nutrition
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Right: food grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2 grid grid-cols-2 gap-4"
            >
              {[
                { img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=85&fit=crop', label: 'Power Bowl', cal: '320 kcal', tall: true },
                { img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=85&fit=crop', label: 'Grilled Salmon', cal: '410 kcal', tall: false },
                { img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&q=85&fit=crop', label: 'Meal Prep', cal: '650 kcal', tall: false },
                { img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=85&fit=crop', label: 'Chicken Bowl', cal: '520 kcal', tall: true },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03, zIndex: 10 }}
                  className={`relative rounded-2xl overflow-hidden group cursor-pointer ${item.tall ? 'row-span-2' : ''}`}
                  style={{ minHeight: item.tall ? 280 : 130 }}
                >
                  <img
                    src={item.img}
                    alt={item.label}
                    style={{ width: '100%', height: item.tall ? 280 : 130, objectFit: 'cover', display: 'block', minHeight: item.tall ? 280 : 130 }}
                    className="group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white font-bold text-sm">{item.label}</p>
                    <p className="text-emerald-400 text-xs">{item.cal}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════════════════ */}
      <section id="how" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
              Get Started in Minutes
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">How It Works</h2>
            <p className="text-gray-500 text-lg">Simple, powerful, and designed to keep you consistent.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01', color: 'from-emerald-500 to-teal-500', textColor: 'text-emerald-600',
                icon: <Users className="h-7 w-7 text-white" />,
                title: 'Create Your Profile',
                desc: 'Sign up in seconds. Set your fitness goals, current body stats, and target metrics to personalize your experience.',
                img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80&fit=crop',
              },
              {
                step: '02', color: 'from-blue-500 to-cyan-500', textColor: 'text-blue-600',
                icon: <Dumbbell className="h-7 w-7 text-white" />,
                title: 'Log Your Activities',
                desc: 'Track every workout, meal, and body measurement daily. Our intuitive forms make logging fast and effortless.',
                img: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=500&q=80&fit=crop',
              },
              {
                step: '03', color: 'from-purple-500 to-pink-500', textColor: 'text-purple-600',
                icon: <TrendingUp className="h-7 w-7 text-white" />,
                title: 'Analyze & Improve',
                desc: 'Review beautiful progress charts, unlock milestones, and get data-driven insights to continuously improve.',
                img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80&fit=crop',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-400 border border-gray-100 group"
              >
                <div className="relative overflow-hidden" style={{ height: 176, backgroundColor: '#cbd5e1' }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    {item.icon}
                  </div>
                  <div className={`absolute top-4 right-4 bg-gradient-to-br ${item.color} text-white text-xs font-black px-3 py-1 rounded-full shadow`}>
                    STEP {item.step}
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-extrabold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════════════════ */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block bg-yellow-100 text-yellow-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
              Real Results
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Athletes Love FitTrack Pro</h2>
            <p className="text-gray-500 text-lg">Join thousands who transformed their fitness with our platform.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            <Testimonial
              delay={0} rating={5}
              name="Sarah Mitchell" role="Marathon Runner · NYC"
              avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop"
              text="FitTrack Pro completely changed how I train. The nutrition tracking is incredibly detailed and the progress charts keep me motivated every single day."
            />
            <Testimonial
              delay={0.12} rating={5}
              name="James Rodriguez" role="CrossFit Athlete · LA"
              avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
              text="The workout logging is seamless and the dashboard gives me exactly the insights I need. I hit my first powerlifting PR thanks to this app!"
            />
            <Testimonial
              delay={0.24} rating={5}
              name="Priya Sharma" role="Yoga Instructor · Chicago"
              avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop"
              text="Beautiful design, incredibly easy to use. The macro tracking helped me lose 12kg in 4 months and I feel stronger than ever. Highly recommended!"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        {/* Full bleed background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920&q=85&fit=crop"
            alt="CTA background"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', top: 0, left: 0 }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/92 via-slate-900/85 to-emerald-950/80" />
        </div>

        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-600 rounded-full opacity-10 blur-3xl" />

        <div className="relative max-w-3xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-gray-300 text-sm font-medium px-5 py-2 rounded-full">
              <Award className="h-4 w-4 text-yellow-400" />
              Start your transformation today — it's free
            </div>

            <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-none">
              Ready to<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                Get Stronger?
              </span>
            </h2>

            <p className="text-xl text-gray-400 max-w-xl mx-auto">
              Join 50,000+ athletes already using FitTrack Pro to crush their goals, eat smarter, and feel unstoppable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white px-10 py-5 rounded-2xl font-extrabold text-xl shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_rgba(16,185,129,0.6)] transition-all duration-300 hover:-translate-y-2 group"
              >
                Start For Free
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-3 bg-white/10 border border-white/25 hover:bg-white/20 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 hover:-translate-y-2"
              >
                View Dashboard
              </Link>
            </div>
            <p className="text-sm text-gray-500">No credit card required · Cancel anytime</p>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
