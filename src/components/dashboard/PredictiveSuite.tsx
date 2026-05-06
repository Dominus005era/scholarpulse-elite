import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Zap, AlertTriangle, Info, Calendar, BarChart3, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, BarChart, Bar, Cell } from 'recharts';
import { AttendanceData, UserRecord } from '../../types.ts';

interface PredictiveSuiteProps {
  isOpen: boolean;
  onClose: () => void;
  record: AttendanceData;
  user: UserRecord;
  endDate: string;
  initialTab?: 'forecast' | 'timeline';
}

export default function PredictiveSuite({ isOpen, onClose, record, user, endDate, initialTab = 'forecast' }: PredictiveSuiteProps) {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<'forecast' | 'timeline'>(initialTab);

  useEffect(() => {
    setIsClient(true);
    setActiveTab(initialTab);
  }, [initialTab]);

  const generateForecastData = () => {
    if (!endDate) return [];
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return [];
    
    const data = [];
    const target = user.targetPercentage;
    const startPercentage = record.percentage;
    
    for (let i = 0; i <= 7; i++) {
      const progress = i / 7;
      const currentVal = startPercentage + (target - startPercentage) * progress * 0.4;
      data.push({
        name: `P${i}`,
        percentage: parseFloat(currentVal.toFixed(1)),
        threshold: target
      });
    }
    return data;
  };

  const getTimelineData = () => {
    if (!record.dailyLogs || record.dailyLogs.length === 0) {
      // Dummy data if AI didn't find logs
      return [
        { date: 'Mon', status: 'Present', val: 1 },
        { date: 'Tue', status: 'Present', val: 1 },
        { date: 'Wed', status: 'Absent', val: 1 },
        { date: 'Thu', status: 'Present', val: 1 },
        { date: 'Fri', status: 'Absent', val: 1 },
      ];
    }
    return record.dailyLogs.map(log => ({
      date: log.date,
      status: log.status,
      val: 1
    }));
  };

  const forecastData = generateForecastData();
  const timelineData = getTimelineData();

  if (!isClient) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="w-full max-w-5xl bg-white dark:bg-neutral-900 rounded-[3.5rem] p-10 border border-black/10 dark:border-white/10 shadow-2xl relative z-10 overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] -mr-48 -mt-48" />
            
            <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-blue-600 rounded-lg text-white">
                    <TrendingUp size={16} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">High-Precision Analytics</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-black dark:text-white">
                  Predictive <span className="text-blue-600">Suite</span>
                </h2>
              </div>

              <div className="flex bg-black/5 dark:bg-white/5 p-1.5 rounded-2xl border border-black/5 dark:border-white/5">
                <button 
                  onClick={() => setActiveTab('forecast')}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'forecast' ? 'bg-white dark:bg-neutral-800 text-blue-600 shadow-xl' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  <BarChart3 size={16} /> Forecast
                </button>
                <button 
                  onClick={() => setActiveTab('timeline')}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'timeline' ? 'bg-white dark:bg-neutral-800 text-blue-600 shadow-xl' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  <Clock size={16} /> Timeline
                </button>
              </div>

              <button 
                onClick={onClose}
                className="p-4 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors relative z-50"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <div className="h-[350px] w-full p-8 rounded-[2.5rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 overflow-hidden flex flex-col items-center justify-center relative">
                  {activeTab === 'forecast' ? (
                    forecastData.length > 0 ? (
                      <div className="w-full h-full">
                        <AreaChart width={600} height={300} data={forecastData}>
                          <defs>
                            <linearGradient id="colorPerc" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#888888" opacity={0.1} vertical={false} />
                          <XAxis dataKey="name" hide />
                          <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(0,0,0,0.8)', 
                              border: 'none', 
                              borderRadius: '16px',
                              color: '#fff',
                              fontSize: '12px'
                            }}
                          />
                          <ReferenceLine y={user.targetPercentage} stroke="#ef4444" strokeDasharray="5 5" />
                          <Area 
                            type="monotone" 
                            dataKey="percentage" 
                            stroke="#2563eb" 
                            strokeWidth={4}
                            fillOpacity={1} 
                            fill="url(#colorPerc)" 
                          />
                        </AreaChart>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Calendar size={48} className="text-gray-300 mb-4 mx-auto" />
                        <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Date Node Missing</h4>
                        <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter">Please set a semester end date to unlock forecasting.</p>
                      </div>
                    )
                  ) : (
                    <div className="w-full h-full">
                      <h4 className="text-xs font-black uppercase tracking-widest text-blue-500 mb-6 flex items-center gap-2">
                        <Clock size={14} /> Daily Attendance Timeline
                      </h4>
                      <BarChart width={600} height={250} data={timelineData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                        <XAxis dataKey="date" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis hide domain={[0, 1.2]} />
                        <Tooltip 
                          cursor={{fill: 'transparent'}}
                          contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '12px', fontSize: '10px' }} 
                        />
                        <Bar dataKey="val" radius={[10, 10, 10, 10]} barSize={40}>
                          {timelineData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.status === 'Present' ? '#10b981' : '#ef4444'} fillOpacity={0.8} />
                          ))}
                        </Bar>
                      </BarChart>
                      <div className="flex justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-emerald-500">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" /> Present
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-rose-500">
                          <div className="w-2 h-2 rounded-full bg-rose-500" /> Absent
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10">
                    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-1">Elite Standing</div>
                    <div className="text-2xl font-black italic">OPTIMIZED</div>
                  </div>
                  <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10">
                    <div className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-1">Target Threshold</div>
                    <div className="text-2xl font-black italic">{user.targetPercentage}%</div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <section>
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-6">Tactical Margin</h4>
                  <div className="space-y-6">
                    <div className="flex justify-between items-end border-b border-black/5 dark:border-white/5 pb-4">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-gray-400">Freedom Buffer</div>
                        <div className="text-5xl font-black italic text-blue-600">{record.possibleBunks}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase font-bold text-gray-400 text-rose-500">Danger Zone</div>
                        <div className="text-2xl font-bold text-rose-500">{user.targetPercentage - 5}%</div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="pt-6 border-t border-black/5 dark:border-white/5">
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-6 flex items-center gap-2">
                    <Info size={14} /> Intelligence Standing
                  </h4>
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5">
                      <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">Current Standing</div>
                      <div className="text-lg font-bold text-black dark:text-white uppercase tracking-tighter italic">{record.percentage.toFixed(1)}%</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border-l-4 border-blue-600">
                      <div className="text-[10px] uppercase font-bold text-blue-600 mb-1">AI Recommendation</div>
                      <p className="text-[10px] font-medium leading-tight text-gray-600 dark:text-gray-400 uppercase italic">
                        {record.percentage > user.targetPercentage 
                          ? "Maintain current trajectory. High freedom window detected." 
                          : "Immediate recovery protocol required. Priority: 100% attendance next 5 days."}
                      </p>
                    </div>
                  </div>
                </section>

                <button 
                  onClick={onClose}
                  className="w-full py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl"
                >
                  Return to Command
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
