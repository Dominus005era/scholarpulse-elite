import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Plus, Trash2, Calendar, X, Image as ImageIcon, Maximize2 } from 'lucide-react';
import { Memory } from '../../types.ts';

export default function MemoriesPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [memoryToDelete, setMemoryToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Memory>>({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    image: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('scholarPulse_memories');
    if (saved) setMemories(JSON.parse(saved));
  }, []);

  const saveMemories = (updated: Memory[]) => {
    setMemories(updated);
    localStorage.setItem('scholarPulse_memories', JSON.stringify(updated));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) return;

    const newMemory: Memory = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title || 'Untitled Memory',
      description: formData.description || '',
      date: formData.date || new Date().toISOString().split('T')[0],
      image: formData.image
    };

    saveMemories([newMemory, ...memories]);
    setIsAdding(false);
    setFormData({ title: '', description: '', date: new Date().toISOString().split('T')[0], image: '' });
  };

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setMemoryToDelete(id);
  };

  const confirmDelete = () => {
    if (!memoryToDelete) return;
    const updated = memories.filter(m => m.id !== memoryToDelete);
    saveMemories(updated);
    if (selectedMemory?.id === memoryToDelete) setSelectedMemory(null);
    setMemoryToDelete(null);
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16"
      >
        <div className="max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic text-black dark:text-white leading-none mb-6">
            Elite <span className="text-blue-600">Memories</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-xl font-medium">Log your tactical maneuvers and social milestones.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="px-8 py-5 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/20"
        >
          <Plus size={20} /> Capture New Memory
        </button>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {memories.map((memory, idx) => (
            <motion.div
              key={memory.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedMemory(memory)}
              className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/5 cursor-pointer"
            >
              <img 
                src={memory.image} 
                alt={memory.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-1">{memory.date}</div>
                    <h3 className="text-xl font-bold uppercase tracking-tight text-white leading-tight">{memory.title}</h3>
                  </div>
                  <button 
                    onClick={(e) => handleDelete(memory.id, e)}
                    className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {memories.length === 0 && !isAdding && (
        <div className="py-32 text-center">
          <div className="w-24 h-24 bg-black/5 dark:bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-gray-300">
            <Camera size={48} />
          </div>
          <h3 className="text-2xl font-bold text-gray-400 dark:text-gray-600 uppercase tracking-tighter">No memories deployed.</h3>
          <p className="text-gray-500 mt-2 font-medium">Initialize your visual archive today.</p>
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
              className="w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-[3.5rem] overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl relative flex flex-col md:flex-row h-[80vh]"
            >
              <button 
                onClick={() => setIsAdding(false)}
                className="absolute top-8 right-8 p-2 bg-black/5 dark:bg-white/5 rounded-full z-10 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-1/2 bg-neutral-100 dark:bg-black/40 relative">
                {formData.image ? (
                  <div className="w-full h-full relative">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setFormData({ ...formData, image: '' })}
                      className="absolute bottom-8 left-8 px-6 py-3 bg-black/60 backdrop-blur-md text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    <ImageIcon size={48} className="text-gray-300 mb-4" />
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Upload Intelligence Frame</span>
                  </label>
                )}
              </div>

              <div className="w-full md:w-1/2 p-12 flex flex-col justify-center overflow-y-auto">
                <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-8 text-black dark:text-white">Record Data</h2>
                
                <form onSubmit={handleAdd} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Night Out in Prayagraj"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Date</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Memory Log</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Enter the tactical summary of this event..."
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all font-medium resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={!formData.image}
                    className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Seal Memory
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Enlarged View */}
      <AnimatePresence>
        {selectedMemory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
            <motion.div
              layoutId={selectedMemory.id}
              className="w-full max-w-6xl relative bg-white dark:bg-neutral-900 rounded-[4rem] overflow-hidden flex flex-col md:flex-row h-[85vh] shadow-[0_0_100px_rgba(0,0,0,0.5)]"
            >
              <button 
                onClick={() => setSelectedMemory(null)}
                className="absolute top-8 right-8 p-3 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white z-20 transition-all"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-2/3 relative h-full">
                <img src={selectedMemory.image} alt={selectedMemory.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-12 left-12">
                   <div className="flex items-center gap-3 text-blue-400 font-black uppercase tracking-[0.4em] text-xs mb-4">
                     <Calendar size={14} /> {selectedMemory.date}
                   </div>
                   <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-white leading-none">{selectedMemory.title}</h2>
                </div>
              </div>

              <div className="w-full md:w-1/3 p-12 flex flex-col h-full bg-white dark:bg-neutral-900 overflow-y-auto">
                <div className="flex-grow">
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-4">Intelligence Archive #82</div>
                  <p className="text-gray-600 dark:text-gray-400 text-xl font-medium leading-relaxed whitespace-pre-wrap">{selectedMemory.description}</p>
                </div>
                
                <div className="mt-12 pt-12 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                  <button 
                    onClick={(e) => handleDelete(selectedMemory.id, e)}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-500 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={16} /> Delete Entry
                  </button>
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                    <Maximize2 size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {memoryToDelete && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-neutral-900 p-10 rounded-[3rem] border border-black/10 dark:border-white/10 max-w-sm w-full text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                <Trash2 size={40} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-4 text-black dark:text-white">Delete Memory?</h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium mb-10 leading-relaxed italic">
                This action is irreversible. The intelligence frame will be permanently purged from the archive.
              </p>
              <div className="flex flex-col gap-4">
                <button
                  onClick={confirmDelete}
                  className="w-full py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all shadow-xl shadow-red-500/20"
                >
                  Confirm Purge
                </button>
                <button
                  onClick={() => setMemoryToDelete(null)}
                  className="w-full py-4 bg-black/5 dark:bg-white/5 text-gray-500 dark:text-gray-400 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black/10 dark:hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
