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
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Resume Analysis",
      description: "Get detailed analysis of your resume with AI-powered insights and recommendations.",
      color: "ocean"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Match Score",
      description: "See how well your resume matches job descriptions with our scoring algorithm.",
      color: "sage"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Smart Suggestions",
      description: "Receive personalized suggestions to improve your resume and increase your chances.",
      color: "sky"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      title: "Visual Charts",
      description: "Understand your resume performance through interactive charts and visualizations.",
      color: "cream"
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
    <div className="bg-white pt-16">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-left">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-ocean-50 text-ocean-700 text-sm font-medium mb-8">
                <div className="w-2 h-2 bg-ocean-500 rounded-full mr-3"></div>
                AI-Powered Resume Analysis
              </div>
              
              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-neutral-900">
                Get Your Resume
                <span className="text-ocean-600"> Job-Ready</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed max-w-lg">
                AI-powered analysis that helps you optimize your resume for any job. 
                Get instant feedback and land more interviews.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a href="/analyze" className="btn-primary text-lg px-8 py-4">
                  Analyze Resume Free
                </a>
                <a href="/about" className="btn-secondary text-lg px-8 py-4">
                  See How It Works
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 text-sm text-neutral-500">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-sage-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free to use
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-sage-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure & Private
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-sage-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Instant Results
                </div>
              </div>
            </div>

            {/* Right Content - Visual */}
            <div className="relative">
              <div className="bg-cream-50 rounded-2xl p-8 border border-cream-200">
                {/* Mock Resume Preview */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-ocean-100 rounded-full mr-4"></div>
                    <div>
                      <div className="h-3 bg-neutral-200 rounded w-24 mb-2"></div>
                      <div className="h-2 bg-neutral-100 rounded w-32"></div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-2 bg-neutral-100 rounded w-full"></div>
                    <div className="h-2 bg-neutral-100 rounded w-3/4"></div>
                    <div className="h-2 bg-neutral-100 rounded w-5/6"></div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-xs">React</div>
                    <div className="px-3 py-1 bg-ocean-100 text-ocean-700 rounded-full text-xs">JavaScript</div>
                    <div className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-xs">Node.js</div>
                  </div>
                </div>
                
                {/* Score Display */}
                <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-ocean-500">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-neutral-700">Match Score</span>
                    <span className="text-2xl font-bold text-ocean-600">87%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div className="bg-ocean-500 h-2 rounded-full" style={{width: '87%'}}></div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-sage-500 text-white p-3 rounded-lg shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-sky-500 text-white p-3 rounded-lg shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "25K+", label: "Resumes Analyzed", color: "ocean" },
              { number: "98%", label: "Success Rate", color: "sage" },
              { number: "4.9/5", label: "User Rating", color: "sky" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl md:text-5xl font-bold text-${stat.color}-600 mb-2`}>{stat.number}</div>
                <div className="text-neutral-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-sage-50 text-sage-700 text-sm font-medium mb-8">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              How It Works
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900">
              Simple, Fast, Effective
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Get professional resume insights in minutes with our AI-powered analysis
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-${feature.color}-100 text-${feature.color}-600 mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-24 bg-white">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-on-scroll">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-sage-50 text-sage-700 text-sm font-medium mb-8">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              What Our Users Say
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Join thousands of successful job seekers who have transformed their careers with TalentScore
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="card p-8"
              >
                <div>
                  <div className="flex text-sage-400 mb-6">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <blockquote className="text-neutral-700 text-lg leading-relaxed mb-8 italic font-medium">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4 ring-4 ring-white/50 shadow-xl"
                    />
                    <div>
                      <h4 className="font-bold text-neutral-900 text-lg">{testimonial.name}</h4>
                      <p className="text-neutral-600">{testimonial.role}</p>
                      <p className="text-ocean-600 font-semibold">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-sky-50 text-sky-700 text-sm font-medium mb-8">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Get answers to common questions about TalentScore
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details 
                key={index} 
                className="group bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-md transition-all duration-200"
              >
                <summary className="flex items-center justify-between font-semibold text-neutral-900 cursor-pointer list-none">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-ocean-100 text-ocean-600 mr-4">
                      {faq.icon}
                    </div>
                    {faq.question}
                  </div>
                  <svg className="w-5 h-5 text-neutral-400 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 pl-12">
                  <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-ocean-600 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-8">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Our Mission
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white leading-tight">
            Empowering Your Career Journey
          </h2>
          
          <p className="text-xl mb-8 leading-relaxed max-w-4xl mx-auto">
            We're on a mission to help job seekers create compelling resumes that get noticed. 
            Using advanced AI technology, we analyze your resume against job descriptions 
            and provide actionable insights to improve your chances of landing interviews.
          </p>
          
          <p className="text-lg mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Whether you're a recent graduate or an experienced professional, our tool 
            adapts to your needs and helps you present your best self to potential employers.
          </p>
          
          <a href="/about" className="btn-secondary bg-white text-ocean-600 hover:bg-neutral-50">
            Learn More About Us
          </a>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-cream-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-cream-100 text-cream-800 text-sm font-medium mb-8">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get Started Today
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
              Ready to Transform Your Resume?
            </h2>
            
            <p className="text-lg text-neutral-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of successful job seekers who have improved their resumes and landed their dream jobs with our AI-powered tool.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <a href="/analyze" className="btn-primary text-lg px-8 py-4">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start Analyzing Now
                <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              
              <div className="flex items-center text-neutral-600 font-medium">
                <svg className="w-6 h-6 mr-3 text-sage-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free to use • No signup required
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { icon: "⚡", text: "Instant Analysis" },
                { icon: "🎯", text: "Accurate Scoring" },
                { icon: "🚀", text: "Career Growth" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-center space-x-3 text-neutral-600 font-medium">
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
