import React, { useState, useEffect, useRef } from 'react';
import { analyzeResume, storeAnalysisResult } from '../utils/mockApi';

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
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-ocean-50 text-ocean-700 text-sm font-medium mb-8">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            AI-Powered Analysis
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-neutral-900">
            Analyze Your Resume
          </h1>
          
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Upload your resume and paste the job description to get AI-powered insights 
            and personalized recommendations for improvement.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="card p-10 animate-on-scroll">
                <div className="space-y-10">
                  {/* Resume Upload */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-8 h-8 bg-ocean-500 text-white rounded-xl flex items-center justify-center font-bold mr-4">
                        1
                      </div>
                      <label className="text-xl font-bold text-neutral-900 font-display">
                        Upload Your Resume
                      </label>
                    </div>
                    
                    <div 
                      className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer group ${
                        dragActive 
                          ? 'border-ocean-500 bg-ocean-50' 
                          : resumeFile 
                            ? 'border-sky-400 bg-sky-50' 
                            : 'border-neutral-300 hover:border-ocean-400 hover:bg-ocean-50/50'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label htmlFor="resume-upload" className="cursor-pointer block">
                        {resumeFile ? (
                          <div className="animate-scale-in">
                            <div className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <p className="text-lg font-bold text-sky-700 mb-2">
                              ✓ {resumeFile.name}
                            </p>
                            <p className="text-sm text-neutral-600 font-body">
                              Click to change file or drag a new one
                            </p>
                          </div>
                        ) : (
                          <div>
                            <div className="w-16 h-16 bg-neutral-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-ocean-200 transition-all duration-300">
                              <svg className="w-8 h-8 text-neutral-600 group-hover:text-ocean-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                            </div>
                            <p className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-ocean-600 transition-colors">
                              Drop your resume here or click to browse
                            </p>
                            <p className="text-sm text-neutral-600 font-body">
                              Supports PDF, DOC, DOCX, and TXT files (Max 10MB)
                            </p>
                          </div>
                        )}
                      </label>
                  </div>
                </div>

                  {/* Job Description */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-8 h-8 bg-beige-600 text-white rounded-xl flex items-center justify-center font-bold mr-4">
                        2
                      </div>
                      <label className="text-xl font-bold text-neutral-900 font-display">
                        Paste Job Description
                      </label>
                    </div>
                    
                    <div className="relative">
                      <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the job description here. Include requirements, responsibilities, and preferred qualifications..."
                        className="w-full h-64 p-6 border-2 border-neutral-200 rounded-2xl focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500 resize-none text-neutral-700 placeholder-neutral-400 transition-all duration-200"
                      />
                      <div className="absolute bottom-4 right-4 text-sm text-neutral-500 font-medium">
                        {jobDescription.length} characters
                      </div>
                    </div>
                  </div>

                  {/* Analyze Button */}
                  <div className="text-center pt-4">
                    <button
                      onClick={handleAnalyze}
                      disabled={!resumeFile || !jobDescription.trim() || isAnalyzing}
                      className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-soft relative overflow-hidden group"
                    >
                      {isAnalyzing ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                          <span>Analyzing Resume...</span>
                          {progress > 0 && (
                            <div className="absolute bottom-0 left-0 h-1 bg-white/30 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <span className="mr-2">🔍</span>
                          Analyze Resume
                          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      )}
                    </button>
                  </div>
              </div>
            </div>
          </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Tips Card */}
              <div className="card p-8 animate-on-scroll">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 font-display">
                    Resume Tips
                  </h3>
                </div>
                <ul className="space-y-4">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex items-start group">
                      <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-sky-100 text-sky-600 mr-4 mt-0.5 group-hover:bg-sky-200 transition-colors">
                        {tip.icon}
                      </div>
                      <span className="text-sm text-neutral-600 font-body leading-relaxed group-hover:text-neutral-800 transition-colors">{tip.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process Steps */}
              <div className="card p-8 animate-on-scroll">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-ocean-500 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 font-display">
                    How It Works
                  </h3>
                </div>
                <div className="space-y-6">
                  {[
                    { step: 1, text: "Upload your resume", color: "ocean" },
                    { step: 2, text: "Paste job description", color: "beige" },
                    { step: 3, text: "Get AI analysis", color: "sky" },
                    { step: "✓", text: "Improve your resume", color: "cream" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center group">
                      <div className={`w-10 h-10 bg-${item.color}-500 text-white rounded-xl flex items-center justify-center font-bold mr-4 group-hover:scale-110 transition-transform duration-300`}>
                        {item.step}
                      </div>
                      <span className="text-sm text-neutral-600 font-body group-hover:text-neutral-800 transition-colors">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Card */}
              <div className="card p-8 bg-ocean-500 text-white">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold font-display">
                      Success Stats
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Resumes Analyzed", value: "10,000+" },
                      { label: "Average Improvement", value: "35%" },
                      { label: "User Satisfaction", value: "98%" }
                    ].map((stat, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm opacity-90 font-body">{stat.label}</span>
                        <span className="font-bold text-lg font-display">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Analyze;
