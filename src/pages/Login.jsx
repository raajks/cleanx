import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    // Placeholder—will wire to backend JWT auth
    setTimeout(() => {
      toast.success('Login successful!');
      setLoading(false);
      navigate('/');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — Branding Panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-dark-900 via-dark-950 to-primary-900 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,.07)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-20 -left-20 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-56 h-56 bg-cyan-400/15 rounded-full blur-3xl" />
        <div className="relative z-10 px-16 text-white max-w-lg">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-cyan-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight">CleanX</span>
          </Link>
          <h2 className="text-4xl font-extrabold leading-tight mb-4">Welcome back to <br /><span className="gradient-text">premium laundry care</span></h2>
          <p className="text-dark-400 text-sm leading-relaxed">Login to manage orders, track pickups, and enjoy exclusive members-only benefits.</p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {['10K+ Customers', '50K+ Orders', '4.9★ Rating'].map((s) => (
              <div key={s} className="glass-dark rounded-xl p-3 text-center text-xs font-semibold">{s}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center py-16 px-6 bg-gradient-to-b from-white to-dark-50">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-cyan-400 flex items-center justify-center"><Sparkles className="w-4 h-4 text-white" /></div>
            <span className="text-xl font-extrabold">CleanX</span>
          </div>
          <h1 className="text-3xl font-extrabold text-dark-800 mb-2">Sign In</h1>
          <p className="text-dark-400 text-sm mb-8">Don't have an account? <Link to="/signup" className="text-primary-500 font-semibold hover:underline">Create one</Link></p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-dark-500 mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3.5 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm transition-all" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-dark-500 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm transition-all" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-dark-500"><input type="checkbox" className="w-3.5 h-3.5 rounded accent-primary-500" /> Remember me</label>
              <button type="button" className="text-primary-500 font-semibold hover:underline">Forgot password?</button>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 !py-4 text-sm font-bold">
              {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-dark-400">
            By signing in you agree to our <span className="text-primary-500 cursor-pointer">Terms</span> and <span className="text-primary-500 cursor-pointer">Privacy Policy</span>.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
