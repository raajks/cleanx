import React, { useState } from 'react';
import { Search, Package, Truck, Droplets, CheckCircle2, Clock, ArrowRight, AlertCircle } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const statusIcons = {
  'Order Placed': Package,
  'Picked Up': Truck,
  'Cleaning in Progress': Droplets,
  'Out for Delivery': Truck,
  'Delivered': CheckCircle2,
};

const allSteps = ['Order Placed', 'Picked Up', 'Cleaning in Progress', 'Delivered'];

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [tracking, setTracking] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setLoading(true);
    setError('');
    setTracking(false);
    try {
      const res = await fetch(`${API_URL}/orders/track/${encodeURIComponent(orderId.trim())}`);
      const data = await res.json();
      if (data.success) {
        setOrderData(data.data);
        setTracking(true);
      } else {
        setError(data.message);
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
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-white/90 rounded-full text-sm font-medium mb-4">Track Order</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Track Your Order</h1>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto">Enter your Order ID to see real-time status of your laundry.</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Search */}
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 animate-fade-up mb-10">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => { setOrderId(e.target.value); setTracking(false); }}
                  placeholder="Enter Order ID (e.g. RJC-2026-001)"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm"
                />
              </div>
              <button type="submit" disabled={loading} className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all text-sm whitespace-nowrap flex items-center gap-2 disabled:opacity-60">
                {loading ? 'Tracking...' : 'Track'} {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
            {error && <p className="mt-3 text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl flex items-center justify-center gap-2"><AlertCircle className="w-4 h-4" /> {error}</p>}
          </div>

          {/* Tracking Result */}
          {tracking && orderData && (
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 animate-fade-up">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Order #{orderData.orderId}</h3>
                  <p className="text-sm text-gray-400">
                    {orderData.estimatedDelivery
                      ? `Estimated delivery: ${new Date(orderData.estimatedDelivery).toLocaleDateString('en-IN')}`
                      : `Service: ${orderData.service}`}
                  </p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                  orderData.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  <Clock className="w-3.5 h-3.5" /> {orderData.status}
                </span>
              </div>

              {/* Timeline */}
              <div className="space-y-0">
                {allSteps.map((stepLabel, i) => {
                  const timelineEntry = orderData.timeline?.find(t => t.status === stepLabel);
                  const done = !!timelineEntry;
                  const Icon = statusIcons[stepLabel] || Package;
                  const descriptions = {
                    'Order Placed': 'Your order has been confirmed',
                    'Picked Up': 'Our rider picked up your clothes',
                    'Cleaning in Progress': 'Your clothes are being washed & pressed',
                    'Delivered': 'Fresh clothes delivered to your doorstep',
                  };
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          done ? 'bg-gradient-to-br from-accent-400 to-accent-600 shadow-lg shadow-accent-500/25' : 'bg-gray-200'
                        }`}>
                          <Icon className={`w-5 h-5 ${done ? 'text-white' : 'text-gray-400'}`} />
                        </div>
                        {i < allSteps.length - 1 && (
                          <div className={`w-0.5 h-16 ${done ? 'bg-accent-300' : 'bg-gray-200'}`} />
                        )}
                      </div>
                      <div className="pb-8">
                        <h4 className={`font-semibold ${done ? 'text-gray-900' : 'text-gray-400'}`}>{stepLabel}</h4>
                        <p className={`text-sm ${done ? 'text-gray-500' : 'text-gray-300'}`}>{descriptions[stepLabel]}</p>
                        <span className={`text-xs ${done ? 'text-primary-500' : 'text-gray-300'}`}>
                          {timelineEntry ? new Date(timelineEntry.time).toLocaleString('en-IN') : 'Pending'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
