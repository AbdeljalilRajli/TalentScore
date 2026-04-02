import React, { type ReactNode } from 'react';
import { ArrowRight, FileText, Briefcase, User, LogOut, LogIn } from 'lucide-react';
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
                <div className="w-8 h-8 bg-primary-500 flex items-center justify-center rounded-sm">
                  <span className="text-white font-semibold text-xs">TS</span>
                </div>
                <span className="text-lg font-semibold text-neutral-900 group-hover:text-primary-500 transition-colors">TalentScore</span>
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
                  href="/tracker" 
                  className={`text-sm font-medium transition-colors ${currentPath === '/tracker' ? 'text-primary-500' : 'text-neutral-600 hover:text-neutral-900'}`}
                >
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4" />
                    Tracker
                  </span>
                </a>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
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
                <a href="/login" className="inline-flex items-center gap-2 text-sm py-2 px-4 border border-neutral-300 hover:border-neutral-400 text-neutral-700 hover:text-neutral-900 bg-white hover:bg-neutral-50 rounded-lg transition-colors">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </a>
              )}
              <a href="/analyze" className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white text-sm py-2 px-4 font-medium rounded-lg transition-all hover:translate-y-[-1px] active:translate-y-0 shadow-soft hover:shadow-medium">
                Analyze Resume
                <ArrowRight className="w-4 h-4" />
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
              <div className="w-8 h-8 bg-neutral-200 flex items-center justify-center rounded-sm">
                <span className="text-neutral-700 font-semibold text-xs">TS</span>
              </div>
              <span className="text-neutral-900 font-medium">TalentScore</span>
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
