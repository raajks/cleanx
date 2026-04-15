import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shirt, Wind, Droplets, Flame, ArrowRight, CheckCircle2, Sparkles, Clock, Shield, Truck } from 'lucide-react';
import { PageBanner, SectionHeader } from '../components/ui';

const services = [
  {
    icon: Droplets, title: 'Wash & Fold', price: '₹29',
    desc: 'Everyday clothes washed with care and neatly folded. Perfect for daily wear, casuals, and basics.',
    color: 'from-primary-500 to-cyan-400',
    features: ['Premium detergent', 'Fabric softener included', 'Neatly folded & packed', 'Free pickup & delivery'],
    popular: false,
  },
  {
    icon: Shirt, title: 'Wash & Iron', price: '₹49',
    desc: 'Complete wash with professional ironing for a crisp, fresh look every time.',
    color: 'from-accent-500 to-emerald-400',
    features: ['Deep wash cleaning', 'Steam pressed finish', 'Hanger or fold option', 'Same day available'],
    popular: true,
  },
  {
    icon: Flame, title: 'Dry Cleaning', price: '₹149',
    desc: 'Specialized dry cleaning for suits, silk, designer garments with extra care.',
    color: 'from-violet-500 to-purple-400',
    features: ['Eco-friendly solvents', 'Stain treatment included', 'Premium packaging', 'Garment insurance'],
    popular: false,
  },
  {
    icon: Wind, title: 'Steam Iron', price: '₹19',
    desc: 'Quick steam ironing for a wrinkle-free, professional look instantly.',
    color: 'from-orange-500 to-amber-400',
    features: ['Professional steam press', 'Wrinkle-free finish', 'Same day delivery', 'Bulk discounts'],
    popular: false,
  },
];

const process = [
  { icon: Sparkles, title: 'Quality Inspection', desc: 'Every garment is inspected before and after cleaning.' },
  { icon: Shield, title: 'Garment Protection', desc: 'Full insurance coverage for all premium garments.' },
  { icon: Clock, title: 'On-Time Delivery', desc: '99.5% on-time delivery rate across all orders.' },
  { icon: Truck, title: 'Free Doorstep Service', desc: 'Free pickup and delivery for orders above ₹199.' },
];

export default function Services() {
  return (
    <div>
      <PageBanner title="Our Services" subtitle="From everyday wear to premium garments — professional care and attention to every detail." />

      {/* Services Grid */}
      <section className="py-24 bg-gradient-to-b from-white to-dark-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="💎 Premium Services" title="Laundry Solutions for Every Need" description="Choose from our range of professional laundry services." />
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative glass-card p-8 group"
              >
                {s.popular && (
                  <div className="absolute -top-3 right-6 px-4 py-1 bg-gradient-to-r from-primary-500 to-cyan-400 text-white text-xs font-bold rounded-full shadow-lg">
                    MOST POPULAR
                  </div>
                )}
                <div className="flex items-start gap-5">
                  <div className={`w-16 h-16 bg-gradient-to-br ${s.color} rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <s.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-dark-800">{s.title}</h3>
                      <div className="text-right">
                        <span className="text-3xl font-extrabold gradient-text">{s.price}</span>
                        <span className="text-sm text-dark-400">/piece</span>
                      </div>
                    </div>
                    <p className="text-dark-400 text-sm leading-relaxed mb-5">{s.desc}</p>
                    <ul className="space-y-2.5">
                      {s.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2.5 text-sm text-dark-500">
                          <CheckCircle2 className="w-4 h-4 text-accent-500 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link to="/book" className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-primary-500 hover:text-primary-600 group/link">
                      Book Now <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 bg-dark-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="✅ Our Process" title="Quality You Can Trust" description="Every step is designed for the best results." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card p-6 text-center group hover:shadow-2xl hover:shadow-primary-500/10 transition-all"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <p.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-bold text-dark-800 mb-2">{p.title}</h4>
                <p className="text-dark-400 text-sm">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-dark-900 to-primary-950 rounded-4xl p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary-500/15 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-extrabold text-white mb-4">Ready to Experience Premium Clean?</h3>
              <p className="text-dark-300 mb-8 text-lg">Book your first order today and get <span className="text-primary-400 font-bold">20% OFF!</span></p>
              <Link to="/book" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-cyan-400 text-white font-bold rounded-2xl shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-1 transition-all text-lg">
                Book Your Pickup <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
