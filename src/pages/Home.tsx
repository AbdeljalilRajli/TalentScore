import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BarChart, Cpu, ChevronRight, Play, Star, Plus, Minus, FileUp, GitCompare, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials = [
    {
      quote: "Finally, an analyzer that actually understands tech roles. TalentScore's feedback helped me fix my bullets and land 3 recruiters calls in a week.",
      author: "Alex Rivera",
      role: "Full-Stack Engineer @ Stripe",
      img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100"
    },
    {
      quote: "The semantic mapping identified exactly where I was underselling my systems design experience. A must-have for senior technical roles.",
      author: "Sarah Chen",
      role: "Senior Developer @ Google",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
    },
    {
      quote: "Clean, fast, and remarkably accurate. It actually feels like a professional technical tool, not just another generic AI wrapper.",
      author: "James Wilson",
      role: "Frontend Lead @ Airbnb",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
    },
    {
      quote: "The bullet point refinement is sharp. It helped me translate complex technical wins into high-value professional signals.",
      author: "Linda Wu",
      role: "Engineering Manager @ Vercel",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const faqs = [
    {
      q: "Does TalentScore work with any ATS?",
      a: "Yes, our engine is built to mimic the parsing rules of over 50+ major Applicant Tracking Systems including Workday, Taleo, and Greenhouse."
    },
    {
       q: "Is my resume data kept private?",
       a: "100%. All processing happens locally in your browser session and we never store your resume or personal information on our servers."
    },
    {
       q: "How does the AI assistant work?",
       a: "We integrate directly with Google Gemini Flash to rewrite your bullet points in real-time, mapping your raw experience strictly to the job description keywords."
    }
  ];

  const steps = [
    {
      title: "Upload CV",
      desc: "Securely inject your PDF or DOCX file into our local parsing environment.",
      icon: <FileUp className="w-8 h-8 text-white" />,
      color: "bg-white/5 border border-white/10"
    },
    {
      title: "Mapping",
      desc: "Paste the job description to initialize the structural match delta.",
      icon: <GitCompare className="w-8 h-8 text-white" />,
      color: "bg-white/5 border border-white/10"
    },
    {
      title: "Optimization",
      desc: "Get instant AI-driven bullet rewrites and structural fixes.",
      icon: <Sparkles className="w-8 h-8 text-white" />,
      color: "bg-white/5 border border-white/10"
    }
  ];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
      <div className="min-h-screen bg-wallet-bg text-wallet-text overflow-x-hidden selection:bg-wallet-purple/30">
        
        {/* 1. TOP NAV */}
        <nav className="w-full max-w-[1280px] mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-wallet-card flex items-center justify-center border border-white/10 shadow-lg group-hover:border-wallet-purple/50 transition-all">
                <span className="text-white font-bold text-sm tracking-tight">TS</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-wallet-purple transition-colors">TalentScore</span>
            </a>
            <div className="hidden md:flex items-center gap-6">
              <div className="w-px h-4 bg-white/10"></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/analyze" className="bg-wallet-purple hover:bg-wallet-purple/90 text-wallet-bg px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 group transition-all hover:scale-[1.02] active:scale-100 shadow-xl">
              Scan Resume
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </nav>

      {/* 2. HERO */}
      <section className="w-full relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 blur-[160px] rounded-full -mr-80 -mt-80 animate-pulse pointer-events-none"></div>
        
        <main className="max-w-[1280px] mx-auto px-6 pt-16 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        
        <div className="flex flex-col items-start relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-10"
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[0.95] tracking-tight mb-8">
              Expose the <br/>
              <span className="text-wallet-purple">Hidden Gap.</span>
            </h1>
            <p className="text-lg lg:text-xl text-wallet-muted max-w-md font-medium leading-relaxed">
              The high-precision scanning engine that maps your CV against real-world ATS algorithms. Secure the interview by neutralizing the bots.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-6"
          >
            <a href="/analyze" className="flex items-center gap-4 bg-wallet-yellow text-wallet-bg px-10 py-5 rounded-[2rem] shadow-2xl transition-all hover:bg-wallet-yellow/90 font-bold hover:scale-[1.03] active:scale-100 group">
              <span className="text-lg">Start Analysis</span>
              <div className="bg-wallet-bg/10 rounded-full p-2">
                <Play className="w-5 h-5 fill-wallet-bg" />
              </div>
            </a>
          </motion.div>
        </div>

        {/* Right Column - Scanning UI */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative bg-wallet-card/20 border border-white/5 rounded-[3.5rem] p-4 lg:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] flex flex-col justify-center min-h-[500px] backdrop-blur-xl"
        >
          <div className="relative w-full max-w-[340px] mx-auto bg-wallet-bg/80 rounded-[2.5rem] shadow-2xl border border-white/5 p-8 overflow-hidden pt-12 backdrop-blur-xl ring-1 ring-white/5">
            <div className="h-4 w-28 bg-white/10 rounded-full mb-8"></div>
            <div className="space-y-5 mb-10">
              <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                <motion.div className="absolute inset-0 bg-wallet-purple h-full w-[0%]" animate={{ width: "84%" }} transition={{ duration: 2.5, delay: 1 }} />
              </div>
              <div className="h-2.5 w-3/4 bg-white/5 rounded-full overflow-hidden relative">
                <motion.div className="absolute inset-0 bg-wallet-yellow h-full w-[0%]" animate={{ width: "62%" }} transition={{ duration: 2.5, delay: 1.3 }} />
              </div>
              <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                <motion.div className="absolute inset-0 bg-emerald-400 h-full w-[0%]" animate={{ width: "92%" }} transition={{ duration: 2.5, delay: 1.6 }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-wallet-card/60 rounded-[1.5rem] p-5 border border-white/5 shadow-inner">
                <span className="text-[10px] font-bold text-white/20 uppercase block mb-2 tracking-[0.2em]">ATS Score</span>
                <span className="text-3xl font-bold text-white tabular-nums tracking-tighter">84.2</span>
              </div>
              <div className="bg-wallet-purple rounded-[1.5rem] p-5 shadow-inner relative overflow-hidden group font-bold">
                <span className="text-[10px] font-bold text-wallet-bg/50 uppercase block mb-2 tracking-[0.2em]">Score Lift</span>
                <span className="text-3xl font-bold text-wallet-bg tabular-nums tracking-tighter">+12%</span>
              </div>
            </div>
            <motion.div 
              className="absolute left-0 right-0 h-0.5 bg-wallet-yellow/80 z-10 shadow-[0_0_20px_rgba(248,213,126,0.6)] rounded-full"
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </main>
      </section>

      {/* 3. TRUST BANNER - LOCAL BRAND LOGOS */}
      <section className="w-full max-w-[1280px] mx-auto px-6 py-20 mb-20 border-y border-white/5 relative overflow-hidden">
         <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 lg:gap-20 opacity-20 grayscale hover:opacity-100 transition-all duration-700 brightness-0 invert">
           {/* Vercel */}
           <img src="/homepage/icons/vercel.svg" alt="Vercel" className="h-6 md:h-8 w-auto" />
           {/* Stripe */}
           <img src="/homepage/icons/stripe.svg" alt="Stripe" className="h-6 md:h-8 w-auto" />
           {/* Google */}
           <img src="/homepage/icons/google.svg" alt="Google" className="h-6 md:h-8 w-auto" />
           {/* GitHub */}
           <img src="/homepage/icons/github.svg" alt="GitHub" className="h-6 md:h-8 w-auto" />
           {/* Netflix */}
           <img src="/homepage/icons/netflix.svg" alt="Netflix" className="h-6 md:h-8 w-auto" />
         </div>
      </section>

      {/* 4. CORE MECHANICS */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="bg-wallet-cream rounded-[3.5rem] p-10 lg:p-20 mb-24 shadow-2xl relative overflow-hidden border border-white/10 ring-1 ring-black/5">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16 relative z-20">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-bold text-[#1b1c1e] leading-tight mb-6 tracking-tight">The Three Layers.</h2>
              <p className="text-xl text-[#1b1c1e]/60 font-semibold leading-relaxed">
                Most platforms just count keywords. We simulate the final-stage technical screen using proprietary structural logic.
              </p>
            </div>
          </div>
          <div className="bg-[#1b1c1e] rounded-[2.5rem] p-10 md:p-16 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] relative overflow-hidden ring-1 ring-white/10">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
               <div className="bg-[#2a2b2f] border border-white/5 p-10 rounded-[2rem] shadow-inner hover:translate-y-[-8px] transition-transform">
                 <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-10">
                   <Search className="w-8 h-8 text-white" />
                 </div>
                 <h3 className="text-white font-bold text-2xl mb-4">Semantic Context</h3>
                 <p className="text-base text-wallet-muted leading-relaxed font-medium">We map the conceptual proximity of your experience using deep vector embeddings.</p>
               </div>
               <div className="bg-[#2a2b2f] border border-white/5 p-10 rounded-[2rem] shadow-inner hover:translate-y-[-8px] transition-transform">
                 <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-10">
                   <BarChart className="w-8 h-8 text-white" />
                 </div>
                 <h3 className="text-white font-bold text-2xl mb-4">Impact Intensity</h3>
                 <p className="text-base text-wallet-muted leading-relaxed font-medium">Proprietary scoring model evaluating decision-making density and measurable metrics.</p>
               </div>
               <div className="bg-[#2a2b2f] border border-white/5 p-10 rounded-[2rem] shadow-inner relative overflow-hidden group hover:translate-y-[-8px] transition-transform">
                 <div className="absolute inset-0 bg-wallet-purple/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div className="w-16 h-16 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center mb-10 relative z-10">
                   <Cpu className="w-8 h-8" />
                 </div>
                 <h3 className="text-white font-bold text-2xl mb-4 relative z-10">Neural Tuning</h3>
                 <p className="text-base text-wallet-muted leading-relaxed font-medium relative z-10">Instant conversion of weak bullet points into high-density professional signals.</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESS SECTION */}
      <section className="max-w-[1280px] mx-auto px-6 py-24 mb-24">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">Optimized Workflow.</h2>
          <p className="text-xl text-white/40 font-bold max-w-2xl mx-auto">Three phases to land your next technical interview.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className={`w-28 h-28 ${step.color} rounded-[2.5rem] flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                {step.icon}
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{step.title}</h3>
              <p className="text-white/40 font-bold leading-relaxed max-w-[280px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS CAROUSEL */}
      <section className="max-w-[1280px] mx-auto px-6 py-12 mb-24 relative">
        <div className="bg-wallet-purple rounded-[3.5rem] p-16 md:p-24 text-center relative overflow-hidden shadow-2xl min-h-[500px] flex flex-col justify-center">
          <Star className="w-16 h-16 text-[#1b1c1e]/10 absolute top-12 left-12 rotate-12" />
          <Star className="w-16 h-16 text-[#1b1c1e]/10 absolute bottom-12 right-12 -rotate-12" />
          
          <div className="relative h-full flex flex-col items-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <p className="text-[#1b1c1e] text-2xl md:text-4xl font-bold leading-tight mb-16 max-w-4xl mx-auto tracking-tight">
                  "{testimonials[currentSlide].quote}"
                </p>
                <div className="flex items-center justify-center gap-6">
                   <div className="w-16 h-16 bg-white/40 rounded-[1.5rem] overflow-hidden border-2 border-[#1b1c1e]/10 shadow-2xl">
                     <img src={testimonials[currentSlide].img} alt={testimonials[currentSlide].author} className="w-full h-full object-cover" />
                   </div>
                   <div className="text-left font-bold text-[#1b1c1e]">
                     <p className="text-lg leading-none">{testimonials[currentSlide].author}</p>
                     <p className="text-sm opacity-60 font-semibold italic">{testimonials[currentSlide].role}</p>
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
            <button 
              onClick={() => paginate(-1)}
              className="w-14 h-14 rounded-2xl bg-white/10 hover:bg-white/20 text-[#1b1c1e] flex items-center justify-center transition-all pointer-events-auto active:scale-95 group"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => paginate(1)}
              className="w-14 h-14 rounded-2xl bg-white/10 hover:bg-white/20 text-[#1b1c1e] flex items-center justify-center transition-all pointer-events-auto active:scale-95 group"
            >
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentSlide ? 1 : -1);
                  setCurrentSlide(i);
                }}
                className={`h-1.5 transition-all duration-300 rounded-full ${i === currentSlide ? 'w-8 bg-[#1b1c1e]' : 'w-4 bg-[#1b1c1e]/20'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQS */}
      <section className="max-w-[900px] mx-auto px-6 py-12 mb-40">
        <h2 className="text-5xl md:text-6xl font-bold text-center text-white mb-20 tracking-tight">Curiosities.</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#222327] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl group transition-all hover:border-white/10">
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-10 text-left transition-colors hover:bg-white/5"
              >
                <span className="text-xl font-bold text-white group-hover:text-wallet-purple transition-colors">{faq.q}</span>
                <div className={`p-3 rounded-full transition-all duration-500 shadow-xl ${openFaq === i ? 'bg-wallet-purple text-wallet-bg rotate-180' : 'bg-white/5 text-wallet-muted'}`}>
                  {openFaq === i ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                </div>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <div className="px-10 pb-10 text-white/40 leading-relaxed font-bold border-t border-white/5 pt-8 text-lg">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="w-full max-w-[1280px] mx-auto px-6 py-16 mt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-16 text-sm font-bold">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-wallet-card flex items-center justify-center border border-white/10 shadow-xl">
              <span className="text-white font-bold text-xs tracking-tight">TS</span>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight leading-none">TalentScore</span>
          </div>
          <div className="flex flex-wrap text-white/40 gap-10 uppercase tracking-[0.2em] text-[10px]">
             <span>© 2026 TalentScore Resume Labs</span>
             <a href="#" className="hover:text-white transition-colors">Infrastructure</a>
             <a href="#" className="hover:text-white transition-colors">Terms</a>
             <a href="#" className="hover:text-white transition-colors">API v1.4</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
