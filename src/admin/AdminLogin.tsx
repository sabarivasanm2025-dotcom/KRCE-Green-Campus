import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Mail, Lock, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
import { adminAuthService } from '../lib/supabase';
import { useAdminAuth } from './AdminContext';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { adminUser, isAdminVerified, isLoading, setAdminUser } = useAdminAuth();

  // If already authenticated admin, redirect to dashboard
  useEffect(() => {
    if (!isLoading && adminUser && isAdminVerified) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isLoading, adminUser, isAdminVerified, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: signInError } = await adminAuthService.signIn(email, password);

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      if (!data.user) {
        setError('Authentication failed. Please try again.');
        setLoading(false);
        return;
      }

      // Verify the signed-in user is registered as an admin
      const isAdmin = await adminAuthService.checkIsAdmin(data.user.id);
      if (!isAdmin) {
        // Sign them out immediately — they authenticated but are not an admin
        await adminAuthService.signOut();
        setError('Access denied. This account is not registered as an admin.');
        setLoading(false);
        return;
      }

      setAdminUser(data.user);
      navigate('/admin/dashboard', { replace: true });
    } catch {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030d08] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-lime-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030d08] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTEgMGExIDEgMCAxIDAgMiAwIDEgMSAwIDEgMC0yIDB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9nPjwvc3ZnPg==')] opacity-30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-forest-900/80 border border-emerald-500/25 rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-emerald-500/15 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-850">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-forest-800 border border-emerald-500/40 flex items-center justify-center shadow-lg">
                <Leaf className="w-5 h-5 text-lime-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-black tracking-widest text-slate-100 font-display">GREEN</span>
                  <span className="text-sm font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400 font-display">CAMPUS</span>
                </div>
                <span className="text-[10px] font-mono tracking-wider text-emerald-400">KRCE • ADMIN PORTAL</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/25 text-[10px] font-mono font-semibold text-lime-300 uppercase mb-3">
              <ShieldCheck className="w-3 h-3 text-lime-400" />
              <span>Restricted Access</span>
            </div>
            <h1 className="text-2xl font-bold text-white font-display">Admin Sign In</h1>
            <p className="text-xs text-slate-400 mt-1">
              Authorized personnel only. Login requires admin registration.
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-950/60 border border-rose-500/35 text-xs text-rose-300 font-mono"
                >
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/60 pointer-events-none" />
                  <input
                    type="email"
                    required
                    autoComplete="username"
                    placeholder="admin@krce.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-forest-950 border border-emerald-500/25 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/40 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/60 pointer-events-none" />
                  <input
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-forest-950 border border-emerald-500/25 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/40 transition-all"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:shadow-[0_0_30px_rgba(163,230,53,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      <span>Verifying…</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Admin Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Back to public site */}
            <div className="mt-6 pt-5 border-t border-emerald-500/15 text-center">
              <a
                href="/"
                className="text-xs text-slate-400 hover:text-emerald-400 font-mono transition-colors"
              >
                ← Back to Green Campus Website
              </a>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] font-mono text-slate-600 mt-5">
          KRCE Green Campus • EVS 2026 • Admin Access
        </p>
      </motion.div>
    </div>
  );
};
