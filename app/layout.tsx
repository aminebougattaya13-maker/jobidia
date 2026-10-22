import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jobidia | AI assistant",
  description: "A modern AI chat experience inspired by premium assistants.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
