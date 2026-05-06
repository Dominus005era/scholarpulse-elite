import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Calculator, TrendingUp, Zap, AlertTriangle, ArrowRight, FileText, BarChart2, History } from 'lucide-react';
import { UserRecord, AttendanceData } from '../types.ts';
import AttendanceUploader from './dashboard/AttendanceUploader.tsx';
import StatsCard from './dashboard/StatsCard.tsx';
import HistoryList from './dashboard/HistoryList.tsx';

interface DashboardProps {
  user: UserRecord;
  history: AttendanceData[];
  onAddToHistory: (data: AttendanceData) => void;
  onUpdateProfile: (updated: UserRecord) => void;
}

export default function Dashboard({ user, history, onAddToHistory, onUpdateProfile }: DashboardProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AttendanceData | null>(history[0] || null);
  const [showProjectionModal, setShowProjectionModal] = useState(false);
  const [endDate, setEndDate] = useState<string>('');
  const [tempAnalysis, setTempAnalysis] = useState<{ present: number; absent: number; reportDate?: string } | null>(null);

  useEffect(() => {
    const savedEndDate = localStorage.getItem('scholarPulse_endDate');
    if (savedEndDate) setEndDate(savedEndDate);
  }, []);

  useEffect(() => {
    if (history.length > 0 && !selectedRecord) {
      setSelectedRecord(history[0]);
    }
  }, [history, selectedRecord]);

  const calculateDetailedBunks = (present: number, absent: number): AttendanceData => {
    const total = present + absent;
    const goal = user.targetPercentage / 100;
    const percentage = total === 0 ? 0 : (present / total) * 100;
    
    let possibleBunks = 0;
    let requiredClasses = 0;

    if (percentage >= user.targetPercentage) {
      possibleBunks = Math.floor(present / goal - total);
    } else {
      requiredClasses = Math.ceil((goal * total - present) / (1 - goal));
    }

    return {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      present,
      absent,
      total,
      percentage,
      possibleBunks: Math.max(0, possibleBunks),
      requiredClasses: Math.max(0, requiredClasses),
      reportDate: tempAnalysis?.reportDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };
  };

  const handleAnalysisResult = (data: { present: number; absent: number; reportDate?: string }) => {
    setTempAnalysis(data);
    setShowProjectionModal(true);
  };

  const finalizeAnalysis = () => {
    if (tempAnalysis) {
      const calculated = calculateDetailedBunks(tempAnalysis.present, tempAnalysis.absent);
      onAddToHistory(calculated);
      setSelectedRecord(calculated);
      if (endDate) {
        localStorage.setItem('scholarPulse_endDate', endDate);
      }
      setShowProjectionModal(false);
      setTempAnalysis(null);
    }
  };

  const handlePercentageChange = (val: number) => {
    onUpdateProfile({ ...user, targetPercentage: val });
  };
  
  const derivedData = selectedRecord ? {
    possibleBunks: selectedRecord.percentage >= user.targetPercentage 
      ? Math.floor(selectedRecord.present / (user.targetPercentage/100) - selectedRecord.total)
      : 0,
    requiredClasses: selectedRecord.percentage < user.targetPercentage 
      ? Math.ceil(((user.targetPercentage/100) * selectedRecord.total - selectedRecord.present) / (1 - (user.targetPercentage/100)))
      : 0
  } : null;

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Zap size={18} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-black dark:text-white">Scholar Pulse</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Active Profile: <span className="text-black dark:text-white font-bold">{user.name}</span> • {user.college}
          </p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 glass rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {user.class} ({user.section})
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatsCard 
          icon={<CheckCircle2 className="text-emerald-400" />} 
          label="Confirmed Present" 
          value={selectedRecord?.present || 0}
          detail="Total valid signatures"
        />
        <StatsCard 
          icon={<XCircle className="text-rose-400" />} 
          label="Reported Absent" 
          value={selectedRecord?.absent || 0}
          detail="Non-attendance events"
        />
        <StatsCard 
          icon={<Calculator className="text-blue-400" />} 
          label={selectedRecord && selectedRecord.percentage < user.targetPercentage ? "Recovery Debt" : "Freedom Buffer"} 
          value={derivedData ? (selectedRecord && selectedRecord.percentage < user.targetPercentage ? (derivedData.requiredClasses || 0) : (derivedData.possibleBunks || 0)) : (selectedRecord?.possibleBunks || 0)}
          detail={selectedRecord && selectedRecord.percentage < user.targetPercentage ? `Lectures to hit ${user.targetPercentage}%` : "Immediate bunk capacity"}
        />
        <StatsCard 
          icon={<TrendingUp className="text-violet-400" />} 
          label="Elite Index" 
          value={`${selectedRecord?.percentage.toFixed(1) || 0}%`}
          detail={`Threshold: ${user.targetPercentage}.0%`}
          progress={selectedRecord?.percentage || 0}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 space-y-8">
          <div className="glass rounded-[2rem] p-8 border-black/5 dark:border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-lg font-bold uppercase tracking-tight mb-1 text-black dark:text-white">Variable Threshold Control</h3>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400 w-12">{user.targetPercentage}%</span>
                <input 
                  type="range"
                  min="50"
                  max="95"
                  step="5"
                  value={user.targetPercentage}
                  onChange={(e) => handlePercentageChange(parseInt(e.target.value))}
                  className="h-1.5 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500 w-full md:w-48"
                />
              </div>
            </div>
          </div>

          <div className="glass rounded-[2.5rem] p-10 border-white/5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold uppercase tracking-tight flex items-center gap-3 text-black dark:text-white">
                <FileText size={24} className="text-blue-600 dark:text-blue-500" />
                Input Protocol
              </h3>
            </div>
            <AttendanceUploader 
              onAnalyzing={setIsAnalyzing} 
              onResult={handleAnalysisResult} 
            />
          </div>

          <div className="glass rounded-[2.5rem] p-10 border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <History size={24} className="text-gray-400" />
              <h3 className="text-2xl font-bold uppercase tracking-tight">Archives</h3>
            </div>
            <HistoryList 
              history={history} 
              onDelete={(id) => {
                const newHistory = history.filter(h => h.id !== id);
                localStorage.setItem('scholarPulse_history', JSON.stringify(newHistory));
                window.location.reload(); 
              }}
              onSelect={setSelectedRecord}
            />
          </div>
        </div>

        <div className="xl:col-span-4 space-y-8">
          <div className="glass rounded-[2.5rem] p-8 border-white/5">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-3xl bg-black/5 dark:bg-neutral-800 flex items-center justify-center border border-black/10 dark:border-white/10">
                <FileText size={28} className="text-gray-500 dark:text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-black dark:text-white">Academic Term</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Semester {user.semester}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showProjectionModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-xl"
              onClick={() => setShowProjectionModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-lg glass bg-neutral-50 dark:bg-neutral-900 border-black/10 dark:border-white/10 rounded-[3rem] p-10 relative z-10"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2 text-black dark:text-white">Configure Forecast</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2 mb-2 block">Target Termination Date</label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none"
                  />
                </div>

                <button 
                  onClick={finalizeAnalysis}
                  disabled={!endDate}
                  className="w-full py-5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-2xl font-black text-xl uppercase tracking-tight flex items-center justify-center gap-3"
                >
                  Confirm Protocol
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
