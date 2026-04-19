import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, Clock, IndianRupee, ShieldCheck, Droplets, Shirt, Star, ArrowRight, MessageCircle, ChevronRight, Zap, Package, Sparkles, Users, Award, CheckCircle2, TrendingUp, Play } from 'lucide-react';
import { SectionHeader, GlassCard, StatCard, FeatureCard } from '../components/ui';

const features = [
  { icon: Truck, title: 'Free Pickup & Delivery', desc: 'Doorstep service — we come to you, zero extra charges.', color: 'from-primary-500 to-cyan-400' },
  { icon: Clock, title: 'Express 24hr Delivery', desc: 'Get your clothes back fresh and spotless within 24 hours.', color: 'from-accent-500 to-emerald-400' },
  { icon: IndianRupee, title: 'Transparent Pricing', desc: 'No hidden fees. Premium quality at pocket-friendly rates.', color: 'from-violet-500 to-purple-400' },
  { icon: ShieldCheck, title: '100% Safe & Hygienic', desc: 'Premium detergents, strict hygiene, garment insurance.', color: 'from-orange-500 to-amber-400' },
];

const steps = [
  { num: '01', icon: Package, title: 'Schedule Pickup', desc: 'Book online or via WhatsApp. Pick your preferred slot.', gradient: 'from-primary-500 to-cyan-400' },
  { num: '02', icon: Droplets, title: 'We Clean & Care', desc: 'Expert cleaning with premium detergents & careful handling.', gradient: 'from-violet-500 to-purple-400' },
  { num: '03', icon: Truck, title: 'Delivered Fresh', desc: 'Neatly packed & delivered to your door right on time.', gradient: 'from-accent-500 to-emerald-400' },
];

const stats = [
  { icon: Users, value: '10,000+', label: 'Happy Customers' },
  { icon: Shirt, value: '50,000+', label: 'Orders Delivered' },
  { icon: Award, value: '4.9★', label: 'Customer Rating' },
  { icon: TrendingUp, value: '15+', label: 'Cities Covered' },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'Working Professional', text: 'CleanX has been a lifesaver! My clothes come back perfectly ironed and smelling amazing. The app makes booking so easy.', rating: 5, avatar: 'PS' },
  { name: 'Rahul Verma', role: 'College Student', text: 'Affordable prices and great quality. The pickup and delivery feature is super convenient for my hostel life. Highly recommended!', rating: 5, avatar: 'RV' },
  { name: 'Anita Joshi', role: 'Homemaker', text: 'I love how they handle delicate fabrics. My silk sarees always come back looking brand new. Trustworthy service!', rating: 5, avatar: 'AJ' },
];

const fadeInUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-dark-950 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-primary-950" />
          <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-cyan-500/8 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-sm text-primary-300 rounded-full text-sm font-semibold mb-8 border border-white/10">
                <Zap className="w-4 h-4 text-primary-400" />
                #1 Laundry Service in Ghaziabad
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-8">
                Smart Laundry.{' '}
                <span className="bg-gradient-to-r from-primary-400 via-cyan-400 to-primary-300 bg-clip-text text-transparent">
                  Delivered Fresh.
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-dark-300 mb-10 max-w-lg leading-relaxed">
                Premium laundry & dry cleaning at your doorstep. Free pickup, express delivery, and spotless results — guaranteed.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4">
                <Link to="/book" className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-cyan-400 text-white font-bold rounded-2xl shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-1 transition-all text-lg">
                  Book Pickup <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/services" className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-lg">
                  <Play className="w-5 h-5" /> How It Works
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="flex items-center gap-6 mt-12">
                <div className="flex -space-x-3">
                  {['PS', 'RV', 'AJ', 'MK'].map((initials, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-cyan-400 border-2 border-dark-900 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                      {initials}
                    </div>
                  ))}
                </div>
                <div className="text-dark-400 text-sm">
                  <div className="flex items-center gap-1 text-yellow-400 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                    <span className="text-white font-semibold ml-1">4.9</span>
                  </div>
                  <span><strong className="text-white">10,000+</strong> Happy Customers</span>
                </div>
              </motion.div>
            </div>

            {/* Hero Visual */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block">
              <div className="relative">
                {/* Main card */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-2xl">
                  <div className="text-center text-white space-y-6">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-500 to-cyan-400 rounded-3xl flex items-center justify-center shadow-xl shadow-primary-500/30 animate-pulse-glow">
                      <Shirt className="w-12 h-12" />
                    </div>
                    <h3 className="text-3xl font-bold">Fresh clothes, zero effort</h3>
                    <p className="text-dark-300">Starting at just <span className="text-primary-400 font-bold text-xl">₹19</span>/piece</p>
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      {[['10K+', 'Customers'], ['24hr', 'Delivery'], ['4.9★', 'Rating']].map(([val, label]) => (
                        <div key={label} className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/5">
                          <div className="text-2xl font-extrabold gradient-text">{val}</div>
                          <div className="text-xs text-dark-400 mt-1">{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Floating cards */}
                <motion.div animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="absolute -top-6 -right-6 bg-gradient-to-r from-accent-500 to-emerald-400 text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Free Pickup!
                </motion.div>
                <motion.div animate={{ y: [5, -5, 5] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -left-6 bg-white/10 backdrop-blur-xl text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-xl border border-white/10 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary-400" /> Express Delivery
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Stats Counter */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <StatCard key={i} icon={s.icon} value={s.value} label={s.label} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gradient-to-b from-white to-dark-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="✨ Why Choose Us" title="What Makes Us Different" description="We combine technology with quality to deliver the best laundry experience in Ghaziabad." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <FeatureCard key={i} icon={f.icon} title={f.title} description={f.desc} color={f.color} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-dark-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader badge="🔄 How It Works" title="3 Easy Steps to Fresh Clothes" description="Simple, fast, and convenient — your laundry done right." />
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative group"
              >
                <div className="glass-card p-8 text-center h-full hover:shadow-2xl hover:shadow-primary-500/10 transition-all">
                  <div className="text-6xl font-extrabold bg-gradient-to-b from-dark-200 to-transparent bg-clip-text text-transparent mb-4">{s.num}</div>
                  <div className={`w-18 h-18 mx-auto bg-gradient-to-br ${s.gradient} rounded-3xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <s.icon className="w-9 h-9 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-dark-800 mb-3">{s.title}</h3>
                  <p className="text-dark-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 z-10 w-8 h-8 items-center justify-center">
                    <ChevronRight className="w-6 h-6 text-primary-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="💬 Testimonials" title="Loved by Thousands" description="Real reviews from real customers across Ghaziabad." />
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <GlassCard key={i} delay={i * 0.15} className="p-8">
                <div className="flex gap-1 mb-5">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-dark-500 text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-dark-100">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-lg">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-dark-800">{t.name}</div>
                    <div className="text-xs text-dark-400">{t.role}</div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-dark-900 via-dark-900 to-primary-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2 {...fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
                Ready to Experience{' '}
                <span className="gradient-text">Premium Laundry?</span>
              </motion.h2>
              <motion.p {...fadeInUp} className="text-dark-300 text-lg mb-10 leading-relaxed">
                Join 10,000+ happy customers across Ghaziabad. Book your first pickup today and get <span className="text-primary-400 font-bold">20% OFF</span> on your first order!
              </motion.p>
              <motion.div {...fadeInUp} className="flex flex-wrap gap-4">
                <Link to="/book" className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-cyan-400 text-white font-bold rounded-2xl shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-1 transition-all">
                  Book Your Pickup <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="https://wa.me/919876543210?text=Hi%20CleanX!" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold rounded-2xl shadow-xl hover:-translate-y-1 transition-all">
                  <MessageCircle className="w-5 h-5" /> WhatsApp Us
                </a>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10">
              <div className="text-center text-white">
                <Sparkles className="w-16 h-16 mx-auto mb-5 text-primary-400" />
                <h3 className="text-2xl font-bold mb-3">Download Our App</h3>
                <p className="text-dark-400 mb-8 text-sm">Book, track, and manage your orders with ease.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="/CleanX.apk" download="CleanX.apk" className="px-6 py-3.5 bg-gradient-to-r from-primary-500 to-cyan-400 rounded-xl text-sm font-bold border border-white/10 hover:shadow-primary-500/50 hover:-translate-y-1 transition-all cursor-pointer text-white no-underline">
                    📱 Download App (Android)
                  </a>
                  <div className="px-6 py-3.5 bg-white/5 rounded-xl text-sm font-medium border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                    🍎 App Store — Coming Soon
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
