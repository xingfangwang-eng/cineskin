import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(request: NextRequest) {
  const { userId } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    // Check if profile already exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (!existingProfile) {
      // Create new profile
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          is_pro: false,
          stripe_customer_id: null,
        });

      if (error) {
        console.error('Error creating profile:', error);
        return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in create-profile route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
