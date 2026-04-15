import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Package, Truck, Droplets, CheckCircle2, Clock, MapPin, AlertCircle } from 'lucide-react';
import { PageBanner, LoadingSkeleton } from '../components/ui';
import toast from 'react-hot-toast';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const statusSteps = [
  { key: 'Order Placed', icon: Package, label: 'Order Placed', desc: 'Your order has been confirmed' },
  { key: 'Picked Up', icon: Truck, label: 'Picked Up', desc: 'Clothes picked up from your doorstep' },
  { key: 'Cleaning in Progress', icon: Droplets, label: 'Cleaning', desc: 'Your clothes are being cleaned' },
  { key: 'Out for Delivery', icon: MapPin, label: 'Out for Delivery', desc: 'Your order is on its way' },
  { key: 'Delivered', icon: CheckCircle2, label: 'Delivered', desc: 'Delivered at your doorstep' },
];

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('orderId') || '');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchOrder = async (id) => {
    if (!id.trim()) return;
    setLoading(true); setOrder(null); setNotFound(false);
    try {
      const res = await fetch(`${API}/api/orders/track/${encodeURIComponent(id.trim())}`);
      const data = await res.json();
      if (data.success) { setOrder(data.data); }
      else { setNotFound(true); toast.error(data.message || 'Order not found'); }
    } catch { toast.error('Server error. Try again.'); setNotFound(true); }
    setLoading(false);
  };

  useEffect(() => { if (searchParams.get('orderId')) fetchOrder(searchParams.get('orderId')); }, []);

  const currentStepIndex = order ? statusSteps.findIndex(s => s.key === order.status) : -1;

  const getCountdown = () => {
    if (!order?.estimatedDelivery) return null;
    const diff = new Date(order.estimatedDelivery) - new Date();
    if (diff <= 0) return 'Delivered!';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${mins}m remaining`;
  };

  return (
    <div>
      <PageBanner title="Track Your Order" subtitle="Enter your Order ID to track real-time status of your laundry." />
      <section className="py-24 bg-gradient-to-b from-white to-dark-50">
        <div className="max-w-3xl mx-auto px-4">
          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 mb-10">
            <form onSubmit={(e) => { e.preventDefault(); fetchOrder(orderId); }} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="Enter Order ID (e.g. RJC-2026-001)"
                  className="w-full pl-12 pr-4 py-4 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm font-medium" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary !px-8 flex items-center gap-2">
                {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Search className="w-4 h-4" /> Track</>}
              </button>
            </form>
          </motion.div>

          {/* Loading */}
          {loading && <div className="glass-card p-8"><LoadingSkeleton lines={5} /></div>}

          {/* Not Found */}
          {notFound && !loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-10 text-center">
              <AlertCircle className="w-16 h-16 text-dark-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-dark-700 mb-2">Order Not Found</h3>
              <p className="text-dark-400">Please check your Order ID and try again.</p>
            </motion.div>
          )}

          {/* Order Details */}
          {order && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Order Info Card */}
              <div className="glass-card p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-dark-100">
                  <div>
                    <div className="text-sm text-dark-400 mb-1">Order ID</div>
                    <div className="text-2xl font-extrabold gradient-text">{order.orderId}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-dark-400 mb-1">Estimated Delivery</div>
                    <div className="text-lg font-bold text-accent-600">{getCountdown()}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div><div className="text-dark-400 mb-1">Customer</div><div className="font-semibold text-dark-700">{order.name}</div></div>
                  <div><div className="text-dark-400 mb-1">Service</div><div className="font-semibold text-dark-700">{order.service}</div></div>
                  <div><div className="text-dark-400 mb-1">Pickup</div><div className="font-semibold text-dark-700">{new Date(order.pickupDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div></div>
                  <div><div className="text-dark-400 mb-1">Status</div><span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">{order.status}</span></div>
                </div>
              </div>

              {/* Timeline Stepper */}
              <div className="glass-card p-8">
                <h3 className="text-lg font-bold text-dark-800 mb-8">Order Timeline</h3>
                <div className="space-y-0">
                  {statusSteps.map((step, i) => {
                    const isCompleted = i <= currentStepIndex;
                    const isCurrent = i === currentStepIndex;
                    const Icon = step.icon;
                    return (
                      <div key={step.key} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.15 }}
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${isCompleted ? 'bg-gradient-to-br from-primary-500 to-cyan-400 shadow-lg shadow-primary-500/25' : 'bg-dark-100'} ${isCurrent ? 'animate-pulse-glow' : ''}`}>
                            <Icon className={`w-5 h-5 ${isCompleted ? 'text-white' : 'text-dark-400'}`} />
                          </motion.div>
                          {i < statusSteps.length - 1 && (
                            <div className={`w-0.5 h-12 my-1 ${isCompleted ? 'bg-gradient-to-b from-primary-500 to-cyan-400' : 'bg-dark-200'}`} />
                          )}
                        </div>
                        <div className={`pt-2 pb-6 ${i === statusSteps.length - 1 ? 'pb-0' : ''}`}>
                          <div className={`font-bold text-sm ${isCompleted ? 'text-dark-800' : 'text-dark-400'}`}>{step.label}</div>
                          <div className="text-xs text-dark-400 mt-0.5">{step.desc}</div>
                          {isCurrent && <div className="mt-1 text-xs font-semibold text-primary-500 flex items-center gap-1"><Clock className="w-3 h-3" /> In Progress</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SMS/WhatsApp Notification Placeholder */}
              <div className="glass-card p-6 bg-gradient-to-r from-primary-50 to-cyan-50 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-dark-700 text-sm">Real-time Notifications</div>
                  <div className="text-xs text-dark-400">You'll receive SMS & WhatsApp updates on every status change.</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
