import React from 'react';
import { AnimatedSection } from '../components/modern/AnimatedSection';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      quote: "TalentScore helped me land my dream job at Google! The AI insights were incredibly accurate and gave me the confidence to apply.",
      role: "Software Engineer",
      company: "Google",
      improvement: "92%",
      rating: 5
    },
    {
      name: "Michael Chen",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      quote: "The match score feature is game-changing. I optimized my resume for each application and saw immediate results.",
      role: "Product Manager",
      company: "Microsoft",
      improvement: "88%",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      quote: "Best career tool I've ever used. The visual insights made it so easy to understand what I needed to improve.",
      role: "UX Designer",
      company: "Apple",
      improvement: "95%",
      rating: 5
    },
    {
      name: "David Kim",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      quote: "I got 3 interview calls within a week of updating my resume! The keyword suggestions were spot-on.",
      role: "Data Scientist",
      company: "Amazon",
      improvement: "89%",
      rating: 5
    },
    {
      name: "Jessica Taylor",
      photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
      quote: "The AI-powered suggestions helped me highlight my strengths in a way that really resonated with recruiters.",
      role: "Marketing Manager",
      company: "Meta",
      improvement: "91%",
      rating: 5
    },
    {
      name: "James Wilson",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      quote: "Simple, fast, and incredibly effective. This tool gave me the edge I needed in a competitive job market.",
      role: "DevOps Engineer",
      company: "Netflix",
      improvement: "87%",
      rating: 5
    }
  ];


  return (
    <div className="bg-gradient-to-br from-white via-[#DDF4E7]/20 to-white pt-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#DDF4E7] to-[#67C090] rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-1/4 -right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-[#26667F] to-[#124170] rounded-full blur-3xl opacity-15" />
        </div>

        <AnimatedSection className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#DDF4E7] to-[#67C090]/30 border border-[#67C090]/20 mb-6">
            <span className="w-2 h-2 bg-[#67C090] rounded-full mr-2 animate-pulse" />
            <span className="text-xs font-semibold text-[#26667F]">Success Stories</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#124170] to-[#26667F] bg-clip-text text-transparent">
              Real People, Real Results
            </span>
          </h1>
          
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Join thousands of professionals who transformed their careers with TalentScore
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { label: 'Success Rate', value: '98%' },
              { label: 'Avg. Improvement', value: '45%' },
              { label: 'Happy Users', value: '50K+' },
              { label: 'Rating', value: '4.9/5' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#124170] to-[#67C090] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <AnimatedSection key={idx} delay={idx * 100}>
                <div className="bg-gradient-to-br from-white to-[#DDF4E7]/20 rounded-2xl p-8 border border-neutral-200 hover:border-[#67C090] transition-all hover:shadow-2xl h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-neutral-900">{testimonial.name}</h3>
                      <p className="text-sm text-neutral-600">{testimonial.role}</p>
                      <p className="text-xs font-semibold text-[#26667F]">{testimonial.company}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-[#67C090]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-neutral-700 leading-relaxed italic flex-1 mb-6">
                    "{testimonial.quote}"
                  </p>

                  <div className="pt-4 border-t border-neutral-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">Match Score</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-[#26667F] to-[#67C090] bg-clip-text text-transparent">
                        {testimonial.improvement}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#124170] via-[#26667F] to-[#67C090]" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Start optimizing your resume today and join our community of successful professionals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/analyze" className="px-10 py-5 bg-white text-[#26667F] rounded-2xl font-bold text-lg hover:bg-[#DDF4E7] transition-all duration-300 hover:scale-105 shadow-2xl">
                Analyze My Resume
              </a>
              <a href="/pricing" className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300">
                View Pricing
              </a>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default Testimonials;
