import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a mock Supabase client for production builds without environment variables
let supabase: SupabaseClient<any, 'public', any>;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Create a mock client for production builds
  supabase = {
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null })
        })
      }),
      insert: () => Promise.resolve({ error: null }),
      upsert: () => Promise.resolve({ error: null }),
      update: () => ({
        eq: () => Promise.resolve({ error: null })
      })
    }),
    auth: {
      admin: {
        getUserById: () => Promise.resolve({ data: { user: { email: 'test@example.com', user_metadata: { name: 'Test User' } } } })
      },
      onAuthStateChange: (callback: any) => {
        // Call the callback with initial state
        callback('INITIAL_SESSION', null);
        // Return an object with data.subscription
        return {
          data: {
            subscription: {
              unsubscribe: () => {}
            }
          }
        };
      },
      getSession: () => Promise.resolve({ data: { session: null } }),
      getUser: () => Promise.resolve({ data: { user: null } }),
      signInWithOAuth: () => Promise.resolve({ error: null }),
      signOut: () => Promise.resolve({ error: null }),
      exchangeCodeForSession: () => Promise.resolve({ error: null })
    }
  } as unknown as SupabaseClient<any, 'public', any>;
}

export { supabase };
