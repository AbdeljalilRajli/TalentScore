import React from 'react';
import { Home, Search, Lightbulb, Star, HelpCircle, Mail, Shield, FileText, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#124170] via-[#26667F] to-[#67C090]" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/3 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Brand & CTA */}
            <div className="text-white">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/50 shadow-lg">
                  <span className="text-white font-bold text-2xl drop-shadow-lg">TS</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white drop-shadow-lg">TalentScore</h3>
                  <p className="text-white/90 text-sm">AI Resume Analyzer</p>
                </div>
              </div>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Transform your career with intelligent resume optimization. Join thousands who've already found their dream jobs.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  { 
                    name: 'Twitter', 
                    href: '#',
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    )
                  },
                  { 
                    name: 'LinkedIn', 
                    href: '#',
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    )
                  },
                  { 
                    name: 'GitHub', 
                    href: '#',
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    )
                  }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="group p-4 rounded-2xl bg-white/10 backdrop-blur-sm text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Side - Interactive Links */}
            <div className="grid grid-cols-2 gap-8">
              
              {/* Navigation Links */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#DDF4E7] rounded-full animate-pulse" />
                  Navigate
                </h4>
                <ul className="space-y-4">
                  {[
                    { name: 'Home', href: '/', icon: Home },
                    { name: 'Analyze Resume', href: '/analyze', icon: Search },
                    { name: 'About Us', href: '/about', icon: Lightbulb },
                    { name: 'Testimonials', href: '/testimonials', icon: Star }
                  ].map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href} 
                        className="group flex items-center gap-3 text-white/80 hover:text-white transition-all duration-200 hover:translate-x-2"
                      >
                        <link.icon className="w-4 h-4" />
                        <span className="font-medium">{link.name}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Links */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#DDF4E7] rounded-full animate-pulse" />
                  Support
                </h4>
                <ul className="space-y-4">
                  {[
                    { name: 'Help Center', href: '#', icon: HelpCircle },
                    { name: 'Contact Us', href: '#', icon: Mail },
                    { name: 'Privacy Policy', href: '#', icon: Shield },
                    { name: 'Terms of Service', href: '#', icon: FileText }
                  ].map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href} 
                        className="group flex items-center gap-3 text-white/80 hover:text-white transition-all duration-200 hover:translate-x-2"
                      >
                        <link.icon className="w-4 h-4" />
                        <span className="font-medium">{link.name}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-16 border-t border-white/20">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Ahead of the Curve</h3>
            <p className="text-white/80 mb-8">
              Get exclusive career tips, resume trends, and AI insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
              <button className="px-8 py-4 bg-white text-[#26667F] rounded-2xl font-bold hover:bg-[#DDF4E7] transition-all duration-300 hover:scale-105 shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © {currentYear} TalentScore. Empowering careers worldwide.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <span className="w-2 h-2 bg-[#67C090] rounded-full animate-pulse"></span>
                <span>AI-Powered Platform</span>
              </div>
              <p className="text-white/60 text-sm">
                Built with ❤️ for job seekers
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
