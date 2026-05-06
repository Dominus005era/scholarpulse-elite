import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ShieldCheck, Target, BarChart3, Fingerprint, Globe, Cpu, Github, Twitter, Linkedin } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 px-6 py-6 border-b border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/50 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Cpu size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight uppercase text-black dark:text-white">ScholarPulse</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500 dark:text-gray-400">
            <a href="#features" className="hover:text-black dark:hover:text-white transition-colors">Intelligence</a>
            <a href="#workflow" className="hover:text-black dark:hover:text-white transition-colors">Workflow</a>
            <a href="#security" className="hover:text-black dark:hover:text-white transition-colors">Security</a>
          </nav>
          <button 
            onClick={onStart}
            className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-bold hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white transition-all transform active:scale-95 shadow-lg shadow-black/10 dark:shadow-none"
          >
            Access Terminal
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-48 pb-20 px-6 relative overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center relative"
        >
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-600/10 blur-[200px] -z-10 animate-pulse" />
          
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[11px] font-black uppercase tracking-[0.5em] mb-12 shadow-[0_0_30px_rgba(37,99,235,0.2)] transition-all hover:bg-blue-500/20"
          >
            <Fingerprint size={16} className="animate-pulse" />
            <span>Academic Performance Infrastructure</span>
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-7xl md:text-[200px] font-black tracking-tighter leading-[0.7] mb-12 uppercase italic text-black dark:text-white"
          >
            Architect <br />
            Your <span className="text-blue-600 drop-shadow-[0_0_60px_rgba(37,99,235,0.5)] dark:drop-shadow-[0_0_60px_rgba(37,99,235,0.3)]">Freedom</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-gray-500 dark:text-gray-400 text-xl md:text-3xl max-w-3xl mx-auto mb-16 font-medium leading-relaxed italic transition-colors"
          >
            "The ultimate tactical utility for United Institute of Technology elite." Precision engineering for the modern student. Analyze ERP data with high-fidelity OCR.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-center gap-8">
            <button
              onClick={onStart}
              className="group relative px-14 py-7 bg-blue-600 rounded-[2.5rem] font-black text-2xl flex items-center gap-4 overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_30px_60px_rgba(37,99,235,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
              <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20 transition-opacity" />
              <span>Initialize Build</span>
              <ArrowRight size={32} className="group-hover:translate-x-3 transition-transform duration-500" />
            </button>
            <div className="text-gray-600 dark:text-gray-500 text-xs font-mono uppercase tracking-[0.4em] flex items-center gap-3">
              <div className="w-10 h-px bg-gray-300 dark:bg-gray-800" />
              <span>Production Version 4.2.0 Stable</span>
              <div className="w-10 h-px bg-gray-300 dark:bg-gray-800" />
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Background Grid */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-[250%] -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_20%,transparent_100%)] transition-colors duration-500" />

        {/* Visual Impact Box - Bento Style */}
        <div className="max-w-7xl mx-auto mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="md:col-span-2 rounded-[3.5rem] overflow-hidden group relative border border-black/5 dark:border-white/5 h-[600px] shadow-2xl"
           >
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000" 
                alt="Advanced Interface"
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-2 bg-blue-600 rounded-full" />
                  <span className="text-sm font-black uppercase tracking-[0.5em] text-blue-400">Elite Protocol V.4</span>
                </div>
                <h2 className="text-6xl font-black uppercase tracking-tighter italic text-white leading-none">Engineered <br/>for Precision</h2>
              </div>
           </motion.div>
           <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="rounded-[3.5rem] bg-blue-600 p-12 flex flex-col justify-between text-white relative overflow-hidden group"
           >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-1000">
                <Target size={180} />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-[0.4em] mb-4 opacity-70 italic font-mono">Live Statistics</div>
                <h3 className="text-4xl font-black uppercase tracking-tighter leading-tight italic">99.9% <br/>OCR Success</h3>
              </div>
              <div className="space-y-6">
                <div className="h-px bg-white/20" />
                <p className="text-lg font-medium opacity-80 leading-relaxed italic">Our neural networks are trained onUIT ERP patterns for absolute reliability.</p>
                <div className="flex gap-2">
                  {[1,2,3,4].map(i => <div key={i} className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                      className="w-full h-full bg-white" 
                    />
                  </div>)}
                </div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Stats / Proof Section */}
      <section className="py-24 border-y border-black/5 dark:border-white/5 bg-neutral-50 dark:bg-neutral-950 transition-colors relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/[0.02] -z-10" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          <StatBox value="0.2s" label="System Latency" />
          <StatBox value="99.9%" label="AI Accuracy" />
          <StatBox value="12M+" label="Data Points" />
          <StatBox value="24/7" label="Operational" />
        </div>
      </section>

      {/* Tactical Protocol Section */}
      <section className="py-40 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-600 mb-4 block">The Process</span>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 italic text-black dark:text-white">Tactical <span className="text-blue-600">Protocol</span></h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: "01", icon: <Globe size={40} />, title: "Data Extraction", desc: "Our engine interfaces with various portals to pull raw, high-fidelity metrics." },
              { step: "02", icon: <Cpu size={40} />, title: "Neural Analysis", desc: "Bayesian models calculate projection paths for 75% threshold safety." },
              { step: "03", icon: <BarChart3 size={40} />, title: "Insight Delivery", desc: "Beautiful, scannable intelligence reports delivered to your terminal." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="text-[120px] font-black text-black/[0.03] dark:text-white/[0.03] absolute -top-16 -left-8 -z-10 group-hover:text-blue-600/[0.05] transition-colors">{item.step}</div>
                <div className="mb-8 p-6 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-xl">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-bold uppercase tracking-tight mb-4 text-black dark:text-white italic">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-40 px-6 bg-neutral-100 dark:bg-neutral-900 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-black dark:text-white italic">Industrial <br/><span className="text-blue-600">Intelligence</span></h2>
              <p className="text-gray-500 dark:text-gray-400 text-xl italic font-medium">Engineered to provide clarity when college portals fail. ScholarPulse is built for reliability.</p>
            </div>
            <button onClick={onStart} className="px-10 py-5 bg-black dark:bg-white text-white dark:text-black rounded-3xl font-black uppercase tracking-widest text-sm hover:bg-blue-600 hover:text-white transition-all">Start Build</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="text-blue-500" />} 
              title="Threshold Guard" 
              description="Real-time buffer analysis ensures you never cross the 75% boundary accidentally." 
            />
            <FeatureCard 
              icon={<Target className="text-purple-500" />} 
              title="Temporal Sync" 
              description="Historical snapshots grouped by ERP report dates for long-term progress tracking." 
            />
            <FeatureCard 
              icon={<BarChart3 className="text-emerald-500" />} 
              title="Bunk Projection" 
              description="Advanced math models account for remaining semester days and lecture frequency." 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-6 border-t border-black/5 dark:border-white/5 bg-white dark:bg-black transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Cpu size={20} className="text-white" />
                </div>
                <span className="font-bold text-2xl tracking-tight uppercase text-black dark:text-white">ScholarPulse</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-8 italic">
                Empowering students with data-driven academic management. Precision tools for a modern educational landscape.
              </p>
              <div className="flex gap-4">
                <SocialIcon icon={<Twitter size={18} />} />
                <SocialIcon icon={<Github size={18} />} />
                <SocialIcon icon={<Linkedin size={18} />} />
              </div>
            </div>
            <div>
              <h4 className="font-bold uppercase text-xs tracking-widest text-gray-400 mb-6 font-mono">Platform</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Intelligence Unit</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Calculus Engine</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">API Access</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase text-xs tracking-widest text-gray-400 mb-6 font-mono">Legal</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-gray-600 text-[10px] uppercase tracking-widest font-mono">
            <span>© 2024 ScholarPulse Elite Architecture</span>
            <div className="flex gap-6 mt-4 md:mt-0">
              <span>Status: Operational</span>
              <span>Latency: 12ms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center group">
      <div className="text-4xl md:text-5xl font-black mb-2 text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-gray-500 dark:text-gray-600 font-bold">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -10, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
      className="p-10 rounded-[2rem] border border-black/5 dark:border-white/5 bg-white dark:bg-black transition-all group overflow-hidden relative shadow-sm hover:shadow-xl hover:shadow-blue-500/10"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-all" />
      <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-8 border border-black/5 dark:border-white/10 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight text-black dark:text-white">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium italic">{description}</p>
    </motion.div>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="w-10 h-10 rounded-full border border-black/10 dark:border-white/5 flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white hover:border-black/30 dark:hover:border-white/20 transition-all">
      {icon}
    </a>
  );
}
