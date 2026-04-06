'use client';

import React, { useState } from 'react';

interface PlatformSwitcherProps {
  onPlatformChange: (platform: string) => void;
}

const PlatformSwitcher: React.FC<PlatformSwitcherProps> = ({ onPlatformChange }) => {
  const [selectedPlatform, setSelectedPlatform] = useState('letterboxd');

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatform(platform);
    onPlatformChange(platform);
  };

  return (
    <div className="mb-8">
      <div className="flex border border-accent/30 rounded-md overflow-hidden">
        <button
          className={`px-6 py-3 flex-1 text-center ${selectedPlatform === 'letterboxd' ? 'bg-accent text-black font-medium' : 'hover:bg-accent/10 transition-colors'}`}
          onClick={() => handlePlatformChange('letterboxd')}
        >
          Letterboxd
        </button>
        <button
          className={`px-6 py-3 flex-1 text-center ${selectedPlatform === 'imdb' ? 'bg-accent text-black font-medium' : 'hover:bg-accent/10 transition-colors'}`}
          onClick={() => handlePlatformChange('imdb')}
        >
          IMDb
        </button>
        <button
          className={`px-6 py-3 flex-1 text-center ${selectedPlatform === 'trakt' ? 'bg-accent text-black font-medium' : 'hover:bg-accent/10 transition-colors'}`}
          onClick={() => handlePlatformChange('trakt')}
        >
          Trakt
        </button>
      </div>
    </div>
  );
};

export default PlatformSwitcher;