import React from 'react';
import { X, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { WalletState } from '../types';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletName: string) => void;
}

export const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({
  isOpen,
  onClose,
  onConnect,
}) => {
  if (!isOpen) return null;

  const walletOptions = [
    {
      id: 'metamask',
      name: 'MetaMask',
      description: 'Connect with your MetaMask extension or mobile wallet',
      iconBg: 'bg-amber-50',
      badge: 'Popular',
      iconSvg: (
        <svg className="w-7 h-7 text-amber-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.5 8.7L18.7 2 12 7l-6.7-5L2.5 8.7l4 8.6L12 22l5.5-4.7 4-8.6zM12 16.5l-4-2.5 1.5-3.5 2.5 1.5 2.5-1.5 1.5 3.5-4 2.5z" />
        </svg>
      ),
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      description: 'Connect with your Coinbase mobile or browser app',
      iconBg: 'bg-blue-50',
      badge: null,
      iconSvg: (
        <svg className="w-7 h-7 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" />
          <rect x="8" y="8" width="8" height="8" rx="2" fill="#ffffff" />
        </svg>
      ),
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      description: 'Scan with Rainbow, Trust, or 100+ other mobile wallets',
      iconBg: 'bg-sky-50',
      badge: 'Multi-Chain',
      iconSvg: (
        <svg className="w-7 h-7 text-sky-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 9c3.3-3.3 8.7-3.3 12 0l-1.4 1.4c-2.5-2.5-6.7-2.5-9.2 0L6 9zm2.8 2.8c1.8-1.8 4.6-1.8 6.4 0l-1.4 1.4c-1-1-2.6-1-3.6 0l-1.4-1.4z" />
        </svg>
      ),
    },
    {
      id: 'phantom',
      name: 'Phantom',
      description: 'Connect with Phantom Solana and Ethereum wallet',
      iconBg: 'bg-purple-50',
      badge: null,
      iconSvg: (
        <svg className="w-7 h-7 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6 text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-xs font-bold text-[#8364e2] mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Secure Web3 Connect
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Connect Your Wallet
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Select your preferred wallet provider to collect, bid, and trade NFTs on Ultraverse.
          </p>
        </div>

        <div className="space-y-3">
          {walletOptions.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => {
                onConnect(wallet.name);
                onClose();
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 hover:border-[#8364e2] hover:bg-purple-50/20 shadow-sm hover:shadow transition-all group text-left cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-xl ${wallet.iconBg} flex items-center justify-center shrink-0`}>
                  {wallet.iconSvg}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#8364e2] transition-colors">
                      {wallet.name}
                    </h4>
                    {wallet.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-[#8364e2]">
                        {wallet.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {wallet.description}
                  </p>
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#8364e2] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-[11px] text-slate-400">
          By connecting your wallet, you agree to the Ultraverse Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};
