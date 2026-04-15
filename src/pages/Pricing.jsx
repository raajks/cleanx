import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { PageBanner } from '../components/ui';

const categories = [
  {
    title: 'Regular Clothes', desc: 'Everyday wear & casuals',
    items: [
      { name: 'T-Shirt / Shirt', washFold: 29, washIron: 49, dryCleaning: 99, steamIron: 19 },
      { name: 'Trousers / Jeans', washFold: 39, washIron: 59, dryCleaning: 119, steamIron: 25 },
      { name: 'Shorts / Capri', washFold: 25, washIron: 39, dryCleaning: 79, steamIron: 15 },
      { name: 'Kurti / Top', washFold: 29, washIron: 49, dryCleaning: 99, steamIron: 19 },
      { name: 'Salwar / Pyjama', washFold: 25, washIron: 39, dryCleaning: 79, steamIron: 15 },
      { name: 'Innerwear (per pc)', washFold: 15, washIron: null, dryCleaning: null, steamIron: null },
    ],
  },
  {
    title: 'Heavy Items', desc: 'Bedding, curtains & more',
    items: [
      { name: 'Bedsheet (Single)', washFold: 59, washIron: 89, dryCleaning: 199, steamIron: 39 },
      { name: 'Bedsheet (Double)', washFold: 79, washIron: 119, dryCleaning: 249, steamIron: 49 },
      { name: 'Blanket / Comforter', washFold: 199, washIron: null, dryCleaning: 399, steamIron: null },
      { name: 'Curtain (per panel)', washFold: 99, washIron: 149, dryCleaning: 249, steamIron: 59 },
      { name: 'Pillow Cover', washFold: 25, washIron: 39, dryCleaning: 69, steamIron: 19 },
      { name: 'Towel (Large)', washFold: 39, washIron: null, dryCleaning: 79, steamIron: null },
    ],
  },
  {
    title: 'Premium Wear', desc: 'Suits, sarees & designer wear', premium: true,
    items: [
      { name: 'Suit (2 Piece)', washFold: null, washIron: 199, dryCleaning: 399, steamIron: 99 },
      { name: 'Blazer / Coat', washFold: null, washIron: 149, dryCleaning: 349, steamIron: 79 },
      { name: 'Saree (Silk)', washFold: null, washIron: 199, dryCleaning: 449, steamIron: 99 },
      { name: 'Lehenga', washFold: null, washIron: 299, dryCleaning: 599, steamIron: 149 },
      { name: 'Sherwani', washFold: null, washIron: 249, dryCleaning: 549, steamIron: 129 },
      { name: 'Wedding Dress', washFold: null, washIron: null, dryCleaning: 799, steamIron: null },
    ],
  },
];

export default function Pricing() {
  const [activeTab, setActiveTab] = useState(0);
  const cat = categories[activeTab];

  return (
    <div>
      <PageBanner title="Transparent Pricing" subtitle="No hidden charges. What you see is what you pay." />

      <section className="py-24 bg-gradient-to-b from-white to-dark-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((c, i) => (
              <button key={i} onClick={() => setActiveTab(i)}
                className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all ${activeTab === i ? 'bg-gradient-to-r from-primary-500 to-cyan-400 text-white shadow-lg shadow-primary-500/25' : 'bg-white text-dark-500 border border-dark-200 hover:border-primary-300'}`}>
                {c.premium && <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />}{c.title}
              </button>
            ))}
          </div>

          {/* Table */}
          <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            className={`glass-card overflow-hidden ${cat.premium ? 'ring-2 ring-primary-200' : ''}`}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-dark-800 to-dark-900 text-white">
                    <th className="text-left px-6 py-4 font-semibold">Item</th>
                    <th className="text-center px-4 py-4 font-semibold">Wash & Fold</th>
                    <th className="text-center px-4 py-4 font-semibold">Wash & Iron</th>
                    <th className="text-center px-4 py-4 font-semibold">Dry Cleaning</th>
                    <th className="text-center px-4 py-4 font-semibold">Steam Iron</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.items.map((item, j) => (
                    <tr key={j} className={`border-b border-dark-100 ${j % 2 === 0 ? 'bg-white' : 'bg-dark-50/50'} hover:bg-primary-50/50 transition-colors`}>
                      <td className="px-6 py-4 font-medium text-dark-700">{item.name}</td>
                      {['washFold', 'washIron', 'dryCleaning', 'steamIron'].map(key => (
                        <td key={key} className="text-center px-4 py-4">
                          {item[key] == null ? <span className="text-dark-300">—</span> : <span className="font-semibold text-dark-700">₹{item[key]}</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Benefits */}
          <div className="mt-16 grid sm:grid-cols-3 gap-6">
            {[['Free delivery on orders ₹199+', 'from-primary-500 to-cyan-400'], ['No extra charge for stain removal', 'from-accent-500 to-emerald-400'], ['Bulk 15% flat discount', 'from-violet-500 to-purple-400']].map(([text, gradient], i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-card p-5 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-dark-600">{text}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link to="/book" className="inline-flex items-center gap-2 btn-primary text-lg !px-8 !py-4">
              Book Your Order <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
