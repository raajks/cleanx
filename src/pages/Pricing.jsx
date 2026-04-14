import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Crown } from 'lucide-react';

const categories = [
  {
    title: 'Regular Clothes',
    desc: 'Everyday wear & casuals',
    items: [
      { name: 'T-Shirt / Shirt', washFold: '₹29', washIron: '₹49', dryCleaning: '₹99', steamIron: '₹19' },
      { name: 'Trousers / Jeans', washFold: '₹39', washIron: '₹59', dryCleaning: '₹119', steamIron: '₹25' },
      { name: 'Shorts / Capri', washFold: '₹25', washIron: '₹39', dryCleaning: '₹79', steamIron: '₹15' },
      { name: 'Kurti / Top', washFold: '₹29', washIron: '₹49', dryCleaning: '₹99', steamIron: '₹19' },
      { name: 'Salwar / Pyjama', washFold: '₹25', washIron: '₹39', dryCleaning: '₹79', steamIron: '₹15' },
      { name: 'Innerwear (per pc)', washFold: '₹15', washIron: '—', dryCleaning: '—', steamIron: '—' },
    ],
  },
  {
    title: 'Heavy Items',
    desc: 'Bedding, curtains & more',
    items: [
      { name: 'Bedsheet (Single)', washFold: '₹59', washIron: '₹89', dryCleaning: '₹199', steamIron: '₹39' },
      { name: 'Bedsheet (Double)', washFold: '₹79', washIron: '₹119', dryCleaning: '₹249', steamIron: '₹49' },
      { name: 'Blanket / Comforter', washFold: '₹199', washIron: '—', dryCleaning: '₹399', steamIron: '—' },
      { name: 'Curtain (per panel)', washFold: '₹99', washIron: '₹149', dryCleaning: '₹249', steamIron: '₹59' },
      { name: 'Pillow Cover', washFold: '₹25', washIron: '₹39', dryCleaning: '₹69', steamIron: '₹19' },
      { name: 'Towel (Large)', washFold: '₹39', washIron: '—', dryCleaning: '₹79', steamIron: '—' },
    ],
  },
  {
    title: 'Premium',
    desc: 'Suits, sarees & designer wear',
    premium: true,
    items: [
      { name: 'Suit (2 Piece)', washFold: '—', washIron: '₹199', dryCleaning: '₹399', steamIron: '₹99' },
      { name: 'Suit (3 Piece)', washFold: '—', washIron: '₹249', dryCleaning: '₹499', steamIron: '₹129' },
      { name: 'Blazer / Coat', washFold: '—', washIron: '₹149', dryCleaning: '₹349', steamIron: '₹79' },
      { name: 'Saree (Silk/Designer)', washFold: '—', washIron: '₹199', dryCleaning: '₹449', steamIron: '₹99' },
      { name: 'Lehenga', washFold: '—', washIron: '₹299', dryCleaning: '₹599', steamIron: '₹149' },
      { name: 'Sherwani', washFold: '—', washIron: '₹249', dryCleaning: '₹549', steamIron: '₹129' },
    ],
  },
];

export default function Pricing() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-white/90 rounded-full text-sm font-medium mb-4">Transparent Pricing</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Simple & Affordable Pricing</h1>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto">No hidden charges. What you see is what you pay.</p>
        </div>
      </section>

      {/* Pricing Tables */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {categories.map((cat, i) => (
            <div key={i}>
              <div className="flex items-center gap-3 mb-6">
                {cat.premium && <Crown className="w-6 h-6 text-yellow-500" />}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{cat.title}</h2>
                  <p className="text-gray-500 text-sm">{cat.desc}</p>
                </div>
              </div>
              <div className={`rounded-2xl overflow-hidden border ${cat.premium ? 'border-yellow-200 shadow-lg shadow-yellow-500/5' : 'border-gray-200'} bg-white`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`${cat.premium ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : 'bg-gray-50'}`}>
                        <th className="text-left px-6 py-4 font-semibold text-gray-700 w-1/3">Item</th>
                        <th className="text-center px-4 py-4 font-semibold text-gray-700">Wash & Fold</th>
                        <th className="text-center px-4 py-4 font-semibold text-gray-700">Wash & Iron</th>
                        <th className="text-center px-4 py-4 font-semibold text-primary-600">Dry Cleaning</th>
                        <th className="text-center px-4 py-4 font-semibold text-gray-700">Steam Iron</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cat.items.map((item, j) => (
                        <tr key={j} className="border-t border-gray-100 hover:bg-primary-50/30 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-800">{item.name}</td>
                          <td className="text-center px-4 py-4 text-gray-600">{item.washFold}</td>
                          <td className="text-center px-4 py-4 text-gray-600">{item.washIron}</td>
                          <td className="text-center px-4 py-4 font-semibold text-primary-600">{item.dryCleaning}</td>
                          <td className="text-center px-4 py-4 text-gray-600">{item.steamIron}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}

          {/* Note */}
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 border border-primary-100">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Bulk orders? Get special discounts!</h3>
                <ul className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent-500" /> 10+ items: 10% off</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent-500" /> 25+ items: 15% off</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent-500" /> Monthly plans available</li>
                </ul>
              </div>
              <Link to="/book" className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl shadow-lg hover:-translate-y-0.5 transition-all whitespace-nowrap">
                Book Now <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
