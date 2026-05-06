import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppState, UserRecord, AttendanceData } from './types.ts';
import LandingPage from './components/LandingPage.tsx';
import OnboardingPage from './components/OnboardingPage.tsx';
import Dashboard from './components/Dashboard.tsx';
import Sidebar from './components/Sidebar.tsx';
import Navbar from './components/Navbar.tsx';
import PlatformPage from './components/pages/Platform.tsx';
import MethodologyPage from './components/pages/Methodology.tsx';
import CompanyPage from './components/pages/Company.tsx';
import BlogPage from './components/pages/Blog.tsx';
import AchievementsPage from './components/pages/AchievementsPage.tsx';
import CalendarPage from './components/pages/CalendarPage.tsx';
import PreferencesPage from './components/pages/PreferencesPage.tsx';
import MemoriesPage from './components/pages/MemoriesPage.tsx';

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [user, setUser] = useState<UserRecord | null>(null);
  const [history, setHistory] = useState<AttendanceData[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('scholarPulse_user');
    const savedHistory = localStorage.getItem('scholarPulse_history');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
      setAppState(AppState.DASHBOARD);
    }
  }, []);

  const handleStart = () => {
    if (user) {
      setAppState(AppState.DASHBOARD);
    } else {
      setAppState(AppState.ONBOARDING);
    }
  };

  const handleOnboardingComplete = (userData: UserRecord) => {
    setUser(userData);
    localStorage.setItem('scholarPulse_user', JSON.stringify(userData));
    setAppState(AppState.DASHBOARD);
  };

  const navigateTo = (state: AppState) => {
    setAppState(state);
    window.scrollTo(0, 0);
  };

  const addToHistory = (data: AttendanceData) => {
    const newHistory = [data, ...history];
    setHistory(newHistory);
    localStorage.setItem('scholarPulse_history', JSON.stringify(newHistory));
  };

  const resetAll = () => {
    setHistory([]);
    localStorage.setItem('scholarPulse_history', JSON.stringify([]));
    setIsSidebarOpen(false);
  };

  const deleteAccount = () => {
    localStorage.removeItem('scholarPulse_user');
    localStorage.removeItem('scholarPulse_history');
    localStorage.removeItem('scholarPulse_achievements');
    localStorage.removeItem('scholarPulse_calendar');
    localStorage.removeItem('scholarPulse_memories');
    setUser(null);
    setHistory([]);
    setAppState(AppState.LANDING);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-blue-500/30 overflow-x-hidden transition-colors duration-300">
      <Navbar 
        onMenuClick={() => setIsSidebarOpen(true)} 
        showMenu={[AppState.DASHBOARD, AppState.ACHIEVEMENTS, AppState.CALENDAR, AppState.PREFERENCES, AppState.MEMORY].includes(appState)}
        onNavigate={navigateTo}
        onStart={handleStart}
      />
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        user={user}
        onReset={resetAll}
        onDeleteAccount={deleteAccount}
        onNavigate={navigateTo}
        currentState={appState}
        onUpdateUser={(updated) => {
          const newUser = { ...user, ...updated } as UserRecord;
          setUser(newUser);
          localStorage.setItem('scholarPulse_user', JSON.stringify(newUser));
        }}
      />

      <main className="relative z-0">
        <AnimatePresence mode="wait">
          {appState === AppState.LANDING && (
            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LandingPage onStart={handleStart} />
            </motion.div>
          )}

          {appState === AppState.PLATFORM && (
            <motion.div key="platform" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <PlatformPage />
            </motion.div>
          )}

          {appState === AppState.METHODOLOGY && (
            <motion.div key="methodology" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <MethodologyPage />
            </motion.div>
          )}

          {appState === AppState.COMPANY && (
            <motion.div key="company" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <CompanyPage />
            </motion.div>
          )}

          {appState === AppState.BLOG && (
            <motion.div key="blog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <BlogPage />
            </motion.div>
          )}

          {appState === AppState.ACHIEVEMENTS && (
            <motion.div key="achievements" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <AchievementsPage />
            </motion.div>
          )}

          {appState === AppState.CALENDAR && (
            <motion.div key="calendar" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <CalendarPage />
            </motion.div>
          )}

          {appState === AppState.PREFERENCES && (
            <motion.div key="preferences" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <PreferencesPage />
            </motion.div>
          )}

          {appState === AppState.MEMORY && (
            <motion.div key="memory" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <MemoriesPage />
            </motion.div>
          )}

          {appState === AppState.ONBOARDING && (
            <motion.div key="onboarding" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <OnboardingPage onComplete={handleOnboardingComplete} />
            </motion.div>
          )}

          {appState === AppState.DASHBOARD && user && (
            <motion.div key="dashboard" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <Dashboard 
                user={user} 
                history={history} 
                onAddToHistory={addToHistory} 
                onUpdateProfile={(updated) => {
                  setUser(updated);
                  localStorage.setItem('scholarPulse_user', JSON.stringify(updated));
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Ambient background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}

