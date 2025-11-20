import type { Metadata } from "next";
import { Inter, Noto_Serif, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { I18nProvider } from "@/lib/i18n/I18nProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-sans-sc",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Hex Oracle | I Ching Divination | 易经占卜",
  description: "Ancient wisdom for modern seekers. Consult the I Ching oracle for guidance and insight. 易经占卜，古老智慧，现代启迪。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoSerif.variable} ${notoSansSC.variable} font-sans antialiased`}
      >
        <I18nProvider>
          <AppShell>{children}</AppShell>
        </I18nProvider>
      </body>
    </html>
  );
}
