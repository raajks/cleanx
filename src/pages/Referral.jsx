import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, Users, IndianRupee, Share2, CheckCircle2, ArrowRight, Sparkles, Trophy } from 'lucide-react';
import { PageBanner, SectionHeader } from '../components/ui';
import toast from 'react-hot-toast';

const howItWorks = [
  { step: '01', icon: Share2, title: 'Share Your Code', desc: 'Copy your unique referral code and share it with friends, family, or colleagues.' },
  { step: '02', icon: Users, title: 'Friend Signs Up', desc: 'When they create an account and place their first order using your code.' },
  { step: '03', icon: Gift, title: 'Both Get Rewarded', desc: 'You get ₹100 credit and your friend gets ₹50 off their first order!' },
];

const rewards = [
  { count: '5 referrals', reward: '₹500 Credit', icon: '🎁' },
  { count: '10 referrals', reward: 'Free Monthly Plan', icon: '⭐' },
  { count: '25 referrals', reward: 'Premium Annual Plan', icon: '👑' },
  { count: '50 referrals', reward: 'CleanX Brand Ambassador', icon: '🏆' },
];

export default function Referral() {
  const [referralCode] = useState('CLEANX-' + Math.random().toString(36).substring(2, 8).toUpperCase());
  const referralLink = `https://cleanx.in/signup?ref=${referralCode}`;

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success('Referral code copied!');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral link copied!');
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({ title: 'Join CleanX', text: `Use my referral code ${referralCode} to get ₹50 off your first order on CleanX!`, url: referralLink });
    } else { copyLink(); }
  };

  return (
    <div>
      <PageBanner title="Refer & Earn" subtitle="Invite friends to CleanX and earn rewards for every successful referral." />

      {/* Referral Card */}
      <section className="py-24 bg-gradient-to-b from-white to-dark-50">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary-500/10 to-transparent rounded-bl-full" />
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center mb-5">
              <Gift className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-dark-800 mb-2">Your Referral Code</h2>
            <p className="text-sm text-dark-400 mb-6">Share this code and earn ₹100 for every friend who orders!</p>

            {/* Code Display */}
            <div className="bg-dark-50 rounded-2xl p-5 mb-4 flex items-center justify-between gap-4 max-w-sm mx-auto">
              <span className="text-2xl font-extrabold tracking-widest gradient-text">{referralCode}</span>
              <button onClick={copyCode} className="p-2.5 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow group">
                <Copy className="w-5 h-5 text-dark-400 group-hover:text-primary-500 transition-colors" />
              </button>
            </div>

            {/* Link */}
            <div className="bg-dark-50 rounded-xl p-3 mb-6 flex items-center gap-3 max-w-sm mx-auto text-left">
              <input readOnly value={referralLink} className="flex-1 bg-transparent text-xs text-dark-500 outline-none truncate" />
              <button onClick={copyLink} className="text-xs text-primary-500 font-semibold hover:underline whitespace-nowrap">Copy Link</button>
            </div>

            <div className="flex gap-3 justify-center">
              <button onClick={shareLink} className="btn-primary flex items-center gap-2 !px-6">
                <Share2 className="w-4 h-4" /> Share Now
              </button>
              <a href={`https://wa.me/?text=Hey! Use my referral code ${referralCode} to get ₹50 off your first LaundryX order! ${referralLink}`} target="_blank" rel="noopener noreferrer"
                className="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader badge="How It Works" title="Earn in 3 Simple Steps" />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {howItWorks.map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="glass-card p-8 text-center relative">
                <div className="absolute top-4 right-4 text-5xl font-extrabold text-dark-100">{s.step}</div>
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center mb-5">
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-dark-800 mb-2">{s.title}</h4>
                <p className="text-sm text-dark-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestone Rewards */}
      <section className="py-24 bg-gradient-to-b from-dark-50 to-white">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader badge="Milestone Rewards" title="The More You Refer, The More You Earn" description="Unlock bigger rewards as you reach referral milestones." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {rewards.map((r, i) => (
              <motion.div key={r.count} initial={{ opacity: 0, scale: .9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center hover:shadow-xl transition-all group">
                <div className="text-3xl mb-3">{r.icon}</div>
                <div className="text-xs text-dark-400 font-medium mb-1">{r.count}</div>
                <div className="text-lg font-extrabold text-dark-800 group-hover:gradient-text transition-all">{r.reward}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Leaderboard Placeholder */}
      <section className="py-16 bg-gradient-to-r from-dark-900 via-dark-950 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,.07)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <Trophy className="w-10 h-10 text-primary-400 mx-auto mb-4" />
          <h3 className="text-2xl font-extrabold text-white mb-2">Referral Leaderboard Coming Soon</h3>
          <p className="text-dark-400 text-sm mb-6">Top referrers will be featured on our leaderboard with exclusive rewards.</p>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {[{ label: 'Your Referrals', value: '0' }, { label: 'Credits Earned', value: '₹0' }, { label: 'Rank', value: '--' }].map((s) => (
              <div key={s.label} className="bg-white/5 backdrop-blur rounded-xl p-4">
                <div className="text-xl font-extrabold text-white">{s.value}</div>
                <div className="text-[10px] text-dark-400 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
