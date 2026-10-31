import React, { useState } from 'react';
import { Search, Menu, X, Sparkles, RefreshCw, Eye, ExternalLink } from 'lucide-react';
import { WalletState } from '../types';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  wallet: WalletState;
  onOpenWalletModal: () => void;
  onDisconnectWallet: () => void;
  onNavigateSection: (sectionId: string) => void;
  showSkeleton: boolean;
  onToggleSkeleton: () => void;
  onReplayAnimations: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  wallet,
  onOpenWalletModal,
  onDisconnectWallet,
  onNavigateSection,
  showSkeleton,
  onToggleSkeleton,
  onReplayAnimations,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);

  const truncateAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 py-3 sm:h-20 sm:py-0 sm:gap-8">
          {/* Brand Logo Zone - matching Screenshot 1 */}
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigateSection('hero');
              }}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7251dc] to-[#8364e2] flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polygon points="12 2 2 8.5 12 22 22 8.5 12 2" />
                  <line x1="2" y1="8.5" x2="22" y2="8.5" />
                  <line x1="12" y1="2" x2="12" y2="22" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-extrabold tracking-tight text-[#1e293b]">
                  ULTRAVERSE
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#8364e2]">
                  NFT WORLD
                </span>
              </div>
            </a>
          </div>

          {/* Search Bar - matching Screenshot 1 */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md mx-2">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="search item here..."
                className="w-full pl-10 pr-4 py-2 bg-[#f8f9fc] hover:bg-slate-100/90 focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-lg border border-transparent focus:border-[#8364e2] focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Navigation Links Zone */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <button
              onClick={() => onNavigateSection('hero')}
              className="hover:text-[#8364e2] transition-colors whitespace-nowrap"
            >
              Home
            </button>
            <button
              onClick={() => onNavigateSection('explore')}
              className="hover:text-[#8364e2] transition-colors whitespace-nowrap"
            >
              Explore
            </button>
            <button
              onClick={() => onNavigateSection('hot-collections')}
              className="hover:text-[#8364e2] transition-colors whitespace-nowrap"
            >
              Collections
            </button>
            <button
              onClick={() => onNavigateSection('top-sellers')}
              className="hover:text-[#8364e2] transition-colors whitespace-nowrap"
            >
              Top Sellers
            </button>
          </nav>

          {/* Primary Action Zone - Connect Wallet */}
          <div className="flex w-full sm:w-auto items-center justify-between gap-3 shrink-0">
            {wallet.isConnected ? (
              <div className="relative">
                <button
                  onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}
                  className="flex items-center gap-2.5 px-4 py-2.5 bg-[#8364e2]/10 hover:bg-[#8364e2]/20 border border-[#8364e2]/30 rounded-lg text-sm font-semibold text-[#7251dc] transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{truncateAddress(wallet.address)}</span>
                  <span className="hidden sm:inline text-xs bg-white px-2 py-0.5 rounded text-slate-600 font-bold border border-slate-200">
                    {wallet.balance.toFixed(2)} ETH
                  </span>
                </button>

                {walletDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400">Connected Wallet</p>
                      <p className="text-xs font-semibold text-slate-800 truncate">{wallet.address}</p>
                      <p className="text-xs font-bold text-[#8364e2] mt-0.5">{wallet.balance.toFixed(3)} ETH Balance</p>
                    </div>
                    <button
                      onClick={() => {
                        onDisconnectWallet();
                        setWalletDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors mt-1"
                    >
                      Disconnect Wallet
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenWalletModal}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#8364e2] hover:bg-[#7251dc] active:scale-95 rounded-lg shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all whitespace-nowrap"
              >
                Connect wallet
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-100 space-y-3">
            <div className="relative w-full mb-3">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="search item here..."
                className="w-full pl-10 pr-4 py-2 bg-[#f8f9fc] text-sm text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200"
              />
            </div>
            <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-700">
              <button
                onClick={() => {
                  onNavigateSection('hero');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 hover:bg-slate-50 rounded-lg"
              >
                Home
              </button>
              <button
                onClick={() => {
                  onNavigateSection('explore');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 hover:bg-slate-50 rounded-lg"
              >
                Explore
              </button>
              <button
                onClick={() => {
                  onNavigateSection('hot-collections');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 hover:bg-slate-50 rounded-lg"
              >
                Hot Collections
              </button>
              <button
                onClick={() => {
                  onNavigateSection('top-sellers');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 hover:bg-slate-50 rounded-lg"
              >
                Top Sellers
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
