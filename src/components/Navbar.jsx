import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, ChevronDown, User, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Pricing', path: '/pricing' },
  {
    name: 'More', children: [
      { name: 'Track Order', path: '/track' },
      { name: 'Franchise', path: '/franchise' },
      { name: 'Subscriptions', path: '/subscriptions' },
      { name: 'Refer & Earn', path: '/referral' },
    ]
  },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setOpen(false); setDropdown(false); }, [location]);

  const isHome = location.pathname === '/';
  const navBg = scrolled
    ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-dark-900/5 border-b border-white/50'
    : isHome
      ? 'bg-transparent'
      : 'bg-white/60 backdrop-blur-md';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 group-hover:scale-105 transition-all">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className={`text-xl font-extrabold ${scrolled || !isHome ? 'text-dark-800' : 'text-white'} transition-colors`}>
                Clean<span className="gradient-text">X</span>
              </span>
              <span className={`hidden sm:block text-[10px] -mt-1 font-semibold tracking-[0.2em] uppercase ${scrolled || !isHome ? 'text-dark-400' : 'text-white/60'} transition-colors`}>
                Smart Laundry
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              link.children ? (
                <div key={link.name} className="relative"
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}>
                  <button className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${scrolled || !isHome ? 'text-dark-500 hover:text-primary-600 hover:bg-primary-50' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>
                    {link.name} <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <AnimatePresence>
                    {dropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-52 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-dark-900/10 border border-white/50 p-2 overflow-hidden"
                      >
                        {link.children.map(child => (
                          <Link key={child.path} to={child.path}
                            className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${location.pathname === child.path ? 'text-primary-600 bg-primary-50' : 'text-dark-600 hover:text-primary-600 hover:bg-primary-50/80'}`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.path} to={link.path}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? scrolled || !isHome ? 'text-primary-600 bg-primary-50' : 'text-white bg-white/15'
                      : scrolled || !isHome ? 'text-dark-500 hover:text-primary-600 hover:bg-primary-50' : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/login" className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${scrolled || !isHome ? 'text-dark-500 hover:text-primary-600' : 'text-white/80 hover:text-white'}`}>
              <LogIn className="w-4 h-4" /> Login
            </Link>
            <Link to="/book" className="btn-primary text-sm !px-5 !py-2.5 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Book Pickup
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className={`lg:hidden p-2 rounded-xl transition-colors ${scrolled || !isHome ? 'hover:bg-dark-100' : 'hover:bg-white/10'}`}>
            {open ? <X className={`w-6 h-6 ${scrolled || !isHome ? 'text-dark-700' : 'text-white'}`} /> : <Menu className={`w-6 h-6 ${scrolled || !isHome ? 'text-dark-700' : 'text-white'}`} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="px-4 pb-6 pt-2 bg-white/95 backdrop-blur-xl border-t border-dark-100 space-y-1">
              {navLinks.map(link => (
                link.children ? (
                  <div key={link.name}>
                    <div className="px-4 py-2 text-xs font-semibold text-dark-400 uppercase tracking-wider mt-2">{link.name}</div>
                    {link.children.map(child => (
                      <Link key={child.path} to={child.path}
                        className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${location.pathname === child.path ? 'text-primary-600 bg-primary-50' : 'text-dark-600 hover:bg-dark-50'}`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link key={link.path} to={link.path}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${location.pathname === link.path ? 'text-primary-600 bg-primary-50' : 'text-dark-600 hover:bg-dark-50'}`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <div className="flex gap-2 pt-3">
                <Link to="/login" className="flex-1 text-center px-4 py-2.5 border-2 border-dark-200 text-dark-600 rounded-xl text-sm font-semibold hover:bg-dark-50 transition-all">
                  Login
                </Link>
                <Link to="/book" className="flex-1 text-center btn-primary text-sm !py-2.5">
                  Book Pickup
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
