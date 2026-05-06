import React from 'react';
import { motion } from 'motion/react';
import { Moon, Sun, Globe, Bell, Shield, Smartphone, Zap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.tsx';
import { useSettings } from '../../context/SettingsContext.tsx';

export default function PreferencesPage() {
  const { theme, toggleTheme } = useTheme();
  const { settings, updateSettings } = useSettings();

  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic text-black dark:text-white leading-none mb-6">
          System <span className="text-blue-600">Preferences</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-xl font-medium">Fine-tune your Elite experience.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PreferenceSection title="Appearance">
          <PreferenceItem 
            icon={theme === 'light' ? <Sun /> : <Moon />} 
            label="Theme Mode" 
            description="Toggle between high-contrast light and dark industrial modes."
          >
            <button 
              onClick={toggleTheme}
              className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
            >
              {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
            </button>
          </PreferenceItem>
        </PreferenceSection>

        <PreferenceSection title="Localization">
          <PreferenceItem 
            icon={<Globe />} 
            label="System Language" 
            description="Choose your preferred interface language for ScholarPulse."
          >
            <select 
              value={settings.language}
              onChange={(e) => updateSettings({ language: e.target.value })}
              className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2 text-xs font-bold outline-none"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </PreferenceItem>
        </PreferenceSection>

        <PreferenceSection title="Communications">
          <PreferenceItem 
            icon={<Bell />} 
            label="Push Notifications" 
            description="Get alerted when bunk safety levels drop below 10%."
          >
            <Toggle 
              active={settings.notifications} 
              onToggle={() => updateSettings({ notifications: !settings.notifications })} 
            />
          </PreferenceItem>
          <PreferenceItem 
            icon={<Zap />} 
            label="Performance Mode" 
            description="Reduces animations for faster interface navigation."
          >
            <Toggle 
              active={settings.performanceMode} 
              onToggle={() => updateSettings({ performanceMode: !settings.performanceMode })} 
            />
          </PreferenceItem>
        </PreferenceSection>

        <PreferenceSection title="Security & Data">
          <PreferenceItem 
            icon={<Shield />} 
            label="Data Encryption" 
            description="All local cache data is AES-256 encrypted by default."
          >
            <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest italic flex items-center gap-1">
              <Shield size={12} /> Active
            </div>
          </PreferenceItem>
          <PreferenceItem 
            icon={<Smartphone />} 
            label="Offline Storage" 
            description="Enable persistence across sessions even without network."
          >
            <Toggle 
              active={settings.offlineStorage} 
              onToggle={() => updateSettings({ offlineStorage: !settings.offlineStorage })} 
            />
          </PreferenceItem>
        </PreferenceSection>
      </div>
    </div>
  );
}

function PreferenceSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 dark:text-gray-600 ml-4 mb-4">{title}</h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function PreferenceItem({ icon, label, description, children }: { icon: React.ReactNode; label: string; description: string; children: React.ReactNode }) {
  return (
    <div className="p-8 rounded-[2.5rem] bg-neutral-50 dark:bg-neutral-900 border border-black/5 dark:border-white/5 transition-colors group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="text-blue-600 group-hover:scale-110 transition-transform">{icon}</div>
          <h3 className="font-bold text-black dark:text-white uppercase tracking-tight">{label}</h3>
        </div>
        {children}
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">{description}</p>
    </div>
  );
}

function Toggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <div 
      onClick={onToggle}
      className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${active ? 'bg-blue-600' : 'bg-gray-200 dark:bg-neutral-800'}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${active ? 'translate-x-6' : ''}`} />
    </div>
  );
}
