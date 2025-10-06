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
    <div className="bg-white pt-16">
      {/* Hero Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-ocean-50 text-ocean-700 text-sm font-medium mb-8">
            <div className="w-2 h-2 bg-ocean-500 rounded-full mr-3"></div>
            About Our Mission
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-neutral-900">
            Empowering Careers
            <span className="text-ocean-600"> with AI Innovation</span>
          </h1>
          
          <p className="text-xl text-neutral-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing how job seekers create compelling resumes with AI-driven insights 
            that help you stand out in today's competitive job market.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/analyze" className="btn-primary">
              Try Our AI Tool
            </a>
            <a href="#mission" className="btn-secondary">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-sage-50 text-sage-700 text-sm font-medium mb-8">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Our Mission
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Democratizing Career Success
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl mx-auto">
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
                color: "ocean"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Speed",
                description: "Get comprehensive resume analysis in seconds, not days",
                color: "sage"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ),
                title: "Excellence",
                description: "Continuously improving our algorithms to deliver the best results",
                color: "sky"
              }
            ].map((value, index) => (
              <div key={index} className="card p-8 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 ${
                  index === 0 ? 'bg-ocean-100 text-ocean-600' :
                  index === 1 ? 'bg-beige-200 text-beige-700' :
                  'bg-sky-100 text-sky-600'
                }`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">{value.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How AI Works Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-sky-50 text-sky-700 text-sm font-medium mb-8">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              AI Technology
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              How Our AI Works
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
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
                    color: "ocean"
                  },
                  {
                    step: 2,
                    title: "Job Description Analysis",
                    description: "We analyze the job description to identify key requirements, skills, and qualifications that employers are looking for.",
                    color: "sage"
                  },
                  {
                    step: 3,
                    title: "Intelligent Matching",
                    description: "Our algorithms compare your resume against job requirements, identifying strengths and areas for improvement.",
                    color: "sky"
                  },
                  {
                    step: 4,
                    title: "Actionable Insights",
                    description: "Generate personalized recommendations and suggestions to optimize your resume for maximum impact.",
                    color: "cream"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start group" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className={`w-12 h-12 text-white rounded-xl flex items-center justify-center font-bold mr-6 mt-1 ${
                      index === 0 ? 'bg-ocean-600' :
                      index === 1 ? 'bg-beige-600' :
                      index === 2 ? 'bg-sky-600' :
                      'bg-cream-600'
                    }`}>
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-neutral-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-10 text-center">
              <div className="w-24 h-24 bg-ocean-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                Powered by Advanced AI
              </h3>
              <p className="text-neutral-600 mb-8 leading-relaxed">
                Our machine learning models are trained on thousands of successful 
                resumes and job descriptions across various industries.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-ocean-50">
                  <div className="text-3xl font-bold text-ocean-600">98%</div>
                  <div className="text-sm text-neutral-600 font-medium">Accuracy Rate</div>
                </div>
                <div className="p-4 rounded-xl bg-sage-50">
                  <div className="text-3xl font-bold text-sage-600">25k+</div>
                  <div className="text-sm text-neutral-600 font-medium">Resumes Analyzed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-ocean-500 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-8">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Get Started
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Resume?
          </h2>
          
          <p className="text-lg mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of job seekers who have improved their resumes and landed their dream jobs with our AI-powered tool.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/analyze" className="btn-secondary bg-white text-ocean-500 hover:bg-neutral-50">
              Start Your Analysis
            </a>
            
            <div className="flex items-center text-white/90 font-medium">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free to use • No signup required
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
