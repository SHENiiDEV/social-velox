import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { Headphones, Mail, Clock, Send, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

export default function Support() {
  const { auth } = usePage().props;

  const [formData, setFormData] = useState({
    name: auth.user ? auth.user.name : '',
    email: auth.user ? auth.user.email : '',
    category: 'store_deposit',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/support/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMsg(data.message);
        setFormData({
          name: auth.user ? auth.user.name : '',
          email: auth.user ? auth.user.email : '',
          category: 'store_deposit',
          subject: '',
          message: '',
        });
      } else {
        setErrorMsg(data.message || 'Failed to submit support ticket.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Head title="Velox Support & Help Center" />

      <div className="max-w-6xl mx-auto space-y-10 pb-16">
        {/* Header Hero Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-cyan-900/40 via-[#1A2C38] to-[#0F212E] border border-cyan-500/30 shadow-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-bold">
            <Headphones className="w-3.5 h-3.5" />
            <span>PLAYER SUPPORT DESK</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Velox Help & Support</h1>
          <p className="text-sm text-[#B1BAD3] max-w-2xl">
            Have questions about store package deposits, VIP levels, or account verification? Submit a support request below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SUPPORT FORM COLUMN */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#1A2C38] border border-[#213743] shadow-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Send className="w-5 h-5 text-cyan-400" />
                <span>Submit Support Ticket</span>
              </h2>
              <p className="text-xs text-[#B1BAD3] mt-1">Our player support team typically responds within 1 to 2 hours.</p>
            </div>

            {successMsg && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3 text-sm font-semibold animate-slideDown">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#B1BAD3] uppercase block">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-[#0F212E] border border-[#213743] focus:border-cyan-400 rounded-xl px-4 py-3 text-white outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#B1BAD3] uppercase block">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full bg-[#0F212E] border border-[#213743] focus:border-cyan-400 rounded-xl px-4 py-3 text-white outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#B1BAD3] uppercase block">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#0F212E] border border-[#213743] focus:border-cyan-400 rounded-xl px-4 py-3 text-white outline-none transition-all"
                  >
                    <option value="store_deposit">Store Deposit & SC Balance</option>
                    <option value="vip_level">VIP Level & XP Rewards</option>
                    <option value="account_verification">Account Settings & Security</option>
                    <option value="game_issue">Game Inquiry</option>
                    <option value="general">General Support</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#B1BAD3] uppercase block">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Short description of request"
                    className="w-full bg-[#0F212E] border border-[#213743] focus:border-cyan-400 rounded-xl px-4 py-3 text-white outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#B1BAD3] uppercase block">Message</label>
                <textarea
                  rows="5"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your issue or question in detail..."
                  className="w-full bg-[#0F212E] border border-[#213743] focus:border-cyan-400 rounded-xl px-4 py-3 text-white outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 fill-black" />
                    <span>Submit Ticket</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* HELP INFO SIDEBAR */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[#1A2C38] border border-[#213743] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Direct Email Assistance</h3>
                  <p className="text-xs text-[#B1BAD3]">support@velox-play.com</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#1A2C38] border border-[#213743] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Instant Delivery Guarantee</h3>
                  <p className="text-xs text-[#B1BAD3]">SC Coins & VIP XP credit automatically 24/7</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#1A2C38] border border-[#213743] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Player Data Protection</h3>
                  <p className="text-xs text-[#B1BAD3]">Strict privacy & encrypted data handling</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
