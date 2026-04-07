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
  // Check if Stripe is configured
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 503 });
  }

  const signature = request.headers.get('stripe-signature');
  const body = await request.text();

  try {
    const event = stripe!.webhooks.constructEvent(
      body,
      signature || '',
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;

      if (userId) {
        // Update user's Pro status
        await supabase
          .from('profiles')
          .update({ is_pro: true })
          .eq('id', userId);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
  }
}
