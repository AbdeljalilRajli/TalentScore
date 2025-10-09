import React from 'react';
import { AnimatedSection } from '../components/modern/AnimatedSection';
import { ArrowRight, Play, CheckCircle, Target, BarChart3, Sparkles, Zap, Shield, Share2, Upload, FileText, Eye, Lightbulb, Star } from 'lucide-react';

const Home: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      company: 'Google',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      quote: 'TalentScore helped me land my dream job at Google. The AI insights were incredibly accurate and actionable.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'Microsoft',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      quote: 'The match score feature is game-changing. I optimized my resume for each application and saw immediate results.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      company: 'Apple',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      quote: 'Best career tool I\'ve ever used. The visual insights made it so easy to understand what I needed to improve.',
      rating: 5
    }
  ];

  return (
    <div className="bg-white pt-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#DDF4E7] to-[#67C090] rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 -right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-[#26667F] to-[#124170] rounded-full blur-3xl opacity-15" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection className="text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#DDF4E7] to-[#67C090]/30 border border-[#67C090]/20 mb-6">
                <span className="w-2 h-2 bg-[#67C090] rounded-full mr-2 animate-pulse" />
                <span className="text-xs font-semibold text-[#26667F]">
                  AI-Powered Analysis
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#124170] to-[#26667F] bg-clip-text text-transparent">
                  Transform Your Resume
                </span>
                <br />
                <span className="text-neutral-900">into Interview Gold</span>
              </h1>

              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                AI-driven insights, instant match scores, and personalized optimization tips. Land more interviews with confidence.
              </p>

              <div className="flex flex-row gap-4 mb-12 flex-wrap">
                <a 
                  href="/analyze" 
                  className="group relative px-8 py-5 bg-gradient-to-r from-[#124170] to-[#26667F] text-white rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start Free Analysis
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#26667F] to-[#67C090] opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                
                <a 
                  href="#features" 
                  className="px-8 py-5 bg-white border-2 border-[#26667F] text-[#26667F] rounded-2xl font-bold text-lg hover:bg-[#DDF4E7] transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Watch Demo
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#67C090]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Free Forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#67C090]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">No Credit Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#67C090]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Instant Results</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Right: Dashboard Preview */}
            <AnimatedSection delay={200} className="relative">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#67C090] to-[#26667F] rounded-3xl blur-2xl opacity-20" />
                
                <div className="relative">
                  <img 
                    src="/homepage/hero-section-image.webp"
                    alt="Resume Analysis Dashboard"
                    className="rounded-3xl shadow-2xl border-4 border-white"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#67C090] to-[#26667F] flex items-center justify-center text-2xl font-bold text-white">
                        87%
                      </div>
                      <div>
                        <div className="text-xs text-neutral-600">Match Score</div>
                        <div className="text-sm font-bold text-[#26667F]">Excellent</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <AnimatedSection>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { 
                  number: '50K+', 
                  label: 'Resumes Analyzed',
                  icon: (
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                  color: 'from-[#124170] to-[#26667F]'
                },
                { 
                  number: '98%', 
                  label: 'Success Rate',
                  icon: (
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  ),
                  color: 'from-[#26667F] to-[#67C090]'
                },
                { 
                  number: '4.9/5', 
                  label: 'User Rating',
                  icon: (
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ),
                  color: 'from-[#67C090] to-[#26667F]'
                },
                { 
                  number: '24/7', 
                  label: 'Always Available',
                  icon: (
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  color: 'from-[#124170] to-[#67C090]'
                },
              ].map((stat, idx) => (
                <AnimatedSection key={idx} delay={idx * 100}>
                  <div className="group relative bg-gradient-to-br from-white to-[#DDF4E7]/20 rounded-2xl p-6 border border-neutral-200 hover:border-[#67C090] transition-all duration-300 hover:shadow-2xl overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 bg-gradient-to-br group-hover:scale-150 transition-transform duration-500" style={{ background: `linear-gradient(135deg, #67C090, #26667F)` }} />
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                    <div className="relative">
                      <div className="text-3xl font-extrabold bg-gradient-to-r from-[#124170] to-[#26667F] bg-clip-text text-transparent mb-1">
                        {stat.number}
                      </div>
                      <div className="text-sm text-neutral-600 font-medium">{stat.label}</div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#DDF4E7] to-[#67C090]/20 mb-4">
              <Zap className="w-4 h-4 text-[#26667F] mr-2" />
              <span className="text-xs font-semibold text-[#26667F]">FEATURES</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#124170] to-[#26667F] bg-clip-text text-transparent">
                Everything You Need
              </span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Professional-grade tools powered by AI
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: Target,
                title: 'Smart Matching', 
                desc: 'AI analyzes your resume against job descriptions with precision matching algorithms', 
                img: '/homepage/Smart-Matching.webp'
              },
              { 
                icon: BarChart3,
                title: 'Visual Insights', 
                desc: 'Beautiful interactive charts showing your strengths and improvement areas', 
                img: '/homepage/Visual-Insights.webp'
              },
              { 
                icon: Lightbulb,
                title: 'AI Suggestions', 
                desc: 'Personalized recommendations powered by advanced machine learning', 
                img: '/homepage/AI-Suggestions.webp'
              },
              { 
                icon: Zap,
                title: 'Instant Results', 
                desc: 'Lightning-fast analysis delivered in under 3 seconds', 
                img: '/homepage/Instant-Results.webp'
              },
              { 
                icon: Shield,
                title: 'Secure & Private', 
                desc: 'Bank-level security ensures your data is never stored or shared', 
                img: '/homepage/Secure-Private.webp'
              },
              { 
                icon: Share2,
                title: 'Export & Share', 
                desc: 'Professional PDF reports ready to share with employers', 
                img: '/homepage/Export-Share.webp'
              },
            ].map((feature, idx) => (
              <AnimatedSection key={idx} delay={idx * 100}>
                <div className="group relative h-full">
                  {/* Main card */}
                  <div className="relative bg-gradient-to-br from-white to-[#DDF4E7]/20 rounded-3xl overflow-hidden border border-neutral-200 hover:border-[#67C090] shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1 h-full flex flex-col">
                    
                    {/* Image container */}
                    <div className="relative h-56 overflow-hidden">
                      {/* Subtle overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#124170]/10 to-[#67C090]/10 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
                      
                      {/* Image */}
                      <img 
                        src={feature.img} 
                        alt={feature.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                      />
                      
                      {/* Icon */}
                      <div className="absolute top-6 left-6 z-20">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#67C090] to-[#26667F] flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 text-white">
                          <feature.icon className="w-8 h-8" />
                        </div>
                      </div>
                    </div>

                    {/* Content section */}
                    <div className="p-8 flex-1 flex flex-col">
                      {/* Title */}
                      <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#124170] to-[#26667F] bg-clip-text text-transparent">
                        {feature.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-neutral-700 leading-relaxed text-base flex-1">
                        {feature.desc}
                      </p>

                      {/* Bottom section */}
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#67C090] to-[#26667F]" />
                          <span className="text-sm font-medium text-neutral-600">
                            Learn More
                          </span>
                        </div>
                        
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                          <svg className="w-6 h-6 text-[#26667F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Animated Process Flow */}
      <section className="py-20 bg-gradient-to-br from-[#DDF4E7]/30 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#124170] to-[#26667F] bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-lg text-neutral-600">Simple, fast, and effective</p>
          </AnimatedSection>

          <div className="relative">
            {/* Animated Path */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-full h-32" viewBox="0 0 800 120" fill="none">
                <path
                  d="M50 60 Q200 20 350 60 T650 60"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  fill="none"
                  className="animate-draw-path"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#124170" />
                    <stop offset="50%" stopColor="#26667F" />
                    <stop offset="100%" stopColor="#67C090" />
                  </linearGradient>
                </defs>
                {/* Animated dots along the path */}
                <circle r="4" fill="#67C090" className="animate-move-dot">
                  <animateMotion dur="3s" repeatCount="indefinite">
                    <mpath href="#path" />
                  </animateMotion>
                </circle>
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {[
                { 
                  step: '01', 
                  title: 'Upload Resume', 
                  desc: 'Drop your resume file or paste the text',
                  icon: Upload
                },
                { 
                  step: '02', 
                  title: 'Paste Job Description', 
                  desc: 'Add the job posting you\'re targeting',
                  icon: FileText
                },
                { 
                  step: '03', 
                  title: 'Get Insights', 
                  desc: 'Receive AI-powered analysis instantly',
                  icon: Eye
                }
              ].map((item, idx) => (
                <AnimatedSection key={idx} delay={idx * 200}>
                  <div className="relative group">
                    {/* Animated Circle Background */}
                    <div className="absolute -inset-4 bg-gradient-to-br from-[#67C090]/20 to-[#26667F]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse" />
                    
                    <div className="relative bg-white rounded-3xl p-8 border-2 border-transparent bg-gradient-to-br from-white to-[#DDF4E7]/30 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                      {/* Step Number with Pulse Animation */}
                      <div className="flex justify-center mb-6">
                        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#124170] to-[#26667F] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          <span className="relative z-10">{item.step}</span>
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#67C090] to-[#26667F] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                        </div>
                      </div>

                      {/* Icon */}
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#DDF4E7] to-[#67C090]/30 flex items-center justify-center text-[#26667F] group-hover:scale-110 transition-transform duration-300">
                          <item.icon className="w-8 h-8" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-[#26667F] transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-neutral-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      {/* Animated Arrow for non-last items */}
                      {idx < 2 && (
                        <div className="hidden md:block absolute -right-8 top-1/2 transform -translate-y-1/2 text-[#67C090]">
                          <svg className="w-8 h-8 animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gradient-to-br from-neutral-50 to-[#DDF4E7]/30 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#67C090]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#26667F]/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Header */}
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#DDF4E7] border border-[#67C090]/20 mb-6">
              <Lightbulb className="w-4 h-4 text-[#26667F] mr-2" />
              <span className="text-xs font-semibold text-[#26667F]">OUR STORY</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#124170] to-[#26667F] bg-clip-text text-transparent">
                Bridging Talent and Opportunity
              </span>
            </h2>
            <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
              We believe every professional deserves to showcase their true potential. TalentScore was born to solve the disconnect between talent and recognition in today's competitive job market.
            </p>
          </AnimatedSection>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
            
            {/* Left Column - Story */}
            <AnimatedSection delay={100}>
              <div className="prose prose-lg max-w-none">
                <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#67C090] to-[#26667F] flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  The Problem We Solve
                </h3>
                <p className="text-neutral-700 leading-relaxed mb-6">
                  Talented professionals were losing opportunities not because they lacked skills, but because their resumes couldn't effectively communicate their value to both ATS systems and human recruiters.
                </p>
                <p className="text-neutral-700 leading-relaxed">
                  Traditional resume advice was generic and outdated. Job seekers needed personalized, data-driven insights that could adapt to each unique opportunity while highlighting their individual strengths.
                </p>
              </div>
            </AnimatedSection>

            {/* Right Column - Solution */}
            <AnimatedSection delay={200}>
              <div className="prose prose-lg max-w-none">
                <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#26667F] to-[#124170] flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-white" />
                  </div>
                  Our Innovation
                </h3>
                <p className="text-neutral-700 leading-relaxed mb-6">
                  TalentScore combines advanced AI analysis with human-centered design to provide instant, actionable feedback. Our platform doesn't just scan for keywords—it understands context, relevance, and impact.
                </p>
                <p className="text-neutral-700 leading-relaxed">
                  Every analysis is tailored to the specific job and industry, ensuring recommendations are practical, relevant, and immediately implementable.
                </p>
              </div>
            </AnimatedSection>

          </div>

          {/* Stats Row */}
          <AnimatedSection delay={300}>
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-neutral-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#124170] to-[#26667F] bg-clip-text text-transparent mb-2">50K+</div>
                  <div className="text-sm text-neutral-600 font-medium">Professionals Helped</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#26667F] to-[#67C090] bg-clip-text text-transparent mb-2">98%</div>
                  <div className="text-sm text-neutral-600 font-medium">Improvement Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#67C090] to-[#26667F] bg-clip-text text-transparent mb-2">3.0s</div>
                  <div className="text-sm text-neutral-600 font-medium">Average Analysis Time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#124170] to-[#67C090] bg-clip-text text-transparent mb-2">24/7</div>
                  <div className="text-sm text-neutral-600 font-medium">Always Available</div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Mission Statement */}
          <AnimatedSection delay={400} className="text-center mt-16">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">Our Mission</h3>
              <p className="text-xl text-neutral-700 leading-relaxed italic">
                "To democratize career success by making professional resume optimization accessible, intelligent, and effective for everyone—regardless of background, experience level, or industry."
              </p>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#DDF4E7] to-[#67C090]/20 mb-4">
              <Star className="w-4 h-4 text-[#26667F] mr-2" />
              <span className="text-xs font-semibold text-[#26667F]">TESTIMONIALS</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#124170] to-[#26667F] bg-clip-text text-transparent">
                Loved by Job Seekers
              </span>
            </h2>
            <p className="text-lg text-neutral-600">Join thousands who landed their dream jobs</p>
          </AnimatedSection>

          <div className="relative">
            <div className="flex overflow-hidden">
              <div className="flex animate-scroll gap-6">
                {[...testimonials, ...testimonials].map((testimonial, idx) => (
                  <div 
                    key={idx}
                    className="flex-shrink-0 w-96 bg-gradient-to-br from-white to-[#DDF4E7]/20 rounded-2xl p-8 border border-neutral-200 shadow-lg"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <div>
                        <div className="font-bold text-neutral-900">{testimonial.name}</div>
                        <div className="text-sm text-neutral-600">{testimonial.role}</div>
                        <div className="text-xs font-semibold text-[#26667F]">{testimonial.company}</div>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-[#67C090]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-neutral-700 leading-relaxed italic">"{testimonial.quote}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23124170' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <AnimatedSection>
              <div className="space-y-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#DDF4E7] to-[#67C090]/20 border border-[#67C090]/20">
                  <span className="w-2 h-2 bg-[#67C090] rounded-full mr-2 animate-pulse" />
                  <Zap className="w-4 h-4 text-[#26667F] mr-2" />
                  <span className="text-sm font-semibold text-[#26667F]">
                    GET STARTED TODAY
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  <span className="text-neutral-900">Your Dream Job</span>
                  <br />
                  <span className="bg-gradient-to-r from-[#124170] to-[#67C090] bg-clip-text text-transparent">
                    Awaits You
                  </span>
                </h2>

                <p className="text-xl text-neutral-600 leading-relaxed">
                  Don't let another opportunity slip by. Join 50,000+ professionals who've transformed their careers with AI-powered resume optimization.
                </p>

                <div className="flex flex-row gap-4 flex-wrap">
                  <a 
                    href="/analyze" 
                    className="group relative px-8 py-5 bg-gradient-to-r from-[#124170] to-[#26667F] text-white rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Start Free Analysis
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#26667F] to-[#67C090] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                  
                  <a 
                    href="#features" 
                    className="px-8 py-5 bg-white border-2 border-[#26667F] text-[#26667F] rounded-2xl font-bold text-lg hover:bg-[#DDF4E7] transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3"
                  >
                    See How It Works
                    <Play className="w-5 h-5" />
                  </a>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <CheckCircle className="w-5 h-5 text-[#67C090]" />
                    <span className="font-medium">100% Free to Start</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <CheckCircle className="w-5 h-5 text-[#67C090]" />
                    <span className="font-medium">Instant Results</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <CheckCircle className="w-5 h-5 text-[#67C090]" />
                    <span className="font-medium">No Credit Card Required</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right Visual */}
            <AnimatedSection delay={200} className="relative">
              <div className="relative">
                {/* Main Card */}
                <div className="bg-gradient-to-br from-white to-[#DDF4E7]/30 rounded-3xl p-8 shadow-2xl border border-neutral-200">
                  
                  {/* Success Metrics */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="text-center p-4 bg-white rounded-2xl shadow-lg">
                      <div className="text-3xl font-bold bg-gradient-to-r from-[#124170] to-[#26667F] bg-clip-text text-transparent mb-2">98%</div>
                      <div className="text-sm text-neutral-600 font-medium">Success Rate</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-2xl shadow-lg">
                      <div className="text-3xl font-bold bg-gradient-to-r from-[#26667F] to-[#67C090] bg-clip-text text-transparent mb-2">3s</div>
                      <div className="text-sm text-neutral-600 font-medium">Analysis Time</div>
                    </div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-4">
                    {[
                      { icon: Target, text: 'AI-Powered Matching Algorithm' },
                      { icon: BarChart3, text: 'Real-time Performance Insights' },
                      { icon: Sparkles, text: 'Instant Optimization Suggestions' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#67C090] to-[#26667F] flex items-center justify-center text-white">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-neutral-700">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#67C090] to-[#26667F] rounded-full opacity-20 blur-xl animate-pulse" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-[#124170] to-[#26667F] rounded-full opacity-20 blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
