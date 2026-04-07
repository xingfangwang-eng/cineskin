import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '../../../lib/supabase';

// Only create Stripe client if API key is available
let stripe: Stripe | null = null;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (stripeSecretKey) {
  stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2024-06-20',
  });
}

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json({ error: 'Stripe is not configured' }, { status: 503 });
    }

    const { userId } = await request.json();

    // Check if user exists
    try {
      const { data: user } = await supabase.auth.admin.getUserById(userId);
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      // Get or create Stripe customer
      const { data: profile } = await supabase
        .from('profiles')
        .select('stripe_customer_id')
        .eq('id', userId)
        .single();

      let customerId = profile?.stripe_customer_id;

      if (!customerId) {
        // Create new Stripe customer
        const customer = await stripe!.customers.create({
          email: user.user?.email || '',
          name: user.user?.user_metadata?.name || '',
        });

        customerId = customer.id;

        // Update profile with Stripe customer ID
        await supabase
          .from('profiles')
          .upsert({
            id: userId,
            stripe_customer_id: customerId,
            is_pro: false,
          });
      }

      // Create checkout session
      const session = await stripe!.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'CineSkin Pro',
                description: 'Annual subscription for CineSkin Pro features',
              },
              unit_amount: 1990, // $19.90
              recurring: {
                interval: 'year',
              },
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/cancel`,
        metadata: {
          userId,
        },
      });

      return NextResponse.json({ url: session.url });
    } catch (error) {
      console.error('Error in checkout process:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
