"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  ExternalLink,
  Calendar,
  Shield,
  Loader2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function BillingPage() {
  const [loading, setLoading] = useState(false);

  async function handleManageBilling() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Unable to open billing portal.");
        setLoading(false);
      }
    } catch {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Billing</h1>
        <p className="text-[#9CA3AF]">
          Manage your subscription, payment methods, and billing preferences.
        </p>
      </div>

      {/* Current Plan */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-[#1A1A2E]/50 border-white/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-white">Current Plan</CardTitle>
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-[#6B7280] mb-1">Plan</p>
                <p className="text-xl font-semibold text-white">
                  Growth Maintenance
                </p>
                <p className="text-sm text-[#9CA3AF] mt-1">
                  5 content changes/month, analytics, priority support
                </p>
              </div>
              <div>
                <p className="text-sm text-[#6B7280] mb-1">Monthly Cost</p>
                <p className="text-xl font-semibold gradient-text">
                  $59.00/mo
                </p>
                <p className="text-sm text-[#9CA3AF] mt-1">
                  Billed monthly
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Payment Method */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Card className="bg-[#1A1A2E]/50 border-white/5">
          <CardHeader>
            <CardTitle className="text-lg text-white">Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 rounded bg-white/10 flex items-center justify-center">
                <CreditCard className="w-5 h-3.5 text-[#9CA3AF]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">
                  Visa ending in 4242
                </p>
                <p className="text-xs text-[#6B7280]">Expires 12/2027</p>
              </div>
              <Badge
                variant="outline"
                className="border-white/10 text-[#9CA3AF]"
              >
                Default
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Next Billing */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-[#1A1A2E]/50 border-white/5">
          <CardHeader>
            <CardTitle className="text-lg text-white">
              Billing Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-[#3B82F6]" />
                </div>
                <div>
                  <p className="text-sm text-[#6B7280]">Next Payment</p>
                  <p className="text-sm font-medium text-white">
                    March 1, 2026
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-[#6B7280]">Member Since</p>
                  <p className="text-sm font-medium text-white">
                    January 15, 2026
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Manage Billing Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <Button
          onClick={handleManageBilling}
          disabled={loading}
          className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:opacity-90 text-white font-semibold px-6"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Opening Portal...
            </>
          ) : (
            <>
              Manage Billing
              <ExternalLink className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
        <p className="text-xs text-[#6B7280] mt-2">
          Opens the Stripe Customer Portal to manage subscriptions, payment
          methods, and billing details.
        </p>
      </motion.div>
    </div>
  );
}
