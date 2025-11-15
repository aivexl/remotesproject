import React, { useEffect, useRef, useState } from 'react';
import { CoinLogosOnly } from './CoinTags';

const PLACEHOLDER = '/Asset/duniacrypto.png';

type SanityArticle = {
  _id: string;
  title: string;
  slug: { current: string };
  imageUrl?: string;
  category?: string;
  publishedAt?: string;
  coinTags?: Array<{
    _id: string;
    name: string;
    symbol: string;
    logo: {
      asset: {
        _ref: string;
        _type: string;
      };
      alt?: string;
    };
    category: string;
    isActive: boolean;
    link?: string;
  }>;
};

type NewsSliderProps = {
  articles?: SanityArticle[];
};

const NewsSlider: React.FC<NewsSliderProps> = ({ articles = [] }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Convert Sanity articles to slider format
  const sliderArticles = articles.slice(0, 5).map((article) => ({
    id: article._id,
    title: article.title,
    url: `/${article.category === 'newsroom' ? 'newsroom' : 'academy'}/${article.slug.current}`,
    image: article.imageUrl || PLACEHOLDER,
    category: article.category || 'academy',
    coinTags: article.coinTags || []
  }));

  // Function to start the interval
  const startInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderArticles.length);
    }, 4000);
  };

  // Function to stop the interval
  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (sliderArticles.length === 0) return;
    
    if (!isPaused) {
      startInterval();
    } else {
      stopInterval();
    }

    return () => {
      stopInterval();
    };
  }, [sliderArticles.length, isPaused]);

  // Handle mouse enter (pause slider)
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  // Handle mouse leave (resume slider)
  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + sliderArticles.length) % sliderArticles.length);
  };
  
  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % sliderArticles.length);
  };

  if (sliderArticles.length === 0) {
    return (
      <div className="bg-duniacrypto-panel rounded-lg shadow p-4 text-center text-gray-600" style={{height: '500px'}}>
        <div className="flex items-center justify-center h-full">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Belum ada artikel</h3>
            <p className="text-sm text-gray-700">Artikel Academy dan News akan muncul di sini setelah ditambahkan melalui Sanity Studio.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative bg-duniacrypto-panel rounded-lg shadow overflow-hidden w-full max-w-full mt-6 sm:mt-8 md:mt-0 mb-6" 
      style={{height: '500px'}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <button
          className="bg-duniacrypto-card rounded-full p-2 hover:bg-duniacrypto-green/20 focus:outline-none"
          onClick={handlePrev}
          aria-label="Previous article"
        >
          <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
        </button>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <button
          className="bg-duniacrypto-card rounded-full p-2 hover:bg-duniacrypto-green/20 focus:outline-none"
          onClick={handleNext}
          aria-label="Next article"
        >
          <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="w-full h-full flex transition-transform duration-700" style={{ transform: `translateX(-${current * 100}%)` }}>
        {sliderArticles.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-full h-full relative"
            style={{ minWidth: '100%', maxWidth: '100%', height: '500px' }}
          >
            <a href={item.url} className="block w-full h-full group">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                style={{margin: 0, padding: 0, width: '100%', height: '100%', display: 'block'}}
                onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  event.currentTarget.src = PLACEHOLDER;
                }}
              />
            </a>
          </div>
        ))}
      </div>
      {/* Dots indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {sliderArticles.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full ${i === current ? 'bg-duniacrypto-green' : 'bg-gray-600'}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsSlider; 