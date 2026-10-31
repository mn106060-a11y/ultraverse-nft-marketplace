import React from 'react';
import { Palette, Music, Globe, Box, Layers, Gem } from 'lucide-react';

interface BrowseByCategoryProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const BrowseByCategory: React.FC<BrowseByCategoryProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories = [
    { id: 'art', label: 'Art', icon: Palette, count: '14.2k items' },
    { id: 'music', label: 'Music', icon: Music, count: '8.5k items' },
    { id: 'domain-names', label: 'Domain Names', icon: Globe, count: '6.1k items' },
    { id: 'virtual-worlds', label: 'Virtual Worlds', icon: Box, count: '10.3k items' },
    { id: 'trading-cards', label: 'Trading Cards', icon: Layers, count: '7.8k items' },
    { id: 'collectibles', label: 'Collectibles', icon: Gem, count: '12.4k items' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-left" data-aos="fade-up" data-aos-duration="800">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Browse by category
          </h2>
          <div className="w-16 h-1 bg-[#8364e2] rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? 'all' : cat.id)}
                data-aos="fade-up"
                data-aos-delay={(idx + 1) * 80}
                data-aos-duration="700"
                className={`p-5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group ${
                  isSelected
                    ? 'border-[#8364e2] bg-[#8364e2]/5 shadow-md shadow-purple-500/10'
                    : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-lg hover:-translate-y-1'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-[#8364e2] text-white shadow-md shadow-purple-500/30'
                      : 'bg-slate-50 text-slate-700 group-hover:bg-[#8364e2] group-hover:text-white group-hover:shadow-md group-hover:shadow-purple-500/20'
                  }`}
                >
                  <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 tracking-tight">{cat.label}</h4>
                  <p className="text-[11px] font-medium text-slate-400 mt-0.5">{cat.count}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
