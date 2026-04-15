import React from 'react';
import { motion } from 'framer-motion';

export function GlassCard({ children, className = '', hover = true, delay = 0, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      className={`bg-white/80 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({ badge, title, description, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      {badge && (
        <span className={`section-badge ${light ? 'bg-white/10 text-white/90' : ''}`}>
          {badge}
        </span>
      )}
      <h2 className={`section-title mt-4 ${light ? 'text-white' : ''}`}>{title}</h2>
      {description && <p className={`section-desc mt-4 ${light ? 'text-white/70' : ''}`}>{description}</p>}
    </motion.div>
  );
}

export function StatCard({ icon: Icon, value, label, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-6 text-center group hover:shadow-2xl hover:shadow-primary-500/10 transition-all"
    >
      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="text-3xl font-extrabold gradient-text">{value}</div>
      <div className="text-dark-400 text-sm mt-1 font-medium">{label}</div>
    </motion.div>
  );
}

export function FeatureCard({ icon: Icon, title, description, color = 'from-primary-500 to-cyan-400', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className="glass-card p-7 group cursor-default"
    >
      <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-lg font-bold text-dark-800 mb-2">{title}</h3>
      <p className="text-dark-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

export function LoadingSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`h-4 bg-dark-200 rounded-lg ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} />
      ))}
    </div>
  );
}

export function PageBanner({ title, subtitle }) {
  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(14,165,233,0.08),transparent_50%)]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-dark-300 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
