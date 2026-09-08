import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { Award, ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';

export default function Sponsorships() {
  return (
    <MainLayout>
      <Head title="Velox Official Sponsorships & Partners" />

      <div className="max-w-6xl mx-auto space-y-8 pb-16">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-600/30 via-[#1A2C38] to-[#0F212E] border border-amber-500/30 shadow-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>OFFICIAL PARTNERSHIPS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Velox Sponsorships & Partners</h1>
          <p className="text-sm text-[#B1BAD3]">Velox Play is proud to partner with leading esports teams, gaming creators, and software providers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl bg-[#1A2C38] border border-[#213743] space-y-4">
            <Award className="w-10 h-10 text-amber-400" />
            <h2 className="text-xl font-bold text-white">Esports & Gaming Creators</h2>
            <p className="text-xs text-[#B1BAD3] leading-relaxed">
              We collaborate with top gaming streamers, content creators, and competitive gaming teams worldwide. Interested in a sponsorship? Contact our marketing team.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#1A2C38] border border-[#213743] space-y-4">
            <ShieldCheck className="w-10 h-10 text-[#1475E1]" />
            <h2 className="text-xl font-bold text-white">Certified Game Providers</h2>
            <p className="text-xs text-[#B1BAD3] leading-relaxed">
              Our catalog features certified slots and live casino software powered by Nexus GGR, Pragmatic Play, Hacksaw Gaming, Evolution, and NetEnt.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
