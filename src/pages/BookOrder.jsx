import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, MapPin, Phone, User, Calendar, ArrowRight, Sparkles, Clock, Truck, Mail } from 'lucide-react';
import { PageBanner } from '../components/ui';
import toast from 'react-hot-toast';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const services = ['Wash & Fold', 'Wash & Iron', 'Dry Cleaning', 'Steam Iron'];

export default function BookOrder() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', service: '', pickupDate: '' });
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  // Auto-fill from logged-in user
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('cleanx_user'));
      if (user) {
        setForm(prev => ({
          ...prev,
          name: user.name || '',
          phone: user.phone || '',
          email: user.email || '',
        }));
      }
    } catch {}
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/orders`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) { setOrder(data.data); toast.success('Order booked!'); }
      else toast.error(data.errors?.[0]?.msg || data.message || 'Failed');
    } catch { toast.error('Server error. Try again.'); }
    setLoading(false);
  };

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const minDate = new Date().toISOString().split('T')[0];

  if (order) {
    return (
      <div>
        <PageBanner title="Order Confirmed!" subtitle="Your laundry pickup has been scheduled." />
        <section className="py-24 bg-gradient-to-b from-white to-dark-50">
          <div className="max-w-2xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-10 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-accent-500 to-emerald-400 flex items-center justify-center shadow-xl">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-extrabold text-dark-800 mb-2">Thank You, {order.name}!</h2>
              <p className="text-dark-400 mb-8">Your order has been placed successfully.</p>
              <div className="bg-dark-50 rounded-2xl p-6 mb-8 text-left space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-dark-200">
                  <span className="text-dark-400 text-sm">Order ID</span>
                  <span className="font-bold text-primary-600 text-lg">{order.orderId}</span>
                </div>
                <div className="flex justify-between"><span className="text-dark-400 text-sm">Service</span><span className="font-semibold text-dark-700">{order.service}</span></div>
                <div className="flex justify-between"><span className="text-dark-400 text-sm">Pickup Date</span><span className="font-semibold text-dark-700">{new Date(order.pickupDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
                <div className="flex justify-between"><span className="text-dark-400 text-sm">Est. Delivery</span><span className="font-semibold text-accent-600">{new Date(order.estimatedDelivery).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
                <div className="flex justify-between"><span className="text-dark-400 text-sm">Status</span><span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">{order.status}</span></div>
              </div>
              <div className="bg-primary-50 rounded-2xl p-4 mb-8 flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <p className="text-sm text-primary-700">Order confirmation & updates will be sent to your email.</p>
              </div>
              <div className="flex gap-3 justify-center">
                <Link to={`/track?orderId=${order.orderId}`} className="btn-primary flex items-center gap-2"><Package className="w-4 h-4" /> Track Order</Link>
                <button onClick={() => { setOrder(null); setForm({ name: '', phone: '', email: '', address: '', service: '', pickupDate: '' }); }} className="btn-secondary">Book Another</button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageBanner title="Book Your Pickup" subtitle="Schedule a free doorstep pickup in under 60 seconds." />
      <section className="py-24 bg-gradient-to-b from-white to-dark-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6">
                <h3 className="font-bold text-dark-800 mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary-500" /> Why Book With Us?</h3>
                <ul className="space-y-3">
                  {['Free doorstep pickup & delivery', 'Express 24-hour turnaround', 'Premium detergents & fabric care', 'Real-time order tracking', 'SMS & WhatsApp notifications'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-dark-500"><CheckCircle2 className="w-4 h-4 text-accent-500 flex-shrink-0" />{item}</li>
                  ))}
                </ul>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                className="glass-card p-6 bg-gradient-to-br from-primary-500 to-cyan-400 text-white">
                <div className="flex items-center gap-3"><Truck className="w-8 h-8" /><div><div className="font-bold">Free Pickup</div><div className="text-sm text-white/80">On all orders above â‚¹199</div></div></div>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-3 glass-card p-8">
              <h2 className="text-2xl font-extrabold text-dark-800 mb-6">Fill Your Details</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-dark-600 mb-1.5">Full Name</label>
                  <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                    <input type="text" name="name" value={form.name} onChange={handleChange} required maxLength={100} className="w-full pl-11 pr-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm" placeholder="Mr. Raj" /></div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark-600 mb-1.5">Phone Number</label>
                  <div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} required pattern="[0-9]{10}" maxLength={10} className="w-full pl-11 pr-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm" placeholder="9876543210" /></div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark-600 mb-1.5">Email Address</label>
                  <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                    <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm" placeholder="your@email.com" /></div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark-600 mb-1.5">Pickup Address</label>
                  <div className="relative"><MapPin className="absolute left-4 top-3.5 w-4 h-4 text-dark-400" />
                    <textarea name="address" value={form.address} onChange={handleChange} required maxLength={500} rows={3} className="w-full pl-11 pr-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm resize-none" placeholder="House No, Street, Area, City" /></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-dark-600 mb-1.5">Service</label>
                    <select name="service" value={form.service} onChange={handleChange} required className="w-full px-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm bg-white">
                      <option value="">Select Service</option>{services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark-600 mb-1.5">Pickup Date</label>
                    <div className="relative"><Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                      <input type="date" name="pickupDate" value={form.pickupDate} onChange={handleChange} required min={minDate} className="w-full pl-11 pr-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm" /></div>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full btn-primary text-base !py-4 flex justify-center items-center gap-2 disabled:opacity-50">
                  {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><ArrowRight className="w-5 h-5" /> Book Pickup</>}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
