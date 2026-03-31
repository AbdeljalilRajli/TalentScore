import React, { type ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  currentPath?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPath = '/' }) => {
  return (
    <div className="min-h-screen bg-wallet-bg flex flex-col selection:bg-wallet-purple/30 selection:text-white">
      {/* Top Header */}
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-wallet-bg/80 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-xl bg-wallet-card flex items-center justify-center border border-white/10 shadow-lg group-hover:border-wallet-purple transition-all">
                <span className="text-white font-bold text-xs tracking-tighter">TS</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-wallet-purple transition-colors">TalentScore</span>
            </a>
            
            <nav className="hidden md:flex items-center gap-8">
               <div className="w-px h-4 bg-white/10"></div>
              <a 
                href="/analyze" 
                className={`text-xs font-bold tracking-wide transition-colors ${currentPath === '/analyze' ? 'text-wallet-purple' : 'text-wallet-muted hover:text-white'}`}
              >
                Resume Analyzer
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {currentPath !== '/analyze' && (
              <a href="/analyze" className="bg-wallet-yellow hover:bg-wallet-yellow/90 text-wallet-bg px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 group transition-colors shadow-lg">
                Scan Resume
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col pt-20">
        {children}
      </main>

      {/* Wallet-Style Footer */}
      <footer className="border-t border-white/5 bg-wallet-bg py-12 mt-auto">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg bg-wallet-card flex items-center justify-center border border-white/10">
                <span className="text-white font-bold text-[8px]">TS</span>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">TalentScore</span>
            </div>
            <p className="text-[10px] font-bold text-wallet-muted uppercase tracking-[0.2em]">TalentScore © 2026</p>
          </div>
          
          <div className="flex flex-wrap gap-10 text-[10px] font-bold uppercase tracking-widest text-wallet-muted">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">API Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
