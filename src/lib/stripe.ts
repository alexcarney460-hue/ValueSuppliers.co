import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;

export const stripe = secretKey ? new Stripe(secretKey) : null;

// 10% additional discount for Subscribe & Save on top of tier pricing
export const AUTOSHIP_DISCOUNT = 0.10;
