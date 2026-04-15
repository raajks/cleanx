import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, Eye, EyeOff, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordChecks = [
    { label: 'At least 6 characters', ok: form.password.length >= 6 },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.password) { toast.error('Please fill all fields'); return; }
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return; }
    if (!passwordChecks.every(c => c.ok)) { toast.error('Password does not meet requirements'); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, password: form.password }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Account created successfully!');
        navigate('/login');
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (err) {
      toast.error('Server not reachable. Please try again.');
    }
    setLoading(false);
  };

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <div className="min-h-screen flex">
      {/* Left — Branding */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-dark-900 via-dark-950 to-primary-900 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,.07)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-20 -left-20 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-56 h-56 bg-cyan-400/15 rounded-full blur-3xl" />
        <div className="relative z-10 px-16 text-white max-w-lg">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-cyan-400 flex items-center justify-center"><Sparkles className="w-5 h-5 text-white" /></div>
            <span className="text-2xl font-extrabold tracking-tight">CleanX</span>
          </Link>
          <h2 className="text-4xl font-extrabold leading-tight mb-4">Start your <br /><span className="gradient-text">premium laundry</span> journey</h2>
          <p className="text-dark-400 text-sm leading-relaxed mb-8">Join 10,000+ happy customers who trust CleanX for garment care.</p>
          <div className="space-y-3">
            {['Free pickup & delivery', '24-hour express turnaround', 'Premium garment care'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-dark-300"><CheckCircle2 className="w-4 h-4 text-accent-400 flex-shrink-0" /> {item}</div>
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
          <h1 className="text-3xl font-extrabold text-dark-800 mb-2">Create Account</h1>
          <p className="text-dark-400 text-sm mb-8">Already have an account? <Link to="/login" className="text-primary-500 font-semibold hover:underline">Sign in</Link></p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-dark-500 mb-1.5 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                <input type="text" value={form.name} onChange={set('name')} placeholder="Raj Kumar"
                  className="w-full pl-11 pr-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm transition-all" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-dark-500 mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                  <input type="email" value={form.email} onChange={set('email')} placeholder="you@email.com"
                    className="w-full pl-11 pr-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm transition-all" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-dark-500 mb-1.5 block">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                  <input type="tel" value={form.phone} onChange={set('phone')} placeholder="9876543210"
                    className="w-full pl-11 pr-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm transition-all" />
                </div>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-dark-500 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={set('password')} placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm transition-all" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password && (
                <div className="flex gap-3 mt-2">
                  {passwordChecks.map((c) => (
                    <span key={c.label} className={`text-[10px] font-medium ${c.ok ? 'text-accent-600' : 'text-dark-400'}`}>{c.ok ? '✓' : '○'} {c.label}</span>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="text-xs font-semibold text-dark-500 mb-1.5 block">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                <input type="password" value={form.confirmPassword} onChange={set('confirmPassword')} placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm transition-all" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 !py-4 text-sm font-bold mt-2">
              {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-dark-400">
            By signing up you agree to our <span className="text-primary-500 cursor-pointer">Terms</span> and <span className="text-primary-500 cursor-pointer">Privacy Policy</span>.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
