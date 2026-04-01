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
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-semibold text-lg">TS</span>
          </div>
          <h1 className="text-neutral-50 text-2xl font-medium mb-2">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="text-neutral-400">
            {isLogin 
              ? 'Sign in to access your job tracker and saved data' 
              : 'Get started with AI-powered resume tools'}
          </p>
        </div>

        <div className="card p-8">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-error-500/10 border border-error-500/20 rounded-lg flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 text-error-500 shrink-0 mt-0.5" />
              <p className="text-error-400 text-sm">{error}</p>
            </motion.div>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white text-neutral-900 rounded-xl font-medium hover:bg-neutral-100 transition-colors mb-6"
          >
            <Chrome className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-800"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-neutral-900 text-neutral-500 text-sm">or</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-neutral-400 text-sm mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-neutral-800 text-neutral-100 pl-12 pr-4 py-3 rounded-xl border border-neutral-700 focus:border-primary-500/50 focus:outline-none"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-neutral-400 text-sm mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-neutral-800 text-neutral-100 pl-12 pr-4 py-3 rounded-xl border border-neutral-700 focus:border-primary-500/50 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-400 text-sm mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-neutral-800 text-neutral-100 pl-12 pr-4 py-3 rounded-xl border border-neutral-700 focus:border-primary-500/50 focus:outline-none"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
              className="text-primary-400 hover:text-primary-300 transition-colors"
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
