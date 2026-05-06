import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp, Zap, AlertTriangle, Info, Calendar } from 'lucide-react';
import { AttendanceData, UserRecord } from '../../types.ts';

interface PredictiveSuiteProps {
  isOpen: boolean;
  onClose: () => void;
  record: AttendanceData;
  user: UserRecord;
  endDate: string;
}

export default function PredictiveSuite({ isOpen, onClose, record, user, endDate }: PredictiveSuiteProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-[3.5rem] p-10 border border-black/10 dark:border-white/10 shadow-2xl relative z-10 overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] -mr-48 -mt-48" />
            
            <div className="flex justify-between items-start mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-blue-600 rounded-lg text-white">
                    <TrendingUp size={16} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">High-Precision Analytics</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-black dark:text-white">
                  Predictive <span className="text-blue-600">Suite</span>
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="p-4 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                {/* Visual Placeholder to avoid Recharts crash */}
                <div className="h-[300px] w-full p-6 rounded-[2.5rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 overflow-hidden flex flex-col items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent" />
                  <div className="text-blue-600 mb-4">
                    <TrendingUp size={48} className="animate-pulse" />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Visual Roadmap Active</h4>
                  <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter max-w-xs text-center">
                    AI Trajectory mapping is synchronized. Strategic margin: <span className="text-blue-600 font-black">{record.possibleBunks} Bunks</span>.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10">
                    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-1">Freedom Phase</div>
                    <div className="text-2xl font-black italic">ACTIVE</div>
                  </div>
                  <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10">
                    <div className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-1">Critical Goal</div>
                    <div className="text-2xl font-black italic">{user.targetPercentage}%</div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <section>
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-6">Tactical Margin</h4>
                  <div className="space-y-6">
                    <div className="flex justify-between items-end border-b border-black/5 dark:border-white/5 pb-4">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-gray-400">Freedom Buffer</div>
                        <div className="text-5xl font-black italic text-blue-600">{record.possibleBunks}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase font-bold text-gray-400 text-rose-500">Danger Zone</div>
                        <div className="text-2xl font-bold text-rose-500">{user.targetPercentage - 5}%</div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="pt-6 border-t border-black/5 dark:border-white/5">
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-6 flex items-center gap-2">
                    <Info size={14} /> Intelligence Standing
                  </h4>
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5">
                      <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">Standing</div>
                      <div className="text-lg font-bold text-black dark:text-white uppercase tracking-tighter italic">Combat Ready</div>
                    </div>
                  </div>
                </section>

                <button 
                  onClick={onClose}
                  className="w-full py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Return to Command
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
