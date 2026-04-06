'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthProps {
  onUserChange: (user: User | null, isPro: boolean) => void;
}

const Auth: React.FC<AuthProps> = ({ onUserChange }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create user profile if it doesn't exist
    const createProfile = async (userId: string) => {
      try {
        await fetch('/api/create-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });
      } catch (error) {
        console.error('Error creating profile:', error);
      }
    };

    // Get the current user session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Create profile if it doesn't exist
        await createProfile(session.user.id);
        setUser(session.user);
        // Get user profile to check if they're pro
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_pro')
          .eq('id', session.user.id)
          .single();
        setIsPro(profile?.is_pro || false);
        onUserChange(session.user, profile?.is_pro || false);
      } else {
        setUser(null);
        setIsPro(false);
        onUserChange(null, false);
      }
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        // Create profile if it doesn't exist
        await createProfile(session.user.id);
        setUser(session.user);
        // Get user profile to check if they're pro
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_pro')
          .eq('id', session.user.id)
          .single();
        setIsPro(profile?.is_pro || false);
        onUserChange(session.user, profile?.is_pro || false);
      } else {
        setUser(null);
        setIsPro(false);
        onUserChange(null, false);
      }
    });

    return () => subscription.unsubscribe();
  }, [onUserChange]);

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: 'email profile',
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <div className="text-accent">Loading...</div>;
  }

  if (!user) {
    return (
      <button
        className="bg-accent text-black px-6 py-2 rounded-md font-medium hover:bg-accent/90 transition-colors"
        onClick={handleGoogleSignIn}
      >
        Sign in with Google
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        {user.user_metadata?.avatar_url && (
          <img
            src={user.user_metadata.avatar_url}
            alt="User avatar"
            className="w-8 h-8 rounded-full"
          />
        )}
        <span>{user.user_metadata?.name || user.email}</span>
        {isPro && (
          <span className="bg-accent text-black text-xs font-bold px-2 py-0.5 rounded">
            Pro
          </span>
        )}
      </div>
      <button
        className="text-foreground/70 hover:text-foreground transition-colors"
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </div>
  );
};

export default Auth;