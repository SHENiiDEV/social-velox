import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
  Gift, 
  Trophy, 
  Users, 
  Crown, 
  BookOpen, 
  MessageSquare, 
  Award, 
  ShieldCheck, 
  Headphones, 
  Globe, 
  ChevronDown, 
  ChevronRight,
  Gamepad2,
  Sparkles,
  Coins
} from 'lucide-react';

export default function LeftSidebar({ isOpen, currentCategory = 'all' }) {
  const { auth } = usePage().props;
  const [promosOpen, setPromosOpen] = useState(false);
  const [sponsorsOpen, setSponsorsOpen] = useState(false);

  const mainNav = [
    { name: 'Promotions', icon: Gift, hasSub: true, open: promosOpen, setOpen: setPromosOpen },
    { name: 'Challenges', icon: Trophy, hasSub: false, link: '/#challenges' },
    { name: 'Affiliate', icon: Users, hasSub: false, link: '/#affiliate' },
    { name: 'VIP Club', icon: Crown, hasSub: false, link: '/#vip' },
    { name: 'Blog', icon: BookOpen, hasSub: false, link: '/#blog' },
    { name: 'Forum', icon: MessageSquare, hasSub: false, link: '/#forum' },
  ];

  const secondaryNav = [
    { name: 'Sponsorships', icon: Award, hasSub: true, open: sponsorsOpen, setOpen: setSponsorsOpen },
    { name: 'Responsible Gambling', icon: ShieldCheck, hasSub: false, link: '/responsible-gaming' },
    { name: 'Live Support', icon: Headphones, hasSub: false, link: '/#support' },
    { name: 'Language: English', icon: Globe, hasSub: true },
  ];

  return (
    <aside className={`fixed left-0 top-16 bottom-0 z-30 bg-[#0F212E] border-r border-[#213743] transition-all duration-300 flex flex-col ${
      isOpen ? 'w-60' : 'w-0 -translate-x-full lg:w-16 lg:translate-x-0'
    }`}>
      <div className="p-3 space-y-4 overflow-y-auto flex-1 text-xs">
        {/* Main Navigation Stack */}
        <div className="space-y-1">
          {mainNav.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.name}>
                <button
                  onClick={() => item.hasSub && item.setOpen(!item.open)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-[#B1BAD3] hover:text-white hover:bg-[#1A2C38] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#1475E1] shrink-0 group-hover:scale-110 transition-transform" />
                    <span className={`truncate ${!isOpen && 'lg:hidden'}`}>{item.name}</span>
                  </div>
                  {item.hasSub && (
                    <ChevronDown className={`w-3.5 h-3.5 text-[#557086] transition-transform ${item.open ? 'rotate-180' : ''} ${!isOpen && 'lg:hidden'}`} />
                  )}
                </button>

                {/* Submenu accordion */}
                {item.hasSub && item.open && isOpen && (
                  <div className="pl-9 pr-3 py-1 space-y-1 text-[#B1BAD3]">
                    <a href="/#promo1" className="block py-1 hover:text-white transition-colors">Daily VIP Race</a>
                    <a href="/#promo2" className="block py-1 hover:text-white transition-colors">Weekly SC Raffle</a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-[#213743] my-2" />

        {/* Secondary Navigation */}
        <div className="space-y-1">
          {secondaryNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.link || '#'}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-[#B1BAD3] hover:text-white hover:bg-[#1A2C38] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-[#557086] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className={`truncate ${!isOpen && 'lg:hidden'}`}>{item.name}</span>
                </div>
                {item.hasSub && (
                  <ChevronDown className={`w-3.5 h-3.5 text-[#557086] ${!isOpen && 'lg:hidden'}`} />
                )}
              </Link>
            );
          })}
        </div>

        {/* Admin Suite Option if Admin */}
        {auth.user?.is_admin && (
          <div className="pt-4 border-t border-[#213743]">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all"
            >
              <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />
              <span className={`truncate ${!isOpen && 'lg:hidden'}`}>Admin Control Panel</span>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
