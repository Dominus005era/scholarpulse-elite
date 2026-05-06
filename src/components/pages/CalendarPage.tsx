import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Upload, FileText, ChevronRight, Loader2, AlertCircle, Trash2 } from 'lucide-react';
import { CalendarEvent } from '../../types.ts';
import { analyzeAcademicCalendar } from '../../services/geminiService.ts';

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('scholarPulse_calendar');
    if (saved) {
      try {
        setEvents(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading calendar:", e);
      }
    }
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1];
      const result = await analyzeAcademicCalendar([base64]);
      
      if (result) {
        if ('error' in result) {
          setError(result.error as string);
        } else if (Array.isArray(result)) {
          setEvents(result);
          localStorage.setItem('scholarPulse_calendar', JSON.stringify(result));
        } else {
          setError("AI returned an unexpected format. Please try again.");
        }
      } else {
        setError("Failed to parse the calendar. Please ensure the image is clear and contains dates.");
      }
      setIsAnalyzing(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16"
      >
        <div className="max-w-2xl">
          <h1 className="text-6xl md:text-[120px] font-black uppercase tracking-tighter italic text-black dark:text-white leading-[0.8] mb-8">
            Academic <span className="text-blue-600">Roadmap</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-xl font-medium transition-colors">
            Upload your college calendar image. Our AI will map out your entire semester trajectory.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {events.length > 0 && (
            <button
              onClick={() => {
                if (confirm("Delete this roadmap?")) {
                  setEvents([]);
                  localStorage.removeItem('scholarPulse_calendar');
                }
              }}
              className="p-5 bg-red-500/10 text-red-500 rounded-[2rem] hover:bg-red-500 hover:text-white transition-all"
              title="Clear Roadmap"
            >
              <Trash2 size={20} />
            </button>
          )}
          <div className="relative group">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              disabled={isAnalyzing}
            />
            <button
              className={`px-8 py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm flex items-center gap-3 transition-all shadow-xl ${
                isAnalyzing 
                  ? 'bg-gray-200 dark:bg-neutral-800 text-gray-400' 
                  : 'bg-black dark:bg-white text-white dark:text-black hover:scale-105 group-hover:bg-blue-600 group-hover:text-white'
              }`}
            >
              {isAnalyzing ? <Loader2 size={20} className="animate-spin" /> : <Upload size={20} />}
              {isAnalyzing ? 'Analyzing Node...' : 'Upload Calendar'}
            </button>
          </div>
        </div>
      </motion.div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8 p-6 rounded-3xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 flex items-center gap-4 text-sm font-bold uppercase tracking-widest leading-relaxed shadow-lg shadow-red-500/5"
        >
          <AlertCircle size={20} />
          <span>{error}</span>
        </motion.div>
      )}

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-black/5 dark:bg-white/5" />
        
        <div className="space-y-12">
          {events.length > 0 ? (
            events.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="relative pl-24 group"
              >
                <div className="absolute left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white dark:bg-black border-4 border-blue-600 z-10 group-hover:scale-110 transition-transform" />
                
                <div className="p-8 rounded-[2.5rem] bg-neutral-50 dark:bg-neutral-900 border border-black/5 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-600/30 transition-all cursor-default">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-black flex flex-col items-center justify-center text-black dark:text-white border border-black/5 dark:border-white/5 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1">{event.type || 'Event'}</div>
                      <h3 className="text-xl font-bold uppercase tracking-tight text-black dark:text-white">{event.event}</h3>
                      <p className="text-gray-500 dark:text-gray-500 text-sm font-mono mt-1 uppercase tracking-widest">{event.date}</p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-300 dark:text-gray-700 group-hover:text-blue-600 transition-colors" />
                </div>
              </motion.div>
            ))
          ) : (
            !isAnalyzing && (
              <div className="py-32 text-center">
                <div className="w-24 h-24 bg-black/5 dark:bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-gray-300">
                  <FileText size={48} />
                </div>
                <h3 className="text-2xl font-bold text-gray-400 dark:text-gray-600 uppercase tracking-tighter">No calendar data found.</h3>
                <p className="text-gray-500 mt-2 font-medium">Upload your academic schedule to begin mapping.</p>
              </div>
            )
          )}

          {isAnalyzing && (
            <div className="py-20 flex flex-col items-center">
              <Loader2 size={48} className="animate-spin text-blue-600 mb-6" />
              <p className="text-gray-500 font-black uppercase tracking-widest text-xs animate-pulse">Neural engine processing image...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
