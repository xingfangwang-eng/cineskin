'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';

const AuthCallback: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Get the code from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        // Exchange the code for a session
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          console.error('Error exchanging code:', error);
        }
      }

      // Redirect back to the home page
      router.push('/');
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
        <p className="text-lg">Signing in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;