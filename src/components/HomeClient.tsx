"use client";

import React, { useState, useEffect, useRef } from "react";
import NewsSlider from "./NewsSlider";
import type { SanityArticleWithImage } from '../utils/sanity';
import { FiSmartphone, FiWifi, FiCreditCard, FiNavigation } from 'react-icons/fi';

interface HomeClientProps {
  articles?: SanityArticleWithImage[];
}

// Dummy data types
interface QuickService {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface GameItem {
  id: string;
  name: string;
  image: string;
}

interface VoucherItem {
  id: string;
  name: string;
  image: string;
}

interface SoftwareItem {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface DigitalProductItem {
  id: string;
  name: string;
  image: string;
  price: number;
}

export default function HomeClient({ articles = [] }: HomeClientProps) {
  // Quick Services Data
  const quickServices: QuickService[] = [
    { id: '1', name: 'Pulsa', icon: <FiSmartphone className="w-8 h-8" /> },
    { id: '2', name: 'Paket Data', icon: <FiWifi className="w-8 h-8" /> },
    { id: '3', name: 'Topup E-Money', icon: <FiCreditCard className="w-8 h-8" /> },
    { id: '4', name: 'Topup Kartu Toll', icon: <FiNavigation className="w-8 h-8" /> },
  ];

  // Topup Game Data (15 items) - semua menggunakan gambar Mobile Legends
  const gameImage = '/Asset/topupgame.jpg';
  const gameItems: GameItem[] = [
    { id: '1', name: 'Mobile Legends', image: gameImage },
    { id: '2', name: 'PUBG Mobile', image: gameImage },
    { id: '3', name: 'Free Fire', image: gameImage },
    { id: '4', name: 'Genshin Impact', image: gameImage },
    { id: '5', name: 'Call of Duty', image: gameImage },
    { id: '6', name: 'Clash of Clans', image: gameImage },
    { id: '7', name: 'Clash Royale', image: gameImage },
    { id: '8', name: 'Arena of Valor', image: gameImage },
    { id: '9', name: 'Valorant', image: gameImage },
    { id: '10', name: 'League of Legends', image: gameImage },
    { id: '11', name: 'FIFA Mobile', image: gameImage },
    { id: '12', name: 'Roblox', image: gameImage },
    { id: '13', name: 'Minecraft', image: gameImage },
    { id: '14', name: 'Among Us', image: gameImage },
    { id: '15', name: 'Brawl Stars', image: gameImage },
  ];

  // Voucher Data (12 items) - semua menggunakan gambar Google Play
  const voucherImage = '/Asset/voucher.png';
  const voucherItems: VoucherItem[] = [
    { id: '1', name: 'Google Play', image: voucherImage },
    { id: '2', name: 'Apple App Store', image: voucherImage },
    { id: '3', name: 'Steam Wallet', image: voucherImage },
    { id: '4', name: 'PlayStation', image: voucherImage },
    { id: '5', name: 'Xbox Live', image: voucherImage },
    { id: '6', name: 'Nintendo eShop', image: voucherImage },
    { id: '7', name: 'Spotify', image: voucherImage },
    { id: '8', name: 'Netflix', image: voucherImage },
    { id: '9', name: 'YouTube Premium', image: voucherImage },
    { id: '10', name: 'Discord Nitro', image: voucherImage },
    { id: '11', name: 'Twitch', image: voucherImage },
    { id: '12', name: 'Amazon Prime', image: voucherImage },
  ];

  // Software Data (12 items) - semua menggunakan gambar Microsoft Office
  const softwareImage = '/Asset/software.png';
  const softwareItems: SoftwareItem[] = [
    { id: '1', name: 'Adobe Photoshop', image: softwareImage, price: 899000 },
    { id: '2', name: 'Microsoft Office', image: softwareImage, price: 1299000 },
    { id: '3', name: 'Windows 11 Pro', image: softwareImage, price: 2499000 },
    { id: '4', name: 'Adobe Premiere Pro', image: softwareImage, price: 999000 },
    { id: '5', name: 'AutoCAD', image: softwareImage, price: 3499000 },
    { id: '6', name: 'Adobe Illustrator', image: softwareImage, price: 899000 },
    { id: '7', name: 'Final Cut Pro', image: softwareImage, price: 3999000 },
    { id: '8', name: 'Sketch', image: softwareImage, price: 599000 },
    { id: '9', name: 'Figma Pro', image: softwareImage, price: 299000 },
    { id: '10', name: 'Logic Pro', image: softwareImage, price: 3499000 },
    { id: '11', name: 'DaVinci Resolve', image: softwareImage, price: 0 },
    { id: '12', name: 'Blender', image: softwareImage, price: 0 },
  ];

  // Digital Product Data (15 items) - semua menggunakan gambar Canva
  const digitalProductImage = '/Asset/productdigital.png';
  const digitalProductItems: DigitalProductItem[] = [
    { id: '1', name: 'Premium Template Pack', image: digitalProductImage, price: 199000 },
    { id: '2', name: 'UI/UX Design Kit', image: digitalProductImage, price: 299000 },
    { id: '3', name: 'Icon Set Premium', image: digitalProductImage, price: 149000 },
    { id: '4', name: 'Font Bundle Pro', image: digitalProductImage, price: 399000 },
    { id: '5', name: 'Stock Photo Collection', image: digitalProductImage, price: 499000 },
    { id: '6', name: 'Video Template Pack', image: digitalProductImage, price: 599000 },
    { id: '7', name: '3D Model Collection', image: digitalProductImage, price: 799000 },
    { id: '8', name: 'Logo Design Pack', image: digitalProductImage, price: 249000 },
    { id: '9', name: 'Web Template Bundle', image: digitalProductImage, price: 899000 },
    { id: '10', name: 'Mobile App Template', image: digitalProductImage, price: 699000 },
    { id: '11', name: 'Presentation Template', image: digitalProductImage, price: 199000 },
    { id: '12', name: 'Social Media Pack', image: digitalProductImage, price: 149000 },
    { id: '13', name: 'Email Template Set', image: digitalProductImage, price: 179000 },
    { id: '14', name: 'Dashboard UI Kit', image: digitalProductImage, price: 449000 },
    { id: '15', name: 'E-commerce Template', image: digitalProductImage, price: 999000 },
  ];

  return (
    <>
      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4 md:py-6 flex-1 w-full tablet-container">
        <section className="space-y-6 md:gap-6">
          {/* Prioritas slider: showInSlider > featured > terbaru, maksimal 8, urutan: showInSlider dulu */}
          {(() => {
            let sliderArticles: SanityArticleWithImage[] = [];
            const sorted = [...articles].sort((a, b) => {
              const dateA = new Date(a.publishedAt || 0).getTime();
              const dateB = new Date(b.publishedAt || 0).getTime();
              return dateB - dateA;
            });
            const showInSlider = sorted.filter(a => a.showInSlider);
            sliderArticles = [...showInSlider];
            if (sliderArticles.length < 8) {
              const featured = sorted.filter(a => a.featured && !sliderArticles.some(s => s._id === a._id));
              sliderArticles = sliderArticles.concat(featured);
            }
            if (sliderArticles.length < 8) {
              const latest = sorted.filter(a => !sliderArticles.some(s => s._id === a._id));
              sliderArticles = sliderArticles.concat(latest);
            }
            sliderArticles = sliderArticles.slice(0, 8);
            return <NewsSlider articles={sliderArticles} />;
          })()}

          {/* Quick Services Section */}
          <QuickServicesSection services={quickServices} />

          {/* Topup Game Section */}
          <TopupGameSection games={gameItems} />

          {/* Voucher Section */}
          <VoucherSection vouchers={voucherItems} />

          {/* Software Section */}
          <SoftwareSection items={softwareItems} />

          {/* Digital Product Section */}
          <DigitalProductSection items={digitalProductItems} />
        </section>
      </main>
    </>
  );
}

// Quick Services Component
function QuickServicesSection({ services }: { services: QuickService[] }) {
  return (
    <div className="bg-duniacrypto-panel rounded-lg shadow p-4 md:p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
          >
            <div className="text-blue-600 mb-2">{service.icon}</div>
            <span className="text-sm font-medium text-gray-900">{service.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Topup Game Component with Infinite Loop (like CryptoTicker)
function TopupGameSection({ games }: { games: GameItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  // Ensure component is mounted on client before starting animation
  useEffect(() => {
    setIsMounted(true);
    
    // Set visible count based on screen size
    const updateVisibleCount = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width < 640) {
          // Mobile: 3 items
          setVisibleCount(3);
        } else if (width < 768) {
          // Small tablet: 4 items
          setVisibleCount(4);
        } else if (width < 1024) {
          // iPad: 6 items
          setVisibleCount(6);
        } else {
          // Desktop: 9 items
          setVisibleCount(9);
        }
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/Asset/topupgame.jpg';
  };

  // Infinite loop animation using requestAnimationFrame (like CryptoTicker)
  useEffect(() => {
    // Only start animation after client-side hydration
    if (!isMounted || visibleCount === 0) return;
    
    const track = trackRef.current;
    if (!track || games.length === 0) return;

    let frame: number | null = null;
    let start: number | null = null;
    const duration = 25 * 1000; // 25 seconds for full loop

    function animate(ts: number) {
      if (!start) start = ts;
      
      if (!isPaused) {
        // Calculate width dynamically to handle responsive changes
        const totalWidth = track.scrollWidth;
        const width = totalWidth / 2; // Half width because items are duplicated
        if (width > 0) {
          const elapsed = ts - start;
          // Use modulo to create seamless infinite loop
          const percent = (elapsed % duration) / duration;
          // Animate from 0 to width (half of total), then seamlessly loop back
          const translateX = percent * width;
          track.style.transform = `translateX(-${translateX}px)`;
        }
      }
      
      frame = requestAnimationFrame(animate);
    }

    // Small delay to ensure DOM is ready after hydration and resize
    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(animate);
    }, 150);

    return () => {
      if (timeout) clearTimeout(timeout);
      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
    };
  }, [games.length, isPaused, isMounted, visibleCount]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Duplicate games for seamless loop
  const duplicatedGames = [...games, ...games];

  return (
    <div className="bg-duniacrypto-panel rounded-lg shadow p-4 md:p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Topup Game</h2>
      <div
        className="overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={trackRef}
          className="flex"
          style={{ willChange: 'transform' }}
        >
          {duplicatedGames.map((game, index) => (
            <div
              key={`${game.id}-${index}`}
              className="flex-shrink-0 px-1 sm:px-2"
              style={{ width: `${100 / visibleCount}%`, minWidth: `${100 / visibleCount}%` }}
            >
              <div className="bg-white rounded-lg p-2 sm:p-3 border border-gray-200 hover:border-blue-500 transition-colors flex flex-col h-full">
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full aspect-square object-cover rounded mb-1.5 sm:mb-2 flex-shrink-0"
                  onError={handleImageError}
                />
                <div className="flex-1 flex items-center justify-center min-h-[2.5em] px-1">
                  <p className="text-[11px] sm:text-xs text-center text-gray-700 font-medium leading-tight break-words hyphens-auto" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    {game.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Voucher Section Component
function VoucherSection({ vouchers }: { vouchers: VoucherItem[] }) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/Asset/voucher.png';
  };

  return (
    <div className="bg-duniacrypto-panel rounded-lg shadow p-4 md:p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Voucher</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {vouchers.map((voucher) => (
          <div
            key={voucher.id}
            className="bg-white rounded-lg p-2 sm:p-3 border border-gray-200 hover:border-blue-500 transition-colors"
          >
            <img
              src={voucher.image}
              alt={voucher.name}
              className="w-full aspect-square object-cover rounded mb-1 sm:mb-2"
              onError={handleImageError}
            />
            <p className="text-[10px] sm:text-xs text-center text-gray-700 font-medium truncate">{voucher.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Software Section Component
function SoftwareSection({ items }: { items: SoftwareItem[] }) {
  const formatPrice = (price: number) => {
    if (price === 0) return 'Gratis';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/Asset/software.png';
  };

  return (
    <div className="bg-duniacrypto-panel rounded-lg shadow p-4 md:p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Software</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
              onError={handleImageError}
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
              <p className="text-lg font-bold text-blue-600">{formatPrice(item.price)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Digital Product Section Component
function DigitalProductSection({ items }: { items: DigitalProductItem[] }) {
  const [displayCount, setDisplayCount] = useState(12);
  const formatPrice = (price: number) => {
    if (price === 0) return 'Gratis';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 3, items.length));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/Asset/productdigital.png';
  };

  const hasMore = displayCount < items.length;
  const displayedItems = items.slice(0, displayCount);

  return (
    <div className="bg-duniacrypto-panel rounded-lg shadow p-4 md:p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Product Digital</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
              onError={handleImageError}
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
              <p className="text-lg font-bold text-blue-600">{formatPrice(item.price)}</p>
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
