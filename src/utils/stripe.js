// Stripe Configuration
// Replace with your actual Stripe publishable key
import { loadStripe } from '@stripe/stripe-js';

// Replace 'pk_test_...' with your actual Stripe publishable key
export const stripePromise = loadStripe('pk_test_YOUR_STRIPE_PUBLISHABLE_KEY');

