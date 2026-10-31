import React, { useState } from 'react';
import { X, Heart, Eye, CheckCircle2, ShieldCheck, Tag, ArrowUpRight } from 'lucide-react';
import { ItemDetails, WalletState } from '../types';

interface ItemDetailsModalProps {
  item: ItemDetails | null;
  isOpen: boolean;
  wallet: WalletState;
  onClose: () => void;
  onOpenWallet: () => void;
  onPlaceBidSuccess: (amount: number) => void;
}

export const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({
  item,
  isOpen,
  wallet,
  onClose,
  onOpenWallet,
  onPlaceBidSuccess,
}) => {
  const [bidAmount, setBidAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bidSuccess, setBidSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen || !item) return null;

  const ethPriceToUsd = (eth: number) => (eth * 3200).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!wallet.isConnected) {
      onOpenWallet();
      return;
    }

    const numBid = parseFloat(bidAmount);
    if (isNaN(numBid) || numBid <= 0) {
      setErrorMsg('Please enter a valid bid amount.');
      return;
    }

    if (numBid < item.price) {
      setErrorMsg(`Bid must be at least the current minimum price (${item.price} ETH).`);
      return;
    }

    if (numBid > wallet.balance) {
      setErrorMsg(`Insufficient wallet balance. You have ${wallet.balance.toFixed(2)} ETH.`);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setBidSuccess(true);
      onPlaceBidSuccess(numBid);
      setTimeout(() => {
        setBidSuccess(false);
        setBidAmount('');
      }, 3000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: NFT Preview Image */}
            <div className="md:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-lg bg-slate-50 group">
                <img
                  src={item.nftImage}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[460px] object-cover"
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500 px-1">
                <span className="flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#8364e2]" /> ERC-721 Smart Contract
                </span>
                <span className="flex items-center gap-1 font-mono">
                  Token ID: #{item.nftId}
                </span>
              </div>
            </div>

            {/* Right: NFT Details & Bidding */}
            <div className="md:col-span-6 space-y-6">
              <div>
                <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#8364e2] bg-purple-50 px-3 py-1 rounded-full mb-2">
                  {item.tag || 'Digital Art'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {item.title}
                </h2>

                <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 font-semibold">
                  <span className="flex items-center gap-1 font-mono">
                    <Eye className="w-3.5 h-3.5 text-slate-400" /> {item.views} Views
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 font-mono">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> {item.likes} Favorites
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>

              {/* Creator & Owner Cards */}
              <div className="grid grid-cols-2 gap-3 py-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={item.creatorImage}
                      alt={item.creatorName}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8364e2] fill-white absolute -bottom-0.5 -right-0.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Creator</p>
                    <p className="text-xs font-bold text-slate-800 truncate">{item.creatorName}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={item.ownerImage}
                      alt={item.ownerName}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8364e2] fill-white absolute -bottom-0.5 -right-0.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Owner</p>
                    <p className="text-xs font-bold text-slate-800 truncate">{item.ownerName}</p>
                  </div>
                </div>
              </div>

              {/* Price Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50/70 to-indigo-50/70 border border-purple-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Price</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-slate-900 font-mono tracking-tight">
                    {item.price} ETH
                  </span>
                  <span className="text-xs font-semibold text-slate-500 font-mono">
                    ({ethPriceToUsd(item.price)})
                  </span>
                </div>
              </div>

              {/* Place Bid Form */}
              <form onSubmit={handlePlaceBid} className="space-y-3 pt-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      step="0.01"
                      min={item.price}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder={`Min ${item.price} ETH`}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#8364e2] focus:outline-none text-sm font-semibold font-mono"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      ETH
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-[#8364e2] hover:bg-[#7251dc] active:scale-95 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-lg shadow-purple-500/25 transition-all cursor-pointer whitespace-nowrap"
                  >
                    {isSubmitting ? 'Submitting...' : wallet.isConnected ? 'Place a Bid' : 'Connect to Bid'}
                  </button>
                </div>

                {errorMsg && (
                  <p className="text-xs font-semibold text-rose-600 animate-in fade-in">
                    {errorMsg}
                  </p>
                )}

                {bidSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Bid successfully placed for {bidAmount} ETH!
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
