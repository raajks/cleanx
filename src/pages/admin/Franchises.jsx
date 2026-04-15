import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Search, MapPin, Phone, Mail, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const statusBadge = (status) => {
  const map = {
    'Pending': 'bg-yellow-100 text-yellow-700',
    'Contacted': 'bg-blue-100 text-blue-700',
    'Approved': 'bg-green-100 text-green-700',
    'Rejected': 'bg-red-100 text-red-700',
  };
  return map[status] || 'bg-dark-100 text-dark-600';
};

export default function AdminFranchises() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchInquiries(); }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/franchise`);
      const data = await res.json();
      if (data.success) setInquiries(data.data);
    } catch { toast.error('Failed to fetch franchise inquiries'); }
    setLoading(false);
  };

  const filtered = inquiries.filter(i => {
    if (!search) return true;
    const q = search.toLowerCase();
    return i.name?.toLowerCase().includes(q) || i.city?.toLowerCase().includes(q) || i.email?.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-dark-800">Franchise Inquiries</h1>
          <p className="text-sm text-dark-400 mt-1">Review and manage franchise applications.</p>
        </div>
        <button onClick={fetchInquiries} className="flex items-center gap-2 px-4 py-2 bg-dark-100 hover:bg-dark-200 rounded-xl text-sm font-semibold text-dark-600 transition-colors">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, city, or email..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div className="text-center py-12 text-dark-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-dark-400">No franchise inquiries found.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((inq, i) => (
            <motion.div key={inq._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-dark-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${statusBadge(inq.status || 'Pending')}`}>
                  {inq.status || 'Pending'}
                </span>
              </div>
              <h3 className="font-bold text-dark-800 mb-1">{inq.name}</h3>
              <div className="space-y-1.5 text-xs text-dark-500 mb-4">
                <div className="flex items-center gap-2"><MapPin className="w-3 h-3" /> {inq.city}</div>
                <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> {inq.phone}</div>
                <div className="flex items-center gap-2"><Mail className="w-3 h-3" /> {inq.email}</div>
              </div>
              {inq.investment && <div className="text-xs text-dark-400 mb-2">Budget: <span className="font-semibold text-dark-700">{inq.investment}</span></div>}
              {inq.message && <div className="text-xs text-dark-400 bg-dark-50 rounded-lg p-2.5 line-clamp-2">{inq.message}</div>}
              <div className="mt-3 text-[10px] text-dark-400">{new Date(inq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
