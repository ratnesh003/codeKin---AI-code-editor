import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { JetBrains_Mono, Roboto } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/session-provider";

const robotoSans = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jet-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CodeKin Online IDE",
  description: "A playground for building your coding skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${jetBrainsMono.variable} ${robotoSans.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableColorScheme
          >
            {children}
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
