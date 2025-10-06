import React from 'react';
import { AnimatedSection } from '../components/modern/AnimatedSection';

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

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
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
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
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
              <span className="text-xs font-semibold text-[#26667F]">⚡ FEATURES</span>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'Smart Matching', desc: 'AI analyzes your resume against job descriptions', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop' },
              { icon: '📊', title: 'Visual Insights', desc: 'Beautiful charts showing your strengths and gaps', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop' },
              { icon: '✨', title: 'AI Suggestions', desc: 'Personalized recommendations to improve', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop' },
              { icon: '🚀', title: 'Instant Results', desc: 'Get analysis in under 3 seconds', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop' },
              { icon: '🔒', title: 'Secure & Private', desc: 'Your data is never stored', img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=300&fit=crop' },
              { icon: '📱', title: 'Export & Share', desc: 'Download PDF reports easily', img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop' },
            ].map((feature, idx) => (
              <AnimatedSection key={idx} delay={idx * 50}>
                <div className="group bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-[#67C090] transition-all duration-300 hover:shadow-xl h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img src={feature.img} alt={feature.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl shadow-lg">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">{feature.title}</h3>
                    <p className="text-neutral-600">{feature.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-[#DDF4E7]/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#124170] to-[#26667F] bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-lg text-neutral-600">Simple, fast, and effective</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Upload Resume', desc: 'Drop your resume file or paste the text', img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop' },
              { step: '02', title: 'Paste Job Description', desc: 'Add the job posting you\'re targeting', img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop' },
              { step: '03', title: 'Get Insights', desc: 'Receive AI-powered analysis instantly', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop' },
            ].map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 100}>
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#124170] to-[#26667F] text-white flex items-center justify-center text-2xl font-bold shadow-xl z-10">
                    {item.step}
                  </div>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-neutral-200 pt-6">
                    <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">{item.title}</h3>
                      <p className="text-neutral-600">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#DDF4E7] to-[#67C090]/20 mb-4">
              <span className="text-xs font-semibold text-[#26667F]">⭐ TESTIMONIALS</span>
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
      <AnimatedSection>
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#124170] via-[#26667F] to-[#67C090]" />
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          </div>
          
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Ready to Transform<br />Your Career?
            </h2>
            <p className="text-lg text-white/90 mb-12 max-w-3xl mx-auto">
              Join over 50,000 job seekers who have already optimized their resumes with TalentScore
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="/analyze" 
                className="group px-10 py-6 bg-white text-[#26667F] rounded-2xl font-bold text-xl hover:bg-[#DDF4E7] transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center gap-3"
              >
                Start Free Analysis
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a 
                href="/pricing" 
                className="px-10 py-6 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                View Pricing
              </a>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default Home;
