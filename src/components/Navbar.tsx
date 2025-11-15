"use client";
    import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import GradientText from "./GradientText";
import { useAuth } from "../hooks/useAuth";
import AuthModalManager, { AuthModalType } from "./auth/AuthModalManager";
import Profile from "./Profile";


function ProcessedLogo() {
  // Mobile/Tablet: Keep larger size, Desktop: Smaller for proportion
  // Mobile: 48px, Tablet: 56px, Desktop: 48px - preserving aspect ratio ~1.302 (669/514)
  const intrinsicWidth = 73;  // 56 * 1.302 ≈ 73
  const intrinsicHeight = 56;
  return (
    <Image
      src="/Asset/beluganewlogov2.png"
      alt="Beluga Logo"
      width={intrinsicWidth}
      height={intrinsicHeight}
      // Do not mark as priority to avoid implicit preloading in dev which can trigger preload warnings
      className="h-12 md:h-14 xl:h-12 w-auto object-contain group-hover:scale-105 transition-all duration-300 animate-logo-color-cycle hover:[animation-play-state:paused] hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
      style={{ width: 'auto', height: 'auto' }}
      sizes="(max-width: 768px) 48px, (max-width: 1280px) 56px, 48px"
    />
  );
}

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const headerRef = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  // Keep spacer height exactly equal to actual navbar height across breakpoints
  useEffect(() => {
    const headerEl = headerRef.current;

    const updateNavHeight = () => {
      const height = headerEl?.offsetHeight || 64;
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--nav-height', `${height}px`);
      }
    };

    updateNavHeight();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof window !== 'undefined' && 'ResizeObserver' in window && headerEl) {
      resizeObserver = new ResizeObserver(() => updateNavHeight());
      resizeObserver.observe(headerEl as Element);
    } else if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateNavHeight);
    }

    return () => {
      if (resizeObserver && headerEl) resizeObserver.unobserve(headerEl as Element);
      if (typeof window !== 'undefined') window.removeEventListener('resize', updateNavHeight);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    } else {
      router.push('/search');
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  // CRITICAL FIX: Listen for custom auth modal events from other components
  useEffect(() => {
    const handleCustomAuthModal = (event: CustomEvent) => {
      if (event.detail?.type) {
        if (event.detail.type === 'login') {
          setShowLoginModal(true);
        } else if (event.detail.type === 'signup') {
          setShowSignUpModal(true);
        }
      }
    };

    window.addEventListener('openAuthModal', handleCustomAuthModal as EventListener);
    
    return () => {
      window.removeEventListener('openAuthModal', handleCustomAuthModal as EventListener);
    };
  }, []);

  // Check if current path is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Spacer for fixed navbar - dynamic height to avoid gaps/overlap */}
      <div style={{ height: 'var(--nav-height, 64px)' }} aria-hidden="true"></div>
      
      {/* Desktop Logo */}
      <div className="hidden xl:block desktop-logo">
        <Link href="/" className="flex items-center space-x-2 group no-underline hover:no-underline focus:no-underline active:no-underline" style={{ textDecoration: 'none' }}>
          <ProcessedLogo />
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={2}
            showBorder={false}
            className="text-3xl font-bold tracking-tight font-sans leading-normal pb-0.5"
          >
            Beluga
          </GradientText>
        </Link>
      </div>

      <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl backdrop-saturate-150 shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-6 lg:px-8 py-2 sm:py-3 md:py-3 lg:py-4 tablet-container xl:justify-start xl:space-x-8">
          {/* Logo Section - Mobile/Tablet */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-shrink-0 xl:hidden">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 group no-underline hover:no-underline focus:no-underline active:no-underline" style={{ textDecoration: 'none' }}>
              <ProcessedLogo />
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={2}
                showBorder={false}
                className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold tracking-tight font-sans leading-normal pb-0.5"
              >
                Beluga
              </GradientText>
            </Link>
          </div>


          {/* Desktop Search Bar - Centered */}
          <div className="hidden xl:flex flex-1 justify-center">
            <form onSubmit={handleSearch} className="relative w-full max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 pr-12 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                />
                {/* Search Icon */}
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {/* Search Button */}
                <button
                  type="submit"
                  onClick={handleSearchClick}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200"
                  title="Search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Desktop Auth Buttons - Right side */}
          <div className="hidden xl:flex items-center space-x-3 flex-shrink-0">
              {user ? (
                <Profile showDropdown={true} />
              ) : (
                <>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="text-gray-700 font-bold hover:text-blue-600 transition-colors duration-200"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowSignUpModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
        </div>
      </header>

          {/* Mobile & Tablet Bottom Navigation */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg backdrop-saturate-150 border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around py-2 md:py-3">
          {/* Hamburger Menu */}
          <button
            className={`flex flex-col items-center p-2 md:p-3 rounded-lg transition-all duration-200 focus:outline-none focus:no-underline ${
              navOpen 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
            }`}
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Open navigation menu"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="text-xs md:text-sm font-medium">Menu</span>
          </button>
        </div>
      </div>

      {/* Mobile & Tablet nav overlay - Higher z-index to be above slider */}
      {navOpen && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-30 xl:hidden" onClick={() => setNavOpen(false)}>
          <nav
            className="absolute bottom-0 left-0 right-0 bg-white shadow-lg flex flex-col py-6 md:py-8 px-4 md:px-6 space-y-4 md:space-y-6 animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button - Positioned ABOVE search bar */}
            <div className="flex justify-end mb-4">
              <button
                className="text-gray-700 hover:text-red-600 focus:outline-none transition-colors p-2 md:p-3 bg-gray-100 rounded-full hover:bg-red-50"
                onClick={() => setNavOpen(false)}
                aria-label="Close menu"
              >
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search Bar - Mobile & Tablet */}
            <div className="relative">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 md:px-5 py-3 md:py-4 pl-12 md:pl-14 pr-12 md:pr-14 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 backdrop-blur-sm text-sm md:text-base"
                  />
                  {/* Search Icon */}
                  <svg
                    className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  {/* Search Button */}
                  <button
                    type="submit"
                    onClick={() => {
                      handleSearchClick();
                      setNavOpen(false);
                    }}
                    className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 p-2 md:p-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                    title="Search"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            {/* Navigation Links */}
            <div className="space-y-3 md:space-y-4">
              {/* Navigation links removed - About and Contact moved to footer */}
            </div>

            {/* Auth Buttons - Mobile/Tablet Menu */}
            <div className="pt-4 md:pt-6 border-t border-gray-200">
              {user ? (
                <div className="space-y-3 md:space-y-4">
                  <Profile showDropdown={false} />
                </div>
              ) : (
                <div className="flex flex-col space-y-3 md:space-y-4">
                  <button
                    onClick={() => {
                      setShowLoginModal(true);
                      setNavOpen(false);
                    }}
                    className="text-gray-700 text-lg md:text-xl font-bold transition block hover:text-blue-600 focus:outline-none focus:no-underline py-2 md:py-3 px-2"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setShowSignUpModal(true);
                      setNavOpen(false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-4 px-4 md:px-6 rounded-lg transition-colors duration-200 text-base md:text-lg"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Auth Modals */}
      <AuthModalManager
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        initialModal="login"
      />
      
      <AuthModalManager
        isOpen={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
        initialModal="signup"
      />


    </>
  );
} 
