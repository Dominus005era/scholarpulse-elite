import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Clock, Tag } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-32 text-center relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 blur-[150px] -z-10" />
          <h1 className="text-7xl md:text-[180px] font-black uppercase tracking-tighter mb-4 italic leading-[0.8] text-black dark:text-white transition-colors">
            Academic <br/><span className="text-blue-600">Wisdom</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-2xl md:text-3xl font-medium mt-12 italic transition-colors">Precision intelligence for tactical bunking.</p>
        </motion.div>

        {/* Featured Story */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative h-[600px] rounded-[4rem] overflow-hidden mb-32 group cursor-pointer"
        >
          <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000" 
            alt="Data Analysis" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-12 md:p-20">
            <div className="mb-6 flex gap-4">
              <span className="px-5 py-2 bg-blue-600 rounded-full text-xs font-black italic text-white uppercase tracking-widest">Main Entry</span>
              <span className="px-5 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-widest">12 Min Read</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-6 leading-none italic">
              Survival Guide: <br/><span className="text-blue-400">The 75% Law</span>
            </h2>
            <p className="text-white/70 text-xl md:text-2xl max-w-2xl font-light leading-relaxed">
              Unpacking the mathematics behind the most feared threshold in higher education and how to weaponize it for your freedom.
            </p>
          </div>
        </motion.div>

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
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32"
        >
          <BlogCard 
            image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200"
            category="Strategy"
            title="Maintain 75.1% Without Insanity"
            description="The tactical guide to calculating your safety margin and why 75.1% is the ultimate safety net for UIT students."
            date="May 01, 2024"
          />
          <BlogCard 
            image="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1200"
            category="Culture"
            title="The Art of Strategic Absence"
            description="When to skip, when to stay, and how to use data to justify your mid-afternoon coffee runs."
            date="Apr 28, 2024"
          />
        </motion.div>

        {/* Subscribe Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-12 md:p-20 rounded-[4rem] bg-blue-600 text-white mb-32 flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-4">Join the Network</h3>
            <p className="text-blue-100 text-lg md:text-xl font-medium">Get tactical intelligence reports delivered directly to your inbox before the crunch week.</p>
          </div>
          <div className="flex w-full md:w-auto gap-4">
            <input 
              type="email" 
              placeholder="cadet@elite.net"
              className="px-8 py-5 rounded-3xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-4 focus:ring-white/20 transition-all flex-grow md:w-64"
            />
            <button className="px-8 py-5 bg-white text-blue-600 rounded-3xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform active:scale-95 shadow-xl">
              Sync
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <MiniBlogCard 
            title="OCR Accuracy: Inside the Code"
            category="Tech"
            date="Apr 22"
          />
          <MiniBlogCard 
            title="New Semester, Elite Protocol"
            category="Planning"
            date="Apr 15"
          />
          <MiniBlogCard 
            title="Why ERP Portals Fail Students"
            category="Opinion"
            date="Apr 10"
          />
          <MiniBlogCard 
            title="Batch Processing for Groups"
            category="Update"
            date="Apr 02"
          />
          <MiniBlogCard 
            title="The Coffee/Lecture Ratio"
            category="Metrics"
            date="Mar 28"
          />
          <MiniBlogCard 
            title="Dorm Room Optimization"
            category="Lifestyle"
            date="Mar 20"
          />
        </motion.div>
      </div>
    </div>
  );
}

function BlogCard({ image, category, title, description, date }: { image: string, category: string, title: string, description: string, date: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -10 }}
      className="group relative rounded-[3rem] overflow-hidden border border-black/5 dark:border-white/5 bg-neutral-100 dark:bg-neutral-900 transition-colors"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img src={image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" alt={title} />
      </div>
      <div className="p-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-blue-600 rounded-full text-[10px] uppercase font-black italic text-white">{category}</span>
          <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Clock size={12} /> {date}
          </span>
        </div>
        <h3 className="text-3xl font-bold uppercase tracking-tight mb-4 text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-6">{description}</p>
        <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 dark:text-white/50 group-hover:text-black dark:group-hover:text-white transition-all">
          Read Log <ArrowUpRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}

function MiniBlogCard({ title, category, date }: { title: string, category: string, date: string }) {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 }
      }}
      whileHover={{ y: -8, rotate: 1 }}
      className="p-8 rounded-[2rem] glass border-black/5 dark:border-white/5 hover:border-blue-600/30 cursor-pointer transition-all flex flex-col justify-between h-56 transition-colors group"
    >
      <div className="flex justify-between items-start">
        <div className="text-[10px] uppercase font-black text-blue-600 dark:text-blue-500 group-hover:scale-110 transition-transform">{category}</div>
        <div className="text-[10px] font-mono text-gray-400 dark:text-gray-700">{date}</div>
      </div>
      <h4 className="text-2xl font-bold uppercase tracking-tighter leading-tight text-black dark:text-white group-hover:text-blue-600 transition-colors">{title}</h4>
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-600">
        <BookOpen size={12} className="group-hover:text-blue-600 transition-colors" /> Full Article
      </div>
    </motion.div>
  );
}
