import React from 'react';
import { motion } from 'framer-motion';
import { Target, Heart, Sparkles, Users, Award, ShieldCheck, Droplets, Leaf } from 'lucide-react';
import { PageBanner, GlassCard, SectionHeader, StatCard } from '../components/ui';

const values = [
  { icon: Heart, title: 'Customer First', desc: 'Every decision we make starts with our customers\' needs in mind.' },
  { icon: ShieldCheck, title: 'Quality Promise', desc: 'Premium cleaning with eco-friendly detergents and fabric-safe processes.' },
  { icon: Leaf, title: 'Eco Friendly', desc: 'Biodegradable products and water-recycling systems across all centres.' },
  { icon: Award, title: 'Innovation', desc: 'Using AI-powered sorting, RFID tracking, and smart logistics.' },
];

const milestones = [
  { year: '2023', title: 'Founded', desc: 'CleanX launched in Ghaziabad with a vision to disrupt the laundry industry.' },
  { year: '2023', title: 'First 1,000 Orders', desc: 'Rapid adoption through quality service and word-of-mouth referrals.' },
  { year: '2024', title: 'Franchise Launch', desc: 'Opened franchise applications and expanded to 5 cities.' },
  { year: '2025', title: '10K+ Customers', desc: 'Crossed 10,000 active customers with 50,000+ orders delivered.' },
  { year: '2026', title: 'SaaS Platform', desc: 'Launched B2B white-label platform for laundry businesses nationwide.' },
];

const team = [
  { name: 'Raj Kumar', role: 'Founder & CEO', img: 'https://ui-avatars.com/api/?name=Raj+Kumar&background=0ea5e9&color=fff&bold=true&size=200' },
  { name: 'Priya Sharma', role: 'Head of Operations', img: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=06b6d4&color=fff&bold=true&size=200' },
  { name: 'Arjun Patel', role: 'CTO', img: 'https://ui-avatars.com/api/?name=Arjun+Patel&background=22c55e&color=fff&bold=true&size=200' },
];

export default function About() {
  return (
    <div>
      <PageBanner title="About CleanX" subtitle="India's fastest-growing premium laundry & dry-cleaning platform." />

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center mb-5">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-extrabold text-dark-800 mb-3">Our Mission</h3>
            <p className="text-dark-500 text-sm leading-relaxed">
              To make professional laundry care accessible, affordable, and eco-friendly for every Indian household — powered by technology and delivered with love.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-accent-400 flex items-center justify-center mb-5">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-extrabold text-dark-800 mb-3">Our Vision</h3>
            <p className="text-dark-500 text-sm leading-relaxed">
              To be India's #1 tech-enabled laundry brand — present in 100+ cities with a franchise network that empowers local entrepreneurs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-dark-900 via-dark-950 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,.07)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, value: '10,000+', label: 'Happy Customers' },
              { icon: Droplets, value: '50,000+', label: 'Orders Delivered' },
              { icon: Award, value: '4.9★', label: 'Average Rating' },
              { icon: Target, value: '15+', label: 'Cities' },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center text-white">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mb-3"><s.icon className="w-5 h-5 text-primary-300" /></div>
                <div className="text-3xl font-extrabold">{s.value}</div>
                <div className="text-xs text-dark-400 font-medium mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gradient-to-b from-white to-dark-50">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader badge="Core Values" title="What We Stand For" description="Principles that drive everything we do at CleanX." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center group hover:shadow-xl transition-all">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-primary-50 group-hover:bg-gradient-to-br group-hover:from-primary-500 group-hover:to-cyan-400 flex items-center justify-center mb-4 transition-all">
                  <v.icon className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-bold text-dark-800 mb-1">{v.title}</h4>
                <p className="text-xs text-dark-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader badge="Our Journey" title="Milestones" />
          <div className="mt-12 space-y-0">
            {milestones.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-extrabold text-white">{m.year}</span>
                  </div>
                  {i < milestones.length - 1 && <div className="w-0.5 h-14 bg-gradient-to-b from-primary-300 to-dark-200 my-1" />}
                </div>
                <div className="pb-8">
                  <div className="font-bold text-dark-800 text-sm">{m.title}</div>
                  <div className="text-xs text-dark-400 mt-0.5">{m.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-gradient-to-b from-dark-50 to-white">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader badge="Our Team" title="Meet The People Behind CleanX" />
          <div className="grid sm:grid-cols-3 gap-8 mt-12">
            {team.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="glass-card p-6 text-center group hover:shadow-xl transition-all">
                <img src={t.img} alt={t.name} className="w-20 h-20 rounded-2xl mx-auto mb-4 object-cover ring-2 ring-primary-100 group-hover:ring-primary-400 transition-all" />
                <h4 className="font-bold text-dark-800">{t.name}</h4>
                <p className="text-xs text-dark-400 font-medium">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
