import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Package, IndianRupee, Users, TrendingUp, ArrowUpRight, ArrowDownRight,
  Clock, CheckCircle2, Truck, AlertCircle, Activity, Zap, ShoppingBag,
  Calendar, BarChart3, PieChart, RefreshCw, Eye, ChevronRight,
  Sparkles, Target, Award, MapPin, Phone, Star
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart as RPieChart, Pie, Cell
} from 'recharts';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const statusConfig = {
  'Order Placed': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500', icon: Package },
  'Picked Up': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500', icon: Truck },
  'Cleaning in Progress': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', dot: 'bg-purple-500', icon: RefreshCw },
  'Out for Delivery': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', dot: 'bg-orange-500', icon: Truck },
  'Delivered': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500', icon: CheckCircle2 },
};

const PIE_COLORS = ['#0ea5e9', '#f59e0b', '#a855f7', '#f97316', '#22c55e'];

const SkeletonPulse = ({ className }) => (
  <div className={`animate-pulse bg-dark-100 rounded-lg ${className}`} />
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-800 text-white px-3 py-2 rounded-lg text-xs shadow-xl border border-dark-700">
        <p className="font-semibold">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-dark-300 mt-0.5">{p.name}: <span className="text-white font-medium">{p.name === 'Revenue' ? `₹${p.value.toLocaleString('en-IN')}` : p.value}</span></p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => { fetchDashboard(); }, []);

  const fetchDashboard = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const res = await fetch(`${API}/api/orders`);
      const data = await res.json();
      if (data.success) setOrders(data.data);
    } catch (err) { console.error(err); }
    setLoading(false);
    setRefreshing(false);
  };

  // Derived data
  const stats = useMemo(() => {
    const total = orders.length;
    const delivered = orders.filter(o => o.status === 'Delivered').length;
    const pending = orders.filter(o => o.status !== 'Delivered').length;
    const customers = new Set(orders.map(o => o.phone)).size;
    const revenue = total * 299;
    const completionRate = total ? Math.round((delivered / total) * 100) : 0;
    const repeatCustomers = Object.values(
      orders.reduce((acc, o) => { acc[o.phone] = (acc[o.phone] || 0) + 1; return acc; }, {})
    ).filter(c => c > 1).length;
    return { total, delivered, pending, customers, revenue, completionRate, repeatCustomers };
  }, [orders]);

  const statusBreakdown = useMemo(() => {
    const counts = {};
    orders.forEach(o => { counts[o.status] = (counts[o.status] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [orders]);

  const weeklyData = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const now = new Date();
    const data = [];
    const rangeDays = timeRange === '7d' ? 7 : timeRange === '14d' ? 14 : 30;
    for (let i = rangeDays - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dayStr = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
      const dayOrders = orders.filter(o => {
        const od = new Date(o.createdAt);
        return od.toDateString() === d.toDateString();
      });
      data.push({
        name: rangeDays <= 7 ? days[d.getDay()] : dayStr,
        Orders: dayOrders.length,
        Revenue: dayOrders.length * 299,
      });
    }
    return data;
  }, [orders, timeRange]);

  const topServices = useMemo(() => {
    const svc = {};
    orders.forEach(o => { svc[o.service] = (svc[o.service] || 0) + 1; });
    return Object.entries(svc)
      .map(([name, count]) => ({ name, count, pct: orders.length ? Math.round((count / orders.length) * 100) : 0 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [orders]);

  const recentOrders = useMemo(() => orders.slice(0, 6), [orders]);

  const activityFeed = useMemo(() => {
    return orders.slice(0, 8).map(o => ({
      id: o._id,
      name: o.name,
      service: o.service,
      status: o.status,
      time: new Date(o.createdAt),
      orderId: o.orderId,
    }));
  }, [orders]);

  const timeAgo = (date) => {
    const diff = Date.now() - date.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  const statCards = [
    { label: 'Total Orders', value: stats.total, icon: Package, gradient: 'from-sky-500 to-blue-600', bgGlow: 'bg-sky-500/10', change: '+12%', up: true },
    { label: 'Revenue', value: `₹${stats.revenue.toLocaleString('en-IN')}`, icon: IndianRupee, gradient: 'from-emerald-500 to-teal-600', bgGlow: 'bg-emerald-500/10', change: '+8%', up: true },
    { label: 'Customers', value: stats.customers, icon: Users, gradient: 'from-violet-500 to-purple-600', bgGlow: 'bg-violet-500/10', change: '+15%', up: true },
    { label: 'Pending', value: stats.pending, icon: Clock, gradient: 'from-amber-500 to-orange-600', bgGlow: 'bg-amber-500/10', change: `-${stats.pending}`, up: false },
  ];

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-3 sm:gap-4">
        <div className="flex items-start sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base sm:text-lg">👋</span>
              <h1 className="text-lg sm:text-2xl font-extrabold text-dark-800 truncate">{greeting()}, Admin</h1>
            </div>
            <p className="text-xs sm:text-sm text-dark-400 flex items-center gap-1.5">
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
              <span className="truncate">{new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <motion.button whileTap={{ rotate: 180 }} onClick={() => fetchDashboard(true)}
              className={`p-2 sm:p-2.5 rounded-xl bg-white border border-dark-200 text-dark-500 hover:text-primary-500 hover:border-primary-200 transition-all shadow-sm ${refreshing ? 'animate-spin' : ''}`}>
              <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </motion.button>
            <div className="flex bg-white rounded-xl border border-dark-200 p-0.5 shadow-sm">
              {[{ k: '7d', l: '7D' }, { k: '14d', l: '14D' }, { k: '30d', l: '30D' }].map(r => (
                <button key={r.k} onClick={() => setTimeRange(r.k)}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold transition-all ${timeRange === r.k ? 'bg-primary-500 text-white shadow-sm' : 'text-dark-400 hover:text-dark-600'}`}>
                  {r.l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
        {statCards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="group relative bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-dark-100 hover:border-dark-200 transition-all hover:shadow-lg cursor-default overflow-hidden">
            <div className={`absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 rounded-full ${card.bgGlow} blur-2xl group-hover:w-24 group-hover:h-24 sm:group-hover:w-28 sm:group-hover:h-28 transition-all`} />
            <div className="relative">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg`}>
                  <card.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className={`text-[9px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-0.5 ${card.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                  {card.up ? <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : <ArrowDownRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
                  {card.change}
                </span>
              </div>
              <div className="text-lg sm:text-2xl font-extrabold text-dark-800 tracking-tight">
                {loading ? <SkeletonPulse className="h-6 sm:h-7 w-16 sm:w-20" /> : card.value}
              </div>
              <div className="text-[9px] sm:text-[11px] text-dark-400 font-semibold mt-0.5 sm:mt-1 uppercase tracking-wider">{card.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Metrics Bar */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="grid grid-cols-2 gap-2 sm:gap-3">
        {[
          { icon: Target, label: 'Completion', value: `${stats.completionRate}%`, color: 'text-emerald-500' },
          { icon: Award, label: 'Repeat', value: stats.repeatCustomers, color: 'text-violet-500' },
          { icon: Zap, label: 'Avg. Value', value: '₹299', color: 'text-amber-500' },
          { icon: Activity, label: 'Active', value: stats.pending, color: 'text-sky-500' },
        ].map((m, i) => (
          <div key={m.label} className="flex items-center gap-2 sm:gap-3 bg-white/70 backdrop-blur-sm border border-dark-100 rounded-lg sm:rounded-xl px-2.5 sm:px-4 py-2 sm:py-3">
            <m.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${m.color}`} />
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-bold text-dark-800">{loading ? '—' : m.value}</div>
              <div className="text-[9px] sm:text-[10px] text-dark-400 font-medium truncate">{m.label}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Revenue & Orders Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl border border-dark-100 p-3 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-5 gap-2">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-dark-800 flex items-center gap-2">
                <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-500" /> Revenue & Orders
              </h2>
              <p className="text-[10px] sm:text-[11px] text-dark-400 mt-0.5">Last {timeRange === '7d' ? '7 days' : timeRange === '14d' ? '2 weeks' : '30 days'}</p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] font-medium">
              <span className="flex items-center gap-1"><span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary-400" /> Revenue</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400" /> Orders</span>
            </div>
          </div>
          {loading ? (
            <SkeletonPulse className="h-48 sm:h-64 w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 200 : 260}>
              <AreaChart data={weeklyData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ordGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} interval={window.innerWidth < 640 ? 1 : 0} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={35} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="Revenue" stroke="#0ea5e9" strokeWidth={2} fill="url(#revGrad)" dot={false} activeDot={{ r: 3, fill: '#0ea5e9' }} />
                <Area type="monotone" dataKey="Orders" stroke="#22c55e" strokeWidth={1.5} fill="url(#ordGrad)" dot={false} activeDot={{ r: 3, fill: '#22c55e' }} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Order Status Pie */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="bg-white rounded-xl sm:rounded-2xl border border-dark-100 p-3 sm:p-5">
          <h2 className="text-sm sm:text-base font-bold text-dark-800 flex items-center gap-2 mb-3 sm:mb-4">
            <PieChart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-500" /> Order Status
          </h2>
          {loading ? (
            <SkeletonPulse className="h-40 sm:h-48 w-full" />
          ) : statusBreakdown.length === 0 ? (
            <div className="flex items-center justify-center h-40 sm:h-48 text-dark-300 text-sm">No data</div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 140 : 170}>
                <RPieChart>
                  <Pie data={statusBreakdown} cx="50%" cy="50%" innerRadius={window.innerWidth < 640 ? 35 : 45} outerRadius={window.innerWidth < 640 ? 60 : 75}
                    paddingAngle={3} dataKey="value" strokeWidth={0}>
                    {statusBreakdown.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [v, 'Orders']}
                    contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, fontSize: 11, color: '#fff' }}
                    itemStyle={{ color: '#fff' }} />
                </RPieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 sm:space-y-2 mt-2 sm:mt-3">
                {statusBreakdown.map((s, i) => (
                  <div key={s.name} className="flex items-center justify-between text-[11px] sm:text-xs">
                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                      <span className="text-dark-600 font-medium truncate">{s.name}</span>
                    </div>
                    <span className="font-bold text-dark-700 ml-2 flex-shrink-0">{s.value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Bottom: Recent Orders (Mobile Card View + Desktop Table) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
          className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl border border-dark-100 overflow-hidden">
          <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-dark-100 flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-dark-800 flex items-center gap-2">
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-500" /> Recent Orders
            </h2>
            <Link to="/admin/orders" className="text-[11px] sm:text-xs text-primary-500 font-semibold hover:text-primary-600 flex items-center gap-0.5 transition-colors">
              View All <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden divide-y divide-dark-50">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="p-3 space-y-2">
                  <SkeletonPulse className="h-4 w-24" />
                  <SkeletonPulse className="h-3 w-32" />
                  <SkeletonPulse className="h-5 w-20 rounded-full" />
                </div>
              ))
            ) : recentOrders.length === 0 ? (
              <div className="px-4 py-8 text-center text-dark-300 text-sm">
                <Package className="w-7 h-7 mx-auto mb-2 text-dark-200" />No orders yet
              </div>
            ) : (
              recentOrders.map((order) => {
                const sc = statusConfig[order.status] || { bg: 'bg-dark-50', text: 'text-dark-600', dot: 'bg-dark-400', border: 'border-dark-200' };
                return (
                  <div key={order._id} className="p-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {order.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-dark-800 truncate">{order.name}</span>
                        <span className="text-[10px] text-dark-400 flex-shrink-0">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] text-dark-400">#{order.orderId}</span>
                        <span className="text-dark-200">·</span>
                        <span className="text-[10px] text-dark-400 truncate">{order.service}</span>
                      </div>
                      <div className="mt-1.5">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold border ${sc.bg} ${sc.text} ${sc.border}`}>
                          <span className={`w-1 h-1 rounded-full ${sc.dot}`} />
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-dark-50/60 text-dark-400 text-[11px] uppercase tracking-wider">
                  <th className="text-left px-5 py-3 font-semibold">Order</th>
                  <th className="text-left px-5 py-3 font-semibold">Customer</th>
                  <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">Service</th>
                  <th className="text-left px-5 py-3 font-semibold">Status</th>
                  <th className="text-left px-5 py-3 font-semibold hidden lg:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(4)].map((_, i) => (
                    <tr key={i} className="border-t border-dark-50">
                      <td className="px-5 py-3"><SkeletonPulse className="h-4 w-16" /></td>
                      <td className="px-5 py-3"><SkeletonPulse className="h-4 w-24" /></td>
                      <td className="px-5 py-3 hidden md:table-cell"><SkeletonPulse className="h-4 w-20" /></td>
                      <td className="px-5 py-3"><SkeletonPulse className="h-5 w-20 rounded-full" /></td>
                      <td className="px-5 py-3 hidden lg:table-cell"><SkeletonPulse className="h-4 w-14" /></td>
                    </tr>
                  ))
                ) : recentOrders.length === 0 ? (
                  <tr><td colSpan={5} className="px-5 py-10 text-center text-dark-300 text-sm">
                    <Package className="w-8 h-8 mx-auto mb-2 text-dark-200" />No orders yet
                  </td></tr>
                ) : (
                  recentOrders.map((order) => {
                    const sc = statusConfig[order.status] || { bg: 'bg-dark-50', text: 'text-dark-600', dot: 'bg-dark-400', border: 'border-dark-200' };
                    return (
                      <tr key={order._id} className="border-t border-dark-50 hover:bg-primary-50/30 transition-colors">
                        <td className="px-5 py-3">
                          <span className="font-bold text-dark-800 text-xs bg-dark-50 px-2 py-1 rounded-md">#{order.orderId}</span>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                              {order.name?.charAt(0)?.toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-dark-700 text-xs truncate">{order.name}</div>
                              <div className="text-[10px] text-dark-400 flex items-center gap-0.5"><Phone className="w-2.5 h-2.5" /> {order.phone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-dark-500 text-xs hidden md:table-cell">{order.service}</td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${sc.bg} ${sc.text} ${sc.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                            {order.status}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-dark-400 text-xs hidden lg:table-cell">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Right Column: Top Services + Activity Feed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5">
          {/* Top Services */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="bg-white rounded-xl sm:rounded-2xl border border-dark-100 p-3 sm:p-5">
            <h2 className="text-sm sm:text-base font-bold text-dark-800 flex items-center gap-2 mb-3 sm:mb-4">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" /> Top Services
            </h2>
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => <SkeletonPulse key={i} className="h-8 sm:h-10 w-full" />)}
              </div>
            ) : topServices.length === 0 ? (
              <p className="text-dark-300 text-sm text-center py-4">No data</p>
            ) : (
              <div className="space-y-2.5 sm:space-y-3">
                {topServices.map((s, i) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                        <span className={`w-4 h-4 sm:w-5 sm:h-5 rounded flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-white flex-shrink-0 ${
                          i === 0 ? 'bg-amber-500' : i === 1 ? 'bg-dark-400' : 'bg-orange-400'
                        }`}>{i + 1}</span>
                        <span className="text-[11px] sm:text-xs font-semibold text-dark-700 truncate">{s.name}</span>
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-bold text-dark-500 flex-shrink-0 ml-2">{s.count} ({s.pct}%)</span>
                    </div>
                    <div className="h-1 sm:h-1.5 bg-dark-100 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${s.pct}%` }} transition={{ duration: 0.8, delay: 0.7 + i * 0.1 }}
                        className={`h-full rounded-full ${i === 0 ? 'bg-gradient-to-r from-primary-400 to-primary-600' : i === 1 ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-gradient-to-r from-amber-400 to-amber-600'}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Activity Feed */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            className="bg-white rounded-xl sm:rounded-2xl border border-dark-100 p-3 sm:p-5">
            <h2 className="text-sm sm:text-base font-bold text-dark-800 flex items-center gap-2 mb-3 sm:mb-4">
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-500" /> Live Activity
            </h2>
            {loading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => <SkeletonPulse key={i} className="h-8 sm:h-10 w-full" />)}
              </div>
            ) : activityFeed.length === 0 ? (
              <p className="text-dark-300 text-sm text-center py-4">No activity</p>
            ) : (
              <div className="space-y-0.5 max-h-56 sm:max-h-64 overflow-y-auto">
                {activityFeed.map((a, i) => {
                  const sc = statusConfig[a.status] || {};
                  const Icon = sc.icon || Package;
                  return (
                    <div key={a.id} className="flex items-start gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-dark-50/50 transition-colors">
                      <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg ${sc.bg || 'bg-dark-50'} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${sc.text || 'text-dark-400'}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] sm:text-xs text-dark-700 leading-relaxed truncate">
                          <span className="font-semibold">{a.name}</span>{' '}
                          <span className="text-dark-400">— {a.status}</span>
                        </p>
                        <p className="text-[9px] sm:text-[10px] text-dark-300 mt-0.5">{a.service} • {timeAgo(a.time)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
