import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import StoreModal from '../Components/StoreModal';
import { Coins, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export default function Store({ packages = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <MainLayout>
      <Head title="Velox Coin Store & Packages" />

      <div className="max-w-6xl mx-auto space-y-8 pb-16">
        {/* Header Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1475E1]/30 via-[#1A2C38] to-[#213743] border border-[#213743] p-8 sm:p-10 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SPECIAL PROMO PACKAGES</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Velox Coin Store
            </h1>
            <p className="text-sm text-[#B1BAD3]">
              Select a deposit package to receive SC coins + Bonus SC + VIP XP Points immediately.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-[#1475E1] hover:bg-blue-600 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
          >
            Open Store Modal
          </button>
        </div>

        <StoreModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </MainLayout>
  );
}
