import type { Metadata } from "next";
import { Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";
import UseQueryProvider from "@/providers/UseQueryProvider";
import Header from "@/components/ui/Header";
import { ThemeProvider } from "@/providers/ThemeProvider";

const notoGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-noto-georgian",
});

export const metadata: Metadata = {
  title: "Selfaware Engine",
  description: "Corporate Assessment Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka" suppressHydrationWarning>
      <body className={`${notoGeorgian.variable} font-sans`}>
        <UseQueryProvider>
          <ThemeProvider>
            <Header /> {children}
          </ThemeProvider>
        </UseQueryProvider>
      </body>
    </html>
  );
}
