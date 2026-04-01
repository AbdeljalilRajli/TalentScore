import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, GitCompare, Sparkles, Star, Plus, Minus, ArrowRight,
  Search, BarChart, Cpu, Check, ChevronLeft, ChevronRight, Play, X,
  FileText, Briefcase
} from 'lucide-react';

const Home: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      quote: "TalentScore helped me identify exactly where my resume was falling through the cracks. Landed three interviews within a week.",
      author: "Alex Rivera",
      role: "Full-Stack Engineer",
      company: "Stripe"
    },
    {
      quote: "The semantic analysis pinpointed gaps I never would have noticed. Essential for anyone targeting senior technical roles.",
      author: "Sarah Chen",
      role: "Senior Developer",
      company: "Google"
    },
    {
      quote: "Finally, a tool that understands tech hiring. The AI suggestions transformed my bullet points from vague to compelling.",
      author: "James Wilson",
      role: "Frontend Lead",
      company: "Airbnb"
    },
    {
      quote: "My resume went from being ignored to getting callbacks. The structured feedback is worth every second.",
      author: "Linda Wu",
      role: "Engineering Manager",
      company: "Vercel"
    }
  ];

  const faqs = [
    {
      q: "How does TalentScore analyze my resume?",
      a: "We use a multi-layered analysis engine that evaluates semantic relevance, impact metrics, and structural quality. Our algorithm mimics how modern ATS systems and technical recruiters actually review candidates."
    },
    {
      q: "Is my resume data private?",
      a: "Absolutely. All processing happens in your browser. We never store your resume or personal information on our servers. Your data stays on your device."
    },
    {
      q: "What file formats are supported?",
      a: "We support PDF, DOCX, and plain text files. For best results, we recommend uploading a text-based PDF or DOCX exported directly from your word processor."
    },
    {
      q: "How accurate is the AI assistant?",
      a: "Our AI integration provides contextual suggestions based on your specific resume and target job description. It's designed to enhance your existing experience, not replace your voice."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Upload",
      description: "Import your resume in PDF, DOCX, or paste as text.",
      icon: Upload
    },
    {
      number: "02", 
      title: "Map",
      description: "Add the job description to establish the match baseline.",
      icon: GitCompare
    },
    {
      number: "03",
      title: "Optimize",
      description: "Receive AI-powered suggestions to strengthen your application.",
      icon: Sparkles
    }
  ];

  const features = [
    {
      icon: Search,
      title: "Semantic Analysis",
      description: "Deep contextual matching between your experience and job requirements using vector similarity.",
      size: "large"
    },
    {
      icon: BarChart,
      title: "Impact Scoring",
      description: "Quantitative assessment of measurable outcomes, decision density, and technical depth.",
      size: "small"
    },
    {
      icon: Cpu,
      title: "AI Enhancement",
      description: "Intelligent rewriting suggestions that preserve your voice while amplifying professional signals.",
      size: "small"
    },
    {
      icon: FileText,
      title: "Cover Letter Generator",
      description: "Transform resume + job description into tailored cover letters that get interviews.",
      size: "small"
    },
    {
      icon: Briefcase,
      title: "Application Tracker",
      description: "Kanban-style tracker to organize your job search and never lose an opportunity.",
      size: "small"
    },
    {
      icon: Sparkles,
      title: "ATS Optimization",
      description: "Ensure your resume passes automated screening systems with formatting and keyword optimization.",
      size: "large"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, testimonials.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Hero Section - Unique Developer-Made Design */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16 md:pt-20">
        {/* Background grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-[96px]" />

        <div className="container-premium relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Text Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-flex items-center gap-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
                  <span className="text-neutral-500 text-sm font-mono">v2.0 now available</span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-neutral-50 mb-6 leading-[1.1]">
                  Your resume.{' '}
                  <span className="relative inline-block">
                    <span className="text-gradient">Decoded.</span>
                    <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                      <path d="M0 4C50 4 50 1 100 1C150 1 150 7 200 7" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" className="animate-[dash_3s_ease-in-out_infinite]" strokeDasharray="200" strokeDashoffset="200"/>
                    </svg>
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-neutral-400 mb-8 max-w-lg leading-relaxed">
                  Stop wondering why you're not getting callbacks. We analyze how ATS systems actually read your resume and tell you exactly what's missing.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a href="/analyze" className="group relative inline-flex items-center gap-3 bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-xl font-medium transition-all hover:scale-[1.02] active:scale-[0.98]">
                    <span>Analyze Your Resume</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#how-it-works" className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-200 px-6 py-4 rounded-xl font-medium transition-colors">
                    <span className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center">
                      <Play className="w-4 h-4 fill-current" />
                    </span>
                    See how it works
                  </a>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-8 mt-12 pt-8 border-t border-neutral-800/50">
                  <div>
                    <p className="text-2xl font-semibold text-neutral-100">50K+</p>
                    <p className="text-neutral-500 text-sm">Resumes analyzed</p>
                  </div>
                  <div className="w-px h-10 bg-neutral-800" />
                  <div>
                    <p className="text-2xl font-semibold text-neutral-100">87%</p>
                    <p className="text-neutral-500 text-sm">Avg. score improvement</p>
                  </div>
                  <div className="w-px h-10 bg-neutral-800" />
                  <div>
                    <p className="text-2xl font-semibold text-neutral-100">3x</p>
                    <p className="text-neutral-500 text-sm">More interviews</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right - Terminal Window */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative lg:pl-8"
            >
              {/* Terminal Window */}
              <div className="relative bg-neutral-900 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-neutral-800/50 border-b border-neutral-800">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-error-500/80" />
                    <div className="w-3 h-3 rounded-full bg-warning-500/80" />
                    <div className="w-3 h-3 rounded-full bg-success-500/80" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-neutral-500 text-xs font-mono">talentscore analyze resume.pdf</span>
                  </div>
                  <div className="w-16" />
                </div>

                {/* Terminal Content */}
                <div className="p-6 font-mono text-sm">
                  <div className="space-y-1">
                    <p className="text-neutral-500">
                      <span className="text-success-500">➜</span> <span className="text-primary-400">~</span> talentscore analyze resume.pdf --job-desc=job.txt
                    </p>
                    <p className="text-neutral-600">Analyzing resume structure...</p>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="text-neutral-600"
                    >
                      ✓ Extracted 1,247 words
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="text-neutral-600"
                    >
                      ✓ Identified 12 sections
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                      className="text-neutral-600"
                    >
                      ✓ Matched 34 keywords
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.5 }}
                      className="pt-4"
                    >
                      <div className="bg-neutral-800/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-neutral-400">ATS Compatibility Score</span>
                          <span className="text-2xl font-bold text-primary-400">72<span className="text-neutral-600">/100</span></span>
                        </div>
                        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-primary-600 to-primary-400"
                            initial={{ width: 0 }}
                            animate={{ width: "72%" }}
                            transition={{ delay: 3, duration: 1 }}
                          />
                        </div>
                      </div>
                      <div className="mt-3 p-3 bg-warning-500/10 border border-warning-500/20 rounded-lg">
                        <p className="text-warning-400 text-xs">
                          ⚠ Missing: Docker, Kubernetes, CI/CD experience
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Floating elements around terminal */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-neutral-800 rounded-xl p-3 shadow-xl border border-neutral-700"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-success-500/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-success-400" />
                  </div>
                  <div>
                    <p className="text-neutral-100 text-xs font-medium">Skills Match</p>
                    <p className="text-success-400 text-xs">82% aligned</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="absolute -bottom-4 -left-4 bg-neutral-800 rounded-xl p-3 shadow-xl border border-neutral-700"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-error-500/10 flex items-center justify-center">
                    <X className="w-4 h-4 text-error-400" />
                  </div>
                  <div>
                    <p className="text-neutral-100 text-xs font-medium">Missing Keywords</p>
                    <p className="text-error-400 text-xs">8 gaps found</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-neutral-700 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-neutral-500" />
          </div>
        </motion.div>
      </section>

      {/* Social Proof */}
      <section className="py-8 border-y border-neutral-800/50 bg-neutral-900/20">
        <div className="container-premium">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
            <span className="text-neutral-600 text-sm">Trusted by engineers at</span>
            {["Google", "Stripe", "Airbnb", "Netflix", "Spotify", "Meta"].map((company) => (
              <span key={company} className="text-neutral-500 font-medium hover:text-neutral-300 transition-colors cursor-default">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-neutral-50 mb-4">Three steps to better results</h2>
            <p className="text-neutral-400 max-w-xl mx-auto">
              Our streamlined process identifies gaps and provides actionable improvements in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card card-hover p-8 relative group"
              >
                <span className="absolute top-6 right-6 text-4xl font-bold text-neutral-800 group-hover:text-primary-900/30 transition-colors">
                  {step.number}
                </span>
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-6">
                  <step.icon className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-100 mb-3">{step.title}</h3>
                <p className="text-neutral-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-neutral-900/30">
        <div className="container-premium">
          <div className="text-center mb-12">
            <h2 className="text-neutral-50 mb-4">Complete job search toolkit</h2>
            <p className="text-neutral-400 max-w-xl mx-auto">
              Everything you need to land your next role — from resume optimization to application tracking.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 transition-all hover:border-primary-500/30 hover:bg-neutral-800/50 ${
                  feature.size === 'large' ? 'md:col-span-2' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 transition-colors group-hover:bg-primary-500/20">
                    <feature.icon className="h-5 w-5 text-primary-400" />
                  </div>
                  <h4 className="mb-2 text-lg font-medium text-neutral-100">{feature.title}</h4>
                  <p className="text-sm leading-relaxed text-neutral-500">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container-premium">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-neutral-50 mb-4">What professionals say</h2>
            </div>

            <div className="card p-8 md:p-12 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-warning-500 fill-warning-500" />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl md:text-2xl text-neutral-100 font-medium leading-relaxed mb-8 max-w-2xl mx-auto">
                    "{testimonials[currentSlide].quote}"
                  </blockquote>
                  
                  <div>
                    <p className="text-neutral-100 font-medium">
                      {testimonials[currentSlide].author}
                    </p>
                    <p className="text-neutral-500 text-sm">
                      {testimonials[currentSlide].role} @ {testimonials[currentSlide].company}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                <button
                  onClick={prevSlide}
                  className="pointer-events-auto w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-neutral-400" />
                </button>
                <button
                  onClick={nextSlide}
                  className="pointer-events-auto w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-neutral-400" />
                </button>
              </div>

              {/* Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentSlide(i);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentSlide ? 'w-6 bg-primary-500' : 'w-1.5 bg-neutral-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-neutral-900/30">
        <div className="container-premium">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-neutral-50 mb-4">Common questions</h2>
              <p className="text-neutral-400">
                Everything you need to know about TalentScore
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="card overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-800/30 transition-colors"
                  >
                    <span className="text-neutral-100 font-medium pr-4">{faq.q}</span>
                    <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0">
                      {openFaq === index ? (
                        <Minus className="w-4 h-4 text-neutral-400" />
                      ) : (
                        <Plus className="w-4 h-4 text-neutral-400" />
                      )}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-neutral-400 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32">
        <div className="container-premium">
          <div className="card p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-transparent to-primary-600/10" />
            <div className="relative">
              <h2 className="text-neutral-50 mb-4">Ready to get noticed?</h2>
              <p className="text-neutral-400 max-w-xl mx-auto mb-8">
                Join thousands of professionals who've transformed their resumes 
                and landed their target roles.
              </p>
              <a href="/analyze" className="btn-primary text-base px-8 py-4 inline-flex">
                Analyze My Resume
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-800/50">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center">
                <span className="text-neutral-100 font-semibold text-xs">TS</span>
              </div>
              <span className="text-neutral-100 font-medium">TalentScore</span>
            </div>
            <p className="text-neutral-500 text-sm">
              © 2026 TalentScore. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
