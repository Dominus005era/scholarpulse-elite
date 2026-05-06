import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, Binary, Fingerprint, BarChart2 } from 'lucide-react';

export default function MethodologyPage() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32 relative"
        >
          <div className="absolute inset-0 bg-blue-600/10 blur-[120px] -z-10" />
          <h1 className="text-6xl md:text-[120px] font-black uppercase tracking-tighter mb-6 italic leading-[0.8] text-black dark:text-white">
            Our Core <br/><span className="text-blue-600">Engine</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-xl font-medium mt-8 transition-colors max-w-2xl mx-auto leading-relaxed">
            The science behind academic optimization, powered by high-fidelity Bayesian inference and neural parsing.
          </p>
        </motion.div>

        <section className="space-y-40">
          <MethodSection 
            step="01"
            title="Statistical Ingestion"
            icon={<Binary size={30} className="text-blue-500" />}
            content="We use high-fidelity neural networks to parse messy, tabular ERP data. Our models are trained on thousands of samples from major university portals across India to ensure headers, labels, and numeric values are correctly identified with zero human intervention."
          />
          
          <MethodSection 
            step="02"
            title="Dynamic Bunk Modeling"
            icon={<Calculator size={30} className="text-purple-500" />}
            content="The calculation isn't a simple percentage. We implement linear projections based on the remaining days of the semester and the frequency of classes. Our formula: B = floor(P / T - (P+A)) where T is your target threshold, calibrated for the modern student."
          />

          <MethodSection 
            step="03"
            title="Safety Buffering"
            icon={<ShieldOverlay />}
            content="ScholarPulse Elite automatically calculates a 'Red Line'. This isn't just the 75% limit, but a 5% predictive buffer that accounts for potential data logging delays in the university database, unexpected medical leaves, and ERP glitches."
          />

          {/* Interactive Formula Card */}
          <motion.div 
            initial={{ opacity: 0, rotateX: 20, y: 50 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", damping: 15 }}
            className="p-12 rounded-[4rem] bg-gradient-to-br from-blue-900/10 to-purple-900/10 dark:from-blue-900/20 dark:to-purple-900/20 border border-black/5 dark:border-white/5 relative overflow-hidden transition-colors perspective-1000"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[100px] -mr-64 -mt-64" />
            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
              <div className="flex-grow">
                <h3 className="text-4xl font-black uppercase tracking-tight mb-6 italic text-black dark:text-white">The Golden Ratio</h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium text-lg leading-relaxed mb-8">
                  Our proprietary algorithm ensures that your academic trajectory remains optimal while maximizing tactical freedom.
                </p>
                <div className="flex gap-4">
                  <div className="px-5 py-2 bg-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-widest italic">V4.2 Core</div>
                  <div className="px-5 py-2 bg-black/5 dark:bg-white/5 text-black dark:text-white rounded-full text-xs font-bold uppercase tracking-widest border border-black/10 dark:border-white/10">Stable Build</div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="bg-black/5 dark:bg-black/40 p-8 rounded-3xl border border-black/5 dark:border-white/5 relative group">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-2xl rotate-[-10deg] font-black group-hover:rotate-0 transition-transform">Σ</div>
                  <pre className="text-gray-600 dark:text-blue-400 font-mono text-base md:text-lg leading-relaxed overflow-x-auto">
                    <code>{`Let P = Present lectures
Let A = Absent lectures
Let T = Target (e.g. 0.75)

Possible Bunks (x):
x ≤ (P / T) - (P + A)

Safety Margin (S):
x_safe = x * 0.95`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Workflow Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Ingestion", desc: "Data capture via OCR", icon: <Fingerprint /> },
              { title: "Transformation", desc: "Normalization of tables", icon: <Binary /> },
              { title: "Simulation", desc: "Monte Carlo bunking", icon: <Calculator /> },
              { title: "Visualization", desc: "Intelligence reports", icon: <BarChart2 /> }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/5 hover:border-blue-600/30 transition-all text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-black/5 dark:bg-white/5 mx-auto flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {step.icon}
                </div>
                <h4 className="font-bold uppercase tracking-tight mb-2 text-black dark:text-white">{step.title}</h4>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function MethodSection({ step, title, icon, content }: { step: string; title: string; icon: React.ReactNode; content: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="flex flex-col md:flex-row gap-12 items-start group"
    >
      <div className="flex flex-col items-center shrink-0">
        <div className="text-5xl font-black italic text-black/5 dark:text-white/10 mb-2 transition-colors group-hover:text-blue-600/20 group-hover:scale-110 transition-transform duration-500">{step}</div>
        <div className="w-20 h-20 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-2xl group-hover:shadow-blue-500/20">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-4xl font-bold uppercase tracking-tighter mb-6 text-black dark:text-white group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed text-xl transition-colors">{content}</p>
      </div>
    </motion.div>
  );
}

function ShieldOverlay() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20" />
      <Fingerprint className="text-blue-500 relative z-10" />
    </div>
  );
}
