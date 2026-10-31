import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, CheckCircle2, Clock } from 'lucide-react';
import { NewItem } from '../types';

interface NewItemsProps {
  items: NewItem[];
  isLoading: boolean;
  showSkeleton: boolean;
  onSelectItem: (item: NewItem) => void;
  onSelectAuthor: (authorId: number) => void;
}

export const NewItems: React.FC<NewItemsProps> = ({
  items,
  isLoading,
  showSkeleton,
  onSelectItem,
  onSelectAuthor,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [likedItems, setLikedItems] = useState<Record<number, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});
  const [now, setNow] = useState(Date.now());
  const itemsPerPage = 4;

  // Real-time ticking timer for all active countdowns
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(items.length - itemsPerPage, prev + 1));
  };

  const toggleLike = (e: React.MouseEvent, id: number, currentLikes: number) => {
    e.stopPropagation();
    const isLiked = !!likedItems[id];
    setLikedItems((prev) => ({ ...prev, [id]: !isLiked }));
    setLikeCounts((prev) => ({
      ...prev,
      [id]: (prev[id] ?? currentLikes) + (isLiked ? -1 : 1),
    }));
  };

  const formatCountdown = (expiryDate: number) => {
    if (!expiryDate) return null;
    const remainingMs = expiryDate - now;
    if (remainingMs <= 0) return 'Expired';

    const hours = Math.floor(remainingMs / (1000 * 60 * 60));
    const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const shouldShowSkeleton = isLoading || showSkeleton;

  return (
    <section id="new-items" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              New Items
            </h2>
            <div className="w-16 h-1 bg-[#8364e2] rounded-full mt-2" />
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={startIndex === 0 || shouldShowSkeleton}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-slate-700 shadow-sm transition-all"
              aria-label="Previous new items"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={startIndex >= items.length - itemsPerPage || shouldShowSkeleton}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-slate-700 shadow-sm transition-all"
              aria-label="Next new items"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {shouldShowSkeleton ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={`skeleton-new-${idx}`}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm"
              >
                <div className="w-full h-52 rounded-xl skeleton-shimmer mb-4" />
                <div className="w-3/4 h-4 rounded skeleton-shimmer mb-2" />
                <div className="w-1/2 h-4 rounded skeleton-shimmer mb-4" />
                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <div className="w-16 h-4 rounded skeleton-shimmer" />
                  <div className="w-10 h-4 rounded skeleton-shimmer" />
                </div>
              </div>
            ))
          ) : (
            items.slice(startIndex, startIndex + itemsPerPage).map((item, idx) => {
              const countdown = formatCountdown(item.expiryDate);
              const isLiked = !!likedItems[item.id];
              const likes = likeCounts[item.id] ?? item.likes;

              return (
                <div
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-delay={(idx + 1) * 100}
                  data-aos-duration="800"
                  className="group bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Top: Image, Author, Countdown */}
                  <div>
                    <div
                      onClick={() => onSelectItem(item)}
                      className="relative w-full h-56 rounded-xl overflow-hidden cursor-pointer bg-slate-100 mb-4"
                    >
                      <img
                        src={item.nftImage}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Author Avatar with Verified Badge */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectAuthor(item.authorId);
                        }}
                        className="absolute top-3 left-3 z-10 cursor-pointer hover:scale-105 transition-transform"
                        title="View creator profile"
                      >
                        <div className="relative">
                          <img
                            src={item.authorImage}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md bg-white"
                          />
                          <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5 shadow-sm">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#8364e2] fill-[#8364e2] text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Live Ticking Countdown Timer */}
                      {countdown && (
                        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200/80 shadow-md flex items-center gap-1.5 text-xs font-bold text-slate-800">
                          <Clock className="w-3.5 h-3.5 text-[#8364e2] animate-spin" style={{ animationDuration: '8s' }} />
                          <span className="font-mono tabular-nums">{countdown}</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => onSelectItem(item)}
                      className="font-bold text-slate-900 text-base hover:text-[#8364e2] cursor-pointer transition-colors truncate"
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Bottom: Price & Likes */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Price</p>
                      <p className="text-sm font-bold text-slate-900 font-mono tabular-nums">{item.price} ETH</p>
                    </div>

                    {/* Interactive Like Button */}
                    <button
                      onClick={(e) => toggleLike(e, item.id, item.likes)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isLiked
                          ? 'bg-rose-50 text-rose-600'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 transition-transform ${
                          isLiked ? 'fill-rose-500 text-rose-500 scale-110' : ''
                        }`}
                      />
                      <span className="font-mono tabular-nums">{likes}</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
