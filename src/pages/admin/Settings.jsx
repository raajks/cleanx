import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Store, MapPin, Bell, CreditCard, Shield, Globe, Palette, Save, Check, Phone, Mail, Clock, IndianRupee, Truck, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const Toggle = ({ enabled, onChange }) => (
  <button onClick={() => onChange(!enabled)} className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-primary-500' : 'bg-dark-200'}`}>
    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${enabled ? 'translate-x-5' : ''}`} />
  </button>
);

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);

  // Business Info
  const [business, setBusiness] = useState({
    name: 'CleanX',
    tagline: 'Smart Laundry. Delivered Fresh.',
    phone: '+91 98765 43210',
    email: 'support@cleanx.in',
    address: '123 Clean Street, Ahmedabad, Gujarat',
    website: 'https://cleanx.in',
  });

  // Service Areas
  const [areas, setAreas] = useState(['Ahmedabad', 'Jaipur', 'Surat', 'Mumbai', 'Pune']);
  const [newArea, setNewArea] = useState('');

  // Pricing
  const [pricing, setPricing] = useState([
    { service: 'Wash & Fold', price: 49 },
    { service: 'Wash & Iron', price: 79 },
    { service: 'Dry Cleaning', price: 149 },
    { service: 'Steam Iron', price: 29 },
  ]);

  // Notifications
  const [notifications, setNotifications] = useState({
    orderConfirmation: true,
    statusUpdates: true,
    promotionalEmails: false,
    smsAlerts: true,
    whatsappUpdates: true,
  });

  // Operations
  const [operations, setOperations] = useState({
    workingHoursStart: '08:00',
    workingHoursEnd: '21:00',
    minOrderValue: 199,
    freeDeliveryAbove: 499,
    expressDeliveryCharge: 99,
    turnaroundHours: 48,
  });

  const addArea = () => {
    if (!newArea.trim()) return;
    if (areas.includes(newArea.trim())) { toast.error('City already added'); return; }
    setAreas([...areas, newArea.trim()]);
    setNewArea('');
  };

  const removeArea = (city) => setAreas(areas.filter(a => a !== city));

  const updatePrice = (index, value) => {
    const updated = [...pricing];
    updated[index].price = Number(value) || 0;
    setPricing(updated);
  };

  const handleSave = () => {
    setSaved(true);
    toast.success('Settings saved successfully!');
    setTimeout(() => setSaved(false), 2000);
  };

  const biz = (key) => (e) => setBusiness({ ...business, [key]: e.target.value });
  const ops = (key) => (e) => setOperations({ ...operations, [key]: e.target.value });

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-dark-800">Settings</h1>
          <p className="text-sm text-dark-400 mt-1">Configure your CleanX platform settings.</p>
        </div>
        <button onClick={handleSave} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${saved ? 'bg-accent-500 text-white' : 'bg-gradient-to-r from-primary-500 to-cyan-400 text-white hover:shadow-lg hover:shadow-primary-500/25'}`}>
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
        </button>
      </div>

      {/* Business Info */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-dark-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-dark-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center"><Store className="w-4 h-4 text-white" /></div>
          <div><h3 className="font-bold text-dark-800 text-sm">Business Information</h3><p className="text-[11px] text-dark-400">Your brand identity and contact details</p></div>
        </div>
        <div className="p-6 grid sm:grid-cols-2 gap-4">
          {[
            { label: 'Business Name', key: 'name', icon: Sparkles, type: 'text' },
            { label: 'Tagline', key: 'tagline', icon: Store, type: 'text' },
            { label: 'Phone', key: 'phone', icon: Phone, type: 'tel' },
            { label: 'Email', key: 'email', icon: Mail, type: 'email' },
            { label: 'Address', key: 'address', icon: MapPin, type: 'text', full: true },
            { label: 'Website', key: 'website', icon: Globe, type: 'url' },
          ].map((f) => (
            <div key={f.key} className={f.full ? 'sm:col-span-2' : ''}>
              <label className="text-xs font-semibold text-dark-500 mb-1.5 block">{f.label}</label>
              <div className="relative">
                <f.icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                <input type={f.type} value={business[f.key]} onChange={biz(f.key)}
                  className="w-full pl-10 pr-4 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Pricing */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-2xl shadow-sm border border-dark-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-dark-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-accent-400 flex items-center justify-center"><IndianRupee className="w-4 h-4 text-white" /></div>
          <div><h3 className="font-bold text-dark-800 text-sm">Service Pricing</h3><p className="text-[11px] text-dark-400">Base price per kg for each service</p></div>
        </div>
        <div className="p-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {pricing.map((p, i) => (
              <div key={p.service} className="flex items-center gap-3 bg-dark-50 rounded-xl p-3">
                <div className="flex-1">
                  <div className="text-xs font-semibold text-dark-700">{p.service}</div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-dark-400">₹</span>
                  <input type="number" value={p.price} onChange={(e) => updatePrice(i, e.target.value)}
                    className="w-16 px-2 py-1.5 border border-dark-200 rounded-lg text-sm text-center font-bold focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
                  <span className="text-xs text-dark-400">/kg</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Service Areas */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-sm border border-dark-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-dark-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-primary-400 flex items-center justify-center"><MapPin className="w-4 h-4 text-white" /></div>
          <div><h3 className="font-bold text-dark-800 text-sm">Service Areas</h3><p className="text-[11px] text-dark-400">Cities where CleanX currently operates</p></div>
        </div>
        <div className="p-6">
          <div className="flex gap-2 mb-4">
            <input type="text" value={newArea} onChange={(e) => setNewArea(e.target.value)} placeholder="Add a new city..."
              onKeyDown={(e) => e.key === 'Enter' && addArea()}
              className="flex-1 px-4 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
            <button onClick={addArea} className="px-4 py-2.5 bg-dark-100 hover:bg-dark-200 rounded-xl text-sm font-semibold text-dark-600 transition-colors">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {areas.map((a) => (
              <span key={a} className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 group">
                <MapPin className="w-3 h-3" /> {a}
                <button onClick={() => removeArea(a)} className="w-4 h-4 rounded-full bg-primary-200 text-primary-600 flex items-center justify-center text-[10px] hover:bg-red-200 hover:text-red-600 transition-colors ml-0.5">&times;</button>
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Operations */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-2xl shadow-sm border border-dark-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-dark-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-400 flex items-center justify-center"><Truck className="w-4 h-4 text-white" /></div>
          <div><h3 className="font-bold text-dark-800 text-sm">Operations</h3><p className="text-[11px] text-dark-400">Working hours, delivery & order settings</p></div>
        </div>
        <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-dark-500 mb-1.5 block">Working Hours Start</label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
              <input type="time" value={operations.workingHoursStart} onChange={ops('workingHoursStart')}
                className="w-full pl-10 pr-4 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-dark-500 mb-1.5 block">Working Hours End</label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
              <input type="time" value={operations.workingHoursEnd} onChange={ops('workingHoursEnd')}
                className="w-full pl-10 pr-4 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-dark-500 mb-1.5 block">Turnaround (hours)</label>
            <input type="number" value={operations.turnaroundHours} onChange={ops('turnaroundHours')}
              className="w-full px-4 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold text-dark-500 mb-1.5 block">Min Order Value (₹)</label>
            <input type="number" value={operations.minOrderValue} onChange={ops('minOrderValue')}
              className="w-full px-4 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold text-dark-500 mb-1.5 block">Free Delivery Above (₹)</label>
            <input type="number" value={operations.freeDeliveryAbove} onChange={ops('freeDeliveryAbove')}
              className="w-full px-4 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold text-dark-500 mb-1.5 block">Express Charge (₹)</label>
            <input type="number" value={operations.expressDeliveryCharge} onChange={ops('expressDeliveryCharge')}
              className="w-full px-4 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-sm border border-dark-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-dark-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center"><Bell className="w-4 h-4 text-white" /></div>
          <div><h3 className="font-bold text-dark-800 text-sm">Notifications</h3><p className="text-[11px] text-dark-400">Configure customer notification preferences</p></div>
        </div>
        <div className="p-6 space-y-4">
          {[
            { key: 'orderConfirmation', label: 'Order Confirmation', desc: 'Send confirmation when a new order is placed' },
            { key: 'statusUpdates', label: 'Status Updates', desc: 'Notify customers when order status changes' },
            { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Send SMS notifications for order updates' },
            { key: 'whatsappUpdates', label: 'WhatsApp Updates', desc: 'Send WhatsApp messages for real-time tracking' },
            { key: 'promotionalEmails', label: 'Promotional Emails', desc: 'Send marketing and promotional emails' },
          ].map((n) => (
            <div key={n.key} className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-semibold text-dark-700">{n.label}</div>
                <div className="text-[11px] text-dark-400">{n.desc}</div>
              </div>
              <Toggle enabled={notifications[n.key]} onChange={(val) => setNotifications({ ...notifications, [n.key]: val })} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Security */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-2xl shadow-sm border border-dark-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-dark-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-dark-700 to-dark-900 flex items-center justify-center"><Shield className="w-4 h-4 text-white" /></div>
          <div><h3 className="font-bold text-dark-800 text-sm">Security</h3><p className="text-[11px] text-dark-400">API and access configuration</p></div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-dark-500 mb-1.5 block">API Base URL</label>
            <input type="text" readOnly value={process.env.REACT_APP_API_URL || 'http://localhost:5000'}
              className="w-full px-4 py-2.5 border border-dark-200 rounded-xl text-sm bg-dark-50 text-dark-500 outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold text-dark-500 mb-1.5 block">Rate Limit</label>
            <div className="text-sm text-dark-600 font-medium">100 requests / 15 minutes per IP</div>
          </div>
          <div className="bg-dark-50 rounded-xl p-4 flex items-start gap-3">
            <Shield className="w-4 h-4 text-dark-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-xs font-semibold text-dark-700">Admin Authentication</div>
              <div className="text-[11px] text-dark-400 mt-0.5">JWT-based authentication will be enabled in a future release. Currently using session-based access.</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Save */}
      <div className="flex justify-end pb-4">
        <button onClick={handleSave} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${saved ? 'bg-accent-500 text-white' : 'bg-gradient-to-r from-primary-500 to-cyan-400 text-white hover:shadow-lg hover:shadow-primary-500/25'}`}>
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save All Settings</>}
        </button>
      </div>
    </div>
  );
}
