import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Landmark, Layers, Calendar, ArrowRight } from 'lucide-react';
import { UserRecord } from '../types.ts';

interface OnboardingPageProps {
  onComplete: (user: UserRecord) => void;
}

export default function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const [formData, setFormData] = useState<UserRecord>({
    name: '',
    college: '',
    class: '',
    section: '',
    year: '',
    semester: '',
    targetPercentage: 75,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-[2rem] p-10 border-white/10"
      >
        <div className="mb-10 text-left">
          <h2 className="text-3xl font-bold mb-2 text-black dark:text-white">Student Profile Setup</h2>
          <p className="text-gray-500 dark:text-gray-400">Tell us a bit about your academic background to personalize your dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputGroup 
            icon={<GraduationCap size={20} />} 
            label="Full Name" 
            placeholder="John Doe" 
            value={formData.name}
            onChange={(v) => setFormData({ ...formData, name: v })}
            required
          />
          
          <InputGroup 
            icon={<Landmark size={20} />} 
            label="College / University" 
            placeholder="MIT University" 
            value={formData.college}
            onChange={(v) => setFormData({ ...formData, college: v })}
            required
          />

          <div className="grid grid-cols-2 gap-6">
            <InputGroup 
              label="Class" 
              placeholder="B.Tech" 
              value={formData.class}
              onChange={(v) => setFormData({ ...formData, class: v })}
              required
            />
            <InputGroup 
              label="Section" 
              placeholder="A1" 
              value={formData.section}
              onChange={(v) => setFormData({ ...formData, section: v })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <InputGroup 
              icon={<Layers size={20} />} 
              label="Year" 
              placeholder="3rd Year" 
              value={formData.year}
              onChange={(v) => setFormData({ ...formData, year: v })}
              required
            />
            <InputGroup 
              icon={<Calendar size={20} />} 
              label="Semester" 
              placeholder="6th Semester" 
              value={formData.semester}
              onChange={(v) => setFormData({ ...formData, semester: v })}
              required
            />
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">Target Threshold: {formData.targetPercentage}%</label>
            <input 
              type="range"
              min="50"
              max="95"
              step="5"
              value={formData.targetPercentage}
              onChange={(e) => setFormData({ ...formData, targetPercentage: parseInt(e.target.value) })}
              className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-gray-500 dark:text-gray-600">
              <span>50% (Risk)</span>
              <span>75% (Standard)</span>
              <span>95% (Scholar)</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-neutral-800 dark:hover:bg-gray-100 transition-colors shadow-xl"
          >
            <span>Proceed to Dashboard</span>
            <ArrowRight size={20} />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

function InputGroup({ icon, label, placeholder, value, onChange, required }: { 
  icon?: React.ReactNode; 
  label: string; 
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
}) {
  return (
    <div className="space-y-2 group">
      <label className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-1 flex items-center gap-2 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
        {icon}
        {label}
      </label>
      <input
        type="text"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
      />
    </div>
  );
}
