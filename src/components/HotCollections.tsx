import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { CollectionItem } from '../types';

interface HotCollectionsProps {
  collections: CollectionItem[];
  isLoading: boolean;
  showSkeleton: boolean;
  onSelectCollection: (item: CollectionItem) => void;
  onSelectAuthor: (authorId: number) => void;
}

export const HotCollections: React.FC<HotCollectionsProps> = ({
  collections,
  isLoading,
  showSkeleton,
  onSelectCollection,
  onSelectAuthor,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4; // desktop visible items

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(collections.length - itemsPerPage, prev + 1));
  };

  const shouldShowSkeleton = isLoading || showSkeleton;

  return (
    <section id="hot-collections" className="py-16 md:py-20 bg-slate-50/60 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Hot Collections
            </h2>
            <div className="w-16 h-1 bg-[#8364e2] rounded-full mt-2" />
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={startIndex === 0 || shouldShowSkeleton}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-slate-700 shadow-sm transition-all"
              aria-label="Previous collections"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={startIndex >= collections.length - itemsPerPage || shouldShowSkeleton}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-slate-700 shadow-sm transition-all"
              aria-label="Next collections"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {shouldShowSkeleton ? (
            // Skeleton Loader cards for Module 8 & 9 verification
            Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={`skeleton-coll-${idx}`}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm overflow-hidden"
              >
                <div className="w-full h-44 rounded-xl skeleton-shimmer mb-6" />
                <div className="flex flex-col items-center -mt-10">
                  <div className="w-14 h-14 rounded-full border-4 border-white skeleton-shimmer shadow-sm mb-3" />
                  <div className="w-28 h-4 rounded skeleton-shimmer mb-2" />
                  <div className="w-16 h-3 rounded skeleton-shimmer" />
                </div>
              </div>
            ))
          ) : (
            collections.slice(startIndex, startIndex + itemsPerPage).map((item, idx) => (
              <div
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={(idx + 1) * 100}
                data-aos-duration="800"
                className="group bg-white rounded-2xl p-4 border border-slate-100/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* NFT Image Container */}
                <div
                  onClick={() => onSelectCollection(item)}
                  className="relative w-full h-44 rounded-xl overflow-hidden cursor-pointer bg-slate-100"
                >
                  <img
                    src={item.nftImage}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Author Avatar with Verified Badge */}
                <div className="flex flex-col items-center -mt-7 relative z-10">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectAuthor(item.authorId);
                    }}
                    className="relative cursor-pointer hover:scale-105 transition-transform"
                    title="View creator profile"
                  >
                    <img
                      src={item.authorImage}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-13 h-13 rounded-full object-cover border-[3px] border-white shadow-md bg-white"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#8364e2] fill-[#8364e2] text-white" />
                    </div>
                  </div>

                  {/* Title & ERC Code */}
                  <div className="text-center mt-3 w-full">
                    <h3
                      onClick={() => onSelectCollection(item)}
                      className="font-bold text-slate-900 text-base hover:text-[#8364e2] cursor-pointer transition-colors truncate px-2"
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                      ERC-{item.code}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
