import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Plus, Trash2, Calendar, Briefcase, GraduationCap, Trophy, X, Upload, Image as ImageIcon } from 'lucide-react';
import { Achievement } from '../../types.ts';

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Achievement>>({
    type: 'Award',
    title: '',
    description: '',
    date: '',
    organization: '',
    certificateImage: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('scholarPulse_achievements');
    if (saved) setAchievements(JSON.parse(saved));
  }, []);

  const saveAchievements = (updated: Achievement[]) => {
    setAchievements(updated);
    localStorage.setItem('scholarPulse_achievements', JSON.stringify(updated));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, certificateImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newAchievement: Achievement = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData as Omit<Achievement, 'id'>
    } as Achievement;
    saveAchievements([newAchievement, ...achievements]);
    setIsAdding(false);
    setFormData({ type: 'Award', title: '', description: '', date: '', organization: '', certificateImage: '' });
  };

  const handleDelete = (id: string) => {
    saveAchievements(achievements.filter(a => a.id !== id));
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16"
      >
        <div className="max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic text-black dark:text-white leading-none mb-6">
            Academic <span className="text-blue-600">Achievements</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-xl font-medium">Capture your milestones and build your elite academic portfolio.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="px-8 py-5 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/20"
        >
          <Plus size={20} /> Add Achievement
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {achievements.map((achievement, idx) => (
            <motion.div
              key={achievement.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.05 }}
              className="p-8 rounded-[2.5rem] bg-neutral-50 dark:bg-neutral-900 border border-black/5 dark:border-white/5 relative group transition-colors flex flex-col"
            >
              <button 
                onClick={() => handleDelete(achievement.id)}
                className="absolute top-6 right-6 p-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/10 rounded-xl z-10"
              >
                <Trash2 size={18} />
              </button>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-black flex items-center justify-center text-blue-600 shadow-lg transition-colors">
                  {achievement.type === 'Award' && <Trophy size={28} />}
                  {achievement.type === 'Certification' && <Award size={28} />}
                  {achievement.type === 'Competition' && <Trophy size={28} />}
                  {achievement.type === 'Project' && <Briefcase size={28} />}
                  {achievement.type === 'Other' && <GraduationCap size={28} />}
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-0.5">{achievement.type}</div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-black dark:text-white leading-tight">{achievement.title}</h3>
                </div>
              </div>

              <p className="text-gray-500 dark:text-gray-400 font-medium mb-6 line-clamp-3">{achievement.description}</p>
              
              {achievement.certificateImage && (
                <div className="mb-6 rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 aspect-video bg-black/5">
                  <img src={achievement.certificateImage} alt="Certificate" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex flex-wrap gap-4 mt-auto pt-6 border-t border-black/5 dark:border-white/5">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <Calendar size={14} /> {achievement.date}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <GraduationCap size={14} /> {achievement.organization}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {achievements.length === 0 && !isAdding && (
        <div className="py-32 text-center">
          <div className="w-24 h-24 bg-black/5 dark:bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-gray-300">
            <Award size={48} />
          </div>
          <h3 className="text-2xl font-bold text-gray-400 dark:text-gray-600 uppercase tracking-tighter">No achievements logged yet.</h3>
          <p className="text-gray-500 mt-2 font-medium">Click "Add Achievement" to start building your record.</p>
        </div>
      )}

      {/* Add Dialog */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-xl bg-white dark:bg-neutral-900 rounded-[3rem] p-10 border border-black/10 dark:border-white/10 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <button 
                onClick={() => setIsAdding(false)}
                className="absolute top-8 right-8 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-8 text-black dark:text-white">Register Milestone</h2>

              <form onSubmit={handleAdd} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Type</label>
                    <select
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value as Achievement['type'] })}
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all font-bold"
                    >
                      <option value="Award">Award</option>
                      <option value="Certification">Certification</option>
                      <option value="Competition">Competition</option>
                      <option value="Project">Project</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Date</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Hackathon Champion 2024"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Issuing Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Google DeepMind"
                    value={formData.organization}
                    onChange={e => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Description</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Briefly describe your impact and achievement..."
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all font-medium resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Certificate Image (Optional)</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full aspect-video bg-black/5 dark:bg-white/5 border-2 border-dashed border-black/10 dark:border-white/10 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500/50 transition-all overflow-hidden"
                  >
                    {formData.certificateImage ? (
                      <img src={formData.certificateImage} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <Upload className="text-gray-400 mb-2" size={24} />
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Upload Certificate</span>
                      </>
                    )}
                  </div>
                  <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20"
                >
                  Commit to Portfolio
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
