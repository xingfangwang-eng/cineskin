import React from 'react';
import { Film } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import StripeCheckout from './StripeCheckout';

interface NavbarProps {
  user: User | null;
  isPro: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ user, isPro }) => {
  const handleProUpgrade = () => {
    // Refresh user data after upgrade
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-accent/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Film className="h-8 w-8 text-accent" />
          <span className="text-2xl font-bold tracking-wider">CineSkin</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {user ? (
            isPro ? (
              <div className="flex items-center gap-2">
                {user.user_metadata?.avatar_url && (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="User avatar"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span>{user.user_metadata?.name || user.email}</span>
                <span className="bg-accent text-black text-xs font-bold px-2 py-0.5 rounded">
                  Pro
                </span>
              </div>
            ) : (
              <StripeCheckout onProUpgrade={handleProUpgrade} />
            )
          ) : (
            <a href="#" className="hover:text-accent transition-colors">
              Sign in
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;