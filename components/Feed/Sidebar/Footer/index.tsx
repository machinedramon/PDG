"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="flex space-x-1 mb-2">
        <Link href="/privacy">Privacy</Link>
        <span>·</span>
        <Link href="/terms">Terms</Link>
        <span>·</span>
        <Link href="/advertising">Advertising</Link>
        <span>·</span>
        <Link href="/cookies">Cookies</Link>
        <span>·</span>
        <Link href="/more">More</Link>
      </div>
      <p>© PDG 2024</p>
    </>
  );
}
