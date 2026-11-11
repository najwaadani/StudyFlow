import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  BarChart3, 
  FolderKanban, 
  Sparkles, 
  Play, 
  Check, 
  Flame, 
  ChevronRight, 
  BookOpen, 
  ShieldCheck, 
  Zap, 
  Star,
  Users,
  Compass
} from 'lucide-react';

interface LandingPageProps {
  onLaunchApp: () => void;
  tasksCount?: number;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchApp, tasksCount = 24 }) => {
  const [activeFeatureTab, setActiveFeatureTab] = useState<'tasks' | 'calendar' | 'analytics'>('tasks');
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmailInput('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900 flex flex-col antialiased">
      {/* 1. TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
              StudyFlow
            </span>
          </div>

          {/* Zone 2: Single-line Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
              How It Works
            </a>
            <a href="#preview" className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
              Interactive Preview
            </a>
            <a href="#testimonials" className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
              Student Reviews
            </a>
            <a href="#faq" className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
              FAQ
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={onLaunchApp}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs hover:shadow-md transition-all whitespace-nowrap shrink-0"
            >
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none animate-ambient-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Pill Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/60 rounded-full text-xs font-semibold text-blue-700 mb-6 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Built for High-Performing University Students</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              Master Your Semester, <br />
              <span className="text-blue-600">Not Just Your Deadlines.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto"
            >
              StudyFlow brings Linear-grade discipline and Notion-like elegance to academic task planning. 
              Organize course deliverables, track syllabus velocity, and beat deadline burnout without the clutter.
            </motion.p>

            {/* Dual CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={onLaunchApp}
                className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Open Student Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <a
                href="#preview"
                className="w-full sm:w-auto px-5 py-3 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-2xs"
              >
                <Compass className="w-4 h-4 text-slate-500" />
                <span>Explore Interactive Tour</span>
              </a>
            </motion.div>

            {/* Social Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Free for Students</span>
              </div>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Local Data Persistence</span>
              </div>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Zero Setup Required</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Visual Asset & Real App Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 sm:mt-16 relative mx-auto max-w-5xl"
          >
            {/* Border glow frame */}
            <div className="relative rounded-2xl p-2 sm:p-3 bg-gradient-to-b from-slate-200 to-slate-100 border border-slate-200 shadow-2xl overflow-hidden">
              <div className="relative rounded-xl overflow-hidden bg-white border border-slate-200/80">
                {/* Simulated App Window Header */}
                <div className="h-10 bg-slate-100/90 border-b border-slate-200 px-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
                    <span className="ml-2 text-[11px] font-mono text-slate-400">studyflow.app / overview</span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    <span>Fall 2026 Semester Active</span>
                  </div>
                </div>

                {/* Split Banner: Campus Photography & Dashboard Teaser */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Left: Campus Photo */}
                  <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-[380px] bg-slate-900 overflow-hidden">
                    <img
                      src="/src/assets/images/hero_student_study_1794325260577.jpg"
                      alt="University students studying productively with StudyFlow"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center opacity-90 transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent flex flex-col justify-end p-6 text-white">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-blue-300">
                        Campus Productivity
                      </span>
                      <h4 className="text-base font-bold text-white mt-1 leading-snug">
                        Designed for University Pace
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Say goodbye to scattered sticky notes and chaotic spreadsheets.
                      </p>
                    </div>
                  </div>

                  {/* Right: Live Interactive Teaser Card */}
                  <div className="lg:col-span-7 p-5 sm:p-6 bg-slate-50 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <div>
                          <p className="text-xs font-bold text-slate-900">Today's Focus Tasks</p>
                          <p className="text-[11px] text-slate-500">Scheduled for November 10, 2026</p>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {tasksCount} Total Active
                        </span>
                      </div>

                      <div className="mt-3 space-y-2">
                        {[
                          { title: 'Complete Database Systems Assignment', course: 'Database Systems', time: '23:59', priority: 'High', done: false },
                          { title: 'Prepare UI/UX Presentation', course: 'UI/UX Design', time: '14:00', priority: 'High', done: false },
                          { title: 'Review Web Programming Materials', course: 'Web Programming', time: '20:00', priority: 'Medium', done: true },
                        ].map((sample, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200/70 shadow-2xs text-xs"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                                sample.done ? 'bg-emerald-600 text-white' : 'border border-slate-300'
                              }`}>
                                {sample.done && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                              </span>
                              <div className="min-w-0">
                                <p className={`font-semibold truncate ${sample.done ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                                  {sample.title}
                                </p>
                                <p className="text-[10px] text-slate-400">{sample.course} · Due {sample.time}</p>
                              </div>
                            </div>
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                              sample.priority === 'High' ? 'text-red-700 bg-red-50' : 'text-amber-800 bg-amber-50'
                            }`}>
                              {sample.priority}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Launch CTA Banner inside Mockup */}
                    <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-xs text-slate-600 font-medium">Ready to start your session?</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={onLaunchApp}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors flex items-center gap-1"
                      >
                        <span>Open Dashboard</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. QUANTIFIED IMPACT METRICS STRIP */}
      <section className="border-y border-slate-200 bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-2">
              <div className="text-3xl sm:text-4xl font-bold font-mono text-blue-600 tracking-tight">68%</div>
              <p className="text-xs font-semibold text-slate-800 mt-1">Fewer Missed Deadlines</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Reported by semester end</p>
            </div>
            <div className="p-2">
              <div className="text-3xl sm:text-4xl font-bold font-mono text-slate-900 tracking-tight">4.2 hrs</div>
              <p className="text-xs font-semibold text-slate-800 mt-1">Saved Per Week</p>
              <p className="text-[11px] text-slate-500 mt-0.5">In reduced planning overhead</p>
            </div>
            <div className="p-2">
              <div className="text-3xl sm:text-4xl font-bold font-mono text-emerald-600 tracking-tight">100%</div>
              <p className="text-xs font-semibold text-slate-800 mt-1">Private & Offline-Ready</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Zero tracking, zero cloud locks</p>
            </div>
            <div className="p-2">
              <div className="text-3xl sm:text-4xl font-bold font-mono text-slate-900 tracking-tight">4.9 / 5</div>
              <p className="text-xs font-semibold text-slate-800 mt-1">Student Satisfaction</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Across CS, Design & Pre-Med</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ASYMMETRIC BENTO GRID: CORE CAPABILITIES */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Engineered For Academic Success
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-2">
              Every tool a student needs. Nothing you don't.
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Designed from first principles to solve the real academic bottlenecks students face every week.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Bento Col-span-2 - Smart Deadline Engine */}
            <motion.div 
              whileHover={{ y: -3 }}
              className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-semibold text-blue-600">01. DEADLINE ENGINE</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Intelligent Urgency & Countdown Tracking
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed max-w-xl">
                  Never get blindsided by a 23:59 canvas submission. StudyFlow calculates real-time relative countdowns ("Due in 2 days", "Today at 20:00", "Overdue by 1 day") and prioritizes tasks so you always know what deserves your immediate focus.
                </p>
              </div>

              {/* Visual preview */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                  <span className="text-[10px] text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded">High Priority</span>
                  <p className="font-semibold text-slate-800 mt-1.5 truncate">Database Normalization</p>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">Due in 4 hours</p>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                  <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded">Medium Priority</span>
                  <p className="font-semibold text-slate-800 mt-1.5 truncate">UI/UX Wireframes</p>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">Tomorrow at 14:00</p>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                  <span className="text-[10px] text-blue-700 font-bold bg-blue-50 px-1.5 py-0.5 rounded">Low Priority</span>
                  <p className="font-semibold text-slate-800 mt-1.5 truncate">Git Sprint Retro</p>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">In 4 days</p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Bento Col-span-1 - Course Categories */}
            <motion.div 
              whileHover={{ y: -3 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                  <FolderKanban className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-semibold text-purple-600">02. SYLLABUS CATEGORIES</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Multi-Course Segregation
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Keep Database Systems (CS-301), Web Programming (CS-240), and Software Engineering (SE-410) isolated with custom color codes, instructors, and credit units.
                </p>
              </div>

              <div className="mt-6 space-y-2">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    <span className="font-medium text-slate-800">Database Systems</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-500">50% Done</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    <span className="font-medium text-slate-800">UI/UX Design</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-500">75% Done</span>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Bento Col-span-1 - Focus Pomodoro */}
            <motion.div 
              whileHover={{ y: -3 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-semibold text-amber-600">03. FOCUS SPRINT</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Built-in 25/5 Pomodoro
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  No need for external timer apps. Switch into deep study sessions with our distraction-free 25-minute sprint and 5-minute recovery break timer.
                </p>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-blue-400">Deep Work</span>
                  <p className="text-2xl font-mono font-bold">25:00</p>
                </div>
                <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Play className="w-4 h-4 fill-white" />
                </div>
              </div>
            </motion.div>

            {/* Card 4: Bento Col-span-2 - Visual Productivity Analytics */}
            <motion.div 
              whileHover={{ y: -3 }}
              className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-semibold text-emerald-600">04. PRODUCTIVITY ANALYTICS</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Weekly Output & Workload Distribution
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed max-w-xl">
                  Measure your study cadence across Monday through Sunday. Understand whether you are front-loading work or falling into crunch-night traps with beautiful, interactive visualizations.
                </p>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span className="font-semibold text-slate-800">Current Velocity: 16 deliverables / week</span>
                </div>
                <span className="text-emerald-600 font-semibold font-mono">+12% vs last week</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE LIVE FEATURE PREVIEW */}
      <section id="preview" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Interactive Live Preview
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Explore StudyFlow In Action
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Select a module below to preview the interface and interaction flow.
            </p>

            {/* Feature Toggle Tabs */}
            <div className="mt-6 inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/80">
              <button
                onClick={() => setActiveFeatureTab('tasks')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeFeatureTab === 'tasks' 
                    ? 'bg-white text-blue-600 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Task & Deadline Manager
              </button>
              <button
                onClick={() => setActiveFeatureTab('calendar')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeFeatureTab === 'calendar' 
                    ? 'bg-white text-blue-600 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Academic Calendar
              </button>
              <button
                onClick={() => setActiveFeatureTab('analytics')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeFeatureTab === 'analytics' 
                    ? 'bg-white text-blue-600 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Analytics & Reports
              </button>
            </div>
          </div>

          {/* Interactive Preview Container */}
          <div className="max-w-4xl mx-auto bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <AnimatePresence mode="wait">
              {activeFeatureTab === 'tasks' && (
                <motion.div
                  key="tasks"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Multi-Course Task Table</h4>
                      <p className="text-xs text-slate-500">Searchable, filterable by status, priority, and deadline</p>
                    </div>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      Table & Grid View
                    </span>
                  </div>

                  <div className="space-y-2">
                    {[
                      { name: 'Implement Raft Consensus Algorithm', course: 'Software Engineering', due: '2026-11-12 18:00', priority: 'High', status: 'In Progress' },
                      { name: 'Formulate SQL Query Index Benchmarks', course: 'Database Systems', due: '2026-11-10 23:59', priority: 'High', status: 'Pending' },
                      { name: 'Prepare User Persona Empathy Map', course: 'UI/UX Design', due: '2026-11-11 14:00', priority: 'Medium', status: 'In Progress' },
                    ].map((row, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200/90 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-slate-300" />
                          <div>
                            <p className="font-semibold text-slate-800">{row.name}</p>
                            <p className="text-[11px] text-slate-500">{row.course}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-slate-600">{row.due}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded text-blue-700 bg-blue-50">
                            {row.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeFeatureTab === 'calendar' && (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Monthly Academic Calendar View</h4>
                      <p className="text-xs text-slate-500">Every deliverable mapped to its target submission date</p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                      Month Pacing
                    </span>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-500 py-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
                  </div>
                  <div className="grid grid-cols-7 gap-1.5">
                    {[8, 9, 10, 11, 12, 13, 14].map((d) => (
                      <div key={d} className={`h-20 p-2 rounded-lg border text-left flex flex-col justify-between ${
                        d === 10 ? 'bg-blue-50/70 border-blue-200' : 'bg-white border-slate-200/80'
                      }`}>
                        <span className={`text-[11px] font-mono font-bold ${d === 10 ? 'text-blue-600' : 'text-slate-600'}`}>{d}</span>
                        {d === 10 && (
                          <div className="bg-red-50 text-red-700 text-[9px] font-bold px-1 py-0.5 rounded truncate">
                            Database HW
                          </div>
                        )}
                        {d === 11 && (
                          <div className="bg-amber-50 text-amber-800 text-[9px] font-bold px-1 py-0.5 rounded truncate">
                            UI/UX Deck
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeFeatureTab === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Productivity Reports & GPA Protection</h4>
                      <p className="text-xs text-slate-500">Pacing indicators and completed coursework distribution</p>
                    </div>
                    <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-1 rounded">
                      Real-Time Metrics
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-4 rounded-xl bg-white border border-slate-200">
                      <span className="text-slate-500 font-medium">Completion Rate</span>
                      <p className="text-2xl font-bold font-mono text-slate-900 mt-1">67%</p>
                      <span className="text-[11px] text-emerald-600 font-medium">16 of 24 completed</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-slate-200">
                      <span className="text-slate-500 font-medium">Active Deliverables</span>
                      <p className="text-2xl font-bold font-mono text-blue-600 mt-1">5 tasks</p>
                      <span className="text-[11px] text-slate-500">Across 5 course units</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-slate-200">
                      <span className="text-slate-500 font-medium">Study Pacing</span>
                      <p className="text-2xl font-bold font-mono text-emerald-600 mt-1">On Track</p>
                      <span className="text-[11px] text-slate-500">4-day active streak</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 text-center pt-4 border-t border-slate-200">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onLaunchApp}
                className="px-5 py-2 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors inline-flex items-center gap-1.5"
              >
                <span>Try this directly inside the app</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS (3 SIMPLE STEPS) */}
      <section id="how-it-works" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Zero Learning Curve
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              From syllabus overwhelm to calm control in 3 steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-mono font-bold text-sm flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900">Define Your Courses</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Add your course units (e.g. CS-301 Database Systems), set accent colors, and record professor contacts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-mono font-bold text-sm flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900">Add Tasks & Deadlines</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Log upcoming assignments, problem sets, and quizzes with exact submission times and priority weightings.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-mono font-bold text-sm flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900">Sprint With Pomodoro</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Execute deep work sessions with the 25/5 focus timer. Check off deliverables and watch your weekly velocity soar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STUDENT TESTIMONIALS */}
      <section id="testimonials" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Real University Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Loved by students across top campuses
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "Most task apps are either too bloated or too simple. StudyFlow has the exact right balance for university engineering courses. The countdown urgency indicators saved my GPA on two back-to-back finals."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  AM
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Alex Morgan</p>
                  <p className="text-[11px] text-slate-500">CS & HCI Junior</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "Having the Pomodoro focus timer right next to my upcoming deadlines helped me stop procrastinating. I went from pulling stressful 3 AM all-nighters to having all coursework wrapped by 9 PM."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                  SK
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Samantha Kim</p>
                  <p className="text-[11px] text-slate-500">Biochemistry Senior</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "The UI feels as clean as Linear. Everything is snappy, smooth, and works immediately in the browser. I recommend this to everyone in my design cohort."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                  MR
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Marcus Rivera</p>
                  <p className="text-[11px] text-slate-500">Design Systems Sophomore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION PREVIEW */}
      <section id="faq" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Common questions from university students
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'Is StudyFlow really free to use?',
                a: 'Yes! StudyFlow is 100% free for all university students. There are no paywalls, hidden tiers, or artificial limits on tasks or course categories.',
              },
              {
                q: 'Where is my data stored?',
                a: 'Your coursework and categories are saved directly in your browser using local storage. Your data remains private to your machine, loads instantly, and works even without internet connectivity.',
              },
              {
                q: 'Can I export my study plan?',
                a: 'Yes. In the Settings tab, you can export your entire task registry as a clean JSON backup at any time.',
              },
              {
                q: 'Does it work on mobile phones and tablets?',
                a: 'StudyFlow is fully responsive. On phones, it features a collapsible slide-over navigation drawer and touch-friendly controls.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <h4 className="text-sm font-bold text-slate-900">{faq.q}</h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. HIGH-CONVERSION CTA BANNER */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-xl">
            {/* Ambient Background Blur */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-200 bg-white/10 px-3 py-1 rounded-full">
                Semester Fall 2026 Ready
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-4">
                Ready to take control of your academic pacing?
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 mt-2 max-w-lg mx-auto leading-relaxed">
                Join thousands of university scholars who stopped stressing and started flowing. Zero account creation required.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onLaunchApp}
                  className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-blue-900 bg-white hover:bg-slate-50 active:bg-slate-100 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Launch StudyFlow Workspace</span>
                  <ArrowRight className="w-4 h-4 text-blue-700" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. QUIET FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-50 py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white">
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-900">StudyFlow</span>
            <span className="text-slate-400">· Student Task & Study Planner</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={onLaunchApp} className="hover:text-blue-600 transition-colors">
              Open App
            </button>
            <a href="#features" className="hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">
              How It Works
            </a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">
              FAQ
            </a>
          </div>

          <p className="text-slate-400">
            &copy; 2026 StudyFlow. Built for student productivity.
          </p>
        </div>
      </footer>
    </div>
  );
};
