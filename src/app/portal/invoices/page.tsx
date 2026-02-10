"use client";

import { motion } from "framer-motion";
import { FileText, Download, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Invoice {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: "paid" | "pending" | "failed";
  pdfUrl: string;
}

const placeholderInvoices: Invoice[] = [
  {
    id: "INV-001",
    date: "Feb 1, 2026",
    description: "Growth Maintenance — February 2026",
    amount: "$59.00",
    status: "paid",
    pdfUrl: "#",
  },
  {
    id: "INV-002",
    date: "Jan 15, 2026",
    description: "Business Website — One-time",
    amount: "$699.00",
    status: "paid",
    pdfUrl: "#",
  },
  {
    id: "INV-003",
    date: "Jan 1, 2026",
    description: "Growth Maintenance — January 2026",
    amount: "$59.00",
    status: "paid",
    pdfUrl: "#",
  },
];

const statusStyles = {
  paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  failed: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function InvoicesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Invoices</h1>
        <p className="text-[#9CA3AF]">
          View and download your invoice history.
        </p>
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <Card className="bg-[#1A1A2E]/50 border-white/5">
          <CardContent className="p-5">
            <p className="text-sm text-[#6B7280] mb-1">Total Paid</p>
            <p className="text-2xl font-bold text-white">$817.00</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1A2E]/50 border-white/5">
          <CardContent className="p-5">
            <p className="text-sm text-[#6B7280] mb-1">Invoices</p>
            <p className="text-2xl font-bold text-white">3</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1A2E]/50 border-white/5">
          <CardContent className="p-5">
            <p className="text-sm text-[#6B7280] mb-1">Last Payment</p>
            <p className="text-2xl font-bold text-white">Feb 1, 2026</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Invoice Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Card className="bg-[#1A1A2E]/50 border-white/5 overflow-hidden">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#3B82F6]" />
              <CardTitle className="text-lg text-white">
                Invoice History
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-[#6B7280]">Date</TableHead>
                  <TableHead className="text-[#6B7280]">Description</TableHead>
                  <TableHead className="text-[#6B7280]">Amount</TableHead>
                  <TableHead className="text-[#6B7280]">Status</TableHead>
                  <TableHead className="text-[#6B7280] text-right">
                    PDF
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {placeholderInvoices.map((invoice) => (
                  <TableRow
                    key={invoice.id}
                    className="border-white/5 hover:bg-white/[0.02]"
                  >
                    <TableCell className="text-sm text-[#9CA3AF]">
                      {invoice.date}
                    </TableCell>
                    <TableCell className="text-sm text-white">
                      {invoice.description}
                    </TableCell>
                    <TableCell className="text-sm font-medium text-white">
                      {invoice.amount}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={statusStyles[invoice.status]}
                        variant="outline"
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#6B7280] hover:text-[#3B82F6] hover:bg-white/5 h-8 w-8 p-0"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Manage via Stripe */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-xs text-[#6B7280]">
          Full invoice management is available through the{" "}
          <a
            href="/portal/billing"
            className="text-[#3B82F6] hover:underline inline-flex items-center gap-1"
          >
            Stripe billing portal
            <ExternalLink className="w-3 h-3" />
          </a>
        </p>
      </motion.div>
    </div>
  );
}
