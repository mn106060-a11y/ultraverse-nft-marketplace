import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7251dc] to-[#8364e2] flex items-center justify-center text-white shadow-md">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polygon points="12 2 2 8.5 12 22 22 8.5 12 2" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black text-white tracking-tight">ULTRAVERSE</span>
                <span className="text-[9px] font-bold tracking-[0.2em] text-[#8364e2]">NFT WORLD</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The premier marketplace for non-fungible tokens. Discover extraordinary digital collectibles, connect with artists, and participate in next-generation auctions.
            </p>

            <form onSubmit={handleSubscribe} className="pt-2 max-w-sm">
              <p className="text-xs font-semibold text-slate-300 mb-2">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#8364e2] flex-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#8364e2] hover:bg-[#7251dc] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Thank you for subscribing!
                </p>
              )}
            </form>
          </div>

          {/* Column 1: Marketplace */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#explore" className="hover:text-white transition-colors">All NFTs</a></li>
              <li><a href="#explore" className="hover:text-white transition-colors">Digital Art</a></li>
              <li><a href="#explore" className="hover:text-white transition-colors">Music Tracks</a></li>
              <li><a href="#explore" className="hover:text-white transition-colors">Domain Names</a></li>
              <li><a href="#explore" className="hover:text-white transition-colors">Virtual Worlds</a></li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><span className="hover:text-white transition-colors cursor-pointer">Help Center</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Platform Status</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Partners</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Documentation</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Taxes & Audits</span></li>
            </ul>
          </div>

          {/* Column 3: Community */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Community
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><span className="hover:text-white transition-colors cursor-pointer">Twitter (X)</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Discord Community</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Telegram Announcements</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Developer Forum</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Frontend Simplified Alumni</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Ultraverse NFT World. Frontend Simplified Virtual Internship Project.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Security Audit</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
