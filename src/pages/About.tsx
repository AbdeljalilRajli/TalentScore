import React, { useEffect, useRef } from 'react';

const About: React.FC = () => {
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

  return (
    <div className="bg-neutral-50 pt-18">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary-200 text-primary-700 font-medium mb-8 shadow-soft">
              <span className="w-2 h-2 bg-accent-500 rounded-full mr-2 animate-pulse"></span>
              About Our Mission
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display mb-8 leading-tight">
              <span className="gradient-text">Empowering Careers</span>
              <br />
              <span className="text-neutral-800 text-3xl md:text-4xl lg:text-5xl">with AI Innovation</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-600 mb-12 max-w-4xl mx-auto leading-relaxed font-body">
              We're revolutionizing how job seekers create compelling resumes with AI-driven insights 
              that help you stand out in today's competitive job market.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="/analyze" className="btn-primary text-lg px-10 py-4 group">
                <span className="mr-2">🚀</span>
                Try Our AI Tool
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#mission" className="btn-secondary text-lg px-10 py-4 group">
                Learn More
                <svg className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-on-scroll">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 text-primary-700 font-medium mb-6">
              <span className="mr-2">🎯</span>
              Our Mission
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display gradient-text mb-8">
              Democratizing Career Success
            </h2>
            <p className="text-xl text-neutral-600 leading-relaxed max-w-4xl mx-auto font-body">
              We believe that everyone deserves a fair chance at their dream job. Our AI-powered 
              resume analyzer levels the playing field by providing professional-grade resume 
              optimization tools that were once only available to those who could afford expensive 
              career coaching services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Precision",
                description: "Our AI analyzes thousands of data points to provide accurate, actionable feedback",
                color: "from-primary-500 to-secondary-500"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Speed",
                description: "Get comprehensive resume analysis in seconds, not days",
                color: "from-secondary-500 to-accent-500"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ),
                title: "Excellence",
                description: "Continuously improving our algorithms to deliver the best results",
                color: "from-accent-500 to-primary-500"
              }
            ].map((value, index) => (
              <div key={index} className="group card-hover p-8 text-center animate-on-scroll" style={{ animationDelay: `${index * 150}ms` }}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4 font-display">{value.title}</h3>
                <p className="text-neutral-600 leading-relaxed font-body">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How AI Works Section */}
      <section className="py-24 bg-gradient-to-br from-neutral-50 to-primary-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-on-scroll">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary-50 text-secondary-700 font-medium mb-6">
              <span className="mr-2">🤖</span>
              AI Technology
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display gradient-text mb-8">
              How Our AI Works
            </h2>
            <p className="text-xl text-neutral-600 max-w-4xl mx-auto font-body">
              Our advanced artificial intelligence combines natural language processing, 
              machine learning, and industry expertise to provide comprehensive resume analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <div className="space-y-8">
                {[
                  {
                    step: 1,
                    title: "Document Processing",
                    description: "Our AI extracts and structures information from your resume, understanding context and meaning beyond simple keyword matching.",
                    color: "from-primary-500 to-secondary-500"
                  },
                  {
                    step: 2,
                    title: "Job Description Analysis",
                    description: "We analyze the job description to identify key requirements, skills, and qualifications that employers are looking for.",
                    color: "from-secondary-500 to-accent-500"
                  },
                  {
                    step: 3,
                    title: "Intelligent Matching",
                    description: "Our algorithms compare your resume against job requirements, identifying strengths and areas for improvement.",
                    color: "from-accent-500 to-primary-500"
                  },
                  {
                    step: 4,
                    title: "Actionable Insights",
                    description: "Generate personalized recommendations and suggestions to optimize your resume for maximum impact.",
                    color: "from-primary-600 to-purple-600"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start group" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className={`w-12 h-12 bg-gradient-to-br ${item.color} text-white rounded-xl flex items-center justify-center font-bold font-display mr-6 mt-1 shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-neutral-900 mb-3 font-display group-hover:text-primary-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed font-body">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-10 text-center animate-on-scroll relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-large">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold font-display gradient-text mb-6">
                  Powered by Advanced AI
                </h3>
                <p className="text-neutral-600 mb-8 font-body leading-relaxed">
                  Our machine learning models are trained on thousands of successful 
                  resumes and job descriptions across various industries.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl bg-primary-50">
                    <div className="text-3xl font-bold font-display gradient-text">98%</div>
                    <div className="text-sm text-neutral-600 font-medium">Accuracy Rate</div>
                  </div>
                  <div className="p-4 rounded-xl bg-accent-50">
                    <div className="text-3xl font-bold font-display gradient-text">10k+</div>
                    <div className="text-sm text-gray-500">Resumes Analyzed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium mb-8">
              <span className="mr-2">🚀</span>
              Get Started
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-8">
              Ready to Transform Your Resume?
            </h2>
            
            <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto font-body">
              Join thousands of job seekers who have improved their resumes and landed their dream jobs with our AI-powered tool.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="/analyze" className="btn-secondary bg-white text-primary-600 hover:bg-neutral-50 text-lg px-10 py-4 group">
                <span className="mr-2">⚡</span>
                Start Your Analysis
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              
              <div className="flex items-center text-white/80 font-medium">
                <span className="mr-2">✅</span>
                Free to use • No signup required
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
