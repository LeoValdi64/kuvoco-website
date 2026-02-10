import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/client";

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await currentUser();
    const stripeCustomerId = user?.publicMetadata?.stripeCustomerId as
      | string
      | undefined;

    if (!stripeCustomerId) {
      return NextResponse.json(
        { error: "No Stripe customer found. Please make a purchase first." },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${appUrl}/portal/billing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    console.error("[STRIPE_PORTAL]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
