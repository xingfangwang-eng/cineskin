'use client';

import React from 'react';
import { Zap } from 'lucide-react';

interface BannerGeneratorButtonProps {
  backgroundColor: string;
}

const BannerGeneratorButton: React.FC<BannerGeneratorButtonProps> = ({ backgroundColor }) => {
  const handleClick = () => {
    alert('Banner generation started! This is a placeholder for the actual banner generation functionality.');
    // In a real implementation, this would call an API to generate the banner
  };

  return (
    <button 
      className="w-full px-6 py-3 rounded-md font-medium transition-colors active:scale-95 flex items-center justify-center gap-2" 
      style={{ backgroundColor, color: '#FFFFFF' }}
      onClick={handleClick}
    >
      <Zap size={20} />
      Generate Banner
    </button>
  );
};

export default BannerGeneratorButton;