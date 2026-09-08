import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
  Coins, 
  Wallet, 
  PlusCircle, 
  User, 
  LogOut, 
  ShieldCheck, 
  Menu, 
  MessageSquare,
  Gift,
  RefreshCw,
  Sparkles,
  Gamepad2,
  Trophy
} from 'lucide-react';
import VipProgressBadge from './VipProgressBadge';
import StoreModal from './StoreModal';
import AuthModal from './AuthModal';
import ObsidianLogo from './ObsidianLogo';

export default function Header({ onToggleLeftSidebar, onToggleRightChat }) {
  const { auth, appName } = usePage().props;
  const [balance, setBalance] = useState(auth.user ? auth.user.game_balance : 0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [userDropdown, setUserDropdown] = useState(false);
  const [bonusClaimMsg, setBonusClaimMsg] = useState(null);
  const [headerTab, setHeaderTab] = useState('casino'); // 'casino' or 'sports'

  // Poll balance every 3 seconds & window focus
  useEffect(() => {
    if (!auth.user) return;
    setBalance(auth.user.game_balance);

    const fetchBalance = async () => {
      try {
        const res = await fetch('/api/user/balance', {
          headers: { 'ngrok-skip-browser-warning': 'true' }
        });
        if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
          const data = await res.json();
          if (data && data.authenticated) {
            setBalance(data.game_balance);
          }
        }
      } catch (e) {
        // silent sync fallback
      }
    };

    const interval = setInterval(fetchBalance, 3000);
    window.addEventListener('focus', fetchBalance);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', fetchBalance);
    };
  }, [auth.user]);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/user/balance', {
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
        const data = await res.json();
        setBalance(data.game_balance);
      }
    } catch (e) {
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const handleClaimDailyBonus = async () => {
    try {
      const res = await fetch('/api/bonus/daily', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
      });
      const data = await res.json();
      if (data.success) {
        setBalance(data.new_balance);
        setBonusClaimMsg(data.message);
        setTimeout(() => setBonusClaimMsg(null), 3500);
      } else {
        alert(data.message || 'Daily bonus unavailable.');
      }
    } catch (e) {
      alert('Failed to claim bonus.');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 h-16 bg-[#0F212E]/95 backdrop-blur-md border-b border-[#213743] px-3 sm:px-4 flex items-center justify-between shadow-md">
        {/* Left Section: Mobile Menu + Far Left Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleLeftSidebar}
            className="p-2 text-[#B1BAD3] hover:text-white rounded-xl hover:bg-[#213743] transition-colors"
            title="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/">
            <ObsidianLogo className="h-12 sm:h-14 lg:h-16" />
          </Link>
        </div>

        {/* Right Section: Balance / Auth Buttons & Chat Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {auth.user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-[#1A2C38] border border-[#213743] rounded-xl p-1 shadow-inner">
                <div className="flex items-center gap-2 px-2.5 py-1">
                  <Coins className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="text-xs text-[#B1BAD3] font-bold">SC</span>
                  <span className="font-mono-numbers font-bold text-white text-xs sm:text-sm">
                    {balance.toFixed(2)}
                  </span>
                  <button
                    onClick={handleManualRefresh}
                    className={`p-1 text-[#B1BAD3] hover:text-white transition-transform ${isRefreshing ? 'animate-spin' : ''}`}
                    title="Refresh Balance"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => setIsStoreOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1475E1] hover:bg-blue-600 text-white font-bold text-xs rounded-lg shadow-md transition-all hover:scale-105"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Store</span>
                </button>
              </div>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 p-1.5 bg-[#1A2C38] border border-[#213743] rounded-xl hover:border-slate-600 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#1475E1] flex items-center justify-center font-bold text-xs text-white">
                    {auth.user.name.substring(0, 2).toUpperCase()}
                  </div>
                </button>

                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#1A2C38] border border-[#213743] rounded-xl shadow-2xl py-2 z-50 animate-slideDown">
                    <div className="px-4 py-2 border-b border-[#213743]">
                      <p className="text-xs font-bold text-white truncate">{auth.user.name}</p>
                      <p className="text-[10px] text-[#B1BAD3] font-mono-numbers">{auth.user.user_code}</p>
                    </div>

                    {auth.user.is_admin && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-amber-400 hover:bg-[#213743] transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Admin Control Panel</span>
                      </Link>
                    )}

                    <Link
                      href="/store"
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white hover:bg-[#213743] transition-colors"
                    >
                      <Coins className="w-4 h-4 text-emerald-400" />
                      <span>Coin Store & Packages</span>
                    </Link>

                    <button
                      onClick={() => {
                        fetch('/api/auth/logout', { method: 'POST', headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' } })
                          .then(() => window.location.href = '/');
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-400 hover:bg-[#213743] transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Stake-Style Login & Register Buttons */
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setAuthTab('login'); setIsAuthOpen(true); }}
                className="px-3.5 py-2 text-xs font-bold text-white bg-[#213743] hover:bg-[#2c4757] border border-slate-600/40 rounded-xl transition-all"
              >
                Login
              </button>
              <button
                onClick={() => { setAuthTab('register'); setIsAuthOpen(true); }}
                className="px-4 py-2 bg-[#1475E1] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
              >
                Register
              </button>
            </div>
          )}

          {/* Right Sidebar / Chat Toggle Button */}
          <button
            onClick={onToggleRightChat}
            className="p-2 text-[#B1BAD3] hover:text-white rounded-xl hover:bg-[#213743] transition-colors relative"
            title="Toggle Right Sidebar"
          >
            <MessageSquare className="w-5 h-5 text-[#1475E1]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </button>
        </div>
      </header>

      {/* Bonus Claim Toast Notification */}
      {bonusClaimMsg && (
        <div className="fixed top-20 right-6 z-50 p-4 bg-emerald-500 text-black font-bold text-sm rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <Sparkles className="w-5 h-5" />
          <span>{bonusClaimMsg}</span>
        </div>
      )}

      {/* Modals */}
      <StoreModal isOpen={isStoreOpen} onClose={() => setIsStoreOpen(false)} user={auth.user} onPurchaseSuccess={(newBal) => setBalance(newBal)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} initialTab={authTab} />
    </>
  );
}
