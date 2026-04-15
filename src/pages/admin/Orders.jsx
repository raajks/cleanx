import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Package, ChevronDown, Check, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const statuses = ['All', 'Order Placed', 'Picked Up', 'Cleaning in Progress', 'Out for Delivery', 'Delivered'];

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

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/orders`);
      const data = await res.json();
      if (data.success) setOrders(data.data);
    } catch { toast.error('Failed to fetch orders'); }
    setLoading(false);
  };

  const updateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${API}/api/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders(prev => prev.map(o => o._id === id ? { ...o, status: newStatus } : o));
        toast.success(`Status updated to "${newStatus}"`);
      } else toast.error(data.message || 'Update failed');
    } catch { toast.error('Server error'); }
    setUpdatingId(null);
  };

  const filtered = orders
    .filter(o => filterStatus === 'All' || o.status === filterStatus)
    .filter(o => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (o.orderId?.toLowerCase().includes(q) || o.name?.toLowerCase().includes(q) || o.phone?.includes(q));
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-dark-800">Orders</h1>
          <p className="text-sm text-dark-400 mt-1">Manage and update all customer orders.</p>
        </div>
        <button onClick={fetchOrders} className="flex items-center gap-2 px-4 py-2 bg-dark-100 hover:bg-dark-200 rounded-xl text-sm font-semibold text-dark-600 transition-colors">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by Order ID, name, or phone..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statuses.map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${filterStatus === s ? 'bg-primary-500 text-white shadow-md' : 'bg-white text-dark-500 border border-dark-200 hover:border-primary-300'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-sm border border-dark-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-dark-50 text-dark-500 text-xs">
                <th className="text-left px-6 py-3 font-semibold">Order ID</th>
                <th className="text-left px-6 py-3 font-semibold">Customer</th>
                <th className="text-left px-6 py-3 font-semibold">Phone</th>
                <th className="text-left px-6 py-3 font-semibold">Service</th>
                <th className="text-left px-6 py-3 font-semibold">Pickup</th>
                <th className="text-left px-6 py-3 font-semibold">Status</th>
                <th className="text-left px-6 py-3 font-semibold">Update</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-dark-400">Loading orders...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-dark-400">No orders found</td></tr>
              ) : (
                filtered.map((order) => (
                  <tr key={order._id} className="border-t border-dark-100 hover:bg-dark-50/50 transition-colors">
                    <td className="px-6 py-3 font-semibold text-primary-600">{order.orderId}</td>
                    <td className="px-6 py-3 text-dark-700 font-medium">{order.name}</td>
                    <td className="px-6 py-3 text-dark-500">{order.phone}</td>
                    <td className="px-6 py-3 text-dark-500">{order.service}</td>
                    <td className="px-6 py-3 text-dark-400">{new Date(order.pickupDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                    <td className="px-6 py-3"><span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${statusBadge(order.status)}`}>{order.status}</span></td>
                    <td className="px-6 py-3">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        disabled={updatingId === order._id}
                        className="px-2 py-1.5 text-xs border border-dark-200 rounded-lg focus:ring-1 focus:ring-primary-500 outline-none bg-white disabled:opacity-50">
                        {statuses.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-dark-100 text-xs text-dark-400">
          Showing {filtered.length} of {orders.length} orders
        </div>
      </motion.div>
    </div>
  );
}
