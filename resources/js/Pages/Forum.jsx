import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { MessageSquare, Users, Sparkles, Trophy, Pin, MessageCircle } from 'lucide-react';

export default function Forum() {
  const topics = [
    { id: 1, title: '🔥 Big Wins Showcase: Share your highest multipliers here!', replies: 142, views: '3.4k', pinned: true, category: 'Community' },
    { id: 2, title: '💡 Strategy & Discussion: Best Pragmatic Play slots for bonus hunts', replies: 89, views: '1.8k', pinned: true, category: 'Discussion' },
    { id: 3, title: '👑 VIP Level 10 Progress Thread - Drop your status updates', replies: 64, views: '1.2k', pinned: false, category: 'VIP Lounge' },
    { id: 4, title: '🎉 Sunday 1,000 SC Raffle Winners Announcement', replies: 31, views: '950', pinned: false, category: 'Events' },
  ];

  return (
    <MainLayout>
      <Head title="Velox Community Forum" />

      <div className="max-w-6xl mx-auto space-y-8 pb-16">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-900/40 via-[#1A2C38] to-[#0F212E] border border-emerald-500/30 shadow-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>PLAYER COMMUNITY FORUM</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Velox Community Discussions</h1>
          <p className="text-sm text-[#B1BAD3]">Connect with fellow players, share big win screenshots, and discuss game strategies.</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Trending Discussions</h2>
          </div>

          <div className="space-y-3">
            {topics.map((t) => (
              <div key={t.id} className="p-5 rounded-2xl bg-[#1A2C38] border border-[#213743] hover:border-[#1475E1]/60 flex items-center justify-between gap-4 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0F212E] border border-[#213743] flex items-center justify-center text-[#1475E1]">
                    {t.pinned ? <Pin className="w-5 h-5 text-amber-400 fill-amber-400" /> : <MessageCircle className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-[#1475E1]/20 text-[#1475E1] rounded-md border border-[#1475E1]/30">
                        {t.category}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white">{t.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-[#B1BAD3] shrink-0 font-mono-numbers">
                  <span>{t.replies} Replies</span>
                  <span className="hidden sm:inline">{t.views} Views</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
