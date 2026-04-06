'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface PreviewBoxProps {
  platform: string;
  layoutMode: string;
  gradient: string;
  gifFile: File | null;
  isPro: boolean;
  template: string;
}

const PreviewBox: React.FC<PreviewBoxProps> = ({ platform, layoutMode, gradient, gifFile, isPro, template }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  
  // Define aspect ratios for different platforms
  const getAspectRatio = () => {
    switch (platform) {
      case 'letterboxd':
        return 'aspect-[1000/450]';
      case 'imdb':
        return 'aspect-[16/9]';
      case 'trakt':
        return 'aspect-[21/9]';
      default:
        return 'aspect-[1000/450]';
    }
  };

  // Get gradient value based on selected gradient
  const getGradientValue = () => {
    const gradients = {
      'default': 'from-black to-accent/10',
      'la-la-land': 'from-purple-600 to-pink-400',
      'dune': 'from-yellow-600 to-orange-400',
      'nolan': 'from-gray-900 to-black',
      'blade-runner': 'from-blue-900 to-cyan-400',
      'matrix': 'from-green-900 to-green-400',
    };
    return gradients[gradient as keyof typeof gradients] || gradients.default;
  };

  // Get template-specific styles
  const getTemplateStyles = () => {
    const templates = {
      'default': {
        border: 'border-accent/30',
        shadow: 'shadow-2xl shadow-accent/10',
      },
      'neon-noir': {
        border: 'border-purple-500/50',
        shadow: 'shadow-2xl shadow-purple-500/20',
        extra: 'relative overflow-hidden',
      },
      'vintage-cinema': {
        border: 'border-amber-500/50',
        shadow: 'shadow-2xl shadow-amber-500/20',
      },
      'futuristic': {
        border: 'border-cyan-500/50',
        shadow: 'shadow-2xl shadow-cyan-500/20',
      },
      'hollywood-glam': {
        border: 'border-gold-500/50',
        shadow: 'shadow-2xl shadow-gold-500/20',
      },
      'indie-vibe': {
        border: 'border-rose-500/50',
        shadow: 'shadow-2xl shadow-rose-500/20',
      },
    };
    return templates[template as keyof typeof templates] || templates.default;
  };

  const templateStyles = getTemplateStyles();

  // Enhanced classic layout with dynamic spacing
  const renderClassicLayout = () => {
    return (
      <div className="w-full h-full grid grid-cols-3 gap-2 p-4 animate-fadeIn">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div 
            key={i} 
            className="bg-black/30 rounded flex items-center justify-center transition-all duration-300 hover:bg-black/50 hover:scale-105"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <span className="text-xs text-foreground/50">Movie {i}</span>
          </div>
        ))}
      </div>
    );
  };

  // Enhanced mosaic layout with more dynamic positioning
  const renderMosaicLayout = () => {
    return (
      <div className="w-full h-full p-4 flex items-end animate-fadeIn">
        <div 
          className="w-1/3 h-2/3 bg-black/30 rounded mr-2 flex items-center justify-center transition-all duration-300 hover:bg-black/50 hover:scale-105"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="text-xs text-foreground/50">Movie 1</span>
        </div>
        <div 
          className="w-1/3 h-full bg-black/30 rounded mr-2 flex items-center justify-center transition-all duration-300 hover:bg-black/50 hover:scale-105"
          style={{ animationDelay: '0.2s' }}
        >
          <span className="text-xs text-foreground/50">Movie 2</span>
        </div>
        <div 
          className="w-1/3 h-3/4 bg-black/30 rounded flex items-center justify-center transition-all duration-300 hover:bg-black/50 hover:scale-105"
          style={{ animationDelay: '0.3s' }}
        >
          <span className="text-xs text-foreground/50">Movie 3</span>
        </div>
      </div>
    );
  };

  // Enhanced cinematic layout with focus effect
  const renderCinematicLayout = () => {
    return (
      <div className="w-full h-full p-4 flex animate-fadeIn">
        <div 
          className="w-3/5 h-full bg-black/30 rounded mr-2 flex items-center justify-center transition-all duration-300 hover:bg-black/50 hover:scale-102"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="text-sm text-foreground/50">Featured Movie</span>
        </div>
        <div className="w-2/5 flex flex-col gap-2">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="flex-1 bg-black/30 rounded flex items-center justify-center transition-all duration-300 hover:bg-black/50 hover:scale-105"
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <span className="text-xs text-foreground/50">Movie {i}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render layout based on selected mode
  const renderLayout = () => {
    if (gifFile) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={URL.createObjectURL(gifFile)}
            alt="Animated background"
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    switch (layoutMode) {
      case 'classic':
        return renderClassicLayout();
      case 'mosaic':
        return renderMosaicLayout();
      case 'cinematic':
        return renderCinematicLayout();
      default:
        return (
          <div className="text-center p-8 animate-fadeIn">
            <h3 className="text-2xl font-semibold mb-2">{platform.charAt(0).toUpperCase() + platform.slice(1)} Preview</h3>
            <p className="text-accent/80">4K Art Canvas</p>
          </div>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-lg ${templateStyles.border} ${templateStyles.shadow} ${(templateStyles as { extra?: string }).extra || ''} transition-all duration-500`}>
      <div className={`w-full ${getAspectRatio()} bg-gradient-to-br ${getGradientValue()} transition-all duration-500`}>
        {renderLayout()}
      </div>
      {isPro && (
        <div className="absolute top-2 right-2 bg-accent/80 text-black text-xs font-bold px-2 py-1 rounded">
          Pro
        </div>
      )}
      {template !== 'default' && isPro && (
        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
          {template.charAt(0).toUpperCase() + template.slice(1).replace('-', ' ')}
        </div>
      )}
    </div>
  );
};

export default PreviewBox;