"use client";

import React from "react";
import NewsSlider from "./NewsSlider";
import NewsFeedServer from "./NewsFeedServer";
import type { SanityArticleWithImage } from '../utils/sanity';


interface HomeClientProps {
  articles?: SanityArticleWithImage[];
}

export default function HomeClient({ articles = [] }: HomeClientProps) {
  return (
    <>
      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4 md:py-6 flex-1 w-full tablet-container">
        <section className="space-y-4 md:gap-6">
          {/* Prioritas slider: showInSlider > featured > terbaru, maksimal 8, urutan: showInSlider dulu */}
          {(() => {
            let sliderArticles = [];
            const sorted = [...articles].sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0));
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
          <NewsFeedServer articles={articles} />
        </section>
      </main>
    </>
  );
} 