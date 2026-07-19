import { permanentRedirect } from "next/navigation";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string | string[] }>;
}) {
  const params = await searchParams;
  const rawDemo = Array.isArray(params.demo) ? params.demo[0] : params.demo;
  const demo = rawDemo?.replace(/[^a-z0-9-]/gi, "").slice(0, 40);

  permanentRedirect(demo ? `/?demo=${encodeURIComponent(demo)}#contact` : "/#contact");
}
