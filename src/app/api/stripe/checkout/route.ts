import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/client";
import { PACKAGES, SUBSCRIPTIONS } from "@/lib/stripe/products";
import type { PackageKey, SubscriptionKey } from "@/lib/stripe/products";
import type Stripe from "stripe";

interface CheckoutRequest {
  priceId?: string;
  packageName?: string;
  subscriptionName?: string;
  mode: "payment" | "subscription";
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await currentUser();

    let stripe: Stripe;
    try {
      stripe = getStripe();
    } catch {
      return NextResponse.json(
        { error: "Stripe is not configured. Please set STRIPE_SECRET_KEY in your environment variables." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as CheckoutRequest;
    const { priceId, packageName, subscriptionName, mode } = body;

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];
    let sessionMetadata: Record<string, string> = {
      clerkUserId: userId,
    };

    // If a Stripe Price ID is provided, use it directly
    if (priceId) {
      lineItems = [{ price: priceId, quantity: 1 }];
      sessionMetadata.packageName = packageName || "";
      sessionMetadata.subscriptionName = subscriptionName || "";
    } else if (mode === "payment" && packageName) {
      const pkg = PACKAGES[packageName as PackageKey];
      if (!pkg) {
        return NextResponse.json(
          { error: "Invalid package name" },
          { status: 400 }
        );
      }
      lineItems = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Kuvo Co. — ${pkg.name} Website`,
              metadata: pkg.metadata,
            },
            unit_amount: pkg.price,
          },
          quantity: 1,
        },
      ];
      sessionMetadata.packageName = packageName;
    } else if (mode === "subscription" && subscriptionName) {
      const sub = SUBSCRIPTIONS[subscriptionName as SubscriptionKey];
      if (!sub) {
        return NextResponse.json(
          { error: "Invalid subscription name" },
          { status: 400 }
        );
      }
      lineItems = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Kuvo Co. — ${sub.name} Maintenance`,
              metadata: sub.metadata,
            },
            unit_amount: sub.price,
            recurring: { interval: sub.interval },
          },
          quantity: 1,
        },
      ];
      sessionMetadata.subscriptionName = subscriptionName;
    } else {
      return NextResponse.json(
        { error: "Invalid request: provide priceId, or packageName/subscriptionName with correct mode" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode,
      success_url: `${appUrl}/portal?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/pricing`,
      customer_email: user?.emailAddresses[0]?.emailAddress,
      metadata: sessionMetadata,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    console.error("[STRIPE_CHECKOUT]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
