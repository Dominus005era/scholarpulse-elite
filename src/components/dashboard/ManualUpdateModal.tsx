import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Zap, Calendar, Hash } from 'lucide-react';

interface ManualUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: { lectures: number; present: number; absent: number; date: string }) => void;
}

export default function ManualUpdateModal({ isOpen, onClose, onUpdate }: ManualUpdateModalProps) {
  const [formData, setFormData] = useState({
    lectures: 0,
    present: 0,
    absent: 0,
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
    setFormData({
      lectures: 0,
      present: 0,
      absent: 0,
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-[3rem] p-10 border border-black/10 dark:border-white/10 shadow-2xl relative z-10"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black italic uppercase tracking-tighter text-black dark:text-white flex items-center gap-2">
                <Zap className="text-blue-600" size={24} />
                Manual <span className="text-blue-600">Update</span>
              </h3>
              <button onClick={onClose} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block ml-1">Update Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block ml-1">Total Lectures Today</label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="number"
                      required
                      min="0"
                      placeholder="e.g. 5"
                      value={formData.lectures || ''}
                      onChange={(e) => setFormData({...formData, lectures: parseInt(e.target.value) || 0})}
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2 block ml-1">Present</label>
                    <input 
                      type="number"
                      required
                      min="0"
                      max={formData.lectures}
                      placeholder="0"
                      value={formData.present || ''}
                      onChange={(e) => setFormData({...formData, present: parseInt(e.target.value) || 0})}
                      className="w-full bg-emerald-500/5 border border-emerald-500/20 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-2 block ml-1">Absent/Bunk</label>
                    <input 
                      type="number"
                      required
                      min="0"
                      placeholder="0"
                      value={formData.absent || ''}
                      onChange={(e) => setFormData({...formData, absent: parseInt(e.target.value) || 0})}
                      className="w-full bg-rose-500/5 border border-rose-500/20 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all font-bold text-rose-600"
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-blue-600/20 mt-4"
              >
                Sync Command Results
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
