import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { PortalDashboard } from "./PortalDashboard";

export const metadata: Metadata = {
  title: "Client Portal",
  description: "Manage your Kuvo Co. projects, billing, and account.",
};

export default async function PortalPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <PortalDashboard
      firstName={user.firstName || "there"}
      packageName={
        (user.publicMetadata?.packageName as string) || null
      }
      subscriptionName={
        (user.publicMetadata?.subscriptionName as string) || null
      }
      hasStripeCustomer={!!user.publicMetadata?.stripeCustomerId}
    />
  );
}
