import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { Headphones, Mail, Clock, MessageSquare, ShieldCheck } from 'lucide-react';

export default function Support() {
  return (
    <MainLayout>
      <Head title="Velox Live Support & Help Center" />

      <div className="max-w-6xl mx-auto space-y-8 pb-16">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-900/40 via-[#1A2C38] to-[#0F212E] border border-cyan-500/30 shadow-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-bold">
            <Headphones className="w-3.5 h-3.5" />
            <span>24/7 PLAYER ASSISTANCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Velox Help & Support Center</h1>
          <p className="text-sm text-[#B1BAD3]">Need assistance with store deposits, account settings, or VIP levels? We are here to help.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#1A2C38] border border-[#213743] space-y-3 text-center">
            <Headphones className="w-8 h-8 text-cyan-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">24/7 Live Support</h3>
            <p className="text-xs text-[#B1BAD3]">Get instant responses from our support team via live chat widget.</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1A2C38] border border-[#213743] space-y-3 text-center">
            <Mail className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Email Support</h3>
            <p className="text-xs text-[#B1BAD3]">Send an email to support@velox-play.com for formal account inquiries.</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1A2C38] border border-[#213743] space-y-3 text-center">
            <Clock className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Fast Processing</h3>
            <p className="text-xs text-[#B1BAD3]">Store deposits & SC balance updates are instant 24 hours a day.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
