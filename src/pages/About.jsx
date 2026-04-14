import React from 'react';
import { Target, Eye, Heart, Users, Award, Sparkles, Shirt, Leaf } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Customer First', desc: 'Every decision we make starts with our customers.', color: 'from-red-500 to-red-600' },
  { icon: Award, title: 'Quality Promise', desc: 'We never compromise on the quality of our service.', color: 'from-blue-500 to-blue-600' },
  { icon: Leaf, title: 'Eco Friendly', desc: 'Sustainable practices and eco-friendly detergents.', color: 'from-green-500 to-green-600' },
  { icon: Users, title: 'Community Impact', desc: 'Creating employment and supporting local communities.', color: 'from-purple-500 to-purple-600' },
];

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-white/90 rounded-full text-sm font-medium mb-4">About Us</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Our Story</h1>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto">How a simple idea of making laundry hassle-free became Rajasthan's most trusted laundry brand.</p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Our Journey</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-6">From a Small Idea to a Big Brand</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  CleanX was born in 2024 in the heart of Jaipur, Rajasthan. We noticed that people were spending hours every week on laundry — time that could be better spent with family, at work, or simply relaxing.
                </p>
                <p>
                  What started as a small neighbourhood laundry service has now grown into one of Rajasthan's most trusted laundry brands, serving 5000+ happy customers across multiple cities.
                </p>
                <p>
                  Our mission is simple — to make laundry effortless for every Indian household while maintaining the highest quality standards and eco-friendly practices.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-8">
                {[['5000+', 'Happy Customers'], ['50+', 'Franchise Partners'], ['10+', 'Cities Served']].map(([val, label]) => (
                  <div key={label}>
                    <div className="text-2xl font-bold text-primary-600">{val}</div>
                    <div className="text-sm text-gray-400">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-10 lg:p-14 shadow-2xl shadow-primary-500/20 text-white text-center">
                <Shirt className="w-20 h-20 mx-auto mb-6 opacity-90" />
                <h3 className="text-2xl font-bold mb-3">Clean Clothes, Happy Lives</h3>
                <p className="text-primary-100 leading-relaxed">We believe everyone deserves fresh, clean clothes without the hassle. That's the CleanX promise.</p>
              </div>
              <div className="absolute -top-4 -right-4 bg-accent-400 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg">
                Since 2024
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-primary-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary-500/25">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To revolutionize the laundry industry in India by providing affordable, high-quality, and technology-driven laundry services that save time and effort for millions of households and businesses.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-accent-500/25">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become India's largest and most loved laundry franchise network by 2030, operating in 100+ cities with 1000+ franchise partners, while maintaining our commitment to quality and sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">What We Stand For</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="group bg-white rounded-2xl p-7 border border-gray-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 hover:-translate-y-1 text-center">
                <div className={`w-14 h-14 bg-gradient-to-br ${v.color} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <v.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Sparkles className="w-12 h-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Experience the Difference?</h2>
          <p className="text-primary-100 mb-8">Join thousands of happy customers who trust CleanX with their laundry.</p>
          <a href="/book" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-2xl hover:bg-gray-50 transition-all shadow-xl hover:-translate-y-0.5">
            Book Your First Order
          </a>
        </div>
      </section>
    </div>
  );
}
