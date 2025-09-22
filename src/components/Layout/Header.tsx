import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TS</span>
              </div>
              <span className="text-xl font-bold text-gray-900">TalentScore</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
            <a href="/analyze" className="text-gray-700 hover:text-blue-600 transition-colors">Analyze</a>
            <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
            <a href="/faq" className="text-gray-700 hover:text-blue-600 transition-colors">FAQ</a>
            <a href="/testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Testimonials</a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/analyze"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
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
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="/analyze" className="text-gray-700 hover:text-blue-600 transition-colors">Analyze</a>
              <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="/faq" className="text-gray-700 hover:text-blue-600 transition-colors">FAQ</a>
              <a href="/testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Testimonials</a>
              <a
                href="/analyze"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 font-medium text-center"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
