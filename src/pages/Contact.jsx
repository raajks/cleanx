import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, ArrowRight } from 'lucide-react';
import { PageBanner, SectionHeader } from '../components/ui';
import toast from 'react-hot-toast';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210', color: 'from-primary-500 to-cyan-400' },
  { icon: Mail, label: 'Email', value: 'support@cleanx.in', href: 'mailto:support@cleanx.in', color: 'from-cyan-500 to-accent-400' },
  { icon: MapPin, label: 'Head Office', value: 'Ghaziabad, Uttar Pradesh, India', href: '#', color: 'from-accent-500 to-primary-400' },
  { icon: Clock, label: 'Working Hours', value: 'Mon–Sat: 8AM – 9PM', href: '#', color: 'from-primary-400 to-cyan-500' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error('Please fill required fields'); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) { toast.success('Message sent! We\'ll get back to you soon.'); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }
      else toast.error(data.message || 'Something went wrong');
    } catch { toast.error('Server error. Try again.'); }
    setLoading(false);
  };

  return (
    <div>
      <PageBanner title="Contact Us" subtitle="Have a question or need help? We'd love to hear from you." />

      {/* Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((c, i) => (
            <motion.a key={c.label} href={c.href} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card p-6 text-center group hover:shadow-xl transition-all cursor-pointer">
              <div className={`w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <c.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-xs text-dark-400 font-medium mb-1">{c.label}</div>
              <div className="text-sm font-bold text-dark-700">{c.value}</div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-24 bg-gradient-to-b from-white to-dark-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
              <SectionHeader badge="Get in Touch" title="Send Us a Message" light />
              <form onSubmit={handleSubmit} className="glass-card p-8 mt-8 space-y-5">
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
                    <label className="text-xs font-semibold text-dark-500 mb-1.5 block">Phone</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="9876543210"
                      className="w-full px-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-dark-500 mb-1.5 block">Subject</label>
                    <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm bg-white">
                      <option value="">Select topic</option>
                      <option value="Order Issue">Order Issue</option>
                      <option value="Franchise">Franchise Inquiry</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-dark-500 mb-1.5 block">Message *</label>
                  <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us how we can help..."
                    className="w-full px-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm resize-none" />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 !py-4 text-sm font-bold">
                  {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Send Message <Send className="w-4 h-4" /></>}
                </button>
              </form>
            </motion.div>

            {/* Side Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-6">
              <div className="glass-card p-6 bg-gradient-to-br from-dark-900 to-primary-900 text-white">
                <h4 className="font-bold mb-2">Quick Support</h4>
                <p className="text-xs text-dark-400 mb-4">Need immediate help? Reach us on WhatsApp for instant support.</p>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-colors w-full justify-center">
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </a>
              </div>

              <div className="glass-card p-6">
                <h4 className="font-bold text-dark-800 mb-3">Frequently Asked</h4>
                <div className="space-y-3">
                  {[
                    { q: 'What are your working hours?', a: 'Mon–Sat, 8 AM to 9 PM. Pickups available on Sundays too.' },
                    { q: 'How do I track my order?', a: 'Use the Order ID from your confirmation SMS on our Track Order page.' },
                    { q: 'Do you handle delicate fabrics?', a: 'Yes! We offer premium dry-cleaning for silk, wool, and designer wear.' },
                  ].map((faq) => (
                    <div key={faq.q} className="pb-3 border-b border-dark-100 last:border-0 last:pb-0">
                      <div className="text-xs font-semibold text-dark-700">{faq.q}</div>
                      <div className="text-[11px] text-dark-400 mt-0.5">{faq.a}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="glass-card overflow-hidden h-48">
                <iframe
                  title="CleanX Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112173.07237124025!2d77.3902085!3d28.6692987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1bb04c2bbe7%3A0x7efb961723eb17a!2sGhaziabad%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
