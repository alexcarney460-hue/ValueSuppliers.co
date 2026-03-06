import { Client, Environment } from 'square';

const accessToken = process.env.SQUARE_ACCESS_TOKEN;
const isProd = process.env.SQUARE_ENVIRONMENT === 'production';

export const squareClient = accessToken
  ? new Client({
      accessToken,
      environment: isProd ? Environment.Production : Environment.Sandbox,
    })
  : null;

export const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID ?? '';

// Subscription plan variation IDs (create once in Square Dashboard → Items → Subscriptions)
// Set these env vars after creating plans in Square Dashboard
export const SQUARE_AUTOSHIP_PLAN_ID = process.env.SQUARE_AUTOSHIP_PLAN_ID ?? '';

// 10% additional discount for Subscribe & Save on top of tier pricing
export const AUTOSHIP_DISCOUNT = 0.10;
