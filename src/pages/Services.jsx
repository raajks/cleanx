import React from 'react';
import { Link } from 'react-router-dom';
import { Shirt, Wind, Droplets, Flame, ArrowRight, CheckCircle2 } from 'lucide-react';

const services = [
  {
    icon: Droplets,
    title: 'Wash & Fold',
    desc: 'Everyday clothes washed with care and neatly folded. Perfect for daily wear, casuals, and basics.',
    price: '₹29',
    color: 'from-blue-500 to-blue-600',
    features: ['Premium detergent', 'Fabric softener included', 'Neatly folded & packed'],
  },
  {
    icon: Shirt,
    title: 'Wash & Iron',
    desc: 'Complete wash with professional ironing for a crisp, fresh look every time.',
    price: '₹49',
    color: 'from-accent-500 to-accent-600',
    features: ['Deep wash cleaning', 'Steam pressed finish', 'Hanger or fold option'],
  },
  {
    icon: Flame,
    title: 'Dry Cleaning',
    desc: 'Specialized dry cleaning for suits, silk, wool, and designer garments with extra care.',
    price: '₹149',
    color: 'from-purple-500 to-purple-600',
    features: ['Eco-friendly solvents', 'Stain treatment included', 'Premium packaging'],
  },
  {
    icon: Wind,
    title: 'Steam Iron',
    desc: 'Quick steam ironing service to give your clothes a wrinkle-free professional look.',
    price: '₹19',
    color: 'from-orange-500 to-orange-600',
    features: ['Professional steam press', 'Wrinkle-free finish', 'Same day delivery'],
  },
];

export default function Services() {
  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-white/90 rounded-full text-sm font-medium mb-4">Our Services</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Premium Laundry Services</h1>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto">From everyday wear to premium garments — we handle everything with professional care and attention to detail.</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <div key={i} className="group bg-white rounded-3xl p-8 border border-gray-100 hover:border-primary-200 hover:shadow-2xl hover:shadow-primary-500/5 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-5">
                  <div className={`w-16 h-16 bg-gradient-to-br ${s.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <s.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{s.title}</h3>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-primary-600">{s.price}</span>
                        <span className="text-sm text-gray-400">/piece</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                    <ul className="space-y-2">
                      {s.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-accent-500 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-3xl p-10 border border-primary-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to get started?</h3>
              <p className="text-gray-500 mb-6">Book your first order today and get 20% off!</p>
              <Link to="/book" className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all">
                Book Now <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
