import React from 'react';
import { Crown, Trophy } from 'lucide-react';

export default function VipProgressBadge({ vipLevel = 1, vipPoints = 0 }) {
  const levels = [
    { level: 1, name: 'Bronze', target: 1000, color: 'text-amber-600 bg-amber-950/40 border-amber-800/50' },
    { level: 2, name: 'Bronze II', target: 2500, color: 'text-amber-500 bg-amber-950/40 border-amber-700/50' },
    { level: 3, name: 'Silver', target: 5000, color: 'text-slate-300 bg-slate-800/50 border-slate-600/50' },
    { level: 5, name: 'Gold', target: 10000, color: 'text-yellow-400 bg-yellow-950/40 border-yellow-700/50' },
    { level: 8, name: 'Platinum', target: 25000, color: 'text-cyan-300 bg-cyan-950/40 border-cyan-700/50' },
    { level: 10, name: 'Diamond Whale', target: 100000, color: 'text-purple-300 bg-purple-950/40 border-purple-700/50' },
  ];

  const currentLevelInfo = levels.find(l => l.level === vipLevel) || levels[0];
  const nextLevelInfo = levels.find(l => l.level > vipLevel) || currentLevelInfo;
  const progressPercent = Math.min(100, Math.round((vipPoints / nextLevelInfo.target) * 100));

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${currentLevelInfo.color}`}>
      <Crown className="w-3.5 h-3.5 animate-pulse" />
      <span>{currentLevelInfo.name}</span>
      <div className="w-12 bg-slate-900/80 rounded-full h-1.5 overflow-hidden border border-slate-700/50">
        <div 
          className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full transition-all duration-500" 
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <span className="font-mono-numbers text-[10px] text-slate-400">{progressPercent}%</span>
    </div>
  );
}
