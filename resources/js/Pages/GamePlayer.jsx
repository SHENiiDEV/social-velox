import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import GameLoadingScreen from '../Components/GameLoadingScreen';
import { ArrowLeft, Maximize2, RefreshCw, ShieldCheck, Zap } from 'lucide-react';

export default function GamePlayer({ game, launchUrl, user }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const elem = document.getElementById('game-iframe-container');
    if (!elem) return;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <MainLayout>
      <Head title={`${game.name} - Velox Play`} />

      <div className="space-y-4 max-w-6xl mx-auto pb-12">
        {/* Navigation Topbar */}
        <div className="flex items-center justify-between bg-[#1A2C38] border border-[#213743] rounded-xl p-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 text-[#B1BAD3] hover:text-white rounded-lg hover:bg-[#213743] transition-colors"
              title="Back to Lobby"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-sm font-bold text-white flex items-center gap-2">
                {game.name}
                <span className="px-2 py-0.5 text-[9px] font-extrabold bg-[#1475E1]/20 text-[#1475E1] border border-[#1475E1]/30 rounded">
                  {game.provider_code}
                </span>
              </h1>
              <p className="text-[10px] text-[#B1BAD3] font-mono-numbers">
                User: {user.user_code} • Balance: SC {user.game_balance.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLoading(true)}
              className="p-2 text-[#B1BAD3] hover:text-white rounded-lg hover:bg-[#213743]"
              title="Reload Frame"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-[#213743] hover:bg-[#2c4757] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
              <span className="hidden sm:inline">Fullscreen</span>
            </button>
          </div>
        </div>

        {/* Game Iframe Wrapper */}
        <div
          id="game-iframe-container"
          className="relative w-full aspect-[16/10] md:aspect-[16/9] bg-[#0F212E] border border-[#213743] rounded-2xl overflow-hidden shadow-2xl"
        >
          {isLoading && (
            <GameLoadingScreen
              gameName={game.name}
              providerCode={game.provider_code}
              coverImage={game.cover_image}
              onFinish={() => setTimeout(() => setIsLoading(false), 200)}
            />
          )}

          <iframe
            src={launchUrl}
            title={game.name}
            className="w-full h-full border-0"
            allow="autoplay; fullscreen; payment"
            onLoad={() => setIsLoading(false)}
          />
        </div>

        {/* Game Details Footer Bar */}
        <div className="bg-[#1A2C38] border border-[#213743] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Seamless NexusGGR Integration Active</p>
              <p className="text-[#B1BAD3] text-[11px]">
                Bets and wins automatically sync with your SC balance in real-time.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[#B1BAD3] font-mono-numbers">
            <div>
              <span className="text-[#557086]">Min Bet:</span> €{game.min_bet.toFixed(2)}
            </div>
            <div>
              <span className="text-[#557086]">Max Bet:</span> €{game.max_bet.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
