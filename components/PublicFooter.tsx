"use client";

import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="bg-surface-container-lowest border-t border-surface-container w-full">
      <div className="w-full py-16 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1">
          <div className="text-2xl font-black font-headline text-primary mb-6">LearnLoop</div>
          <p className="text-surface-variant text-sm mb-8 max-w-xs leading-relaxed font-medium">
            The AI-driven learning platform designed for the modern intellect. Fast, fun, and effective.
          </p>
          <div className="flex gap-4">
            <SocialIcon icon="public" />
            <SocialIcon icon="alternate_email" />
            <SocialIcon icon="share" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 col-span-1 md:col-span-3 gap-8">
          <FooterColumn title="Product" links={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Community Hub", href: "/community" },
            { label: "Leaderboards", href: "/leaderboard" },
            { label: "Missions", href: "/missions" }
          ]} />
          
          <FooterColumn title="Legal" links={[
            { label: "Privacy Policy", href: "/legal#privacy" },
            { label: "Terms of Service", href: "/legal#terms" },
            { label: "Cookie Policy", href: "/legal#cookies" }
          ]} />
          
          <FooterColumn title="Support" links={[
            { label: "Help Center", href: "/support" },
            { label: "Contact Us", href: "/contact" },
            { label: "Status", href: "/status" }
          ]} />
        </div>
      </div>
      
      <div className="border-t border-surface-container py-8 px-6 text-center">
        <p className="text-surface-variant text-[10px] font-black uppercase tracking-widest">
           &copy; {new Date().getFullYear()} LearnLoop Systems. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string, links: { label: string, href: string }[] }) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="font-black font-headline text-surface-on text-xs uppercase tracking-[0.2em]">{title}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-surface-variant hover:text-primary text-sm font-bold transition-colors">
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
    <span className="material-symbols-outlined text-surface-variant hover:text-primary cursor-pointer transition-colors p-2.5 bg-surface rounded-full border border-surface-container">
      {icon}
    </span>
  );
}
