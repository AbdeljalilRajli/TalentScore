import React, { useEffect, useRef } from 'react';

const Home: React.FC = () => {
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

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Resume Analysis",
      description: "Get detailed analysis of your resume with AI-powered insights and recommendations.",
      color: "from-primary-500 to-secondary-500"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Match Score",
      description: "See how well your resume matches job descriptions with our scoring algorithm.",
      color: "from-secondary-500 to-accent-500"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Smart Suggestions",
      description: "Receive personalized suggestions to improve your resume and increase your chances.",
      color: "from-accent-500 to-primary-500"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      title: "Visual Charts",
      description: "Understand your resume performance through interactive charts and visualizations.",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const testimonials = [
    {
      name: "Alice Johnson",
      role: "Software Engineer",
      company: "TechCorp",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "This tool helped me optimize my resume in minutes. The AI suggestions were spot-on!",
      rating: 5
    },
    {
      name: "Mark Thompson",
      role: "Product Manager",
      company: "StartupXYZ",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "I finally understood which skills I was missing. Amazing tool!",
      rating: 5
    },
    {
      name: "Sophia Lee",
      role: "UX Designer",
      company: "DesignStudio",
      photo: "https://randomuser.me/api/portraits/women/68.jpg",
      quote: "Clean design and really easy to use. Definitely portfolio-worthy.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "How accurate is the match score?",
      answer: "The match score is a guideline based on keyword matching and relevance. It helps you identify missing skills or areas to improve.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      question: "Can I upload multiple resumes?",
      answer: "Currently, you can analyze one resume at a time. Future versions will support multiple uploads and comparison.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      )
    },
    {
      question: "Is my data saved?",
      answer: "No personal data is stored in this demo app. Everything is processed locally or via mock API for portfolio purposes.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      question: "Can I export the results?",
      answer: "Yes, the results can be exported as a PDF report (mocked for now).",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-neutral-50 pt-16">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-accent-400/10 to-primary-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-primary-200 text-primary-700 text-sm font-medium mb-8 shadow-sm">
              <span className="w-1.5 h-1.5 bg-accent-500 rounded-full mr-2 animate-pulse"></span>
              AI-Powered Resume Analysis
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight font-heading">
              <span className="gradient-text">TalentScore</span>
              <br />
              <span className="text-neutral-700 text-xl md:text-2xl lg:text-3xl font-medium">Resume Analyzer</span>
            </h1>
            
            <p className="text-base md:text-lg text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed font-body">
              Transform your resume with AI-powered insights. Get instant feedback, match scores, 
              and personalized suggestions to land your dream job faster.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <a href="/analyze" className="btn-primary">
                <span className="mr-2">🚀</span>
                Analyze Your Resume
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="/about" className="btn-secondary">
                Learn More
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { number: "10K+", label: "Resumes Analyzed" },
                { number: "95%", label: "Success Rate" },
                { number: "4.9/5", label: "User Rating" }
              ].map((stat, index) => (
                <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.number}</div>
                  <div className="text-sm text-neutral-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6 font-body">
              <span className="mr-2">✨</span>
              Powerful Features
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 gradient-text font-heading">
              Everything You Need
            </h2>
            <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto font-body">
              Transform your resume with cutting-edge AI technology and land your dream job faster than ever
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group card-hover p-8 text-center animate-on-scroll"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4 font-display">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed font-body">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-neutral-50 to-primary-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-accent-50 text-accent-700 text-sm font-medium mb-6 font-body">
              <span className="mr-2">💬</span>
              Testimonials
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-4 font-heading">
              What Our Users Say
            </h2>
            <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto font-body">
              Join thousands of successful job seekers who have transformed their careers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="group card-hover p-8 animate-on-scroll relative overflow-hidden"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
                
                <div className="relative">
                  <div className="flex text-accent-400 mb-6">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <blockquote className="text-neutral-700 text-lg leading-relaxed mb-6 font-body italic">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full mr-4 ring-2 ring-white shadow-soft"
                    />
                    <div>
                      <h4 className="font-bold text-neutral-900 font-display">{testimonial.name}</h4>
                      <p className="text-neutral-600 text-sm">{testimonial.role}</p>
                      <p className="text-primary-600 text-sm font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-secondary-50 text-secondary-700 text-sm font-medium mb-6 font-body">
              <span className="mr-2">❓</span>
              FAQ
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-4 font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-base md:text-lg text-neutral-600 font-body">
              Get answers to common questions about TalentScore
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details 
                key={index} 
                className="group card p-6 animate-on-scroll cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <summary className="flex items-center justify-between font-bold text-neutral-900 font-display text-lg group-hover:text-primary-600 transition-colors list-none">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-100 text-primary-600 mr-4 group-hover:bg-primary-200 transition-colors">
                      {faq.icon}
                    </div>
                    {faq.question}
                  </div>
                  <svg className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 transition-all duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-6 pl-12">
                  <p className="text-neutral-600 leading-relaxed font-body">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium mb-8">
              <span className="mr-2">🎯</span>
              Our Mission
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading mb-6 text-white">
              Empowering Your Career Journey
            </h2>
            
            <p className="text-xl md:text-2xl mb-8 leading-relaxed font-body opacity-90 max-w-4xl mx-auto">
              We're on a mission to help job seekers create compelling resumes that get noticed. 
              Using advanced AI technology, we analyze your resume against job descriptions 
              and provide actionable insights to improve your chances of landing interviews.
            </p>
            
            <p className="text-lg mb-12 opacity-80 max-w-3xl mx-auto font-body">
              Whether you're a recent graduate or an experienced professional, our tool 
              adapts to your needs and helps you present your best self to potential employers.
            </p>
            
            <a href="/about" className="btn-secondary bg-white text-primary-600 hover:bg-neutral-50 group">
              Learn More About Us
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-neutral-50 to-primary-50/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-accent-50 text-accent-700 text-sm font-medium mb-6 font-body">
              <span className="mr-2">🚀</span>
              Get Started Today
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-6 font-heading">
              Ready to Transform Your Resume?
            </h2>
            
            <p className="text-base md:text-lg text-neutral-600 mb-10 max-w-2xl mx-auto font-body">
              Join thousands of successful job seekers who have improved their resumes and landed their dream jobs with our AI-powered tool.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="/analyze" className="btn-primary text-lg px-10 py-4 group">
                <span className="mr-2">⚡</span>
                Start Analyzing Now
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              
              <div className="flex items-center text-neutral-600 font-medium">
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

export default Home;
