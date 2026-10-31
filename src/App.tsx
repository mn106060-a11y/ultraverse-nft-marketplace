import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import {
  CollectionItem,
  NewItem,
  TopSeller,
  ExploreItem,
  AuthorDetails,
  ItemDetails,
  WalletState,
} from './types';
import {
  fetchHotCollections,
  fetchNewItems,
  fetchTopSellers,
  fetchExplore,
  fetchAuthor,
  fetchItemDetails,
} from './services/api';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HotCollections } from './components/HotCollections';
import { NewItems } from './components/NewItems';
import { TopSellers } from './components/TopSellers';
import { BrowseByCategory } from './components/BrowseByCategory';
import { ExploreSection } from './components/ExploreSection';
import { AuthorModal } from './components/AuthorModal';
import { ItemDetailsModal } from './components/ItemDetailsModal';
import { ConnectWalletModal } from './components/ConnectWalletModal';

import { Footer } from './components/Footer';

export default function App() {
  // Data states
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [newItems, setNewItems] = useState<NewItem[]>([]);
  const [topSellers, setTopSellers] = useState<TopSeller[]>([]);
  const [exploreItems, setExploreItems] = useState<ExploreItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExploreLoading, setIsExploreLoading] = useState(false);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Review & Testing State (Module 9 Lesson 9)
  const [showSkeleton, setShowSkeleton] = useState(false);

  // Modals state
  const [authorDetails, setAuthorDetails] = useState<AuthorDetails | null>(null);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  // Wallet State
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: '',
    balance: 0,
    walletName: '',
  });

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Initialize AOS scroll animation library on load
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: 'ease-out-cubic',
      offset: 50,
    });
  }, []);

  // Fetch initial marketplace data
  useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true);
      try {
        const [cols, nItems, sellers, exp] = await Promise.all([
          fetchHotCollections(),
          fetchNewItems(),
          fetchTopSellers(),
          fetchExplore(),
        ]);
        setCollections(cols);
        setNewItems(nItems);
        setTopSellers(sellers);
        setExploreItems(exp);
      } catch (err) {
        console.error('Failed to load initial data:', err);
      } finally {
        setIsLoading(false);
        // Refresh AOS after content mounts
        setTimeout(() => {
          AOS.refresh();
        }, 150);
      }
    }

    loadInitialData();
  }, []);

  // Handle explore filter changes
  const handleFilterChange = async (filter: string) => {
    setSelectedFilter(filter);
    setIsExploreLoading(true);
    try {
      const filtered = await fetchExplore(filter);
      setExploreItems(filtered);
    } catch (err) {
      console.error('Failed to filter explore items:', err);
    } finally {
      setIsExploreLoading(false);
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }
  };

  // Handle opening Author modal
  const handleSelectAuthor = async (authorId: number) => {
    try {
      const author = await fetchAuthor(authorId);
      setAuthorDetails(author);
      setIsAuthorModalOpen(true);
    } catch (err) {
      console.error('Error fetching author details:', err);
    }
  };

  // Handle opening NFT item details modal
  const handleSelectItem = async (nftId: number) => {
    try {
      const details = await fetchItemDetails(nftId);
      setItemDetails(details);
      setIsItemModalOpen(true);
    } catch (err) {
      console.error('Error fetching item details:', err);
    }
  };

  // Handle wallet connection
  const handleConnectWallet = (walletName: string) => {
    const randomAddress = `0x71C8${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}38A9`;
    setWallet({
      isConnected: true,
      address: randomAddress,
      balance: 3.42,
      walletName,
    });
    showToast(`Successfully connected with ${walletName}!`);
  };

  const handleDisconnectWallet = () => {
    setWallet({
      isConnected: false,
      address: '',
      balance: 0,
      walletName: '',
    });
    showToast('Wallet disconnected.');
  };

  const handlePlaceBidSuccess = (amount: number) => {
    setWallet((prev) => ({
      ...prev,
      balance: Math.max(0, prev.balance - amount),
    }));
    showToast(`Bid confirmed for ${amount} ETH!`);
  };

  const handleReplayAnimations = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      AOS.refreshHard();
      showToast('AOS animations reloaded and refreshed!');
    }, 400);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter explore items by search query if user types in search bar
  const filteredExploreItems = exploreItems.filter((item) => {
    if (!searchQuery) return true;
    return item.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-purple-500/30 flex items-center gap-3 text-xs font-semibold animate-in slide-in-from-top-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#8364e2] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        wallet={wallet}
        onOpenWalletModal={() => setIsWalletModalOpen(true)}
        onDisconnectWallet={handleDisconnectWallet}
        onNavigateSection={scrollToSection}
        showSkeleton={showSkeleton}
        onToggleSkeleton={() => setShowSkeleton(!showSkeleton)}
        onReplayAnimations={handleReplayAnimations}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onExploreClick={() => scrollToSection('explore')} />

        {/* Hot Collections Section */}
        <HotCollections
          collections={collections}
          isLoading={isLoading}
          showSkeleton={showSkeleton}
          onSelectCollection={(item) => handleSelectItem(item.nftId)}
          onSelectAuthor={handleSelectAuthor}
        />

        {/* New Items Section */}
        <NewItems
          items={newItems}
          isLoading={isLoading}
          showSkeleton={showSkeleton}
          onSelectItem={(item) => handleSelectItem(item.nftId)}
          onSelectAuthor={handleSelectAuthor}
        />

        {/* Top Sellers Leaderboard Section */}
        <TopSellers
          sellers={topSellers}
          isLoading={isLoading}
          showSkeleton={showSkeleton}
          onSelectAuthor={handleSelectAuthor}
        />

        {/* Browse by Category Section */}
        <BrowseByCategory
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            scrollToSection('explore');
          }}
        />

        {/* Explore Section */}
        <ExploreSection
          items={filteredExploreItems}
          isLoading={isLoading || isExploreLoading}
          showSkeleton={showSkeleton}
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
          selectedCategory={selectedCategory}
          onSelectItem={(item) => handleSelectItem(item.nftId)}
          onSelectAuthor={handleSelectAuthor}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <AuthorModal
        author={authorDetails}
        isOpen={isAuthorModalOpen}
        onClose={() => setIsAuthorModalOpen(false)}
        onSelectNft={(nftId) => {
          setIsAuthorModalOpen(false);
          handleSelectItem(nftId);
        }}
      />

      <ItemDetailsModal
        item={itemDetails}
        isOpen={isItemModalOpen}
        wallet={wallet}
        onClose={() => setIsItemModalOpen(false)}
        onOpenWallet={() => {
          setIsItemModalOpen(false);
          setIsWalletModalOpen(true);
        }}
        onPlaceBidSuccess={handlePlaceBidSuccess}
      />

      <ConnectWalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleConnectWallet}
      />

      
    </div>
  );
}
