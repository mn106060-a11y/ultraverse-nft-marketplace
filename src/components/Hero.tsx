import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section id="hero" className="relative pt-12 pb-20 md:py-24 overflow-hidden bg-gradient-to-b from-slate-50/50 via-white to-white">
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTA */}
          <div
            className="lg:col-span-6 space-y-6 text-left"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#8364e2]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8364e2]" />
              GIGALAND MARKET
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
              Create, sell or collect digital items.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
              Unit of data stored on a digital ledger, called a blockchain, that certifies a digital asset to be unique and therefore not interchangeable.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-[#8364e2] hover:bg-[#7251dc] active:scale-95 rounded-lg shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35 transition-all cursor-pointer"
              >
                Explore
              </button>
              <div className="flex items-center gap-3 text-xs text-slate-500 pl-2">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> Verified Contracts
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <Zap className="w-4 h-4 text-amber-500" /> Instant Minting
                </span>
              </div>
            </div>

            {/* Market stats bar */}
            <div className="pt-8 border-t border-slate-100 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <p className="text-2xl font-black text-slate-900 tracking-tight">120k+</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Digital Artworks</p>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 tracking-tight">85k+</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Live Auctions</p>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 tracking-tight">15k+</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Global Creators</p>
              </div>
            </div>
          </div>

          {/* Right Column: Isometric 3D NFT World Illustration - matching Screenshot 1 */}
          <div
            className="lg:col-span-6 relative flex items-center justify-center py-6"
            data-aos="fade-in"
            data-aos-delay="200"
            data-aos-duration="1200"
          >
            <div className="relative w-full max-w-[540px] aspect-square flex items-center justify-center">
              {/* Central Isometric NFT Cube */}
              <div className="relative z-20 animate-float">
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 drop-shadow-2xl">
                  {/* Isometric Cube SVG */}
                  <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-xl">
                    <defs>
                      <linearGradient id="topFacet" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#9d84ea" />
                        <stop offset="100%" stopColor="#8364e2" />
                      </linearGradient>
                      <linearGradient id="leftFacet" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#6242c7" />
                        <stop offset="100%" stopColor="#4c2fa8" />
                      </linearGradient>
                      <linearGradient id="rightFacet" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7a5ad8" />
                        <stop offset="100%" stopColor="#5a3bbb" />
                      </linearGradient>
                    </defs>

                    {/* Top Diamond Facet */}
                    <polygon points="100,20 170,60 100,100 30,60" fill="url(#topFacet)" />
                    {/* Left Facet */}
                    <polygon points="30,60 100,100 100,180 30,140" fill="url(#leftFacet)" />
                    {/* Right Facet */}
                    <polygon points="100,100 170,60 170,140 100,180" fill="url(#rightFacet)" />

                    {/* Left Face Content: Play button inside circle */}
                    <g transform="translate(48, 85) skewY(30) scale(0.65)">
                      <circle cx="28" cy="28" r="24" fill="#ffffff" />
                      <polygon points="24,18 38,28 24,38" fill="#6242c7" />
                    </g>

                    {/* Right Face Content: "NFT" text */}
                    <g transform="translate(112, 122) skewY(-30) scale(0.9)">
                      <text x="0" y="0" fill="#ffffff" fontSize="24" fontWeight="900" letterSpacing="2">NFT</text>
                    </g>
                  </svg>
                </div>
              </div>

              {/* Connecting Dashed Geometric Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-300 -z-0" viewBox="0 0 500 500" fill="none">
                <line x1="250" y1="210" x2="390" y2="130" strokeDasharray="4 4" strokeWidth="1.5" />
                <line x1="250" y1="210" x2="390" y2="310" strokeDasharray="4 4" strokeWidth="1.5" />
                <line x1="250" y1="250" x2="360" y2="420" strokeDasharray="4 4" strokeWidth="1.5" />
                <line x1="250" y1="250" x2="190" y2="410" strokeDasharray="4 4" strokeWidth="1.5" />
                <line x1="220" y1="240" x2="110" y2="310" strokeDasharray="4 4" strokeWidth="1.5" />
                <line x1="220" y1="210" x2="100" y2="160" strokeDasharray="4 4" strokeWidth="1.5" />
                <line x1="250" y1="180" x2="230" y2="80" strokeDasharray="4 4" strokeWidth="1.5" />
              </svg>

              {/* Floating Node 1: Top-Right Document with Chain Badge */}
              <div className="absolute top-10 right-14 sm:right-20 z-10 animate-float-reverse">
                <div className="p-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-purple-100 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center border border-purple-200">
                    <div className="w-4 h-4 rounded-full border-2 border-[#8364e2]" />
                  </div>
                  <div className="w-6 h-6 -mt-2 -mr-8 rounded-full bg-amber-400 flex items-center justify-center shadow text-white text-[10px]">
                    🔗
                  </div>
                </div>
              </div>

              {/* Floating Node 2: Top Cube */}
              <div className="absolute top-6 left-1/3 z-10 animate-float">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center shadow-md">
                  <div className="w-4 h-4 bg-indigo-400/30 rotate-45 rounded-sm" />
                </div>
              </div>

              {/* Floating Node 3: Right Play Video Card */}
              <div className="absolute top-1/2 right-4 sm:right-8 -translate-y-8 z-10 animate-float">
                <div className="p-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-purple-100 flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#8364e2] flex items-center justify-center text-white shadow-md shadow-purple-500/30">
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20 6 4"/></svg>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-amber-500/90 flex items-center justify-center text-white text-[10px] shadow">
                    🔗
                  </div>
                </div>
              </div>

              {/* Floating Node 4: Right Checkmark Card */}
              <div className="absolute top-28 right-2 sm:right-6 z-10 animate-float-reverse">
                <div className="w-12 h-12 bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-slate-100 flex items-center justify-center">
                  <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-[#8364e2]">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                </div>
              </div>

              {/* Floating Node 5: Purple Speech Bubble */}
              <div className="absolute top-1/3 right-24 sm:right-28 z-10 animate-float-slow">
                <div className="w-9 h-8 bg-[#8364e2] rounded-xl rounded-bl-none flex items-center justify-center text-white text-xs shadow-md">
                  ···
                </div>
              </div>

              {/* Floating Node 6: Left Big Circular Node with Document */}
              <div className="absolute top-1/2 left-2 sm:left-6 -translate-y-12 z-10 animate-float-reverse">
                <div className="p-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full border-2 border-[#8364e2]" />
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  </div>
                </div>
              </div>

              {/* Floating Node 7: Left Play Button */}
              <div className="absolute top-1/3 left-10 sm:left-14 z-10 animate-float">
                <div className="w-11 h-11 rounded-full bg-[#8364e2] text-white flex items-center justify-center shadow-lg shadow-purple-500/30 cursor-pointer hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 fill-white ml-0.5" viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20 6 4"/></svg>
                </div>
              </div>

              {/* Floating Node 8: Bottom-Left Checkmark Card */}
              <div className="absolute bottom-10 left-12 sm:left-24 z-10 animate-float">
                <div className="p-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#8364e2]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center text-white text-[9px] shadow">
                    🔗
                  </div>
                </div>
              </div>

              {/* Floating Node 9: Bottom-Right Linked Circle */}
              <div className="absolute bottom-12 right-14 sm:right-28 z-10 animate-float-reverse">
                <div className="p-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full border-2 border-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
