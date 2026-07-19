export type LeadDetails = {
  name?: string;
  email: string;
  business: string;
  website?: string;
  priority?: string;
  message?: string;
};

function getDemoSource() {
  const demo = new URLSearchParams(window.location.search).get("demo");
  return demo ? demo.replace(/[^a-z0-9-]/gi, "").slice(0, 40) : "direct";
}

export function openPreparedEmail(details: LeadDetails, placement: "hero" | "full") {
  const subject = `Website preview request - ${details.business}`;
  const body = [
    `Name: ${details.name || "Not provided"}`,
    `Email: ${details.email}`,
    `Business: ${details.business}`,
    `Current website: ${details.website || "None"}`,
    `Main priority: ${details.priority || "Not specified"}`,
    `Form placement: ${placement}`,
    `Demo source: ${getDemoSource()}`,
    "",
    "Project notes:",
    details.message || "No additional notes.",
  ].join("\n");

  window.location.href = `mailto:hello@kuvoco.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
