import React, { useState } from 'react';
import { X, Sparkles, Coins, Zap, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function StoreModal({ isOpen, onClose, user, onPurchaseSuccess }) {
  if (!isOpen) return null;

  const [loadingPkg, setLoadingPkg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const packages = [
    { eur: 10.00, bonus_percent: 5, base_sc: 5.00, bonus_sc: 0.25, total_sc: 5.25, vip_points: 1000, tag: null },
    { eur: 50.00, bonus_percent: 10, base_sc: 25.00, bonus_sc: 2.50, total_sc: 27.50, vip_points: 5000, tag: 'POPULAR' },
    { eur: 100.00, bonus_percent: 15, base_sc: 50.00, bonus_sc: 7.50, total_sc: 57.50, vip_points: 10000, tag: 'BEST VALUE' },
    { eur: 250.00, bonus_percent: 20, base_sc: 125.00, bonus_sc: 25.00, total_sc: 150.00, vip_points: 25000, tag: null },
    { eur: 500.00, bonus_percent: 25, base_sc: 250.00, bonus_sc: 62.50, total_sc: 312.50, vip_points: 50000, tag: null },
    { eur: 1000.00, bonus_percent: 30, base_sc: 500.00, bonus_sc: 150.00, total_sc: 650.00, vip_points: 100000, tag: 'MAX BONUS' },
  ];

  const handleBuy = async (pkg) => {
    setLoadingPkg(pkg.eur);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const response = await fetch('/api/store/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({ eur: pkg.eur }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMsg(data.message);
        if (onPurchaseSuccess) onPurchaseSuccess(data.new_balance);
        setTimeout(() => {
          setSuccessMsg(null);
          onClose();
        }, 1800);
      } else {
        setErrorMsg(data.message || 'Purchase failed.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoadingPkg(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#1A2C38] border border-[#213743] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#213743] bg-[#0F212E]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1475E1] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Coins className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Velox Coin Store
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-md">
                  Instant SC Delivery
                </span>
              </h2>
              <p className="text-xs text-[#B1BAD3]">Rate: €1.00 = 0.50 SC + Bonus SC & VIP Points</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-[#B1BAD3] hover:text-white rounded-lg hover:bg-[#213743] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {successMsg && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3 animate-slideDown">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium">{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {errorMsg}
            </div>
          )}

          {/* Grid of Packages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {packages.map((pkg) => (
              <div 
                key={pkg.eur}
                className="relative bg-[#0F212E] border border-[#213743] hover:border-[#1475E1]/60 rounded-xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 group"
              >
                {pkg.tag && (
                  <span className={`absolute -top-2.5 right-4 px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full shadow-md ${
                    pkg.tag === 'MAX BONUS' 
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black' 
                      : 'bg-[#1475E1] text-white'
                  }`}>
                    {pkg.tag}
                  </span>
                )}

                <div>
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-2xl font-black text-white font-mono-numbers">€{pkg.eur.toFixed(2)}</span>
                    <span className="px-2 py-1 bg-emerald-500/15 text-emerald-400 text-xs font-semibold rounded-md border border-emerald-500/20">
                      +{pkg.bonus_percent}% SC Bonus
                    </span>
                  </div>

                  <div className="space-y-2 py-3 border-y border-[#213743]/60 my-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#B1BAD3]">Base SC:</span>
                      <span className="text-white font-mono-numbers font-semibold">{pkg.base_sc.toFixed(2)} SC</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#B1BAD3]">Bonus SC:</span>
                      <span className="text-emerald-400 font-mono-numbers font-semibold">+{pkg.bonus_sc.toFixed(2)} SC</span>
                    </div>
                    <div className="flex justify-between text-xs pt-1 border-t border-[#213743]/40">
                      <span className="text-white font-bold">Total SC:</span>
                      <span className="text-[#1475E1] font-mono-numbers font-bold text-sm">{pkg.total_sc.toFixed(2)} SC</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-medium mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>+{pkg.vip_points.toLocaleString()} VIP XP Points</span>
                  </div>
                </div>

                <button
                  onClick={() => handleBuy(pkg)}
                  disabled={loadingPkg !== null}
                  className="w-full py-2.5 px-4 bg-[#1475E1] hover:bg-blue-600 disabled:opacity-50 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group-hover:bg-blue-500"
                >
                  {loadingPkg === pkg.eur ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Buy for €{pkg.eur}</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Footer Security Badges */}
          <div className="flex items-center justify-center gap-6 pt-4 border-t border-[#213743] text-xs text-[#B1BAD3]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Instant SC Deposit</span>
            </div>
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-[#1475E1]" />
              <span>100% Social Coins Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
