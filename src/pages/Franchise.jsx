import React, { useState } from 'react';
import { TrendingUp, IndianRupee, Headphones, BookOpen, Users, BadgeCheck, Rocket, ArrowRight, CheckCircle2, User, Phone, Mail, MapPin, Building } from 'lucide-react';

const benefits = [
  { icon: IndianRupee, title: 'Low Investment', desc: 'Start your franchise with an investment as low as ₹3-5 Lakhs. Quick break-even within 6 months.', color: 'from-green-500 to-green-600' },
  { icon: TrendingUp, title: 'High ROI', desc: 'Earn 40-60% profit margins with our proven business model and repeat customer base.', color: 'from-blue-500 to-blue-600' },
  { icon: Headphones, title: 'Full Support', desc: 'Complete training, marketing support, technology platform, and operational guidance.', color: 'from-purple-500 to-purple-600' },
  { icon: BookOpen, title: 'Proven Model', desc: 'Tested and proven business model with 50+ successful franchise partners across India.', color: 'from-orange-500 to-orange-600' },
];

const steps = [
  { num: '01', title: 'Apply Online', desc: 'Fill the franchise inquiry form with your details and preferred city.' },
  { num: '02', title: 'Discussion & Agreement', desc: 'Our team contacts you for detailed discussion and franchise agreement.' },
  { num: '03', title: 'Setup & Training', desc: 'We help you set up the outlet and provide complete operational training.' },
  { num: '04', title: 'Launch & Earn', desc: 'Go live with full marketing support and start earning from day one!' },
];

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function Franchise() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', investment: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/franchise`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.errors ? data.errors.map(e => e.msg).join(', ') : data.message);
      }
    } catch {
      setError('Unable to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-60 -right-60 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-60 -left-60 w-[500px] h-[500px] bg-primary-400/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-accent-500/20 text-accent-300 rounded-full text-sm font-semibold mb-6">
            <Rocket className="w-4 h-4" /> Franchise Opportunity
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Start Your Own Laundry<br />
            Business with <span className="text-accent-400">CleanX</span>
          </h1>
          <p className="text-primary-200 text-lg max-w-3xl mx-auto mb-8">
            Join India's fastest growing laundry franchise. Low investment, high returns, and complete support to build a profitable business.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80">
            {['50+ Partners', '₹3-5L Investment', '40-60% ROI', '6 Month Payback'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-accent-400" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Why Partner With Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">Franchise Benefits</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="group bg-white rounded-2xl p-7 border border-gray-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 hover:-translate-y-1 text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${b.color} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <b.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps to Join */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-primary-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">How to Join</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">4 Simple Steps to Start</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative group">
                <div className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center h-full">
                  <div className="text-4xl font-extrabold text-primary-100 mb-3">{s.num}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Franchise Inquiry Form */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Get Started</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">Franchise Inquiry</h2>
            <p className="text-gray-500 mt-3">Fill in your details and our team will get in touch within 24 hours.</p>
          </div>

          {submitted ? (
            <div className="text-center animate-fade-up bg-accent-50 rounded-3xl p-10 border border-accent-200">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-accent-500/25">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
              <p className="text-gray-600 mb-1">Thank you, <strong>{form.name}</strong>! We've received your franchise inquiry.</p>
              <p className="text-gray-400 text-sm">Our team will contact you at <strong>{form.phone}</strong> within 24 hours.</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 sm:p-10 animate-fade-up">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="9876543210" pattern="[0-9]{10}" className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm" />
                    </div>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">City / Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="text" name="city" value={form.city} onChange={handleChange} required placeholder="Your city" className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Investment Budget</label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select name="investment" value={form.investment} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm appearance-none bg-white">
                      <option value="">Select budget range</option>
                      <option value="3-5 Lakhs">₹3 - 5 Lakhs</option>
                      <option value="5-10 Lakhs">₹5 - 10 Lakhs</option>
                      <option value="10-20 Lakhs">₹10 - 20 Lakhs</option>
                      <option value="20+ Lakhs">₹20+ Lakhs</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message (Optional)</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows="3" placeholder="Tell us about your experience or any questions..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm resize-none" />
                </div>
                <button type="submit" disabled={loading} className="w-full py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? 'Submitting...' : 'Submit Franchise Inquiry'} {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
                {error && <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl">{error}</p>}
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
