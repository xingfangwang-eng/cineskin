import React from 'react';
import StripeCheckout from './StripeCheckout';

interface ProUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProUpgrade: () => void;
  feature: string;
}

const ProUpgradeModal: React.FC<ProUpgradeModalProps> = ({ isOpen, onClose, onProUpgrade, feature }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-background border border-accent/30 rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-accent">Unlock Aesthetic Freedom</h2>
          <button
            className="text-foreground/70 hover:text-foreground transition-colors"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <p className="text-foreground/80 mb-6">
          To access {feature}, you need to upgrade to CineSkin Pro. Enjoy unlimited access to all premium features for just $19.9/year.
        </p>
        <div className="space-y-4">
          <StripeCheckout onProUpgrade={onProUpgrade} />
          <button
            className="w-full border border-accent/30 text-foreground px-6 py-2 rounded-md font-medium hover:bg-accent/10 transition-colors"
            onClick={onClose}
          >
            Maybe later
          </button>
        </div>
        <div className="mt-6 text-center text-foreground/60 text-sm">
          <p>Pro features include:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Advanced gradient presets</li>
            <li>GIF support</li>
            <li>Pro-exclusive templates</li>
            <li>Remove watermarks</li>
            <li>High-resolution exports</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProUpgradeModal;