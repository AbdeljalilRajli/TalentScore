import React from 'react';
import { AnimatedSection } from '../components/modern/AnimatedSection';
import { GlowCard } from '../components/modern/GlowCard';

const About: React.FC = () => {

  return (
    <div className="bg-gradient-to-br from-white via-[#DDF4E7]/20 to-white pt-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#DDF4E7] to-[#67C090] rounded-full blur-3xl opacity-20 animate-float" />
          <div className="absolute bottom-1/4 -right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-[#26667F] to-[#124170] rounded-full blur-3xl opacity-15 animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <AnimatedSection className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#DDF4E7] to-[#67C090]/30 backdrop-blur-sm border border-[#67C090]/20 mb-8">
            <span className="w-2 h-2 bg-[#67C090] rounded-full mr-3 animate-pulse" />
            <span className="text-sm font-bold bg-gradient-to-r from-[#26667F] to-[#67C090] bg-clip-text text-transparent">
              Our Story
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-[#124170] via-[#26667F] to-[#67C090] bg-clip-text text-transparent">
              Empowering Careers
            </span>
            <br />
            <span className="text-neutral-900">with AI Innovation</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize career success by making professional-grade resume optimization accessible to everyone, everywhere.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="/analyze" className="px-10 py-5 bg-gradient-to-r from-[#124170] to-[#26667F] text-white rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl">
              Try Our AI Tool
            </a>
            <a href="#mission" className="px-10 py-5 bg-white border-2 border-[#26667F] text-[#26667F] rounded-2xl font-bold text-lg hover:bg-[#DDF4E7] transition-all duration-300">
              Learn More
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Team collaboration"
                className="rounded-3xl shadow-2xl"
              />
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#DDF4E7] to-[#67C090]/20 mb-6">
                <span className="text-xs font-semibold text-[#26667F]">
                  🎯 OUR MISSION
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#124170] to-[#26667F] bg-clip-text text-transparent">
                  Democratizing Career Success
                </span>
              </h2>
              <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                We believe everyone deserves access to professional resume optimization tools. Our AI-powered platform makes it easy to create compelling resumes that get noticed.
              </p>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Founded in 2024, we've helped over 50,000 job seekers land interviews at top companies worldwide.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-[#DDF4E7]/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#124170] to-[#26667F] bg-clip-text text-transparent">
                Our Values
              </span>
            </h2>
            <p className="text-lg text-neutral-600">What drives us every day</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🚀',
                title: 'Innovation First',
                desc: 'We constantly push boundaries to deliver cutting-edge AI technology',
                img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
              },
              {
                icon: '🤝',
                title: 'User-Centric',
                desc: 'Every feature is designed with your success in mind',
                img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop'
              },
              {
                icon: '✨',
                title: 'Quality & Trust',
                desc: 'We maintain the highest standards of accuracy and privacy',
                img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop'
              }
            ].map((value, idx) => (
              <AnimatedSection key={idx} delay={idx * 100}>
                <GlowCard>
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                    <img src={value.img} alt={value.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl shadow-lg">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">{value.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{value.desc}</p>
                </GlowCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#124170] to-[#26667F] bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h2>
            <p className="text-lg text-neutral-600">Passionate experts dedicated to your success</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: 'Alex Johnson', role: 'CEO & Founder', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
              { name: 'Sarah Chen', role: 'Head of AI', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
              { name: 'Michael Brown', role: 'Lead Designer', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
              { name: 'Emily Davis', role: 'Product Manager', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' }
            ].map((member, idx) => (
              <AnimatedSection key={idx} delay={idx * 100}>
                <div className="group text-center">
                  <div className="relative mb-4 overflow-hidden rounded-2xl">
                    <img 
                      src={member.img} 
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#124170]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">{member.name}</h3>
                  <p className="text-sm text-[#26667F] font-medium">{member.role}</p>
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
              Ready to Join Our Success Story?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Start optimizing your resume today and join thousands of successful job seekers
            </p>
            <a 
              href="/analyze" 
              className="inline-flex items-center gap-2 px-10 py-5 bg-white text-[#26667F] rounded-2xl font-bold text-lg hover:bg-[#DDF4E7] transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              Get Started Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default About;
