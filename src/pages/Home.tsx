import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, GitCompare, Sparkles, Plus, Minus, ArrowRight,
  Search, BarChart, Cpu, Play, CheckCircle2, AlertCircle,
  FileText, Briefcase
} from 'lucide-react';

const Home: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    },
    {
      quote: "The ATS optimization feature alone saved me weeks of trial and error. Now I know exactly what recruiters see.",
      author: "Marcus Johnson",
      role: "DevOps Engineer",
      company: "Netflix"
    },
    {
      quote: "Best investment in my job search. The cover letter generator paired with resume analysis is a game changer.",
      author: "Emily Park",
      role: "Product Designer",
      company: "Figma"
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

  return (
    <div className="min-h-screen bg-neutral-50 relative">
      {/* Subtle grid pattern for entire page */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Hero Section - Clean Light Aesthetic */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16 md:pt-20">
        {/* Soft gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-neutral-50 to-tertiary-50/30" />
        
        {/* Geometric accent shapes */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-100/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-tertiary-200/30 rounded-full blur-3xl -translate-x-32 translate-y-32" />
        <div className="absolute top-32 right-32 w-px h-24 bg-gradient-to-b from-primary-300 to-transparent" />
        <div className="absolute bottom-32 left-32 w-24 h-px bg-gradient-to-r from-tertiary-400 to-transparent" />

        <div className="container-premium relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Text Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 bg-white border border-neutral-200 rounded-full shadow-soft">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                  <span className="text-neutral-600 text-xs font-medium tracking-wide">V2.0 Available</span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-neutral-900 mb-6 leading-[1.05] tracking-tight">
                  Your resume.
                  <br />
                  <span className="text-primary-600">Decoded.</span>
                </h1>

                <p className="text-lg md:text-xl text-neutral-600 mb-10 max-w-lg leading-relaxed">
                  Stop wondering why you're not getting callbacks. We analyze how ATS systems actually read your resume.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a href="/analyze" className="group relative inline-flex items-center gap-3 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 text-sm font-medium rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 hover:translate-y-[-2px] active:translate-y-0">
                    <span className="font-medium tracking-wide">Analyze Your Resume</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                  <a href="#how-it-works" className="group inline-flex items-center gap-3 text-neutral-600 hover:text-neutral-900 px-6 py-4 text-sm transition-colors duration-300">
                    <div className="w-10 h-10 bg-white border border-neutral-200 rounded-lg group-hover:border-primary-300 flex items-center justify-center transition-colors duration-300 shadow-soft">
                      <Play className="w-3 h-3 ml-0.5 text-primary-500" />
                    </div>
                    <span className="font-medium">See how it works</span>
                  </a>
                </div>

                {/* Mobile Resume Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="lg:hidden mt-12"
                >
                  <div className="bg-white rounded-2xl shadow-strong overflow-hidden border border-neutral-200 mx-auto max-w-sm">
                    {/* Resume Header */}
                    <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                          <span className="text-white font-bold text-sm">JD</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-semibold text-sm truncate">John Doe</p>
                          <p className="text-primary-100 text-xs">Senior Product Manager</p>
                        </div>
                      </div>
                    </div>

                    {/* Resume Content - Compact */}
                    <div className="p-4 space-y-3">
                      {/* Experience */}
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-3 bg-primary-500 rounded-full" />
                        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Experience</span>
                      </div>
                      <div className="space-y-2 pl-2">
                        <div className="bg-neutral-50 rounded-lg p-2.5 border-l-2 border-primary-400">
                          <p className="text-sm font-medium text-neutral-800 truncate">Product Manager @ TechCorp</p>
                          <p className="text-xs text-neutral-500">2020 - Present</p>
                        </div>
                        <div className="bg-neutral-50 rounded-lg p-2.5 border-l-2 border-neutral-300">
                          <p className="text-sm font-medium text-neutral-700 truncate">Senior Analyst @ StartupXYZ</p>
                          <p className="text-xs text-neutral-500">2018 - 2020</p>
                        </div>
                      </div>

                      {/* Score Bar */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-3 border border-primary-200"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-semibold text-primary-700">ATS Score</span>
                          <span className="text-base font-bold text-primary-600">87/100</span>
                        </div>
                        <div className="h-1.5 bg-white rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "87%" }}
                            transition={{ delay: 0.6, duration: 1 }}
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Mobile floating badges */}
                  <div className="flex justify-center gap-3 mt-4">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 }}
                      className="bg-white rounded-lg shadow-medium border border-neutral-200 px-3 py-2 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-success-600" />
                      <span className="text-xs font-medium text-neutral-700">92% Match</span>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 }}
                      className="bg-white rounded-lg shadow-medium border border-neutral-200 px-3 py-2 flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4 text-warning-600" />
                      <span className="text-xs font-medium text-neutral-700">3 Tips</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Stats row */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 sm:gap-8 md:gap-10 mt-12 md:mt-14 pt-6 md:pt-8 pb-6 md:pb-8 border-t border-neutral-200">
                  <div className="text-center sm:text-left">
                    <p className="text-2xl md:text-3xl font-semibold text-neutral-900 tracking-tight">50K+</p>
                    <p className="text-neutral-500 text-xs md:text-sm mt-1">Resumes Analyzed</p>
                  </div>
                  <div className="hidden sm:block w-px h-8 md:h-10 bg-neutral-200" />
                  <div className="text-center sm:text-left">
                    <p className="text-2xl md:text-3xl font-semibold text-neutral-900 tracking-tight">87%</p>
                    <p className="text-neutral-500 text-xs md:text-sm mt-1">Improvement Rate</p>
                  </div>
                  <div className="hidden sm:block w-px h-8 md:h-10 bg-neutral-200" />
                  <div className="text-center sm:text-left">
                    <p className="text-2xl md:text-3xl font-semibold text-neutral-900 tracking-tight">3x</p>
                    <p className="text-neutral-500 text-xs md:text-sm mt-1">More Interviews</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right - Interactive Resume Preview (Desktop only) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block relative lg:pl-8"
            >
              {/* Main Resume Card with 3D tilt */}
              <motion.div 
                className="relative bg-white rounded-2xl shadow-strong overflow-hidden border border-neutral-200"
                whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              >
                {/* Resume Header */}
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">JD</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">John Doe</p>
                        <p className="text-primary-100 text-xs">Senior Product Manager</p>
                      </div>
                    </div>
                    <div className="bg-white/20 px-3 py-1 rounded-full">
                      <span className="text-white text-xs font-medium">PDF Resume</span>
                    </div>
                  </div>
                </div>

                {/* Resume Content */}
                <div className="p-6 space-y-4">
                  {/* Experience Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1 h-4 bg-primary-500 rounded-full" />
                      <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Experience</span>
                    </div>
                    <div className="space-y-2 pl-3">
                      <div className="bg-neutral-50 rounded-lg p-3 border-l-2 border-primary-400">
                        <p className="text-sm font-medium text-neutral-800">Product Manager @ TechCorp</p>
                        <p className="text-xs text-neutral-500">2020 - Present</p>
                      </div>
                      <div className="bg-neutral-50 rounded-lg p-3 border-l-2 border-neutral-300">
                        <p className="text-sm font-medium text-neutral-700">Senior Analyst @ StartupXYZ</p>
                        <p className="text-xs text-neutral-500">2018 - 2020</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills Tags */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1 h-4 bg-success-500 rounded-full" />
                      <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Skills</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pl-3">
                      {['Product Strategy', 'Data Analysis', 'Agile', 'SQL'].map((skill, idx) => (
                        <motion.span 
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.5 + idx * 0.1 }}
                          className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-md border border-primary-100"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Score Bar */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                    className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-4 border border-primary-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-primary-700">ATS Compatibility Score</span>
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5 }}
                        className="text-lg font-bold text-primary-600"
                      >
                        87/100
                      </motion.span>
                    </div>
                    <div className="h-2 bg-white rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "87%" }}
                        transition={{ delay: 2, duration: 1.5, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-medium border border-neutral-200 p-3"
                animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-success-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-800">Keywords Match</p>
                    <p className="text-xs text-success-600 font-medium">92% aligned</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-medium border border-neutral-200 p-3"
                animate={{ y: [0, 8, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-warning-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-warning-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-800">Improvements</p>
                    <p className="text-xs text-warning-600 font-medium">3 suggestions</p>
                  </div>
                </div>
              </motion.div>

              {/* Keyword Cloud */}
              <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 hidden xl:block">
                {[
                  { text: 'React', color: 'bg-blue-100 text-blue-700', delay: 0 },
                  { text: 'TypeScript', color: 'bg-blue-50 text-blue-600', delay: 0.2 },
                  { text: 'Leadership', color: 'bg-purple-100 text-purple-700', delay: 0.4 },
                  { text: 'Strategy', color: 'bg-indigo-100 text-indigo-700', delay: 0.6 },
                ].map((item) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 3 + item.delay, duration: 0.5 }}
                    className={`${item.color} px-3 py-1.5 rounded-full text-xs font-medium mb-2 shadow-soft`}
                  >
                    {item.text}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-6 md:py-8 border-y border-neutral-200 bg-white">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-x-12 md:gap-y-4">
            <span className="text-neutral-500 text-xs font-medium tracking-wider uppercase shrink-0">Trusted at</span>
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 md:gap-x-12">
            {["Google", "Stripe", "Airbnb", "Netflix", "Spotify", "Meta"].map((company) => (
              <span key={company} className="text-neutral-400 text-xs md:text-sm font-medium hover:text-neutral-600 transition-colors duration-300 cursor-default">
                {company}
              </span>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container-premium">
          <div className="mb-16 text-center">
            <span className="text-primary-500 text-sm font-medium tracking-wider uppercase mb-4 block">Process</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-4">Three steps to better results</h2>
            <p className="text-neutral-600 max-w-lg mx-auto">
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
                className="relative bg-neutral-50 rounded-2xl p-8 group hover:shadow-medium transition-all duration-300"
              >
                <span className="absolute top-6 right-6 text-5xl font-bold text-neutral-200 group-hover:text-primary-200 transition-colors duration-500">
                  {step.number}
                </span>
                <div className="w-14 h-14 bg-white border border-neutral-200 rounded-xl group-hover:border-primary-300 group-hover:bg-primary-50 flex items-center justify-center mb-6 transition-all duration-300 shadow-soft">
                  <step.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{step.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Bento Grid */}
      <section className="py-24 bg-neutral-50">
        <div className="container-premium">
          <div className="mb-16 text-center">
            <span className="text-primary-500 text-sm font-medium tracking-wider uppercase mb-4 block">Features</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-4">Complete job search toolkit</h2>
            <p className="text-neutral-600 max-w-lg mx-auto">
              Everything you need to land your next role — from resume optimization to application tracking.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-medium border border-neutral-200 hover:border-primary-200 ${
                  feature.size === 'large' ? 'md:col-span-2' : ''
                }`}
              >
                <div className="mb-6 w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition-colors duration-300">
                  <feature.icon className="h-6 w-6 text-primary-500" />
                </div>
                <h4 className="mb-3 text-lg font-semibold text-neutral-900">{feature.title}</h4>
                <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Grid Layout */}
      <section className="py-24 bg-white">
        <div className="container-premium">
          <div className="mb-16 text-center">
            <span className="text-primary-500 text-sm font-medium tracking-wider uppercase mb-4 block">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-4">What professionals say</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-50 rounded-2xl p-8 group hover:shadow-medium transition-all duration-300"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, idx) => (
                    <svg key={idx} className="w-4 h-4 text-tertiary-500 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <blockquote className="text-neutral-700 leading-relaxed mb-8">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="border-t border-neutral-200 pt-6">
                  <p className="text-neutral-900 font-semibold">
                    {testimonial.author}
                  </p>
                  <p className="text-neutral-500 text-sm mt-1">
                    {testimonial.role} @ {testimonial.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container-premium">
          <div className="max-w-3xl mx-auto">
            <div className="mb-16 text-center">
              <span className="text-primary-500 text-sm font-medium tracking-wider uppercase mb-4 block">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900">Common questions</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border-2 border-neutral-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-neutral-50 transition-colors duration-200"
                  >
                    <span className="text-neutral-900 font-semibold text-base pr-4">{faq.q}</span>
                    <div className={`w-10 h-10 flex items-center justify-center shrink-0 rounded-lg transition-colors duration-200 ${
                      openFaq === index ? 'bg-primary-500 shadow-md' : 'bg-neutral-200'
                    }`}>
                      {openFaq === index ? (
                        <Minus className="w-5 h-5 text-white" />
                      ) : (
                        <Plus className="w-5 h-5 text-neutral-700" />
                      )}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-5 pt-0">
                          <div className="pt-4 border-t-2 border-neutral-100">
                            <p className="text-neutral-600 leading-relaxed">
                              {faq.a}
                            </p>
                          </div>
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
      <section className="py-24 bg-white">
        <div className="container-premium">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full" />
              <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full" />
            </div>
            <div className="relative z-10">
              <span className="text-primary-200 text-sm font-medium tracking-wider uppercase mb-6 block">Get Started</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">Ready to get noticed?</h2>
              <p className="text-primary-100 max-w-md mx-auto mb-10">
                Join thousands of professionals who've transformed their resumes and landed their target roles.
              </p>
              <a href="/analyze" className="group inline-flex items-center gap-3 bg-white text-primary-600 hover:bg-neutral-50 px-8 py-4 text-sm font-medium rounded-xl shadow-strong transition-all duration-300 hover:translate-y-[-2px] active:translate-y-0">
                Analyze My Resume
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
