import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, TrendingUp, MapPin, Users, IndianRupee, CheckCircle2, ArrowRight, Phone, Mail, Calculator } from 'lucide-react';
import { PageBanner, GlassCard, SectionHeader } from '../components/ui';
import toast from 'react-hot-toast';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const tiers = [
  { name: 'Starter', investment: '5–8 Lakh', revenue: '1.5–3 Lakh/mo', area: '200–400 sq ft', color: 'from-primary-500 to-cyan-400', features: ['Basic equipment setup', 'Staff training (5 days)', 'Brand licensing', 'CRM software access', 'Marketing kit'] },
  { name: 'Professional', investment: '10–15 Lakh', revenue: '4–7 Lakh/mo', area: '400–800 sq ft', color: 'from-cyan-500 to-accent-400', popular: true, features: ['Full equipment package', 'Staff training (10 days)', 'Premium branding', 'Advanced CRM + POS', 'Digital marketing support', 'Dedicated account manager'] },
  { name: 'Enterprise', investment: '20–30 Lakh', revenue: '8–15 Lakh/mo', area: '800–1500 sq ft', color: 'from-accent-500 to-primary-400', features: ['Industrial-grade equipment', 'Staff training (15 days)', 'Exclusive territory', 'Full tech stack', 'Social media management', 'Revenue guarantee program'] },
];

const stats = [
  { icon: Building2, value: '50+', label: 'Franchise Partners' },
  { icon: MapPin, value: '15+', label: 'Cities Covered' },
  { icon: TrendingUp, value: '35%', label: 'Avg. ROI' },
  { icon: Users, value: '500+', label: 'Jobs Created' },
];

export default function Franchise() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', investment: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [roiInvestment, setRoiInvestment] = useState(1000000);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.city) { toast.error('Please fill required fields'); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/franchise`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) { toast.success('Application submitted! Our team will contact you.'); setForm({ name: '', email: '', phone: '', city: '', investment: '', message: '' }); }
      else toast.error(data.message || 'Something went wrong');
    } catch { toast.error('Server error. Try again.'); }
    setLoading(false);
  };

  const roiMonthly = Math.round(roiInvestment * 0.03);
  const roiYearly = roiMonthly * 12;
  const roiBreakeven = Math.ceil(roiInvestment / roiMonthly);

  return (
    <div>
      <PageBanner title="Franchise Opportunity" subtitle="Partner with India's fastest-growing premium laundry brand. Low investment, high returns." />

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center mb-3">
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-extrabold text-dark-800">{s.value}</div>
              <div className="text-xs text-dark-400 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Investment Tiers */}
      <section className="py-24 bg-gradient-to-b from-white to-dark-50">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader badge="Investment Plans" title="Choose Your Franchise Tier" description="Flexible investment options to match your budget and business goals." />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {tiers.map((tier, i) => (
              <motion.div key={tier.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative">
                {tier.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1 bg-gradient-to-r from-cyan-500 to-accent-400 text-white text-xs font-bold rounded-full">MOST POPULAR</div>}
                <div className={`glass-card p-8 h-full flex flex-col ${tier.popular ? 'ring-2 ring-cyan-400/50 shadow-xl' : ''}`}>
                  <div className={`w-full h-1.5 rounded-full bg-gradient-to-r ${tier.color} mb-6`} />
                  <h3 className="text-xl font-extrabold text-dark-800 mb-1">{tier.name}</h3>
                  <div className="text-2xl font-extrabold gradient-text mb-1">₹{tier.investment}</div>
                  <div className="text-sm text-dark-400 mb-1">Expected Revenue: <span className="font-semibold text-accent-600">₹{tier.revenue}</span></div>
                  <div className="text-xs text-dark-400 mb-6">Area: {tier.area}</div>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {tier.features.map((f) => <li key={f} className="flex items-start gap-2 text-sm text-dark-600"><CheckCircle2 className="w-4 h-4 text-accent-500 mt-0.5 flex-shrink-0" /> {f}</li>)}
                  </ul>
                  <a href="#inquiry" className={`btn-primary text-center text-sm ${!tier.popular ? '!bg-dark-100 !text-dark-700 hover:!bg-dark-200 !shadow-none' : ''}`}>
                    Get Started <ArrowRight className="w-4 h-4 inline ml-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader badge="ROI Calculator" title="Estimate Your Returns" description="Slide to see projected revenue based on your investment amount." />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8 mt-10">
            <div className="flex items-center gap-3 mb-2">
              <Calculator className="w-5 h-5 text-primary-500" />
              <span className="font-bold text-dark-700">Your Investment</span>
            </div>
            <div className="text-3xl font-extrabold gradient-text mb-4">₹{(roiInvestment / 100000).toFixed(1)} Lakh</div>
            <input type="range" min={300000} max={3000000} step={100000} value={roiInvestment} onChange={(e) => setRoiInvestment(Number(e.target.value))}
              className="w-full h-2 bg-dark-200 rounded-full accent-primary-500 cursor-pointer mb-8" />
            <div className="grid grid-cols-3 gap-4">
              <div className="glass p-4 rounded-xl text-center"><div className="text-xs text-dark-400 mb-1">Monthly Revenue</div><div className="text-lg font-extrabold text-accent-600">₹{(roiMonthly / 1000).toFixed(0)}K</div></div>
              <div className="glass p-4 rounded-xl text-center"><div className="text-xs text-dark-400 mb-1">Yearly Revenue</div><div className="text-lg font-extrabold text-primary-600">₹{(roiYearly / 100000).toFixed(1)}L</div></div>
              <div className="glass p-4 rounded-xl text-center"><div className="text-xs text-dark-400 mb-1">Break-even</div><div className="text-lg font-extrabold text-dark-700">{roiBreakeven} mo</div></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="py-24 bg-gradient-to-b from-dark-50 to-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader badge="Apply Now" title="Franchise Inquiry" description="Fill in your details and our franchise team will reach out within 24 hours." />
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8 mt-10 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-dark-500 mb-1.5 block">Full Name *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name"
                  className="w-full px-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-dark-500 mb-1.5 block">Email *</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com"
                  className="w-full px-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-dark-500 mb-1.5 block">Phone *</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="9876543210"
                  className="w-full px-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-dark-500 mb-1.5 block">City *</label>
                <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Your city"
                  className="w-full px-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-dark-500 mb-1.5 block">Investment Budget</label>
              <select value={form.investment} onChange={(e) => setForm({ ...form, investment: e.target.value })}
                className="w-full px-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm bg-white">
                <option value="">Select range</option>
                <option value="5-8 Lakh">₹5–8 Lakh (Starter)</option>
                <option value="10-15 Lakh">₹10–15 Lakh (Professional)</option>
                <option value="20-30 Lakh">₹20–30 Lakh (Enterprise)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-dark-500 mb-1.5 block">Message</label>
              <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Any questions or comments..."
                className="w-full px-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm resize-none" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 !py-4 text-sm font-bold">
              {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Submit Application <ArrowRight className="w-4 h-4" /></>}
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
