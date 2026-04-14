import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Clock, IndianRupee, ShieldCheck, Droplets, Shirt, Star, ArrowRight, MessageCircle, ChevronRight, Zap, Package, Sparkles } from 'lucide-react';

const features = [
  { icon: Truck, title: 'Free Pickup & Delivery', desc: 'We pick up and deliver at your doorstep — completely free.', color: 'from-blue-500 to-blue-600' },
  { icon: Clock, title: 'Fast 24hr Delivery', desc: 'Get your clothes back fresh and clean within 24 hours.', color: 'from-accent-500 to-accent-600' },
  { icon: IndianRupee, title: 'Affordable Pricing', desc: 'Premium quality service at prices that won\'t burn your pocket.', color: 'from-purple-500 to-purple-600' },
  { icon: ShieldCheck, title: '100% Safe & Hygienic', desc: 'We use premium detergents and maintain strict hygiene standards.', color: 'from-orange-500 to-orange-600' },
];

const steps = [
  { num: '01', icon: Package, title: 'Schedule Pickup', desc: 'Book your order online or via WhatsApp. Choose your preferred time slot.' },
  { num: '02', icon: Droplets, title: 'We Clean & Care', desc: 'Your clothes are washed, ironed, and packed with premium care.' },
  { num: '03', icon: Truck, title: 'Delivered Fresh', desc: 'Get your fresh clothes delivered back at your doorstep on time.' },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'Working Professional', text: 'CleanX has been a lifesaver! My clothes come back perfectly ironed and smelling amazing. Highly recommend!', rating: 5 },
  { name: 'Rahul Verma', role: 'College Student', text: 'Affordable prices and great quality. The pickup and delivery feature is super convenient for my hostel life.', rating: 5 },
  { name: 'Anita Joshi', role: 'Homemaker', text: 'I love how they handle delicate fabrics. My silk sarees always come back looking brand new!', rating: 5 },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-primary-50 via-white to-accent-50 pt-16">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-100/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                #1 Laundry Service in Rajasthan
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Smart Laundry.{' '}
                <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                  Delivered Fresh.
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
                Premium laundry & dry cleaning at your doorstep. Free pickup, express delivery, and spotless results — every single time.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/book" className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all">
                  Book Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/franchise" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-primary-600 font-semibold rounded-2xl border-2 border-primary-200 hover:border-primary-400 hover:bg-primary-50 transition-all">
                  Get Franchise
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-white flex items-center justify-content-center text-white text-xs font-bold flex items-center justify-center">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <span><strong className="text-gray-700">5000+</strong> Happy Customers</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-8 lg:p-12 shadow-2xl shadow-primary-500/20">
                <div className="text-center text-white space-y-6">
                  <Shirt className="w-20 h-20 mx-auto opacity-90" />
                  <h3 className="text-2xl font-bold">Fresh clothes, zero effort</h3>
                  <p className="text-primary-100">Starting at just ₹29/piece</p>
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    {[['5000+', 'Customers'], ['24hr', 'Delivery'], ['4.9★', 'Rating']].map(([val, label]) => (
                      <div key={label} className="bg-white/10 backdrop-blur rounded-xl p-3">
                        <div className="text-xl font-bold">{val}</div>
                        <div className="text-xs text-primary-200">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-accent-400 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg animate-bounce">
                  Free Pickup!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">What Makes Us Different</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">We combine technology with quality to deliver the best laundry experience.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 hover:-translate-y-1">
                <div className={`w-14 h-14 bg-gradient-to-br ${f.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-primary-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">3 Easy Steps to Fresh Clothes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="relative group">
                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="text-5xl font-extrabold text-primary-100 mb-4">{s.num}</div>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary-500/25 group-hover:scale-110 transition-transform">
                    <s.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
                {/* Connector arrow */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 z-10">
                    <ChevronRight className="w-8 h-8 text-primary-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">What Our Customers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex gap-1 mb-4">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp / App Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Book on WhatsApp in Seconds!</h2>
              <p className="text-primary-100 text-lg mb-8 leading-relaxed">
                Don't want to fill forms? Just send us a WhatsApp message with your address, and we'll take care of the rest. It's that simple!
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://wa.me/919876543210?text=Hi%20RJ%20CleanX!%20I%20want%20to%20book%20a%20laundry%20pickup." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent-500 text-white font-semibold rounded-2xl hover:bg-accent-600 transition-all shadow-xl hover:-translate-y-0.5">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </a>
                <Link to="/book" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
                  Book Online
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/10">
              <div className="text-center text-white">
                <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <h3 className="text-2xl font-bold mb-2">Download Our App</h3>
                <p className="text-primary-200 mb-6 text-sm">Book, track, and manage your orders with ease</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <div className="px-6 py-3 bg-white/10 rounded-xl text-sm font-medium border border-white/20">
                    📱 Google Play — Coming Soon
                  </div>
                  <div className="px-6 py-3 bg-white/10 rounded-xl text-sm font-medium border border-white/20">
                    🍎 App Store — Coming Soon
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
