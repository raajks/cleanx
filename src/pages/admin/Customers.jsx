import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, Phone, MapPin, Package, IndianRupee, RefreshCw, X, ChevronRight, Calendar, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const statusBadge = (status) => {
  const map = {
    'Order Placed': 'bg-blue-100 text-blue-700',
    'Picked Up': 'bg-yellow-100 text-yellow-700',
    'Cleaning in Progress': 'bg-purple-100 text-purple-700',
    'Out for Delivery': 'bg-orange-100 text-orange-700',
    'Delivered': 'bg-green-100 text-green-700',
  };
  return map[status] || 'bg-dark-100 text-dark-600';
};

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => { fetchCustomers(); }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/orders`);
      const data = await res.json();
      if (data.success) {
        const orders = data.data;
        // Group by phone to build customer profiles
        const map = {};
        orders.forEach((o) => {
          if (!map[o.phone]) {
            map[o.phone] = {
              phone: o.phone,
              name: o.name,
              address: o.address,
              orders: [],
              totalSpent: 0,
              firstOrder: o.createdAt,
              lastOrder: o.createdAt,
            };
          }
          const c = map[o.phone];
          c.orders.push(o);
          // Use latest name/address
          if (new Date(o.createdAt) > new Date(c.lastOrder)) {
            c.name = o.name;
            c.address = o.address;
            c.lastOrder = o.createdAt;
          }
          if (new Date(o.createdAt) < new Date(c.firstOrder)) {
            c.firstOrder = o.createdAt;
          }
          // Estimate spend: ₹299 per order (placeholder)
          c.totalSpent += 299;
        });
        const list = Object.values(map).sort((a, b) => b.orders.length - a.orders.length);
        setCustomers(list);
      }
    } catch { toast.error('Failed to fetch customers'); }
    setLoading(false);
  };

  const filtered = customers.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return c.name?.toLowerCase().includes(q) || c.phone?.includes(q) || c.address?.toLowerCase().includes(q);
  });

  const totalOrders = customers.reduce((sum, c) => sum + c.orders.length, 0);
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const repeatCustomers = customers.filter(c => c.orders.length > 1).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-dark-800">Customers</h1>
          <p className="text-sm text-dark-400 mt-1">View customer profiles, order history & engagement.</p>
        </div>
        <button onClick={fetchCustomers} className="flex items-center gap-2 px-4 py-2 bg-dark-100 hover:bg-dark-200 rounded-xl text-sm font-semibold text-dark-600 transition-colors">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Customers', value: customers.length, icon: Users, color: 'from-primary-500 to-cyan-400' },
          { label: 'Total Orders', value: totalOrders, icon: Package, color: 'from-cyan-500 to-accent-400' },
          { label: 'Revenue (Est.)', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: IndianRupee, color: 'from-accent-500 to-primary-400' },
          { label: 'Repeat Customers', value: repeatCustomers, icon: Star, color: 'from-orange-500 to-red-400' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-dark-100">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="w-4 h-4 text-white" />
            </div>
            <div className="text-xl font-extrabold text-dark-800">{loading ? '—' : s.value}</div>
            <div className="text-[11px] text-dark-400 font-medium mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, phone, or address..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
      </div>

      {/* Customer Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-sm border border-dark-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-dark-50 text-dark-500 text-xs">
                <th className="text-left px-6 py-3 font-semibold">Customer</th>
                <th className="text-left px-6 py-3 font-semibold">Phone</th>
                <th className="text-left px-6 py-3 font-semibold">Orders</th>
                <th className="text-left px-6 py-3 font-semibold">Spent (Est.)</th>
                <th className="text-left px-6 py-3 font-semibold">First Order</th>
                <th className="text-left px-6 py-3 font-semibold">Last Order</th>
                <th className="text-left px-6 py-3 font-semibold">Details</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-dark-400">Loading customers...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-dark-400">No customers found</td></tr>
              ) : (
                filtered.map((c) => {
                  const initials = c.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';
                  return (
                    <tr key={c.phone} className="border-t border-dark-100 hover:bg-dark-50/50 transition-colors">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{initials}</div>
                          <div>
                            <div className="font-semibold text-dark-800">{c.name}</div>
                            <div className="text-[11px] text-dark-400 truncate max-w-[180px]">{c.address}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-dark-600 font-medium">{c.phone}</td>
                      <td className="px-6 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${c.orders.length > 2 ? 'bg-accent-100 text-accent-700' : 'bg-dark-100 text-dark-600'}`}>
                          {c.orders.length} order{c.orders.length > 1 ? 's' : ''}
                        </span>
                      </td>
                      <td className="px-6 py-3 font-semibold text-dark-700">₹{c.totalSpent.toLocaleString('en-IN')}</td>
                      <td className="px-6 py-3 text-dark-400 text-xs">{new Date(c.firstOrder).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                      <td className="px-6 py-3 text-dark-400 text-xs">{new Date(c.lastOrder).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                      <td className="px-6 py-3">
                        <button onClick={() => setSelectedCustomer(c)} className="p-2 rounded-lg hover:bg-primary-50 text-dark-400 hover:text-primary-500 transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-dark-100 text-xs text-dark-400">
          Showing {filtered.length} of {customers.length} customers
        </div>
      </motion.div>

      {/* Customer Detail Drawer */}
      <AnimatePresence>
        {selectedCustomer && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCustomer(null)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-extrabold text-dark-800">Customer Profile</h3>
                  <button onClick={() => setSelectedCustomer(null)} className="p-2 rounded-xl hover:bg-dark-100 text-dark-400 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Profile Card */}
                <div className="bg-gradient-to-br from-dark-900 to-primary-900 rounded-2xl p-6 text-white mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center text-lg font-bold">
                      {selectedCustomer.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-lg font-bold">{selectedCustomer.name}</div>
                      <div className="text-sm text-dark-400 flex items-center gap-1.5"><Phone className="w-3 h-3" /> {selectedCustomer.phone}</div>
                    </div>
                  </div>
                  <div className="text-xs text-dark-400 flex items-start gap-1.5"><MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" /> {selectedCustomer.address}</div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: 'Orders', value: selectedCustomer.orders.length },
                    { label: 'Spent', value: `₹${selectedCustomer.totalSpent}` },
                    { label: 'Type', value: selectedCustomer.orders.length > 2 ? 'Loyal' : selectedCustomer.orders.length > 1 ? 'Repeat' : 'New' },
                  ].map((s) => (
                    <div key={s.label} className="bg-dark-50 rounded-xl p-3 text-center">
                      <div className="text-lg font-extrabold text-dark-800">{s.value}</div>
                      <div className="text-[10px] text-dark-400 font-medium">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Order History */}
                <h4 className="font-bold text-dark-800 text-sm mb-3">Order History</h4>
                <div className="space-y-3">
                  {selectedCustomer.orders.map((o) => (
                    <div key={o._id} className="bg-dark-50 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-primary-600 mb-0.5">{o.orderId}</div>
                        <div className="text-[11px] text-dark-500">{o.service}</div>
                        <div className="text-[10px] text-dark-400 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-2.5 h-2.5" />
                          {new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${statusBadge(o.status)}`}>{o.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
