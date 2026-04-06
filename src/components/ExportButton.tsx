'use client';

import React, { useState } from 'react';
import * as htmlToImage from 'html-to-image';

interface ExportButtonProps {
  previewRef: React.RefObject<HTMLDivElement | null>;
  isPro: boolean;
  removeWatermark: boolean;
  onExportSuccess?: (imageUrl: string) => void;
}

const ExportButton: React.FC<ExportButtonProps> = ({ previewRef, isPro, removeWatermark, onExportSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (previewRef.current) {
      setLoading(true);
      try {
        // Create watermark element if needed
        let watermarkElement: HTMLDivElement | null = null;
        
        if (!isPro || !removeWatermark) {
          watermarkElement = document.createElement('div');
          watermarkElement.className = 'absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-medium';
          watermarkElement.textContent = 'CineSkin.com';
          previewRef.current.appendChild(watermarkElement);
        }

        const dataUrl = await htmlToImage.toPng(previewRef.current, {
          width: 1920,
          height: 1080,
          quality: 1.0,
        });
        
        // Remove watermark if added
        if (watermarkElement) {
          previewRef.current?.removeChild(watermarkElement);
        }

        const link = document.createElement('a');
        link.download = `cineskin-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
        
        // Call success callback if provided
        if (onExportSuccess) {
          onExportSuccess(dataUrl);
        }
      } catch (error) {
        console.error('Error exporting image:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      className="w-full bg-accent text-black px-6 py-3 rounded-md font-medium hover:bg-accent/90 transition-colors"
      onClick={handleExport}
      disabled={loading}
    >
      {loading ? 'Exporting...' : 'Export 1080p PNG'}
    </button>
  );
};

export default ExportButton;