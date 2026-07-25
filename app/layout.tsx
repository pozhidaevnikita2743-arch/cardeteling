import type { Metadata } from "next";
import { clientConfig } from "@/config/client";
import "./globals.css";

export const metadata: Metadata = {
  title: clientConfig.seo.title,
  description: clientConfig.seo.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { colors } = clientConfig;

  return (
    <html
      lang="ru"
      style={
        {
          "--color-primary": colors.primary,
          "--color-accent": colors.accent,
          "--color-dark": colors.dark,
          "--color-light": colors.light,
          "--color-bg": colors.bg,
        } as React.CSSProperties
      }
    >
      <body>{children}</body>
    </html>
  );
}
