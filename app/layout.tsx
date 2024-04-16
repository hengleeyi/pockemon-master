import { useSelectedLayoutSegments } from "next/navigation";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/mian-nav";
import { ThemeProvider } from "../components/theme-provider";
import { ReactQueryProvider } from "@/components/react-query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokemon Master",
  description: "Pokemon Master is a platform for Pokemon fans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <MainNav />
            <main className="w-10/12 m-auto">{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
