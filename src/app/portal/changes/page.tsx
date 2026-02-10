"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PenLine, Send, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChangeRequest {
  id: string;
  date: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "done";
}

const placeholderRequests: ChangeRequest[] = [
  {
    id: "CR-003",
    date: "Feb 5, 2026",
    description: "Update phone number on contact page",
    priority: "high",
    status: "in-progress",
  },
  {
    id: "CR-002",
    date: "Jan 28, 2026",
    description: "Add new team member to about page",
    priority: "medium",
    status: "done",
  },
  {
    id: "CR-001",
    date: "Jan 15, 2026",
    description: "Update holiday hours banner",
    priority: "low",
    status: "done",
  },
];

const statusStyles = {
  pending: {
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    icon: Clock,
  },
  "in-progress": {
    badge: "bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20",
    icon: Loader2,
  },
  done: {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    icon: CheckCircle2,
  },
};

const priorityStyles = {
  low: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  high: "bg-red-500/10 text-red-400 border-red-500/20",
};

const CHANGES_USED = 1;
const CHANGES_TOTAL = 5;

export default function ChangesPage() {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim() || !priority) return;

    setSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      alert(
        "Change request submitted! (This is a placeholder — no data was saved.)"
      );
      setDescription("");
      setPriority("");
      setSubmitting(false);
    }, 1000);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Request Changes
        </h1>
        <p className="text-[#9CA3AF]">
          Submit content update requests for your website.
        </p>
      </div>

      {/* Usage Counter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-[#1A1A2E]/50 border-white/5">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-white">
                Changes This Month
              </p>
              <p className="text-sm text-[#9CA3AF]">
                <span className="text-white font-semibold">{CHANGES_USED}</span>{" "}
                of {CHANGES_TOTAL} used
              </p>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(CHANGES_USED / CHANGES_TOTAL) * 100}%`,
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-full"
              />
            </div>
            <p className="text-xs text-[#6B7280] mt-2">
              {CHANGES_TOTAL - CHANGES_USED} changes remaining this month.
              Resets on March 1, 2026.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* New Request Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Card className="bg-[#1A1A2E]/50 border-white/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <PenLine className="w-4 h-4 text-[#3B82F6]" />
              <CardTitle className="text-lg text-white">
                New Change Request
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-[#9CA3AF] mb-2">
                  What changes do you need?
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the changes you'd like made to your website..."
                  className="bg-[#0A0A0F] border-white/10 text-white placeholder:text-[#6B7280] min-h-[120px] resize-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]"
                />
              </div>
              <div>
                <label className="block text-sm text-[#9CA3AF] mb-2">
                  Priority
                </label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="bg-[#0A0A0F] border-white/10 text-white focus:ring-1 focus:ring-[#3B82F6] [&>span]:text-white">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A2E] border-white/10">
                    <SelectItem
                      value="low"
                      className="text-white focus:bg-white/5 focus:text-white"
                    >
                      Low — No rush
                    </SelectItem>
                    <SelectItem
                      value="medium"
                      className="text-white focus:bg-white/5 focus:text-white"
                    >
                      Medium — Within a few days
                    </SelectItem>
                    <SelectItem
                      value="high"
                      className="text-white focus:bg-white/5 focus:text-white"
                    >
                      High — ASAP
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                disabled={!description.trim() || !priority || submitting}
                className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:opacity-90 text-white font-semibold disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Request
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Past Requests */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg font-semibold text-white mb-4">
          Past Requests
        </h2>
        <div className="space-y-3">
          {placeholderRequests.map((request) => {
            const statusConfig = statusStyles[request.status];
            const StatusIcon = statusConfig.icon;
            return (
              <Card
                key={request.id}
                className="bg-[#1A1A2E]/30 border-white/5"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-[#6B7280]">
                          {request.id}
                        </span>
                        <span className="text-xs text-[#6B7280]">
                          {request.date}
                        </span>
                      </div>
                      <p className="text-sm text-white">{request.description}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge
                        className={priorityStyles[request.priority]}
                        variant="outline"
                      >
                        {request.priority}
                      </Badge>
                      <Badge
                        className={statusConfig.badge}
                        variant="outline"
                      >
                        <StatusIcon
                          className={`w-3 h-3 mr-1 ${
                            request.status === "in-progress"
                              ? "animate-spin"
                              : ""
                          }`}
                        />
                        {request.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
