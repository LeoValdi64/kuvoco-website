import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#06080d]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1fr_auto] md:items-end lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src="/logo.png" alt="" width={34} height={34} className="h-8 w-8" />
            <span className="text-lg font-bold">Kuvoco</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">Conversion-focused websites for local service businesses in Washington.</p>
          <div className="mt-5 flex flex-col gap-2 text-sm text-slate-400 sm:flex-row sm:gap-6">
            <a href="mailto:hello@kuvoco.com" className="inline-flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4" /> hello@kuvoco.com</a>
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> Mount Vernon, WA</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
          <Link href="/#services" className="hover:text-white">Services</Link>
          <Link href="/#work" className="hover:text-white">Work</Link>
          <Link href="/#pricing" className="hover:text-white">Pricing</Link>
          <Link href="/#contact" className="hover:text-white">Contact</Link>
        </div>
      </div>
      <div className="border-t border-white/5 px-4 py-5 text-center text-xs text-slate-600">© 2026 Kuvoco. All rights reserved.</div>
    </footer>
  );
}
