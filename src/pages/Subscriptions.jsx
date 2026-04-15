import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, CheckCircle2, Star, Zap, Shield, ArrowRight, Sparkles, Gift, Repeat } from 'lucide-react';
import { PageBanner, SectionHeader } from '../components/ui';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const plans = [
  {
    name: 'Basic',
    price: { monthly: 499, quarterly: 1299, yearly: 4499 },
    icon: Zap,
    color: 'from-primary-500 to-cyan-400',
    features: ['Up to 20 garments/month', 'Free pickup & delivery', '48-hour turnaround', 'Basic garment care', 'Order tracking', 'Email support'],
    cta: 'Start Basic',
  },
  {
    name: 'Standard',
    price: { monthly: 999, quarterly: 2699, yearly: 8999 },
    icon: Star,
    color: 'from-cyan-500 to-accent-400',
    popular: true,
    features: ['Up to 50 garments/month', 'Free pickup & delivery', '24-hour express turnaround', 'Premium stain treatment', 'Priority scheduling', 'Fabric softener upgrade', 'WhatsApp updates', 'Phone support'],
    cta: 'Start Standard',
  },
  {
    name: 'Premium',
    price: { monthly: 1999, quarterly: 5499, yearly: 17999 },
    icon: Crown,
    color: 'from-accent-500 to-primary-400',
    features: ['Unlimited garments/month', 'Free pickup & delivery', 'Same-day turnaround', 'Luxury dry cleaning included', 'Dedicated account manager', 'Hanger delivery', 'Real-time GPS tracking', 'Priority chat + phone support', 'Monthly garment inspection'],
    cta: 'Start Premium',
  },
];

const billingOptions = [
  { key: 'monthly', label: 'Monthly' },
  { key: 'quarterly', label: 'Quarterly', save: '10%' },
  { key: 'yearly', label: 'Yearly', save: '25%' },
];

const benefits = [
  { icon: Repeat, title: 'Auto-Scheduled Pickups', desc: 'Set your weekly pickup day and relax. We handle the rest.' },
  { icon: Gift, title: 'Loyalty Rewards', desc: 'Earn CleanX coins on every order. Redeem for free services.' },
  { icon: Shield, title: 'Garment Protection', desc: 'Full insurance on premium fabrics during the cleaning process.' },
  { icon: Sparkles, title: 'Exclusive Perks', desc: 'Early access to new services, seasonal discounts, and VIP support.' },
];

export default function Subscriptions() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div>
      <PageBanner title="Subscription Plans" subtitle="Save more with monthly laundry plans. Cancel anytime." />

      {/* Billing Toggle */}
      <section className="py-24 bg-gradient-to-b from-white to-dark-50">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader badge="Choose Your Plan" title="Premium Laundry Subscriptions" description="Flexible plans for individuals, couples, and families." />

          <div className="flex justify-center mt-8 mb-12">
            <div className="inline-flex bg-dark-100 rounded-2xl p-1.5">
              {billingOptions.map((b) => (
                <button key={b.key} onClick={() => setBilling(b.key)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all relative ${billing === b.key ? 'bg-white text-dark-800 shadow-md' : 'text-dark-500 hover:text-dark-700'}`}>
                  {b.label}
                  {b.save && <span className="ml-1.5 text-[10px] text-accent-600 font-bold">Save {b.save}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Plan Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative">
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1 bg-gradient-to-r from-cyan-500 to-accent-400 text-white text-xs font-bold rounded-full shadow-lg">BEST VALUE</div>}
                <div className={`glass-card p-8 h-full flex flex-col ${plan.popular ? 'ring-2 ring-cyan-400/50 shadow-xl scale-105' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                      <plan.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-extrabold text-dark-800">{plan.name}</h3>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div key={billing} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="mb-6">
                      <span className="text-4xl font-extrabold gradient-text">₹{plan.price[billing]}</span>
                      <span className="text-sm text-dark-400 font-medium ml-1">/{billing === 'monthly' ? 'mo' : billing === 'quarterly' ? 'qtr' : 'yr'}</span>
                    </motion.div>
                  </AnimatePresence>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.features.map((f) => <li key={f} className="flex items-start gap-2 text-sm text-dark-600"><CheckCircle2 className="w-4 h-4 text-accent-500 mt-0.5 flex-shrink-0" /> {f}</li>)}
                  </ul>
                  <button onClick={() => toast.success(`${plan.name} plan selected! Redirecting to checkout...`)}
                    className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${plan.popular ? 'btn-primary' : 'bg-dark-100 text-dark-700 hover:bg-dark-200'}`}>
                    {plan.cta} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader badge="Member Benefits" title="Why Subscribe?" description="Perks you get as a CleanX subscriber." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center group hover:shadow-xl transition-all">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-primary-50 group-hover:bg-gradient-to-br group-hover:from-primary-500 group-hover:to-cyan-400 flex items-center justify-center mb-4 transition-all">
                  <b.icon className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-bold text-dark-800 mb-1 text-sm">{b.title}</h4>
                <p className="text-xs text-dark-400 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-dark-900 via-dark-950 to-primary-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-extrabold text-white mb-3">Not sure which plan is right?</h3>
          <p className="text-dark-400 text-sm mb-6">Talk to our team — we'll help you pick the perfect plan for your lifestyle.</p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">Contact Us <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>
    </div>
  );
}
