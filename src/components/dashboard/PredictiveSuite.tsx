import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Zap, AlertTriangle, Info, Calendar, BarChart3, Clock, LayoutGrid } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';
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
    
    for (let i = 0; i <= 10; i++) {
      const progress = i / 10;
      const currentVal = startPercentage + (target - startPercentage) * progress * 0.3;
      data.push({
        name: `L${i}`,
        percentage: parseFloat(currentVal.toFixed(1)),
        threshold: target
      });
    }
    return data;
  };

  const getTimelineData = () => {
    if (!record.dailyLogs || record.dailyLogs.length === 0) {
      // Dummy data if AI didn't find logs, but redesigned for lecture nodes
      return [
        { lecture: 'Maths', date: '01/05', status: 'Present', val: 1 },
        { lecture: 'Physics', date: '01/05', status: 'Present', val: 1 },
        { lecture: 'Chemistry', date: '02/05', status: 'Absent', val: 1 },
        { lecture: 'Biology', date: '02/05', status: 'Present', val: 1 },
        { lecture: 'English', date: '03/05', status: 'Present', val: 1 },
        { lecture: 'History', date: '03/05', status: 'Absent', val: 1 },
        { lecture: 'Geography', date: '04/05', status: 'Present', val: 1 },
        { lecture: 'Arts', date: '04/05', status: 'Present', val: 1 },
      ];
    }
    return record.dailyLogs.map(log => ({
      ...log,
      val: 1
    }));
  };

  const forecastData = generateForecastData();
  const timelineData = getTimelineData();

  if (!isClient) return null;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/90 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl">
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{data.date}</div>
          <div className="text-sm font-bold text-white mb-1">{data.lecture || 'Lecture Node'}</div>
          <div className={`text-xs font-black uppercase tracking-tighter ${data.status === 'Present' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {data.status}
          </div>
        </div>
      );
    }
    return null;
  };

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
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] -mr-64 -mt-64" />
            
            <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6 relative z-10">
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

              <div className="flex bg-black/5 dark:bg-white/5 p-1.5 rounded-2xl border border-black/5 dark:border-white/5 shadow-inner">
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
                className="p-4 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors relative z-50 group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
              <div className="lg:col-span-2 space-y-8">
                <div className="h-[400px] w-full p-8 rounded-[3rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 flex flex-col relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {activeTab === 'forecast' ? (
                    forecastData.length > 0 ? (
                      <div className="w-full h-full">
                        <h4 className="text-xs font-black uppercase tracking-widest text-blue-500 mb-6 flex items-center gap-2">
                          <TrendingUp size={14} /> Trajectory Projection
                        </h4>
                        <ResponsiveContainer width="100%" height="85%">
                          <AreaChart data={forecastData}>
                            <defs>
                              <linearGradient id="colorPerc" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#888888" opacity={0.1} vertical={false} />
                            <XAxis dataKey="name" hide />
                            <YAxis domain={['dataMin - 2', 'dataMax + 2']} hide />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(0,0,0,0.8)', 
                                border: 'none', 
                                borderRadius: '16px',
                                color: '#fff',
                                fontSize: '12px',
                                backdropFilter: 'blur(8px)'
                              }}
                            />
                            <ReferenceLine y={user.targetPercentage} stroke="#ef4444" strokeDasharray="8 8" strokeWidth={2} />
                            <Area 
                              type="monotone" 
                              dataKey="percentage" 
                              stroke="#2563eb" 
                              strokeWidth={5}
                              fillOpacity={1} 
                              fill="url(#colorPerc)" 
                              animationDuration={2000}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <Calendar size={64} className="text-gray-300 dark:text-neutral-700 mb-6 animate-pulse" />
                        <h4 className="text-lg font-black uppercase tracking-widest text-gray-400 mb-2">Temporal Node Missing</h4>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-tighter max-w-xs">
                          Please synchronize your semester termination date to unlock advanced trajectory mapping.
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="w-full h-full flex flex-col">
                      <h4 className="text-xs font-black uppercase tracking-widest text-blue-500 mb-8 flex items-center gap-2">
                        <Clock size={14} /> High-Precision Lecture Timeline
                      </h4>
                      <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={timelineData} margin={{ bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.05} vertical={false} />
                            <XAxis 
                              dataKey="lecture" 
                              fontSize={9} 
                              axisLine={false} 
                              tickLine={false}
                              tick={{ fill: '#888', fontWeight: 'bold' }}
                              angle={-15}
                              textAnchor="end"
                            />
                            <YAxis hide domain={[0, 1.2]} />
                            <Tooltip 
                              cursor={{fill: 'rgba(255,255,255,0.03)', radius: 12}}
                              content={<CustomTooltip />}
                            />
                            <Bar dataKey="val" radius={[8, 8, 8, 8]} barSize={32} animationDuration={1500}>
                              {timelineData.map((entry, index) => (
                                <Cell 
                                  key={`cell-${index}`} 
                                  fill={entry.status === 'Present' ? '#10b981' : '#ef4444'} 
                                  fillOpacity={0.8}
                                  className="filter drop-shadow-lg"
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex justify-center gap-8 mt-6 pt-6 border-t border-black/5 dark:border-white/5">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-500 tracking-widest">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" /> Attended
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-rose-500 tracking-widest">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" /> Missed
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/10 group hover:bg-emerald-500/10 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <LayoutGrid size={14} className="text-emerald-500" />
                      <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Elite Standing</div>
                    </div>
                    <div className="text-3xl font-black italic tracking-tighter uppercase text-emerald-500 group-hover:scale-105 transition-transform origin-left">Combat Optimized</div>
                  </div>
                  <div className="p-8 rounded-[2.5rem] bg-blue-500/5 border border-blue-500/10 group hover:bg-blue-500/10 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap size={14} className="text-blue-500" />
                      <div className="text-[10px] font-black uppercase tracking-widest text-blue-500">Target Threshold</div>
                    </div>
                    <div className="text-3xl font-black italic tracking-tighter uppercase text-blue-500 group-hover:scale-105 transition-transform origin-left">{user.targetPercentage}.0%</div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <section className="p-8 rounded-[2.5rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-8 flex items-center gap-2">
                    <Zap size={16} className="text-blue-600" /> Tactical Margin
                  </h4>
                  <div className="space-y-8">
                    <div className="flex justify-between items-end border-b border-black/5 dark:border-white/5 pb-6">
                      <div>
                        <div className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-1">Lecture Buffer</div>
                        <div className="text-6xl font-black italic tracking-tighter text-blue-600">{record.possibleBunks}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase font-black tracking-widest text-rose-500 mb-1">Danger Zone</div>
                        <div className="text-3xl font-black tracking-tighter text-rose-500 italic opacity-80">{user.targetPercentage - 5}%</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <span>Buffer Health</span>
                        <span className={record.possibleBunks > 5 ? 'text-emerald-500' : 'text-rose-500'}>
                          {record.possibleBunks > 5 ? 'EXCELLENT' : 'CRITICAL'}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (record.possibleBunks / 20) * 100)}%` }}
                          className={`h-full rounded-full ${record.possibleBunks > 5 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <section className="p-8 rounded-[2.5rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-8 flex items-center gap-2">
                    <Info size={16} /> Intelligence Standing
                  </h4>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-black/5 dark:bg-white/5 p-5 rounded-3xl">
                      <div className="text-[10px] uppercase font-black tracking-widest text-gray-400">Current Standing</div>
                      <div className="text-2xl font-black italic tracking-tighter text-black dark:text-white">{record.percentage.toFixed(1)}%</div>
                    </div>
                    <div className="p-6 rounded-3xl bg-blue-600/10 border-l-[6px] border-blue-600 shadow-xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:scale-110 transition-transform">
                        <Zap size={48} />
                      </div>
                      <div className="text-[10px] uppercase font-black text-blue-600 mb-2 tracking-widest">Elite Protocol Recommendation</div>
                      <p className="text-xs font-bold leading-relaxed text-gray-700 dark:text-gray-300 italic">
                        {record.percentage > user.targetPercentage 
                          ? "Trajectory within safe bounds. Strategic bunking enabled for optimization." 
                          : "Immediate recovery sequence engaged. Mandatory 100% attendance required to reset buffer."}
                      </p>
                    </div>
                  </div>
                </section>

                <button 
                  onClick={onClose}
                  className="w-full py-6 bg-black dark:bg-white text-white dark:text-black rounded-[2rem] font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.1)] group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 group-hover:text-white transition-colors">Return to Command</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
