import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import type Stripe from 'stripe';

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('[Stripe Webhook] signature verification failed', err);
    return NextResponse.json({ error: 'Webhook signature invalid' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const isAutoship = session.metadata?.autoship === 'true';
      console.log(`[Stripe] checkout.session.completed — autoship: ${isAutoship} — ${session.id}`);
      // TODO: fulfill order, send confirmation email, update Supabase order record
      break;
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`[Stripe] invoice.payment_succeeded — subscription renewal: ${invoice.subscription}`);
      // TODO: log renewal, send shipment notification
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      console.error(`[Stripe] invoice.payment_failed — subscription: ${invoice.subscription}`);
      // TODO: notify customer, pause subscription
      break;
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      console.log(`[Stripe] subscription cancelled: ${sub.id}`);
      // TODO: update Supabase, send cancellation confirmation
      break;
    }

    default:
      console.log(`[Stripe] unhandled event: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
