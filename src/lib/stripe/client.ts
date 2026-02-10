import Stripe from "stripe";

function getStripeInstance(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;

  if (!key || key === "sk_test_placeholder") {
    throw new Error(
      "STRIPE_SECRET_KEY is not configured. Please add a valid Stripe secret key to your .env.local file."
    );
  }

  return new Stripe(key, {
    typescript: true,
  });
}

export function getStripe(): Stripe {
  return getStripeInstance();
}
