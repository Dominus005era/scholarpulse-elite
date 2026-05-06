import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Trash2, ChevronRight, FileText } from 'lucide-react';
import { AttendanceData } from '../../types.ts';
import { cn } from '../../lib/utils.ts';

interface HistoryListProps {
  history: AttendanceData[];
  onDelete: (id: string) => void;
  onSelect: (data: AttendanceData) => void;
}

export default function HistoryList({ history, onDelete, onSelect }: HistoryListProps) {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-500 border border-dashed border-black/10 dark:border-white/5 rounded-3xl">
        <FileText size={48} className="mb-4 opacity-20" />
        <p className="text-sm font-medium">No historical records found</p>
        <p className="text-xs">Your analysis history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Analysis Logs</h4>
        <span className="text-[10px] text-gray-500 dark:text-gray-600 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-full">{history.length} Entries</span>
      </div>
      
      <AnimatePresence initial={false}>
        {history.map((record, index) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.05 }}
            className="group relative flex items-center justify-between p-4 glass hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl border-black/5 dark:border-white/5 transition-all cursor-pointer"
            onClick={() => onSelect(record)}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Calendar size={18} />
              </div>
              <div>
                <div className="font-bold text-sm tracking-tight text-black dark:text-white">
                  {record.reportDate || "Snapshot Log"}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400 font-mono">
                  <span>P: {record.present}</span>
                  <span>A: {record.absent}</span>
                  <span className={cn(
                    "px-1.5 py-0.5 rounded-md",
                    record.percentage >= 75 ? "text-green-600 dark:text-green-400 bg-green-600/10 dark:bg-green-400/10" : "text-red-600 dark:text-red-400 bg-red-600/10 dark:bg-red-400/10"
                  )}>
                    {record.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(record.id);
                }}
                className="p-2 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 text-red-600 dark:text-red-500 rounded-lg transition-all"
              >
                <Trash2 size={16} />
              </button>
              <ChevronRight size={16} className="text-gray-400 dark:text-gray-600 group-hover:text-black dark:group-hover:text-white transition-colors" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
