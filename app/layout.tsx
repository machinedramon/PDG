// import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";
import "./globals.css";
import { PostProvider } from "@/utils/contexts/PostContext";
import { Toaster } from "react-hot-toast";

// If loading a variable font, you don't need to specify the font weight
const rajdhani = Inter({
  weight: "400",
  subsets: ["latin"],
  preload: true,
  display: "swap",
});

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
    <html lang="en" className={rajdhani.className}>
      <PostProvider>
        <body className="bg-background text-foreground">
          <Toaster
            position="top-right"
            toastOptions={{
              className:
                "rounded-lg bg-[#29292f] text-white border border-gray-700",
            }}
          />
          {children}
        </body>
      </PostProvider>
    </html>
  );
}
