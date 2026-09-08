import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { BookOpen, Sparkles, Trophy, ArrowRight } from 'lucide-react';

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: 'Welcome to Velox Play: The Next-Gen Social Gaming Platform',
      category: 'ANNOUNCEMENTS',
      date: 'Sep 8, 2026',
      readTime: '3 min read',
      excerpt: 'Discover our new VIP progression, instant SC deposits, and 150+ top games from Pragmatic Play, Hacksaw, and NetEnt.',
    },
    {
      id: 2,
      title: 'How Social Coins (SC) and VIP XP Work in Velox Play',
      category: 'GUIDE',
      date: 'Sep 5, 2026',
      readTime: '5 min read',
      excerpt: 'Learn how to maximize your SC deposit bonus tiers up to +30% and level up your account to VIP Level 10.',
    },
    {
      id: 3,
      title: 'Weekly SC Raffle & Daily Wheel Rewards Guide',
      category: 'PROMOTIONS',
      date: 'Sep 1, 2026',
      readTime: '4 min read',
      excerpt: 'Spin the wheel every 24 hours for guaranteed SC rewards and collect raffle tickets with every deposit.',
    },
  ];

  return (
    <MainLayout>
      <Head title="Velox Blog & News" />

      <div className="max-w-6xl mx-auto space-y-8 pb-16">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900/40 via-[#1A2C38] to-[#0F212E] border border-blue-500/30 shadow-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1475E1]/20 border border-[#1475E1]/30 rounded-full text-blue-400 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>OFFICIAL NEWS & ARTICLES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Velox News & Updates</h1>
          <p className="text-sm text-[#B1BAD3]">Stay up to date with game releases, platform updates, and promo guides.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="p-6 rounded-2xl bg-[#1A2C38] border border-[#213743] hover:border-[#1475E1]/60 flex flex-col justify-between space-y-4 transition-all hover:-translate-y-1">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="px-2 py-0.5 bg-[#1475E1]/20 text-blue-400 rounded-md border border-[#1475E1]/30">
                    {post.category}
                  </span>
                  <span className="text-[#557086]">{post.date}</span>
                </div>
                <h3 className="text-lg font-bold text-white leading-snug">{post.title}</h3>
                <p className="text-xs text-[#B1BAD3] leading-relaxed">{post.excerpt}</p>
              </div>

              <div className="pt-4 border-t border-[#213743] flex items-center justify-between text-xs text-[#1475E1] font-bold">
                <span>{post.readTime}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
