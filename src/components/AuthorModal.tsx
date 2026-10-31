import React, { useState } from 'react';
import { X, CheckCircle2, Copy, Check, Users, Heart } from 'lucide-react';
import { AuthorDetails } from '../types';

interface AuthorModalProps {
  author: AuthorDetails | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectNft: (nftId: number) => void;
}

export const AuthorModal: React.FC<AuthorModalProps> = ({
  author,
  isOpen,
  onClose,
  onSelectNft,
}) => {
  const [copied, setCopied] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState<number>(author?.followers || 573);

  if (!isOpen || !author) return null;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(author.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowerCount((prev) => prev - 1);
    } else {
      setIsFollowing(true);
      setFollowerCount((prev) => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto flex-1">
          {/* Header Banner */}
          <div className="h-44 sm:h-52 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 relative">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>

          {/* Author Profile Header */}
          <div className="px-6 sm:px-8 pb-6 -mt-16 sm:-mt-20 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex items-end gap-4">
                <div className="relative">
                  <img
                    src={author.authorImage}
                    alt={author.authorName}
                    referrerPolicy="no-referrer"
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white shadow-xl bg-white"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                    <CheckCircle2 className="w-5 h-5 text-[#8364e2] fill-[#8364e2] text-white" />
                  </div>
                </div>

                <div className="mb-2">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    {author.authorName}
                  </h3>
                  <p className="text-xs font-semibold text-[#8364e2] mt-0.5">
                    @{author.tag}
                  </p>
                </div>
              </div>

              {/* Follow Button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleFollow}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    isFollowing
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      : 'bg-[#8364e2] hover:bg-[#7251dc] text-white shadow-purple-500/20'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>

            {/* Address & Stats Row */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs">
              <button
                onClick={handleCopyAddress}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono transition-colors"
                title="Click to copy full address"
              >
                <span>{`${author.address.slice(0, 10)}...${author.address.slice(-8)}`}</span>
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                {copied && <span className="text-[11px] font-sans font-bold text-emerald-600">Copied!</span>}
              </button>

              <div className="flex items-center gap-1.5 font-semibold text-slate-600">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="font-bold text-slate-900 font-mono tabular-nums">{followerCount}</span>
                <span>Followers</span>
              </div>
            </div>

            {/* Author NFT Collection */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <h4 className="text-base font-bold text-slate-900 mb-4">
                Created Items ({author.nftCollection?.length || 0})
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {author.nftCollection?.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectNft(item.id)}
                    className="group bg-white rounded-xl p-3 border border-slate-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all cursor-pointer"
                  >
                    <div className="w-full h-36 rounded-lg overflow-hidden bg-slate-100 mb-2.5">
                      <img
                        src={item.nftImage}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h5 className="font-bold text-sm text-slate-900 truncate group-hover:text-[#8364e2] transition-colors">
                      {item.title}
                    </h5>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs">
                      <span className="font-mono font-bold text-slate-800">{item.price} ETH</span>
                      <span className="flex items-center gap-1 text-slate-500 font-mono">
                        <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> {item.likes}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
