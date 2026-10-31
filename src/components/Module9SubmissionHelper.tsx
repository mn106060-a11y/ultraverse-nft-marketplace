import React, { useState } from 'react';
import { Sparkles, Check, Copy, ExternalLink, ChevronUp, ChevronDown, CheckCircle2, Play, Eye, Terminal, Globe, Github } from 'lucide-react';

interface Module9SubmissionHelperProps {
  showSkeleton: boolean;
  onToggleSkeleton: () => void;
  onReplayAnimations: () => void;
}

export const Module9SubmissionHelper: React.FC<Module9SubmissionHelperProps> = ({
  showSkeleton,
  onToggleSkeleton,
  onReplayAnimations,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<'links' | 'deploy' | 'animations'>('links');
  const [copiedLive, setCopiedLive] = useState(false);
  const [copiedGithub, setCopiedGithub] = useState(false);
  const [copiedGitCommands, setCopiedGitCommands] = useState(false);

  // User's verified GitHub account and Vercel URLs
  const githubUsername = 'mn106060-a11y';
  const [repoName, setRepoName] = useState('ultraverse-nft-marketplace');
  const [vercelSubdomain, setVercelSubdomain] = useState('ultraverse-nft-marketplace-mn106060');

  const githubUrl = `https://github.com/${githubUsername}/${repoName}`;
  const vercelLiveUrl = `https://${vercelSubdomain}.vercel.app`;

  const gitCommands = `# 1. In your local project terminal:
git init
git add .
git commit -m "Complete Ultraverse NFT Marketplace with Module 9 Animations"
git branch -M main
git remote add origin https://github.com/${githubUsername}/${repoName}.git
git push -u origin main

# 2. Deploy to Vercel:
# Go to vercel.com/new -> Import '${githubUsername}/${repoName}' -> Click Deploy!`;

  const handleCopyLive = () => {
    navigator.clipboard.writeText(vercelLiveUrl);
    setCopiedLive(true);
    setTimeout(() => setCopiedLive(false), 2000);
  };

  const handleCopyGithub = () => {
    navigator.clipboard.writeText(githubUrl);
    setCopiedGithub(true);
    setTimeout(() => setCopiedGithub(false), 2000);
  };

  const handleCopyGitCommands = () => {
    navigator.clipboard.writeText(gitCommands);
    setCopiedGitCommands(true);
    setTimeout(() => setCopiedGitCommands(false), 2000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-md w-full">
      <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-slate-800 overflow-hidden">
        {/* Helper Header */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-800/80 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                Module 9 Submission Helper
              </p>
              <p className="text-[11px] text-purple-300 font-medium">
                GitHub ({githubUsername}) & Vercel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
              FES Portal Ready
            </span>
            {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
          </div>
        </div>

        {/* Collapsible Content */}
        {isExpanded && (
          <div className="p-4 border-t border-slate-800 space-y-4 text-xs animate-in slide-in-from-bottom-2 duration-200">
            {/* Tab navigation */}
            <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 text-[11px]">
              <button
                onClick={() => setActiveTab('links')}
                className={`flex-1 py-1.5 px-2 rounded-lg font-bold transition-all ${
                  activeTab === 'links'
                    ? 'bg-[#8364e2] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Submission Links
              </button>
              <button
                onClick={() => setActiveTab('deploy')}
                className={`flex-1 py-1.5 px-2 rounded-lg font-bold transition-all ${
                  activeTab === 'deploy'
                    ? 'bg-[#8364e2] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Vercel Deploy Guide
              </button>
              <button
                onClick={() => setActiveTab('animations')}
                className={`flex-1 py-1.5 px-2 rounded-lg font-bold transition-all ${
                  activeTab === 'animations'
                    ? 'bg-[#8364e2] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Animation Tools
              </button>
            </div>

            {/* TAB 1: SUBMISSION LINKS */}
            {activeTab === 'links' && (
              <div className="space-y-3 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">
                    Copy directly into FES portal form:
                  </p>
                </div>

                {/* Live Deployment URL (Vercel) */}
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-purple-400" />
                      1. "Insert your live link here" (Vercel)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={vercelLiveUrl}
                      readOnly
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-purple-300 focus:outline-none"
                    />
                    <button
                      onClick={handleCopyLive}
                      className="px-3 py-1.5 bg-[#8364e2] hover:bg-[#7251dc] active:scale-95 text-white rounded-lg font-bold text-xs flex items-center gap-1 shrink-0 transition-all cursor-pointer shadow-sm shadow-purple-500/30"
                    >
                      {copiedLive ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedLive ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>
                </div>

                {/* GitHub Repository URL */}
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                      <Github className="w-3.5 h-3.5 text-slate-300" />
                      2. "Link to your project's GitHub repository"
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={githubUrl}
                      readOnly
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none"
                    />
                    <button
                      onClick={handleCopyGithub}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-white rounded-lg font-bold text-xs flex items-center gap-1 shrink-0 transition-all cursor-pointer"
                    >
                      {copiedGithub ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedGithub ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>
                </div>

                {/* Repo customizer input if needed */}
                <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Repo Name:</span>
                  <input
                    type="text"
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-[11px] text-white w-48 text-right font-mono"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: VERCEL & GITHUB DEPLOYMENT */}
            {activeTab === 'deploy' && (
              <div className="space-y-3 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                <p className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">
                  How to push to <span className="text-purple-400">github.com/{githubUsername}</span> & Vercel:
                </p>

                <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-slate-300">
                  <li>
                    Go to{' '}
                    <a
                      href="https://github.com/new"
                      target="_blank"
                      rel="noreferrer"
                      className="text-purple-400 underline hover:text-purple-300 font-semibold inline-flex items-center gap-0.5"
                    >
                      github.com/new <ExternalLink className="w-3 h-3" />
                    </a>{' '}
                    and create repository: <strong className="text-white font-mono">{repoName}</strong>
                  </li>
                  <li>Run the git push commands in your terminal below:</li>
                </ol>

                <div className="relative bg-slate-900 border border-slate-800 rounded-xl p-2.5 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
                  <button
                    onClick={handleCopyGitCommands}
                    className="absolute top-2 right-2 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-[10px] font-sans font-bold flex items-center gap-1"
                  >
                    {copiedGitCommands ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {copiedGitCommands ? 'Copied!' : 'Copy Commands'}
                  </button>
                  <p className="text-slate-500 text-[10px]"># Git push to {githubUsername}</p>
                  git remote add origin https://github.com/{githubUsername}/{repoName}.git{'\n'}
                  git branch -M main{'\n'}
                  git push -u origin main
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">3. Connect to Vercel:</span>
                  <a
                    href="https://vercel.com/new"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-[#8364e2] hover:bg-[#7251dc] text-white rounded-lg font-bold text-[11px] inline-flex items-center gap-1 shadow-sm"
                  >
                    Open vercel.com/new <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* TAB 3: ANIMATIONS REVIEW */}
            {activeTab === 'animations' && (
              <div className="space-y-3">
                <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Module 9 Lesson 9 Animation Checks
                  </p>
                  <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>AOS package imported and initialized</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Fade-up with staggered delays on cards</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Hero floating isometric NFT cube & nodes</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Live ticking countdown timers on items</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Skeleton loading shimmer states</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onReplayAnimations}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 text-purple-400" />
                    Replay AOS
                  </button>
                  <button
                    onClick={onToggleSkeleton}
                    className={`flex-1 py-2 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      showSkeleton
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {showSkeleton ? 'Show Live Data' : 'Test Skeletons'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
