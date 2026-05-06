import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Zap, Shield, Cpu, Monitor, Smartphone } from 'lucide-react';

export default function PlatformPage() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 blur-[120px] -z-10" />
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-6 italic leading-none text-black dark:text-white">
            The <span className="text-blue-600">Platform</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto font-medium transition-colors leading-relaxed">
            A high-performance infrastructure designed to bridge the gap between archaic ERP systems and modern student lifestyles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-40">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="space-y-10"
          >
            <FeatureItem 
              icon={<Cpu className="text-blue-500" />} 
              title="Neural OCR Engine" 
              description="Our custom-trained vision models extract data from clustered ERP tables with 99.9% accuracy, even with low-quality screenshots." 
            />
            <FeatureItem 
              icon={<Zap className="text-yellow-500" />} 
              title="Real-time Synchronization" 
              description="Calculations occur in microseconds. Get instant projections as soon as your file hits our secure servers." 
            />
            <FeatureItem 
              icon={<Shield className="text-emerald-500" />} 
              title="Threshold Guarding" 
              description="A multi-layered validation system that ensures you stay within academic compliance boundaries at all times." 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            viewport={{ once: true }}
            className="relative p-2 rounded-[3.5rem] bg-gradient-to-br from-blue-500/20 to-purple-500/20 group"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative">
              <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700" />
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" 
                alt="Cybersecurity and Data" 
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-12">
                <div className="text-white">
                  <div className="text-xs font-black uppercase tracking-widest mb-2 text-blue-400">Secure Node V4.2</div>
                  <div className="text-2xl font-bold">Encrypted Data Nexus</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Global Infrastructure Section */}
        <div className="mb-40">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold uppercase tracking-tighter italic mb-4">Global Infrastructure</h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Uptime", value: "99.99%", sub: "Industrial Grade" },
              { label: "Latency", value: "<45ms", sub: "Global Average" },
              { label: "Requests", value: "12M+", sub: "Monthly Volume" },
              { label: "Nodes", value: "24", sub: "Data Centers" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center"
              >
                <div className="text-[10px] uppercase font-black tracking-widest text-blue-600 dark:text-blue-500 mb-2">{stat.label}</div>
                <div className="text-4xl font-black tracking-tighter mb-1">{stat.value}</div>
                <div className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <PlatformCard 
            icon={<Layers size={32} />} 
            title="Data Architecture" 
            description="Built on a distributed cloud nexus for maximum uptime during end-of-semester traffic spikes." 
          />
          <PlatformCard 
            icon={<Smartphone size={32} />} 
            title="Mobile Optimization" 
            description="The ScholarPulse interface is designed for rapid entry and exit, focusing on the data you need most." 
          />
          <PlatformCard 
            icon={<Shield size={32} />} 
            title="Privacy First" 
            description="Your ERP data is processed in a transient state. We don't store your login credentials, ever." 
          />
        </motion.div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 }
      }}
      className="flex gap-6 group"
    >
      <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-all duration-500 text-black dark:text-white group-hover:text-white group-hover:rotate-6">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold uppercase tracking-tight mb-2 text-black dark:text-white group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function PlatformCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      className="p-8 rounded-[2rem] glass border-black/5 dark:border-white/5 hover:border-blue-600/30 dark:hover:border-blue-500/30 transition-all group overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-700">
        {icon}
      </div>
      <div className="text-blue-600 dark:text-blue-500 mb-6 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter text-black dark:text-white group-hover:text-blue-600 transition-colors">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 font-medium">{description}</p>
    </motion.div>
  );
}
