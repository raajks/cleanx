import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import BookOrder from './pages/BookOrder';
import TrackOrder from './pages/TrackOrder';
import Franchise from './pages/Franchise';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Subscriptions from './pages/Subscriptions';
import Referral from './pages/Referral';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminOrders from './pages/admin/Orders';
import AdminFranchises from './pages/admin/Franchises';
import AdminCustomers from './pages/admin/Customers';
import AdminSettings from './pages/admin/Settings';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/book" element={<BookOrder />} />
          <Route path="/track" element={<TrackOrder />} />
          <Route path="/franchise" element={<Franchise />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/referral" element={<Referral />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-right" toastOptions={{ duration: 3000, style: { borderRadius: '12px', background: '#1e293b', color: '#fff', fontSize: '13px', fontWeight: 600 } }} />
      <Routes>
        {/* Auth pages — no Navbar/Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin — own layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="franchises" element={<AdminFranchises />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Public pages */}
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </Router>
  );
}
