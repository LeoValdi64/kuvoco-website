"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CreditCard,
  FileText,
  PenLine,
  ArrowRight,
  CheckCircle2,
  Clock,
  Package,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PortalDashboardProps {
  firstName: string;
  packageName: string | null;
  subscriptionName: string | null;
  hasStripeCustomer: boolean;
}

const quickLinks = [
  {
    href: "/portal/billing",
    label: "Billing",
    description: "Manage payments & plans",
    icon: CreditCard,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    href: "/portal/invoices",
    label: "Invoices",
    description: "View invoice history",
    icon: FileText,
    color: "text-[#3B82F6]",
    bg: "bg-[#3B82F6]/10",
  },
  {
    href: "/portal/changes",
    label: "Request Changes",
    description: "Submit content updates",
    icon: PenLine,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
];

export function PortalDashboard({
  firstName,
  packageName,
  subscriptionName,
  hasStripeCustomer,
}: PortalDashboardProps) {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {firstName}
        </h1>
        <p className="text-[#9CA3AF]">
          Here&apos;s an overview of your account and projects.
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Project Status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-[#1A1A2E]/50 border-white/5 h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Package className="w-4 h-4 text-emerald-400" />
                </div>
                <CardTitle className="text-sm text-white font-medium">
                  Project
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {packageName ? (
                <div>
                  <p className="text-lg font-semibold text-white capitalize">
                    {packageName}
                  </p>
                  <Badge className="mt-2 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-[#9CA3AF]">No active project</p>
                  <Link href="/pricing">
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 border-white/10 text-white hover:bg-white/5 text-xs"
                    >
                      Get Started
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Subscription Status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="bg-[#1A1A2E]/50 border-white/5 h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-[#3B82F6]" />
                </div>
                <CardTitle className="text-sm text-white font-medium">
                  Subscription
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {subscriptionName ? (
                <div>
                  <p className="text-lg font-semibold text-white capitalize">
                    {subscriptionName} Plan
                  </p>
                  <Badge className="mt-2 bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-[#9CA3AF]">
                    No active subscription
                  </p>
                  <Link href="/pricing">
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 border-white/10 text-white hover:bg-white/5 text-xs"
                    >
                      View Plans
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Changes This Month */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-[#1A1A2E]/50 border-white/5 h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-violet-400" />
                </div>
                <CardTitle className="text-sm text-white font-medium">
                  Changes This Month
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-white">1 of 5 used</p>
              <div className="mt-2 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                  style={{ width: "20%" }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.05 }}
              >
                <Link href={link.href}>
                  <Card className="bg-[#1A1A2E]/30 border-white/5 hover:border-white/10 hover:bg-[#1A1A2E]/50 transition-all duration-200 group">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg ${link.bg} flex items-center justify-center`}
                        >
                          <Icon className={`w-5 h-5 ${link.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white group-hover:text-[#3B82F6] transition-colors">
                            {link.label}
                          </p>
                          <p className="text-xs text-[#6B7280]">
                            {link.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#6B7280] group-hover:text-[#3B82F6] group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity — Placeholder */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">
          Recent Activity
        </h2>
        <Card className="bg-[#1A1A2E]/30 border-white/5">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 text-[#6B7280]" />
              </div>
              <p className="text-sm text-[#9CA3AF] mb-1">
                {hasStripeCustomer
                  ? "Your recent activity will appear here."
                  : "No activity yet. Get started with a project!"}
              </p>
              {!hasStripeCustomer && (
                <Link href="/pricing">
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 border-white/10 text-white hover:bg-white/5 text-xs"
                  >
                    Explore Plans
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
