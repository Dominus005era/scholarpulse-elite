import React from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Users, Award } from 'lucide-react';

export default function CompanyPage() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-32 relative"
        >
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-600/5 blur-[120px] -z-10" />
          <h1 className="text-7xl md:text-[140px] font-black uppercase tracking-tighter mb-6 italic leading-[0.75] text-black dark:text-white transition-colors">
            The <br/><span className="text-blue-600">Company</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-2xl md:text-3xl max-w-2xl font-medium mt-12 leading-relaxed transition-colors italic">
            Born out of necessity in the dorm rooms of Prayagraj, ScholarPulse is a student-first initiative aiming to redefine how we interact with academic metrics.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-12 md:p-20 rounded-[4rem] bg-black dark:bg-white text-white dark:text-black mb-40 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <Award size={120} />
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 italic">Our Mission</h2>
          <p className="text-2xl md:text-4xl font-light leading-tight max-w-4xl">
            To provide every student with the <span className="text-blue-500 underline decoration-4 underline-offset-8">computational intelligence</span> required to navigate academic bureaucracies with absolute precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-40 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="aspect-square rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl relative group"
          >
             <div className="absolute inset-0 bg-blue-600/10 z-10 opacity-40 mix-blend-overlay" />
             <img 
               src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
               alt="Team Collaboration" 
               className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
             />
             <div className="absolute bottom-8 left-8 z-20">
               <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl">
                 <div className="text-white font-black uppercase tracking-widest text-xs mb-1 italic">Est. 2026</div>
                 <div className="text-white text-2xl font-bold uppercase tracking-tight">Prayagraj HQ</div>
               </div>
             </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div>
              <h2 className="text-4xl font-bold uppercase tracking-tight mb-6 italic text-black dark:text-white">Our Roots</h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed text-lg mb-6">
                ScholarPulse Elite is an initiative of the students of <span className="text-black dark:text-white text-xl transition-colors font-bold italic">United Institute of Technology (UIT), Prayagraj</span>.
              </p>
              <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed text-lg">
                We started as a simple Excel sheet shared over WhatsApp, which eventually evolved into the production-grade intelligence platform it is today. Our DNA is 100% student-driven.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-10">
              <Member icon={<Award className="text-blue-400" />} name="Devesh" role="Founder & Visionary" />
              <Member icon={<Users className="text-purple-400" />} name="Rahul" role="Co-Founder & Lead Engineer" />
              <Member icon={<Award className="text-emerald-400" />} name="Anjali Sharma" role="UI/UX Architect" />
              <Member icon={<Users className="text-amber-400" />} name="Aryan Singh" role="Data Science Lead" />
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          {[
            { title: "Student First", icon: <Users />, desc: "Every line of code is written with the student's struggle in mind." },
            { title: "Absolute Accuracy", icon: <Award />, desc: "We don't do guesses. Our OCR and algorithms are audited for precision." },
            { title: "Radial Privacy", icon: <Users />, desc: "Your data is yours. We provide the tools, you provide the insight." }
          ].map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-10 rounded-[3rem] bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/5 hover:border-blue-600/30 transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-black flex items-center justify-center mb-6 shadow-xl group-hover:bg-blue-600 group-hover:text-white transition-all text-blue-600 dark:text-blue-500">
                {value.icon}
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 text-black dark:text-white">{value.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-16 rounded-[5rem] bg-neutral-50 dark:bg-neutral-950 border border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-16 relative overflow-hidden transition-colors"
        >
          <div className="absolute inset-0 bg-blue-600/[0.02]" />
          <div className="flex items-center gap-8 relative z-10">
            <div className="w-24 h-24 rounded-3xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 shadow-2xl shadow-blue-500/10">
              <MapPin size={48} className="text-blue-600 dark:text-blue-500" />
            </div>
            <div>
              <h4 className="text-3xl font-bold uppercase tracking-tight text-black dark:text-white">Main Hub</h4>
              <p className="text-gray-500 dark:text-gray-400 font-mono text-sm uppercase tracking-widest mt-1 transition-colors">Prayagraj, Uttar Pradesh, IN</p>
            </div>
          </div>
          <div className="flex items-center gap-8 relative z-10">
            <div className="w-24 h-24 rounded-3xl bg-purple-600/10 flex items-center justify-center border border-purple-500/20 shadow-2xl shadow-purple-500/10">
              <Mail size={48} className="text-purple-600 dark:text-purple-500" />
            </div>
            <div>
              <h4 className="text-3xl font-bold uppercase tracking-tight text-black dark:text-white">Contact Base</h4>
              <p className="text-gray-500 dark:text-gray-400 font-mono text-sm uppercase tracking-widest mt-1 transition-colors">hello@scholarpulse.elite</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Member({ icon, name, role }: { icon: React.ReactNode; name: string; role: string }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="group"
    >
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h4 className="font-bold text-lg text-black dark:text-white transition-colors">{name}</h4>
      </div>
      <p className="text-xs uppercase font-bold text-gray-500 dark:text-gray-600 tracking-widest transition-colors">{role}</p>
    </motion.div>
  );
}
