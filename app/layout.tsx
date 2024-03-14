import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { PostProvider } from "@/utils/contexts/PostContext";
import Head from "next/head";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <Head>
        <script
          src="https://alwingulla.com/88/tag.min.js"
          data-zone="51028"
          async
          data-cfasync="false"
        ></script>
        <script src="monetagscript.js" async data-cfasync="false"></script>
        <script
          src="//phicmune.net/ntfc.php?p=7216313"
          data-cfasync="false"
          async
          onError={() => window._vawqicun()}
          onLoad={() => window._grepqmu()}
        ></script>
      </Head>
      <PostProvider>
        <body className="bg-background text-foreground">{children}</body>
      </PostProvider>
    </html>
  );
}
