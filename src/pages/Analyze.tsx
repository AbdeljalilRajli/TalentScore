import React, { useState, useEffect, useRef } from 'react';
import { analyzeResume, storeAnalysisResult } from '../utils/mockApi';
import { AnimatedSection } from '../components/modern/AnimatedSection';
import { GlowCard } from '../components/modern/GlowCard';

const Analyze: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setResumeFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      alert('Please upload a resume and provide a job description.');
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    
    try {
      // Call mock API
      const result = await analyzeResume(resumeFile, jobDescription);
      
      setProgress(100);
      
      // Store result for results page
      storeAnalysisResult(result);
      
      // Navigate to results page after a brief delay
      setTimeout(() => {
        window.history.pushState({}, '', '/results');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }, 1000);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
      clearInterval(progressInterval);
    } finally {
      setTimeout(() => {
        setIsAnalyzing(false);
        setProgress(0);
      }, 1000);
    }
  };

  const tips = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      text: "Use a clean, professional format"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      ),
      text: "Include relevant keywords from the job description"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      text: "Quantify your achievements with numbers"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: "Keep it concise (1-2 pages max)"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      text: "Use action verbs to describe your experience"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: "Proofread for spelling and grammar errors"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#DDF4E7]/20 to-white pt-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#DDF4E7] to-[#67C090] rounded-full blur-3xl opacity-20 animate-float" />
          <div className="absolute bottom-1/4 -right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-[#26667F] to-[#124170] rounded-full blur-3xl opacity-15 animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <AnimatedSection className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#DDF4E7] to-[#67C090]/30 backdrop-blur-sm border border-[#67C090]/20 mb-8">
            <span className="w-2 h-2 bg-[#67C090] rounded-full mr-3 animate-pulse" />
            <span className="text-sm font-bold bg-gradient-to-r from-[#26667F] to-[#67C090] bg-clip-text text-transparent">
              AI-Powered Resume Analysis
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#124170] via-[#26667F] to-[#67C090] bg-clip-text text-transparent">
              Optimize Your Resume
            </span>
            <br />
            <span className="text-neutral-900">in Seconds</span>
          </h1>
          
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Upload your resume, paste the job description, and get instant AI-powered insights with actionable recommendations
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              { icon: '⚡', text: 'Results in 3s' },
              { icon: '🔒', text: '100% Private' },
              { icon: '✨', text: 'Free Forever' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-neutral-200">
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium text-neutral-700">{item.text}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Main Content */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Inputs */}
            <AnimatedSection className="space-y-8">
              {/* Upload Card */}
              <GlowCard glowColor="#67C090">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#124170] to-[#26667F] text-white flex items-center justify-center font-bold text-xl shadow-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900">Upload Resume</h3>
                    <p className="text-sm text-neutral-600">PDF, DOC, DOCX, or TXT</p>
                  </div>
                </div>
                
                <label
                  htmlFor="resume-upload"
                  className={`relative block border-3 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer group ${
                    dragActive 
                      ? 'border-[#67C090] bg-gradient-to-br from-[#DDF4E7] to-[#67C090]/10 scale-105' 
                      : resumeFile 
                        ? 'border-[#67C090] bg-gradient-to-br from-[#DDF4E7] to-white' 
                        : 'border-neutral-300 hover:border-[#67C090] hover:bg-gradient-to-br hover:from-[#DDF4E7]/50 hover:to-white'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input id="resume-upload" type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileUpload} className="hidden" />
                  
                  {resumeFile ? (
                    <div className="space-y-4">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#67C090] to-[#26667F] flex items-center justify-center text-4xl mx-auto shadow-2xl animate-bounce">
                        ✓
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[#26667F] mb-1">
                          {resumeFile.name}
                        </p>
                        <p className="text-sm text-neutral-600">
                          Click to change or drag a new file
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#DDF4E7] to-white border-2 border-dashed border-[#67C090] flex items-center justify-center text-4xl mx-auto group-hover:scale-110 transition-transform">
                        📄
                      </div>
                      <div>
                        <p className="text-xl font-bold text-neutral-900 mb-2">
                          Drop your resume here
                        </p>
                        <p className="text-neutral-600 mb-4">
                          or click to browse files
                        </p>
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#124170] to-[#26667F] text-white rounded-xl font-semibold hover:scale-105 transition-transform">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          Choose File
                        </div>
                      </div>
                    </div>
                  )}
                </label>
              </GlowCard>

              {/* Job Description Card */}
              <GlowCard glowColor="#26667F">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#67C090] to-[#26667F] text-white flex items-center justify-center font-bold text-xl shadow-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900">Job Description</h3>
                    <p className="text-sm text-neutral-600">Paste the full job posting</p>
                  </div>
                </div>
                
                <div className="relative">
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the complete job description here including requirements, responsibilities, and qualifications..."
                    className="w-full h-80 p-6 border-2 border-neutral-200 rounded-3xl focus:ring-4 focus:ring-[#67C090]/20 focus:border-[#67C090] resize-none text-neutral-700 placeholder-neutral-400 transition-all duration-300 bg-gradient-to-br from-white to-[#DDF4E7]/20"
                    style={{ fontFamily: 'Inter' }}
                  />
                  <div className="absolute bottom-6 right-6 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm text-neutral-600 font-medium border border-neutral-200">
                    {jobDescription.length} characters
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAnalyze}
                    disabled={!resumeFile || !jobDescription.trim() || isAnalyzing}
                    className="group relative flex-1 px-8 py-5 bg-gradient-to-r from-[#124170] to-[#26667F] text-white rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent" />
                          Analyzing... {Math.round(progress)}%
                        </>
                      ) : (
                        <>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Analyze Resume
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#26667F] to-[#67C090] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  
                  <a 
                    href="/results" 
                    className="px-6 py-5 bg-white border-2 border-[#26667F] text-[#26667F] rounded-2xl font-bold text-lg hover:bg-[#DDF4E7] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Demo
                  </a>
                </div>
              </GlowCard>
            </AnimatedSection>

            {/* Right: Live Preview */}
            <AnimatedSection delay={200} className="lg:sticky lg:top-24 space-y-8">
              {/* Progress Card */}
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-2xl overflow-hidden">
                <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(103,192,144,0.2), rgba(103,192,144,0))' }} />
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl font-bold text-neutral-900">Analysis Progress</h4>
                    <span className="px-3 py-1 bg-gradient-to-r from-[#DDF4E7] to-[#67C090]/30 rounded-full text-sm font-semibold text-[#26667F]">
                      {isAnalyzing ? 'Processing...' : 'Ready'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center mb-8">
                    <div className="relative">
                      <svg className="w-64 h-64 -rotate-90" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                        <circle
                          cx="100" cy="100" r="90" fill="none"
                          stroke="url(#progressGradient)" strokeWidth="12" strokeLinecap="round"
                          strokeDasharray="565"
                          strokeDashoffset={565 - (isAnalyzing ? (progress / 100) * 565 : 0)}
                          className="transition-all duration-500"
                        />
                        <defs>
                          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#67C090" />
                            <stop offset="100%" stopColor="#26667F" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-extrabold bg-gradient-to-r from-[#26667F] to-[#67C090] bg-clip-text text-transparent">
                          {isAnalyzing ? Math.min(100, Math.round(progress)) : 0}%
                        </span>
                        <span className="text-sm text-neutral-600 font-medium mt-2">
                          {isAnalyzing ? 'Analyzing...' : 'Waiting to start'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status indicators */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-[#DDF4E7] to-white p-4 rounded-2xl border border-[#67C090]/20">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-2 h-2 rounded-full ${resumeFile ? 'bg-[#67C090]' : 'bg-neutral-300'}`} />
                        <span className="text-xs font-medium text-neutral-600">Resume</span>
                      </div>
                      <p className="text-sm font-bold text-[#26667F]">
                        {resumeFile ? 'Uploaded' : 'Waiting'}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-[#67C090]/10 to-white p-4 rounded-2xl border border-[#26667F]/20">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-2 h-2 rounded-full ${jobDescription.length > 50 ? 'bg-[#26667F]' : 'bg-neutral-300'}`} />
                        <span className="text-xs font-medium text-neutral-600">Job Desc</span>
                      </div>
                      <p className="text-sm font-bold text-[#67C090]">
                        {jobDescription.length > 50 ? 'Ready' : 'Waiting'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips Card */}
              <div className="relative bg-gradient-to-br from-white to-[#DDF4E7]/30 rounded-3xl p-8 border-2 border-[#67C090]/30 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#67C090]/20 to-[#26667F]/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#67C090] to-[#26667F] flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold bg-gradient-to-r from-[#124170] to-[#26667F] bg-clip-text text-transparent">
                      Pro Tips
                    </h4>
                  </div>
                  
                  <ul className="space-y-4">
                    {tips.slice(0, 4).map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 group/item">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#67C090] to-[#26667F] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md group-hover/item:scale-110 transition-transform">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-neutral-700 leading-relaxed flex-1">{tip.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Analyze;
