import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import GameCard from '../Components/GameCard';
import { Search, Flame, Sparkles, Trophy, Gamepad2, Play, Command, ChevronRight } from 'lucide-react';
import AuthModal from '../Components/AuthModal';

export default function Lobby({ games, featuredGames = [], liveWins = [], currentCategory = 'all', search = '', userFavoriteIds = [] }) {
  const [searchTerm, setSearchTerm] = useState(search || '');
  const [favoritedIds, setFavoritedIds] = useState(userFavoriteIds || []);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(24);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.get('/', { category: currentCategory, search: searchTerm }, { preserveState: true });
  };

  const handleToggleFavorite = async (gameId) => {
    try {
      const res = await fetch('/api/favorites/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({ game_id: gameId }),
      });
      const data = await res.json();
      if (data.success) {
        if (data.favorited) {
          setFavoritedIds([...favoritedIds, gameId]);
        } else {
          setFavoritedIds(favoritedIds.filter(id => id !== gameId));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const allGamesList = games.data || [];

  return (
    <MainLayout currentCategory={currentCategory} liveWins={liveWins}>
      <Head title="Velox Play - Next-Gen Social Gaming" />

      <div className="space-y-6 pb-12">
        {/* Stake-Style Main Hero Banner with Uploaded Artwork */}
        <div className="relative rounded-3xl overflow-hidden border border-[#213743] min-h-[320px] sm:min-h-[380px] flex items-center justify-center p-6 lg:p-12 text-center shadow-2xl group">
          {/* Background Reference Image */}
          <img
            src="/images/hero-banner.jpg"
            alt="World's Largest Online Social Casino"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
          />

          {/* Vignette Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F212E] via-black/40 to-black/30 pointer-events-none" />

          {/* Center Interactive Controls */}
          <div className="relative z-10 max-w-2xl space-y-5">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] font-sans">
              World's Largest Online Social Casino
            </h1>

            <div>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-10 py-3.5 bg-[#1475E1] hover:bg-blue-600 text-white font-black text-sm rounded-xl shadow-xl shadow-blue-500/40 transition-all hover:scale-105 border border-blue-400/30"
              >
                Register
              </button>
            </div>

            {/* Social Sign Up Options */}
            <div className="space-y-2 pt-2">
              <p className="text-[10px] font-black text-[#B1BAD3] uppercase tracking-widest drop-shadow-md">
                OR SIGN UP WITH
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-14 h-9 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-xl flex items-center justify-center font-black text-white text-xs border border-white/10 transition-all hover:scale-105 shadow-md"
                  title="Sign up with Google"
                >
                  <span className="text-red-400 font-serif font-black text-base">G</span>
                </button>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-14 h-9 bg-[#1877F2]/30 hover:bg-[#1877F2]/50 backdrop-blur-md text-[#1877F2] rounded-xl flex items-center justify-center font-black text-base border border-[#1877F2]/40 transition-all hover:scale-105 shadow-md"
                  title="Sign up with Facebook"
                >
                  f
                </button>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-14 h-9 bg-emerald-500/20 hover:bg-emerald-500/40 backdrop-blur-md text-emerald-400 rounded-xl flex items-center justify-center font-black text-sm border border-emerald-500/40 transition-all hover:scale-105 shadow-md"
                  title="Sign up with Kick"
                >
                  K
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stake-Style Casino Category Card */}
        <div className="bg-[#1A2C38] border border-[#213743] hover:border-[#1475E1]/50 rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all hover:scale-[1.01] shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#213743] flex items-center justify-center text-[#1475E1]">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Casino Lobby</h2>
              <p className="text-xs text-[#B1BAD3] flex items-center gap-1.5 font-mono-numbers mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-emerald-400 font-bold">35,632</span> active players online
              </p>
            </div>
          </div>
        </div>

        {/* Stake-Style Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-[#557086]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Stake.com games..."
            className="w-full pl-11 pr-24 py-3 bg-[#1A2C38] border border-[#213743] focus:border-[#1475E1] rounded-2xl text-xs text-white placeholder-[#557086] outline-none transition-colors shadow-inner"
          />
          <div className="absolute right-3 top-2.5 px-2.5 py-1 bg-[#213743] border border-slate-600/30 rounded-lg text-[10px] font-bold text-[#B1BAD3] flex items-center gap-1">
            <Command className="w-3 h-3" />
            <span>Cmd + K</span>
          </div>
        </form>

        {/* Trending Games Section Header */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#1475E1]" />
              <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                Trending Games
              </h2>
            </div>
            <button
              onClick={() => setDisplayCount(allGamesList.length)}
              className="text-xs font-bold text-[#B1BAD3] hover:text-white transition-colors flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Game Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
            {allGamesList.slice(0, displayCount).map((game) => (
              <GameCard
                key={game.id}
                game={game}
                isFavorited={favoritedIds.includes(game.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>

          {/* Load More Button */}
          {displayCount < allGamesList.length && (
            <div className="flex justify-center pt-6">
              <button
                onClick={() => setDisplayCount((prev) => prev + 24)}
                className="px-8 py-3 bg-[#213743] hover:bg-[#2c4757] text-white font-bold text-xs rounded-xl border border-slate-600/30 transition-all shadow-lg hover:scale-105"
              >
                Load More
              </button>
            </div>
          )}
        </section>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialTab="register" />
    </MainLayout>
  );
}
