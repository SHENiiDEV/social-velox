import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import Header from '../Components/Header';
import LeftSidebar from '../Components/LeftSidebar';
import RightChatSidebar from '../Components/RightChatSidebar';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

export default function MainLayout({ children, currentCategory = 'all', liveWins = [] }) {
  const { auth } = usePage().props;
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightChatOpen, setRightChatOpen] = useState(true);

  return (
    <div className="min-h-[100dvh] bg-[#0F212E] text-white flex flex-col font-sans selection:bg-[#1475E1] selection:text-white">
      {/* Top Header */}
      <Header
        onToggleLeftSidebar={() => setLeftSidebarOpen(!leftSidebarOpen)}
        onToggleRightChat={() => setRightChatOpen(!rightChatOpen)}
      />

      {/* Main 3-Column Layout Container */}
      <div className="flex-1 flex relative overflow-x-hidden">
        {/* Left Navigation Sidebar */}
        <LeftSidebar isOpen={leftSidebarOpen} currentCategory={currentCategory} />

        {/* Center Main Content Region */}
        <main
          className={`flex-1 transition-all duration-300 min-w-0 p-4 lg:p-6 ${
            leftSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'
          } ${rightChatOpen ? 'xl:mr-80' : 'mr-0'}`}
        >
          {children}
        </main>

        {/* Right Community Live Chat & Wins Sidebar */}
        <RightChatSidebar
          isOpen={rightChatOpen}
          onClose={() => setRightChatOpen(false)}
          liveWins={liveWins}
        />
      </div>

      {/* Full Screen Ban Enforcement Modal */}
      {auth.user?.is_banned && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6 text-center animate-fadeIn">
          <div className="max-w-md w-full bg-[#1A2C38] border border-red-500/50 rounded-2xl p-8 shadow-2xl space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-white">ACCOUNT BLOCKED</h2>
            <p className="text-sm text-red-400">
              {auth.user.ban_reason || 'Your account has been restricted by administration governance.'}
            </p>
            <div className="p-3 bg-[#0F212E] rounded-xl border border-[#213743] text-xs font-mono-numbers text-[#B1BAD3]">
              Case ID: {auth.user.ban_case_number || 'CASE_RESTRICTED'}
            </div>
            <p className="text-xs text-[#557086]">
              All game launch callbacks and seamless transactions are strictly disabled under NexusGGR protocol.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
