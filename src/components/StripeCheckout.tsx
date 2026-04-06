'use client';

import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface StripeCheckoutProps {
  onProUpgrade: () => void;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ onProUpgrade }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Please sign in first');
        return;
      }

      // Create a checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });

      const { url } = await response.json();

      // Redirect to Stripe checkout
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Error creating checkout session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="bg-accent text-black px-6 py-2 rounded-md font-medium hover:bg-accent/90 transition-colors relative overflow-hidden group"
      onClick={handleCheckout}
      disabled={loading}
    >
      <span className="relative z-10">
        {loading ? 'Processing...' : 'Upgrade to Pro ($19.9/year)'}
      </span>
      <span className="absolute inset-0 bg-accent/80 group-hover:bg-accent/100 transition-colors"></span>
      <span className="absolute -inset-1 bg-accent/20 blur group-hover:blur-md transition-all duration-300"></span>
    </button>
  );
};

export default StripeCheckout;