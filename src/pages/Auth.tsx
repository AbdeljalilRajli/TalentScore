import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Chrome, AlertCircle } from 'lucide-react';
import { useAuth } from '../firebase/AuthContext';

interface AuthPageProps {
  onSuccess?: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup, loginWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, name);
      }
      onSuccess?.();
      // Check if there's pending tracker data to restore
      const pendingRedirect = localStorage.getItem('pending_tracker_redirect');
      if (pendingRedirect) {
        localStorage.removeItem('pending_tracker_redirect');
        window.location.href = '/analyze';
      } else {
        // Normal login - redirect to homepage
        window.location.href = '/';
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      // Clean up Firebase error messages
      setError(message.replace('Firebase: ', '').replace(/\(.*\)/, ''));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      onSuccess?.();
      // Check if there's pending tracker data to restore
      const pendingRedirect = localStorage.getItem('pending_tracker_redirect');
      if (pendingRedirect) {
        localStorage.removeItem('pending_tracker_redirect');
        window.location.href = '/analyze';
      } else {
        // Normal login - redirect to homepage
        window.location.href = '/';
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Google login failed';
      setError(message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 relative flex items-center justify-center p-4">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(72,122,145,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(72,122,145,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <img 
            src="/talentscore-logo.png" 
            alt="TalentScore" 
            className="h-16 w-auto mx-auto mb-6 object-contain"
          />
          <h1 className="text-neutral-900 text-2xl font-semibold mb-2">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="text-neutral-500">
            {isLogin 
              ? 'Sign in to access your job tracker and saved data' 
              : 'Get started with AI-powered resume tools'}
          </p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-soft">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-error-50 border border-error-200 rounded-lg flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 text-error-500 shrink-0 mt-0.5" />
              <p className="text-error-700 text-sm">{error}</p>
            </motion.div>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-neutral-200 text-neutral-700 font-medium hover:bg-neutral-50 hover:border-neutral-300 transition-colors rounded-xl mb-6 text-sm"
          >
            <Chrome className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-neutral-400 text-sm font-medium">or</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-neutral-700 text-sm mb-2 font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-neutral-50 text-neutral-900 pl-12 pr-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-neutral-700 text-sm mb-2 font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-neutral-50 text-neutral-900 pl-12 pr-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-700 text-sm mb-2 font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-neutral-50 text-neutral-900 pl-12 pr-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white py-3 font-semibold transition-all duration-300 hover:translate-y-[-2px] active:translate-y-0 mt-2 rounded-xl shadow-soft hover:shadow-medium"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin rounded-full" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-neutral-500 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
