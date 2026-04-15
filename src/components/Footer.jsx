import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Phone, Mail, MapPin, ArrowUp, Instagram, Facebook, Twitter, Youtube, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-dark-950 text-dark-300 overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Back to top — fixed bottom-left */}
      <button onClick={scrollTop} className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-gradient-to-r from-primary-500 to-cyan-400 text-white rounded-2xl shadow-xl shadow-primary-500/30 flex items-center justify-center hover:-translate-y-1 hover:shadow-primary-500/50 transition-all">
        <ArrowUp className="w-5 h-5" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        {/* Newsletter Banner */}
        <div className="glass-dark rounded-3xl p-8 sm:p-10 mb-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Get Fresh Deals & Updates</h3>
            <p className="text-dark-400 text-sm">Subscribe to our newsletter and never miss an exclusive offer.</p>
          </div>
          <div className="flex w-full sm:w-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 sm:w-64 px-5 py-3 bg-white/5 border border-white/10 rounded-l-xl text-white placeholder-dark-500 text-sm focus:outline-none focus:border-primary-500/50" />
            <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-cyan-400 text-white font-semibold rounded-r-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all flex items-center gap-2">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-cyan-400 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white">Clean<span className="gradient-text">X</span></span>
            </div>
            <p className="text-sm text-dark-400 mb-6 leading-relaxed">Smart Laundry. Delivered Fresh. Premium laundry and dry cleaning services at your doorstep across Ghaziabad.</p>
            <div className="flex gap-2.5">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#!" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-gradient-to-br hover:from-primary-500 hover:to-cyan-400 hover:text-white transition-all group border border-white/5 hover:border-transparent">
                  <Icon className="w-4 h-4 text-dark-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[['Home', '/'], ['Services', '/services'], ['Pricing', '/pricing'], ['Book Order', '/book'], ['Track Order', '/track']].map(([name, path]) => (
                <li key={path}>
                  <Link to={path} className="hover:text-primary-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-dark-600 group-hover:bg-primary-400 transition-colors" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm">
              {[['About Us', '/about'], ['Franchise', '/franchise'], ['Subscriptions', '/subscriptions'], ['Contact', '/contact']].map(([name, path]) => (
                <li key={path}>
                  <Link to={path} className="hover:text-primary-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-dark-600 group-hover:bg-primary-400 transition-colors" />
                    {name}
                  </Link>
                </li>
              ))}
              <li>
                <a href="#!" className="hover:text-primary-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-dark-600 group-hover:bg-primary-400 transition-colors" />
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/10 transition-colors">
                  <Phone className="w-4 h-4 text-primary-400" />
                </div>
                <div>
                  <div className="text-dark-500 text-xs mb-0.5">Call Us</div>
                  <span className="text-white font-medium">+91 98765 43210</span>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/10 transition-colors">
                  <Mail className="w-4 h-4 text-primary-400" />
                </div>
                <div>
                  <div className="text-dark-500 text-xs mb-0.5">Email</div>
                  <span className="text-white font-medium">hello@cleanx.com</span>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/10 transition-colors">
                  <MapPin className="w-4 h-4 text-primary-400" />
                </div>
                <div>
                  <div className="text-dark-500 text-xs mb-0.5">Address</div>
                  <span className="text-white font-medium">123 Clean Street, Ghaziabad, Uttar Pradesh</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-dark-500">
          <p>&copy; {new Date().getFullYear()} CleanX. All rights reserved.</p>
          <p>
            Developed by{' '}
            <a href="https://github.com/raajks" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 transition-colors font-medium">
              Mr. Raj
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
