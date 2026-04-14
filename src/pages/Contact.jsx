import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageCircle, User } from 'lucide-react';

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '+91 98765 43210', link: 'tel:+919876543210', color: 'from-blue-500 to-blue-600' },
  { icon: Mail, label: 'Email', value: 'hello@cleanx.com', link: 'mailto:hello@cleanx.com', color: 'from-accent-500 to-accent-600' },
  { icon: MapPin, label: 'Address', value: '123 Clean Street, Malviya Nagar, Jaipur, Rajasthan 302017', link: '#map', color: 'from-purple-500 to-purple-600' },
  { icon: Clock, label: 'Working Hours', value: 'Mon - Sat: 8:00 AM - 9:00 PM, Sun: 9:00 AM - 6:00 PM', link: null, color: 'from-orange-500 to-orange-600' },
];

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/contact`, {
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
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-white/90 rounded-full text-sm font-medium mb-4">Contact Us</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Get in Touch</h1>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto">Have questions? We'd love to hear from you. Reach out and we'll respond as soon as possible.</p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 hover:-translate-y-1 text-center">
                <div className={`w-14 h-14 bg-gradient-to-br ${c.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <c.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{c.label}</h3>
                {c.link ? (
                  <a href={c.link} className="text-sm text-primary-600 hover:text-primary-700 transition-colors">{c.value}</a>
                ) : (
                  <p className="text-sm text-gray-500">{c.value}</p>
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div>
              {submitted ? (
                <div className="bg-accent-50 rounded-3xl p-10 border border-accent-200 text-center animate-fade-up h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-accent-500/25">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 sm:p-10 animate-fade-up">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm" />
                        </div>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="9876543210" pattern="[0-9]{10}" className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                        <div className="relative">
                          <MessageCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input type="text" name="subject" value={form.subject} onChange={handleChange} required placeholder="How can we help?" className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                      <textarea name="message" value={form.message} onChange={handleChange} required rows="5" placeholder="Type your message here..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm resize-none" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                      <Send className="w-4 h-4" /> {loading ? 'Sending...' : 'Send Message'}
                    </button>
                    {error && <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl">{error}</p>}
                  </form>
                </div>
              )}
            </div>

            {/* Google Map Placeholder */}
            <div id="map" className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden h-full min-h-[500px]">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary-500" /> Our Location
                  </h3>
                </div>
                <div className="relative h-full min-h-[450px]">
                  <iframe
                    title="CleanX Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.8765432012345!2d75.7873!3d26.8508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUxJzAyLjkiTiA3NcKwNDcnMTQuMyJF!5e0!3m2!1sen!2sin!4v1234567890"
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  {/* Fallback overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-50 to-gray-50">
                    <div className="text-center p-8">
                      <MapPin className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                      <h4 className="text-lg font-bold text-gray-900 mb-2">CleanX Headquarters</h4>
                      <p className="text-gray-500 text-sm">123 Clean Street, Malviya Nagar<br />Jaipur, Rajasthan 302017</p>
                      <a href="https://maps.google.com/?q=26.8508,75.7873" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors">
                        Open in Google Maps
                      </a>
                    </div>
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
