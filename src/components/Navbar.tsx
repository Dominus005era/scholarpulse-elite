import React from 'react';
import { motion } from 'motion/react';
import { Menu, Zap, Cpu } from 'lucide-react';
import { AppState } from '../types.ts';
import ThemeToggle from './ThemeToggle.tsx';

interface NavbarProps {
  onMenuClick: () => void;
  showMenu: boolean;
  onNavigate: (state: AppState) => void;
  onStart: () => void;
}

export default function Navbar({ onMenuClick, showMenu, onNavigate, onStart }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 w-full h-20 border-b border-black/5 dark:border-white/5 bg-white/60 dark:bg-black/60 backdrop-blur-xl z-50 px-6 transition-colors">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate(AppState.LANDING)}
        >
          <div className="relative">
            <div className="w-12 h-12 bg-blue-600 rounded-[14px] flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:rotate-[15deg] transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-[14px]" />
              <Zap size={22} className="text-white fill-white" />
            </div>
          </div>
          <div className="flex flex-col -gap-1">
            <span className="text-2xl font-black tracking-tighter uppercase italic leading-none bg-gradient-to-r from-black dark:from-white via-black dark:via-white to-black/40 dark:to-white/40 bg-clip-text text-transparent">
              ScholarPulse
            </span>
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-500/80 ml-1">Elite Architecture</span>
          </div>
        </motion.div>

        <div className="hidden md:flex items-center gap-10">
          <NavLink label="Platform" onClick={() => onNavigate(AppState.PLATFORM)} />
          <NavLink label="Methodology" onClick={() => onNavigate(AppState.METHODOLOGY)} />
          <NavLink label="Company" onClick={() => onNavigate(AppState.COMPANY)} />
          <NavLink label="Blog" onClick={() => onNavigate(AppState.BLOG)} />
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {showMenu ? (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onMenuClick}
              className="p-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-2xl border border-black/10 dark:border-white/10 transition-colors group"
            >
              <Menu size={20} className="text-black dark:text-white group-hover:text-blue-400 transition-colors" />
            </motion.button>
          ) : (
            <button 
              onClick={onStart}
              className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs font-black uppercase tracking-widest hover:bg-blue-500 dark:hover:bg-blue-600 hover:text-white transition-all transform active:scale-95"
            >
              Join Elite
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-blue-400 transition-colors cursor-pointer"
    >
      {label}
    </button>
  );
}
