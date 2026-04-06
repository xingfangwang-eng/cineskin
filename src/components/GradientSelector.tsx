import React from 'react';

interface GradientSelectorProps {
  selectedGradient: string;
  onGradientChange: (gradient: string) => void;
  isPro: boolean;
}

const GradientSelector: React.FC<GradientSelectorProps> = ({ selectedGradient, onGradientChange, isPro }) => {
  const gradients = [
    { id: 'default', name: 'Default', value: 'from-black to-accent/10' },
    { id: 'la-la-land', name: 'La La Land Purple', value: 'from-purple-600 to-pink-400' },
    { id: 'dune', name: 'Dune Yellow', value: 'from-yellow-600 to-orange-400' },
    { id: 'nolan', name: 'Nolan Black', value: 'from-gray-900 to-black' },
    { id: 'blade-runner', name: 'Blade Runner Blue', value: 'from-blue-900 to-cyan-400' },
    { id: 'matrix', name: 'Matrix Green', value: 'from-green-900 to-green-400' },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Dynamic Gradient</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {gradients.map((gradient) => (
          <button
            key={gradient.id}
            className={`p-4 rounded-lg transition-all relative overflow-hidden ${selectedGradient === gradient.id ? 'ring-2 ring-accent' : ''}`}
            onClick={() => isPro || gradient.id === 'default' ? onGradientChange(gradient.id) : null}
            disabled={!isPro && gradient.id !== 'default'}
          >
            <div className={`w-full h-12 bg-gradient-to-r ${gradient.value} rounded`} />
            <p className={`mt-2 text-sm ${!isPro && gradient.id !== 'default' ? 'text-foreground/40' : ''}`}>
              {gradient.name}
              {!isPro && gradient.id !== 'default' && <span className="ml-1 text-xs text-accent/70">Pro</span>}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GradientSelector;