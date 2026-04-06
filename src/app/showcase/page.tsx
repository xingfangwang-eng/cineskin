'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';

// Mock data for showcase
const mockBanners = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  title: `Awesome Banner ${index + 1}`,
  author: `User${index + 1}`,
  platform: ['letterboxd', 'imdb', 'trakt'][index % 3],
  imageUrl: `https://picsum.photos/seed/${index}/1000/450`,
  likes: Math.floor(Math.random() * 1000),
}));

const Showcase: React.FC = () => {
  const [banners, setBanners] = useState(mockBanners);
  const [platform, setPlatform] = useState('all');

  useEffect(() => {
    // In a real app, fetch banners from an API
    // For now, use mock data
  }, []);

  const filteredBanners = platform === 'all' 
    ? banners 
    : banners.filter(banner => banner.platform === platform);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar user={null} isPro={false} />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Community Showcase
        </h1>
        <p className="text-xl text-center text-foreground/80 mb-12 max-w-3xl mx-auto">
          Discover the most popular CineSkin designs created by our community
        </p>

        {/* Platform filter */}
        <div className="flex justify-center mb-8 gap-4">
          <button
            className={`px-6 py-2 rounded-md ${platform === 'all' ? 'bg-accent text-black' : 'border border-accent/30 text-foreground'}`}
            onClick={() => setPlatform('all')}
          >
            All Platforms
          </button>
          <button
            className={`px-6 py-2 rounded-md ${platform === 'letterboxd' ? 'bg-accent text-black' : 'border border-accent/30 text-foreground'}`}
            onClick={() => setPlatform('letterboxd')}
          >
            Letterboxd
          </button>
          <button
            className={`px-6 py-2 rounded-md ${platform === 'imdb' ? 'bg-accent text-black' : 'border border-accent/30 text-foreground'}`}
            onClick={() => setPlatform('imdb')}
          >
            IMDb
          </button>
          <button
            className={`px-6 py-2 rounded-md ${platform === 'trakt' ? 'bg-accent text-black' : 'border border-accent/30 text-foreground'}`}
            onClick={() => setPlatform('trakt')}
          >
            Trakt
          </button>
        </div>

        {/* Banner grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBanners.map((banner) => (
            <div key={banner.id} className="border border-accent/30 rounded-lg overflow-hidden transition-all hover:shadow-xl hover:shadow-accent/10">
              <div className="relative aspect-[1000/450] overflow-hidden">
                <Image
                  src={banner.imageUrl}
                  alt={banner.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={banner.id <= 6}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{banner.title}</h3>
                <div className="flex justify-between items-center text-sm text-foreground/70">
                  <span>By {banner.author}</span>
                  <span>{banner.platform.charAt(0).toUpperCase() + banner.platform.slice(1)}</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span>{banner.likes} likes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Showcase;