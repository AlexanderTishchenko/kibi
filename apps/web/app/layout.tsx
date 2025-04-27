import type { Metadata } from "next";
import "../app/index.css";
import LayoutClient from "./layout.client";

export const metadata: Metadata = {
  title: "Kibi App",
  description: "Kibi app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}