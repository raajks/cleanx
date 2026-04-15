const nodemailer = require('nodemailer');

const EMAIL_USER = process.env.EMAIL_USER || 'rajkumarsharma705214@gmail.com';
const EMAIL_PASS = process.env.EMAIL_PASS || 'fuzv zyhx ygxv mtog';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
});

const baseTemplate = (content) => `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  body{margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif}
  .wrap{max-width:600px;margin:0 auto;padding:20px}
  .card{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)}
  .header{background:linear-gradient(135deg,#0ea5e9,#06b6d4);padding:32px 24px;text-align:center}
  .header h1{color:#fff;margin:0;font-size:24px;font-weight:800}
  .header p{color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:13px}
  .body{padding:28px 24px}
  .greeting{font-size:18px;font-weight:700;color:#1e293b;margin:0 0 16px}
  .text{color:#475569;font-size:14px;line-height:1.7;margin:0 0 16px}
  .info-box{background:#f0f9ff;border:1px solid #bae6fd;border-radius:12px;padding:20px;margin:20px 0}
  .info-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e0f2fe}
  .info-row:last-child{border-bottom:none}
  .info-label{color:#64748b;font-size:13px}
  .info-value{color:#0f172a;font-size:13px;font-weight:600}
  .highlight{background:linear-gradient(135deg,#0ea5e9,#06b6d4);color:#fff;text-align:center;padding:16px;border-radius:12px;margin:20px 0}
  .highlight .big{font-size:22px;font-weight:800;margin:0}
  .highlight .small{font-size:12px;opacity:0.85;margin:4px 0 0}
  .status-badge{display:inline-block;padding:6px 16px;border-radius:20px;font-size:12px;font-weight:700;margin:8px 0}
  .status-placed{background:#dbeafe;color:#1d4ed8}
  .status-picked{background:#fef3c7;color:#b45309}
  .status-cleaning{background:#ede9fe;color:#7c3aed}
  .status-delivery{background:#ffedd5;color:#c2410c}
  .status-delivered{background:#d1fae5;color:#047857}
  .btn-track{display:inline-block;background:linear-gradient(135deg,#0ea5e9,#06b6d4);color:#fff!important;text-decoration:none;padding:14px 32px;border-radius:12px;font-size:14px;font-weight:700;margin:8px 0;letter-spacing:0.3px}
  .btn-track:hover{opacity:0.9}
  .footer{background:#f8fafc;padding:20px 24px;text-align:center;border-top:1px solid #e2e8f0}
  .footer p{color:#94a3b8;font-size:11px;margin:4px 0}
</style></head>
<body><div class="wrap"><div class="card">
  <div class="header"><h1>Clean<span style="color:#a5f3fc">X</span></h1><p>Smart Laundry Service</p></div>
  ${content}
  <div class="footer">
    <p><strong>CleanX</strong> — Premium Laundry & Dry Cleaning</p>
    <p>Ghaziabad, Uttar Pradesh, India</p>
    <p style="margin-top:8px">© ${new Date().getFullYear()} CleanX. All rights reserved.</p>
  </div>
</div></div></body></html>`;

const statusMap = {
  'Order Placed': 'status-placed',
  'Picked Up': 'status-picked',
  'Cleaning in Progress': 'status-cleaning',
  'Out for Delivery': 'status-delivery',
  'Delivered': 'status-delivered',
};

// 1. Welcome email after signup
async function sendWelcomeEmail(user) {
  const html = baseTemplate(`
    <div class="body">
      <p class="greeting">Welcome to CleanX, ${user.name}! 🎉</p>
      <p class="text">Your account has been created successfully. You can now book laundry pickups, track orders, and enjoy premium laundry services right from your doorstep.</p>
      <div class="info-box">
        <div class="info-row"><span class="info-label">Name</span><span class="info-value">${user.name}</span></div>
        <div class="info-row"><span class="info-label">Email</span><span class="info-value">${user.email}</span></div>
        <div class="info-row"><span class="info-label">Phone</span><span class="info-value">${user.phone}</span></div>
      </div>
      <p class="text">Start by booking your first pickup — it's quick and easy!</p>
    </div>
  `);

  return sendMail(user.email, 'Welcome to CleanX! 🧺', html);
}

// 2. Order confirmation email
async function sendOrderConfirmationEmail(email, order) {
  const pickupDate = new Date(order.pickupDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const deliveryDate = new Date(order.estimatedDelivery).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  const html = baseTemplate(`
    <div class="body">
      <p class="greeting">Order Confirmed, ${order.name}! ✅</p>
      <p class="text">Your laundry pickup has been booked successfully. Here are your order details:</p>
      <div class="highlight">
        <p class="big">${order.orderId}</p>
        <p class="small">Your Order ID — save it for tracking</p>
      </div>
      <div class="info-box">
        <div class="info-row"><span class="info-label">Service</span><span class="info-value">${order.service}</span></div>
        <div class="info-row"><span class="info-label">Pickup Date</span><span class="info-value">${pickupDate}</span></div>
        <div class="info-row"><span class="info-label">Est. Delivery</span><span class="info-value">${deliveryDate}</span></div>
        <div class="info-row"><span class="info-label">Address</span><span class="info-value">${order.address}</span></div>
        <div class="info-row"><span class="info-label">Status</span><span class="info-value"><span class="status-badge status-placed">Order Placed</span></span></div>
      </div>
      <div style="text-align:center;margin:24px 0">
        <a href="${FRONTEND_URL}/track?orderId=${order.orderId}" class="btn-track">📦 Track Your Order</a>
      </div>
      <p class="text">We'll notify you at every step. Sit back and relax! 😊</p>
    </div>
  `);

  return sendMail(email, `Order Confirmed — ${order.orderId} 📦`, html);
}

// 3. Order status update email
async function sendOrderStatusEmail(email, order) {
  const badgeClass = statusMap[order.status] || 'status-placed';

  const html = baseTemplate(`
    <div class="body">
      <p class="greeting">Order Update — ${order.orderId}</p>
      <p class="text">Hi ${order.name}, your order status has been updated:</p>
      <div style="text-align:center;margin:24px 0">
        <span class="status-badge ${badgeClass}" style="font-size:14px;padding:10px 24px">${order.status}</span>
      </div>
      <div class="info-box">
        <div class="info-row"><span class="info-label">Order ID</span><span class="info-value">${order.orderId}</span></div>
        <div class="info-row"><span class="info-label">Service</span><span class="info-value">${order.service}</span></div>
        <div class="info-row"><span class="info-label">Current Status</span><span class="info-value">${order.status}</span></div>
      </div>
      <div style="text-align:center;margin:24px 0">
        <a href="${FRONTEND_URL}/track?orderId=${order.orderId}" class="btn-track">📦 Track Your Order</a>
      </div>
      ${order.status === 'Delivered' ? '<p class="text">Your laundry has been delivered! Thank you for choosing CleanX. We hope to serve you again soon! 🙏</p>' : '<p class="text">We\'ll keep you updated on every step. Thank you for your patience!</p>'}
    </div>
  `);

  return sendMail(email, `Order ${order.status} — ${order.orderId}`, html);
}

// Core send function
async function sendMail(to, subject, html) {
  try {
    await transporter.sendMail({
      from: `"CleanX" <${EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`✉️ Email sent to ${to}: ${subject}`);
    return true;
  } catch (err) {
    console.error(`❌ Email failed to ${to}:`, err.message);
    return false;
  }
}

module.exports = { sendWelcomeEmail, sendOrderConfirmationEmail, sendOrderStatusEmail };
