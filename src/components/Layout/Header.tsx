import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-sm border-b border-neutral-200' 
        : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-ocean-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">TS</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-neutral-900">TalentScore</span>
                <span className="text-xs text-neutral-500 -mt-1">AI Resume Analyzer</span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { name: 'Home', href: '/' },
              { name: 'Analyze', href: '/analyze' },
              { name: 'About', href: '/about' },
              { name: 'FAQ', href: '/faq' },
              { name: 'Testimonials', href: '/testimonials' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-ocean-600 transition-colors duration-200 rounded-md hover:bg-ocean-50"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <a href="/analyze" className="btn-primary">
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 text-neutral-700 hover:text-ocean-600 hover:bg-ocean-50/50 rounded-xl transition-all duration-300 focus-ring"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen 
            ? 'max-h-96 opacity-100 py-6' 
            : 'max-h-0 opacity-0 py-0'
        } overflow-hidden`}>
          <div className="flex flex-col space-y-2 border-t border-neutral-200/50 pt-6">
            {[
              { name: 'Home', href: '/' },
              { name: 'Analyze', href: '/analyze' },
              { name: 'About', href: '/about' },
              { name: 'FAQ', href: '/faq' },
              { name: 'Testimonials', href: '/testimonials' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-3 text-sm font-semibold text-neutral-700 hover:text-ocean-600 hover:bg-ocean-50/50 rounded-xl transition-all duration-300"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4">
              <a href="/analyze" className="btn-primary w-full justify-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
