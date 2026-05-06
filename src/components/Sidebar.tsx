import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, LogOut, Settings, Award, Calendar, Moon, Sun, Home, Camera, Pencil, Check, Upload } from 'lucide-react';
import { UserRecord, AppState } from '../types.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserRecord | null;
  onReset: () => void;
  onDeleteAccount: () => void;
  onNavigate: (state: AppState) => void;
  currentState: AppState;
  onUpdateUser: (updates: Partial<UserRecord>) => void;
}

export default function Sidebar({ isOpen, onClose, user, onReset, onDeleteAccount, onNavigate, currentState, onUpdateUser }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNavigate = (state: AppState) => {
    onNavigate(state);
    onClose();
  };

  const handleNameSave = () => {
    if (newName.trim()) {
      onUpdateUser({ name: newName.trim() });
    }
    setIsEditingName(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onUpdateUser({ avatar: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-neutral-900 border-l border-black/10 dark:border-white/10 z-[70] p-6 flex flex-col transition-colors"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">ScholarPulse Profile</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-gray-500 dark:text-gray-400"
                >
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>
                <button onClick={onClose} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                  <X size={20} className="text-black dark:text-white" />
                </button>
              </div>
            </div>

            {user && (
              <div className="flex flex-col items-center mb-8 px-4">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-24 h-24 relative rounded-3xl mb-4 group cursor-pointer overflow-hidden shadow-2xl shadow-blue-500/20"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <User size={48} className="text-white" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Upload size={24} className="text-white" />
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                  />
                </div>

                <div className="flex items-center gap-2 mb-1 w-full justify-center">
                  {isEditingName ? (
                    <div className="flex items-center gap-2">
                      <input
                        autoFocus
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        onBlur={handleNameSave}
                        onKeyDown={e => e.key === 'Enter' && handleNameSave()}
                        className="bg-black/5 dark:bg-white/5 border-b-2 border-blue-600 text-black dark:text-white font-bold text-center outline-none px-2 py-0.5"
                      />
                      <button onClick={handleNameSave} className="text-green-500"><Check size={16} /></button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-black dark:text-white truncate max-w-[200px]">{user.name}</h3>
                      <button 
                        onClick={() => {
                          setNewName(user.name);
                          setIsEditingName(true);
                        }}
                        className="text-gray-400 hover:text-blue-600 p-1"
                      >
                        <Pencil size={14} />
                      </button>
                    </>
                  )}
                </div>
                
                <p className="text-gray-500 dark:text-gray-400 text-sm italic text-center w-full truncate">{user.college}</p>
                <div className="mt-4 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 text-[10px] font-black uppercase text-blue-600 dark:text-blue-400">
                  Target: {user.targetPercentage}%
                </div>
              </div>
            )}

            <div className="space-y-2 flex-grow">
              <SidebarItem 
                icon={<Home size={18} />} 
                label="Main Dashboard" 
                active={currentState === AppState.DASHBOARD}
                onClick={() => handleNavigate(AppState.DASHBOARD)}
              />
              <SidebarItem 
                icon={<Award size={18} />} 
                label="Achievements" 
                active={currentState === AppState.ACHIEVEMENTS}
                onClick={() => handleNavigate(AppState.ACHIEVEMENTS)}
              />
              <SidebarItem 
                icon={<Calendar size={18} />} 
                label="Academic Calendar" 
                active={currentState === AppState.CALENDAR}
                onClick={() => handleNavigate(AppState.CALENDAR)}
              />
              <SidebarItem 
                icon={<Camera size={18} />} 
                label="Elite Memories" 
                active={currentState === AppState.MEMORY}
                onClick={() => handleNavigate(AppState.MEMORY)}
              />
              <SidebarItem 
                icon={<Settings size={18} />} 
                label="Preferences" 
                active={currentState === AppState.PREFERENCES}
                onClick={() => handleNavigate(AppState.PREFERENCES)}
              />
            </div>

            <div className="space-y-4 mt-auto pt-6 border-t border-black/5 dark:border-white/5">
              <button 
                onClick={onReset}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-medium text-xs uppercase tracking-widest"
              >
                <LogOut size={16} />
                Clear History
              </button>
              
              <DeleteConfirmButton onDelete={onDeleteAccount} />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function DeleteConfirmButton({ onDelete }: { onDelete: () => void }) {
  const [isConfirming, setIsConfirming] = React.useState(false);

  if (isConfirming) {
    return (
      <div className="flex flex-col gap-2 p-2 bg-red-500/5 rounded-2xl border border-red-500/20">
        <p className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase text-center px-2 py-1">
          Are you absolutely sure?
        </p>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsConfirming(false)}
            className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onDelete}
            className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <button 
      onClick={() => setIsConfirming(true)}
      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-bold text-xs uppercase tracking-widest group"
    >
      <X size={16} className="group-hover:rotate-90 transition-transform" />
      Delete Account
    </button>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left group ${
        active 
          ? 'bg-blue-600 text-white' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
      }`}
    >
      <span className={`${active ? 'text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400'} transition-colors`}>{icon}</span>
      <span className="font-bold text-xs uppercase tracking-widest">{label}</span>
    </button>
  );
}
