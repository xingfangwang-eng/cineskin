import React from 'react';

interface LayoutModeSelectorProps {
  selectedMode: string;
  onModeChange: (mode: string) => void;
  isPro: boolean;
}

const LayoutModeSelector: React.FC<LayoutModeSelectorProps> = ({ selectedMode, onModeChange, isPro }) => {
  const modes = [
    { id: 'classic', name: 'Classic', description: 'Perfectly aligned grid' },
    { id: 'mosaic', name: 'Mosaic', description: 'Waterfall-style staggered art' },
    { id: 'cinematic', name: 'Cinematic', description: '1 large image taking up 60% width' },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">AI Layout Mode</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modes.map((mode) => (
          <button
            key={mode.id}
            className={`p-4 border rounded-lg transition-all ${selectedMode === mode.id ? 'border-accent bg-accent/10' : 'border-accent/30 hover:border-accent/50'}`}
            onClick={() => onModeChange(mode.id)}
          >
            <h4 className="font-medium mb-1">{mode.name}</h4>
            <p className="text-sm text-foreground/70">{mode.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LayoutModeSelector;