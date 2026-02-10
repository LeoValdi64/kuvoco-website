import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/client";
import { clerkClient } from "@clerk/nextjs/server";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret || webhookSecret === "whsec_placeholder") {
    console.error("[STRIPE_WEBHOOK] Webhook secret not configured");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[STRIPE_WEBHOOK] Signature verification failed:", message);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    );
  }

  try {
    const client = await clerkClient();

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const clerkUserId = session.metadata?.clerkUserId;
        const stripeCustomerId = session.customer as string;

        if (clerkUserId && stripeCustomerId) {
          await client.users.updateUserMetadata(clerkUserId, {
            publicMetadata: {
              stripeCustomerId,
              packageName: session.metadata?.packageName || null,
              subscriptionName: session.metadata?.subscriptionName || null,
            },
          });
          console.log(
            `[STRIPE_WEBHOOK] checkout.session.completed — Updated user ${clerkUserId} with customer ${stripeCustomerId}`
          );
        }
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(
          `[STRIPE_WEBHOOK] invoice.paid — Invoice ${invoice.id} for customer ${invoice.customer}`
        );
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;
        console.error(
          `[STRIPE_WEBHOOK] invoice.payment_failed — Invoice ${invoice.id} for customer ${customerId}`
        );
        // In a real app, you'd look up the Clerk user by stripeCustomerId and flag the account
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(
          `[STRIPE_WEBHOOK] ${event.type} — Subscription ${subscription.id} status: ${subscription.status}`
        );
        // In a real app, you'd update subscription status in Clerk metadata
        break;
      }

      default:
        console.log(`[STRIPE_WEBHOOK] Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[STRIPE_WEBHOOK] Error processing event:", message);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
