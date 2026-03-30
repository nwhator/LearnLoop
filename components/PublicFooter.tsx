"use client";

import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="bg-white border-t border-surface-container-low pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2 lg:col-span-2">
          <Link href="/" className="text-2xl font-black font-headline text-primary tracking-tighter mb-6 block">LearnLoop</Link>
          <p className="text-on-surface-variant text-sm mb-8 max-w-xs leading-relaxed">
            The AI-driven learning platform designed for the modern intellect. Master any subject through gameplay, competition, and neural-extraction technology.
          </p>
          <div className="flex gap-4">
            <SocialIcon icon="public" />
            <SocialIcon icon="share" />
            <SocialIcon icon="chat_bubble" />
          </div>
        </div>
        <div className="col-span-1">
          <FooterColumn title="Explore" links={[
            { label: "Missions", href: "/missions" },
            { label: "Leaderboard", href: "/leaderboard" },
            { label: "XP Store", href: "/premium" },
            { label: "Study Pods", href: "/community" },
          ]} />
        </div>
        <div className="col-span-1">
          <FooterColumn title="Support" links={[
            { label: "Help Center", href: "/support" },
            { label: "API Docs", href: "/support" },
            { label: "Community", href: "/community" },
            { label: "Contact", href: "/support" },
          ]} />
        </div>
        <div className="col-span-1">
          <FooterColumn title="Company" links={[
            { label: "About Us", href: "/about" },
            { label: "Careers", href: "/terms" },
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
          ]} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-surface-container-low flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-on-surface-variant text-sm">&copy; {new Date().getFullYear()} LearnLoop. Built for the future of education.</p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="font-bold text-on-surface mb-1">{title}</h3>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-on-surface-variant hover:text-primary text-sm transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ icon }: { icon: string }) {
  return (
    <a href="#" className="w-10 h-10 rounded-full border border-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-white transition-all">
      <span className="material-symbols-outlined text-xl">{icon}</span>
    </a>
  );
}
