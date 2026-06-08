// Central site metadata used across pages and SEO tags.
export const SITE = {
  name: "1West SBA",
  title: "1West SBA — SBA 7(a) Loans for Small Business",
  description:
    "1West SBA helps small businesses secure SBA 7(a) financing with a streamlined application, expert underwriting, and dedicated loan officers.",
  url: "https://sba.1west.com",
  ogImage: "/og-default.svg",
  email: "sba@1west.com",
  phone: "(800) 000-0000",
} as const;

export type NavItem = { label: string; href: string };

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Broker Signup", href: "/broker-signup" },
];
