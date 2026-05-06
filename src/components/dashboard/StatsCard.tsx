import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils.ts';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  detail: string;
  progress?: number;
  highlight?: 'purple' | 'red' | 'blue' | 'green';
  onClick?: () => void;
}

export default function StatsCard({ icon, label, value, detail, progress, highlight, onClick }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={cn(
        "glass rounded-3xl p-6 border-black/5 dark:border-white/5 flex flex-col relative overflow-hidden group transition-colors",
        onClick && "cursor-pointer"
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="p-3 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
          {icon}
        </div>
        <div className="text-2xl font-black font-mono tracking-tighter text-black dark:text-white">
          {value}
        </div>
      </div>

      <div>
        <div className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wider mb-1">{label}</div>
        <div className="text-xs text-gray-400 dark:text-gray-500">{detail}</div>
      </div>

      {progress !== undefined && (
        <div className="mt-6">
          <div className="flex justify-between text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 mb-1.5">
            <span>Status</span>
            <span>{progress.toFixed(1)}%</span>
          </div>
          <div className="h-1.5 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, progress)}%` }}
              className={cn(
                "h-full rounded-full transition-all duration-1000",
                progress >= 75 ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" : "bg-red-500 shadow-[0_0_10px_rgba(239,44,44,0.4)]"
              )}
            />
          </div>
        </div>
      )}

      {/* Background accents */}
      <div className={cn(
        "absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity",
        highlight === 'red' ? "bg-red-500" : highlight === 'purple' ? "bg-purple-500" : "bg-blue-500"
      )} />
    </motion.div>
  );
}
