import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, BookOpen, Clock, Tag, X, Calendar, Share2, Sparkles, BookOpenCheck } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  description: string;
  content: string[];
}

export default function BlogPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: "featured",
      title: "Survival Guide: The 75% Law",
      category: "Main Entry",
      date: "May 04, 2024",
      readTime: "12 Min Read",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000",
      description: "Unpacking the mathematics behind the most feared threshold in higher education and how to weaponize it for your freedom.",
      content: [
        "The 75% attendance rule is the single most defining constraint of your academic life. It is the gatekeeper to your exams, the source of infinite administrative anxiety, and the primary metric that colleges use to measure your commitment. But what if we told you that the 75% rule isn't a barrier to your freedom, but a mathematical framework waiting to be optimized?",
        "Let's look at the numbers. In a standard semester of 15 weeks with 4 lectures per subject per week, you have 60 lectures in total. Under the 75% rule, you are required to attend 45 of them, leaving you a tactical buffer of exactly 15 lectures. These 15 lectures represent your 'Freedom Capital.' The key is not to spend them randomly, but to allocate them strategically when their marginal utility is highest.",
        "First, establish an early buffer. In the first 4 weeks of the semester, attendance is typically light on coursework but heavy on syllabus setup. This is when you should maintain 100% attendance. By frontloading your presence, you build an ironclad credit buffer that protects your average later in the semester when project submissions, late nights, or plain burnout hit.",
        "Second, understand the rounding protocol of your college's ERP. Many systems use simple floor or ceiling rounding. If your attendance is 74.6%, does the system round it up to 75% or deny your admit card? Because of this algorithmic opacity, we recommend aiming for a strict baseline of 75.1%—the safety margin that ensures no database rounding error can derail your term."
      ]
    },
    {
      id: "751-percent",
      title: "Maintain 75.1% Without Insanity",
      category: "Strategy",
      date: "May 01, 2024",
      readTime: "8 Min Read",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200",
      description: "The tactical guide to calculating your safety margin and why 75.1% is the ultimate safety net for UIT students.",
      content: [
        "Why exactly 75.1%? Why not a neat, round 75.0%? In the world of database administration, rounding errors are silent killers. If a university ERP calculates your percentage as 74.99999% due to floating-point division, a poorly written script will flag you as eligible for detention. Aiming for 75.1% is the ultimate intellectual insurance policy.",
        "To maintain this target without losing your mind, you need to treat attendance as a balance sheet. Every lecture you attend is a credit; every lecture you bunk is a debit. Never let your account go into overdraft before the mid-term exams.",
        "Use ScholarPulse's real-time threshold control to run simulation scenarios. If you plan to bunk next Monday's morning classes, input that preview into your calculations. If the resulting projection drops you below the safety threshold, you know you have to attend Friday's lab to balance the ledger."
      ]
    },
    {
      id: "strategic-absence",
      title: "The Art of Strategic Absence",
      category: "Culture",
      date: "Apr 28, 2024",
      readTime: "10 Min Read",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1200",
      description: "When to skip, when to stay, and how to use data to justify your mid-afternoon coffee runs.",
      content: [
        "Bunking is not merely about staying in bed; it is an art form that requires cultural awareness and social coordination. The amateur skips class on a rainy Friday morning only to find out there was an unannounced quiz. The elite student stays home because they calculated that the professor was attending a conference.",
        "To master strategic absence, you must map the lecture landscape. Identify low-value sessions—lectures where the professor reads off a slide deck that you already have downloaded. Conversely, respect high-value sessions: interactive workshops or labs where participation is graded directly.",
        "Always keep your peer network updated. If a surprise proxy opportunity arises or a professor decides to take attendance at the start instead of the end, having real-time communication coordinates will save your record."
      ]
    },
    {
      id: "ocr-accuracy",
      title: "OCR Accuracy: Inside the Code",
      category: "Tech",
      date: "Apr 22, 2024",
      readTime: "7 Min Read",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1200",
      description: "How ScholarPulse's Gemini integration reads chaotic ERP screenshots, dealing with table grid structures and color codes.",
      content: [
        "Reading a blurry screenshot of a legacy university portal is a nightmare for standard OCR engines. Table columns shift, colors blend, and text gets pixelated. ScholarPulse bypasses these limitations by deploying custom AI prompting models that understand table hierarchies.",
        "By parsing the raw image data through multi-modal vision systems, ScholarPulse doesn't just read words—it reconstructs the entire grid layout. It identifies the date headers, matches them to the P1-P8 lecture slots, and calculates the exact color ratio (present green vs absent red).",
        "This architecture ensures that even if your college portal looks like it was built in 1999, our analytics suite can read it with 99.8% precision, ensuring your calculations are always built on absolute truth."
      ]
    },
    {
      id: "elite-protocol",
      title: "New Semester, Elite Protocol",
      category: "Planning",
      date: "Apr 15, 2024",
      readTime: "6 Min Read",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1200",
      description: "Setting up your goals early. Building initial credit buffer in the first month when attendance is easy.",
      content: [
        "A new semester is a blank slate, but most students fall into the same trap: they start bunking in week one and spend the rest of the term playing catch-up. The Elite Protocol is a simple, structured approach to starting your semester right.",
        "For the first 30 days, maintain a strict zero-bunk policy. This builds an immediate buffer. When your attendance is sitting at a healthy 95%, you have massive tactical flexibility for the rest of the term.",
        "Use the Calendar page inside ScholarPulse to map out holidays and exam weeks. Align your planned absences with these dates to extend your weekends without triggering high-absence alerts from the dean's office."
      ]
    },
    {
      id: "erp-failure",
      title: "Why ERP Portals Fail Students",
      category: "Opinion",
      date: "Apr 10, 2024",
      readTime: "8 Min Read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
      description: "A critique of outdated college portal designs, lack of notification systems, and why student-built utilities are superior.",
      content: [
        "University ERP portals are built for administrators, not students. They are designed to monitor, track, and restrict, with clunky user interfaces, zero mobile optimization, and no predictive insight.",
        "Students don't just want to know their current percentage; they need to know what that percentage means for the future. Can they afford to miss class tomorrow? How many classes do they need to attend to recover from a sick week? Legacy portals offer none of this.",
        "ScholarPulse was born to bridge this intelligence gap. By turning static, hostile ERP data into interactive, predictive metrics, we return the power of planning back to the student."
      ]
    },
    {
      id: "batch-processing",
      title: "Batch Processing for Groups",
      category: "Update",
      date: "Apr 02, 2024",
      readTime: "5 Min Read",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200",
      description: "How to plan bunks as a group/project team so everyone has coverage or skips together without collapsing group projects.",
      content: [
        "Managing your own attendance is hard enough, but managing it within a project group is even more complex. If half your group is missing during a critical lab, the entire team's project score suffers.",
        "Our next feature expansion will introduce 'Group Portals.' By linking your ScholarPulse profiles, team members can coordinate their tactical absences so that a baseline representation is always present in the classroom.",
        "This guarantees that project progress never stalls and no single team member is left holding the bag while others are off-duty."
      ]
    },
    {
      id: "coffee-lecture-ratio",
      title: "The Coffee/Lecture Ratio",
      category: "Metrics",
      date: "Mar 28, 2024",
      readTime: "5 Min Read",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1200",
      description: "A fun metric detailing the amount of caffeine required to survive consecutive lectures versus sleep utility.",
      content: [
        "Is it worth attending a 9:00 AM lecture if you only slept for 3 hours? We ran the numbers to calculate the relationship between caffeine consumption, cognitive absorption, and attendance value.",
        "Our study suggests that if survival requires more than 400mg of caffeine just to stay awake during a slide-reading lecture, the marginal utility of attending drops to near-zero. You are better off sleeping and studying the slides during your high-energy hours.",
        "Save your attendance credits for interactive lectures where active participation is required, and use your sleep hours to maintain mental sharpness."
      ]
    },
    {
      id: "dorm-optimization",
      title: "Dorm Room Optimization",
      category: "Lifestyle",
      date: "Mar 20, 2024",
      readTime: "7 Min Read",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
      description: "Setting up a secondary workflow desk, sleep patterns, and automating attendance checks.",
      content: [
        "Your study setup directly influences your academic performance. Setting up a dedicated dashboard monitor for your analytics allows you to keep track of your schedule without distraction.",
        "We recommend setting up a localized proxy server or automated scripts to run your ERP sync every morning. This ensures that you wake up with a fresh dashboard update showing exactly where you stand.",
        "A clean workspace leads to clear planning. Keep your tactical metrics visible so you can make informed decisions before you even put on your shoes."
      ]
    }
  ];

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
          onClick={() => setSelectedArticle(articles[0])}
          className="relative h-[600px] rounded-[4rem] overflow-hidden mb-32 group cursor-pointer border border-black/10 dark:border-white/10"
        >
          <img 
            src={articles[0].image} 
            alt={articles[0].title} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-12 md:p-20">
            <div className="mb-6 flex gap-4">
              <span className="px-5 py-2 bg-blue-600 rounded-full text-xs font-black italic text-white uppercase tracking-widest">{articles[0].category}</span>
              <span className="px-5 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-widest">{articles[0].readTime}</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-6 leading-none italic">
              Survival Guide: <br/><span className="text-blue-400">The 75% Law</span>
            </h2>
            <p className="text-white/70 text-xl md:text-2xl max-w-2xl font-light leading-relaxed">
              {articles[0].description}
            </p>
          </div>
        </motion.div>

        {/* Strategy and Culture */}
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
            image={articles[1].image}
            category={articles[1].category}
            title={articles[1].title}
            description={articles[1].description}
            date={articles[1].date}
            onClick={() => setSelectedArticle(articles[1])}
          />
          <BlogCard 
            image={articles[2].image}
            category={articles[2].category}
            title={articles[2].title}
            description={articles[2].description}
            date={articles[2].date}
            onClick={() => setSelectedArticle(articles[2])}
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

        {/* Mini Blog Grid */}
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
          {articles.slice(3).map((art) => (
            <MiniBlogCard 
              key={art.id}
              title={art.title}
              category={art.category}
              date={art.date}
              onClick={() => setSelectedArticle(art)}
            />
          ))}
        </motion.div>
      </div>

      {/* Article Detail Overlay Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-[3.5rem] border border-black/10 dark:border-white/10 shadow-2xl relative z-10 overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Image banner header */}
              <div className="relative h-[250px] md:h-[350px] w-full flex-shrink-0">
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-neutral-900 via-black/20 to-transparent" />
                <button 
                  onClick={() => setSelectedArticle(null)} 
                  className="absolute top-6 right-6 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors z-20 backdrop-blur-md border border-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content area with custom scrollbar */}
              <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar flex-1 space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] uppercase font-black tracking-widest">{selectedArticle.category}</span>
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Clock size={14} /> {selectedArticle.readTime || "5 Min Read"}
                    </span>
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Calendar size={14} /> {selectedArticle.date}
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight italic text-black dark:text-white leading-tight">
                    {selectedArticle.title}
                  </h2>
                </div>

                <p className="text-xl font-bold italic text-blue-600 dark:text-blue-400 leading-relaxed border-l-4 border-blue-600 pl-4 bg-blue-500/5 py-4 rounded-r-2xl">
                  {selectedArticle.description}
                </p>

                <div className="space-y-6 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed font-medium">
                  {selectedArticle.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="pt-8 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-black italic">SP</div>
                    <div>
                      <div className="text-sm font-bold text-black dark:text-white">ScholarPulse Editorial</div>
                      <div className="text-[10px] uppercase font-black tracking-widest text-gray-400">Tactical Intelligence Division</div>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-md">
                    <Share2 size={14} /> Share Report
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BlogCard({ image, category, title, description, date, onClick }: { image: string, category: string, title: string, description: string, date: string, onClick: () => void }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -10 }}
      onClick={onClick}
      className="group relative rounded-[3rem] overflow-hidden border border-black/5 dark:border-white/5 bg-neutral-100 dark:bg-neutral-900 transition-colors cursor-pointer shadow-sm hover:shadow-xl"
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
        <h3 className="text-3xl font-bold uppercase tracking-tight mb-4 text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-6 line-clamp-2">{description}</p>
        <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 dark:text-white/50 group-hover:text-black dark:group-hover:text-white transition-all">
          Read Log <ArrowUpRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}

function MiniBlogCard({ title, category, date, onClick }: { title: string, category: string, date: string, onClick: () => void }) {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 }
      }}
      whileHover={{ y: -8, rotate: 0.5 }}
      onClick={onClick}
      className="p-8 rounded-[2rem] glass border border-black/5 dark:border-white/5 hover:border-blue-600/30 cursor-pointer transition-all flex flex-col justify-between h-56 transition-colors group shadow-sm hover:shadow-lg"
    >
      <div className="flex justify-between items-start">
        <div className="text-[10px] uppercase font-black text-blue-600 dark:text-blue-500 group-hover:scale-105 transition-transform">{category}</div>
        <div className="text-[10px] font-mono text-gray-400 dark:text-gray-700">{date}</div>
      </div>
      <h4 className="text-2xl font-bold uppercase tracking-tighter leading-tight text-black dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">{title}</h4>
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-600">
        <BookOpenCheck size={12} className="group-hover:text-blue-600 transition-colors" /> Full Article
      </div>
    </motion.div>
  );
}
