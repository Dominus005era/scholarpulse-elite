import React, { createContext, useContext, useState, useEffect } from 'react';

interface Settings {
  language: string;
  notifications: boolean;
  performanceMode: boolean;
  offlineStorage: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>({
    language: 'English',
    notifications: true,
    performanceMode: false,
    offlineStorage: true
  });

  useEffect(() => {
    const saved = localStorage.getItem('scholarPulse_settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('scholarPulse_settings', JSON.stringify(updated));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
