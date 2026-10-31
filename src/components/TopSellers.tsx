import React from 'react';
import { CheckCircle2, TrendingUp } from 'lucide-react';
import { TopSeller } from '../types';

interface TopSellersProps {
  sellers: TopSeller[];
  isLoading: boolean;
  showSkeleton: boolean;
  onSelectAuthor: (authorId: number) => void;
}

export const TopSellers: React.FC<TopSellersProps> = ({
  sellers,
  isLoading,
  showSkeleton,
  onSelectAuthor,
}) => {
  const shouldShowSkeleton = isLoading || showSkeleton;

  return (
    <section id="top-sellers" className="py-16 md:py-20 bg-slate-50/60 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10" data-aos="fade-up" data-aos-duration="800">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8364e2] uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" /> Leaderboard
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Top Sellers
          </h2>
          <div className="w-16 h-1 bg-[#8364e2] rounded-full mt-2" />
        </div>

        {/* 12 Sellers in a 4-column responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {shouldShowSkeleton ? (
            Array.from({ length: 12 }).map((_, idx) => (
              <div
                key={`skeleton-seller-${idx}`}
                className="flex items-center gap-3.5 p-3.5 bg-white rounded-xl border border-slate-100 shadow-sm"
              >
                <div className="w-5 h-4 rounded skeleton-shimmer" />
                <div className="w-12 h-12 rounded-full skeleton-shimmer" />
                <div className="flex-1 space-y-2">
                  <div className="w-24 h-4 rounded skeleton-shimmer" />
                  <div className="w-14 h-3 rounded skeleton-shimmer" />
                </div>
              </div>
            ))
          ) : (
            sellers.map((seller, idx) => (
              <div
                key={seller.id}
                data-aos="fade-up"
                data-aos-delay={(idx % 4) * 80}
                data-aos-duration="700"
                onClick={() => onSelectAuthor(seller.authorId)}
                className="group flex items-center gap-3.5 p-3.5 bg-white rounded-xl border border-slate-100/90 shadow-sm hover:shadow-md hover:border-purple-200 transition-all cursor-pointer"
              >
                {/* Numerical Rank */}
                <span className="font-extrabold text-xs text-slate-400 group-hover:text-[#8364e2] w-5 text-right font-mono tabular-nums transition-colors">
                  {idx + 1}.
                </span>

                {/* Avatar with Verified Badge */}
                <div className="relative shrink-0">
                  <img
                    src={seller.authorImage}
                    alt={seller.authorName}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border border-slate-100 shadow-sm group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8364e2] fill-[#8364e2] text-white" />
                  </div>
                </div>

                {/* Name & Sales */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#8364e2] transition-colors truncate">
                    {seller.authorName}
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 font-mono tabular-nums mt-0.5">
                    {seller.price} ETH
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
