import React, { type ReactNode } from 'react';
import { ArrowRight, FileText, Briefcase, User, LogOut, LogIn, LayoutTemplate, Linkedin, FileStack } from 'lucide-react';
import { useAuth } from '../../firebase/AuthContext';

interface LayoutProps {
  children: ReactNode;
  currentPath?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPath = '/' }) => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Top Header */}
      <header className="fixed top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-xl">
        <div className="container-premium">
          <div className="h-16 md:h-20 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <a href="/" className="flex items-center gap-3 group">
                <img 
                  src="/talentscore-logo.png" 
                  alt="TalentScore" 
                  className="h-10 w-auto object-contain"
                />
              </a>
              
              <nav className="hidden md:flex items-center gap-6">
                <a 
                  href="/analyze" 
                  className={`text-sm font-medium transition-colors ${currentPath === '/analyze' ? 'text-primary-500' : 'text-neutral-600 hover:text-neutral-900'}`}
                >
                  Analyze
                </a>
                <a 
                  href="/cover-letter" 
                  className={`text-sm font-medium transition-colors ${currentPath === '/cover-letter' ? 'text-primary-500' : 'text-neutral-600 hover:text-neutral-900'}`}
                >
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    Cover Letter
                  </span>
                </a>
                <a 
                  href="/templates" 
                  className={`text-sm font-medium transition-colors ${currentPath === '/templates' ? 'text-primary-500' : 'text-neutral-600 hover:text-neutral-900'}`}
                >
                  <span className="flex items-center gap-1.5">
                    <LayoutTemplate className="w-4 h-4" />
                    Templates
                  </span>
                </a>
                <a 
                  href="/tracker" 
                  className={`text-sm font-medium transition-colors ${currentPath === '/tracker' ? 'text-primary-500' : 'text-neutral-600 hover:text-neutral-900'}`}
                >
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4" />
                    Tracker
                  </span>
                </a>
                <a 
                  href="/linkedin" 
                  className={`text-sm font-medium transition-colors ${currentPath === '/linkedin' ? 'text-primary-500' : 'text-neutral-600 hover:text-neutral-900'}`}
                >
                  <span className="flex items-center gap-1.5">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </span>
                </a>
                {isAuthenticated && (
                  <a 
                    href="/my-resumes" 
                    className={`text-sm font-medium transition-colors ${currentPath === '/my-resumes' ? 'text-primary-500' : 'text-neutral-600 hover:text-neutral-900'}`}
                  >
                    <span className="flex items-center gap-1.5">
                      <FileStack className="w-4 h-4" />
                      My Resumes
                    </span>
                  </a>
                )}
              </nav>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-neutral-100 rounded-lg">
                    <User className="w-4 h-4 text-neutral-500" />
                    <span className="text-sm text-neutral-700">{user?.displayName || user?.email}</span>
                  </div>
                  <button 
                    onClick={() => logout()} 
                    className="p-2 hover:bg-neutral-100 rounded-lg transition-colors text-neutral-500 hover:text-neutral-700"
                    title="Sign out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <a href="/login" className="inline-flex items-center gap-1.5 md:gap-2 text-xs md:text-sm py-1.5 md:py-2 px-2.5 md:px-4 border border-neutral-300 hover:border-neutral-400 text-neutral-700 hover:text-neutral-900 bg-white hover:bg-neutral-50 rounded-lg transition-colors">
                  <LogIn className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                  <span className="sm:hidden">Sign In</span>
                </a>
              )}
              <a href="/analyze" className="inline-flex items-center gap-1.5 md:gap-2 bg-primary-500 hover:bg-primary-600 text-white text-xs md:text-sm py-1.5 md:py-2 px-2.5 md:px-4 font-medium rounded-lg transition-all hover:translate-y-[-1px] active:translate-y-0 shadow-soft hover:shadow-medium whitespace-nowrap">
                <span className="hidden sm:inline">Analyze Resume</span>
                <span className="sm:hidden">Analyze</span>
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col pt-16 md:pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-12 mt-auto">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-3">
              <img 
                src="/talentscore-logo.png" 
                alt="TalentScore" 
                className="h-10 w-auto object-contain"
              />
            </div>
            
            <p className="text-neutral-500 text-sm">
              © 2026 TalentScore. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
