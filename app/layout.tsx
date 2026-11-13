import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "@/components/Booking";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import ClickSpark from "@/components/reactbits/ClickSpark";
import { ScrollReset } from "@/components/ScrollReset";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lambtech.in"),
  title: {
    default: "LambTech — We eliminate operational debt",
    template: "%s · LambTech",
  },
  description:
    "Custom human-in-the-loop automation pipelines built on your existing ERP, Tally or spreadsheets. Deployed in 14 days, with zero per-seat SaaS fees.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Lets Next.js turn off smooth scrolling while it resets scroll on route
      // changes, so it stays smooth only for in-page anchor links.
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="font-sans">
        <ScrollReset />
        <BookingProvider>
          <ClickSpark sparkColor="#6366f1" sparkCount={8} sparkRadius={18} className="flex min-h-screen flex-col">
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </ClickSpark>
        </BookingProvider>
      </body>
    </html>
  );
}
