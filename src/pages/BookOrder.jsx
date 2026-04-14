import React, { useState } from 'react';
import { CalendarDays, User, Phone, MapPin, Shirt, CheckCircle2, Sparkles } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'https://cleanx-backend.onrender.com/api';

const getTodayDateInputValue = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function BookOrder() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', address: '', service: '', pickupDate: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setOrderData(data.data);
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

  if (submitted) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="text-center animate-fade-up p-8">
          <div className="w-20 h-20 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-accent-500/25">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Order Booked Successfully!</h2>
          <p className="text-gray-500 mb-2">Thank you, <strong>{form.name}</strong>! Your laundry pickup has been scheduled.</p>
          <p className="text-gray-400 text-sm mb-8">We'll call you at <strong>{form.phone}</strong> to confirm.</p>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm max-w-md mx-auto text-left">
            <h4 className="font-semibold text-gray-900 mb-3">Order Summary</h4>
            <div className="space-y-2 text-sm">
              {orderData?.orderId && <div className="flex justify-between"><span className="text-gray-500">Order ID</span><span className="font-bold text-primary-600">{orderData.orderId}</span></div>}
              <div className="flex justify-between"><span className="text-gray-500">Service</span><span className="font-medium text-gray-800">{orderData?.service || form.service}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Pickup Date</span><span className="font-medium text-gray-800">{form.pickupDate}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Address</span><span className="font-medium text-gray-800 text-right max-w-[200px]">{form.address}</span></div>
              {orderData?.estimatedDelivery && <div className="flex justify-between"><span className="text-gray-500">Est. Delivery</span><span className="font-medium text-accent-600">{new Date(orderData.estimatedDelivery).toLocaleDateString('en-IN')}</span></div>}
            </div>
          </div>
          <button onClick={() => { setSubmitted(false); setOrderData(null); setForm({ name: '', phone: '', address: '', service: '', pickupDate: '' }); }} className="mt-8 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors">
            Book Another Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-white/90 rounded-full text-sm font-medium mb-4">Book a Pickup</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Schedule Your Laundry Pickup</h1>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto">Fill in the details below and we'll pick up your clothes at your preferred time.</p>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 sm:p-10 animate-fade-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/25">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Book Your Order</h2>
                <p className="text-sm text-gray-400">Free pickup & delivery</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Enter your full name" className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="e.g. 9876543210" pattern="[0-9]{10}" title="Enter 10 digit phone number" className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Pickup Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                  <textarea name="address" value={form.address} onChange={handleChange} required rows="3" placeholder="Enter your full address with landmark" className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm resize-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Type</label>
                <div className="relative">
                  <Shirt className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select name="service" value={form.service} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm appearance-none bg-white">
                    <option value="">Select a service</option>
                    <option value="Wash & Fold">Wash & Fold</option>
                    <option value="Wash & Iron">Wash & Iron</option>
                    <option value="Dry Cleaning">Dry Cleaning</option>
                    <option value="Steam Iron">Steam Iron</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Pickup Date</label>
                <div className="relative">
                  <CalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="date" name="pickupDate" value={form.pickupDate} onChange={handleChange} required min={getTodayDateInputValue()} className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm" />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl">{error}</p>}

              <button type="submit" disabled={loading} className="w-full py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? 'Booking...' : 'Schedule Pickup'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
