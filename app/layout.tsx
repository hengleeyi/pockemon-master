import MainNav from "@/components/mian-nav";
import { ReactQueryProvider } from "@/components/react-query-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokemon Master222222",
  description: "Pokemon Master is a platform for Pokemon fans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <MainNav />
            <main className="w-10/12 m-auto">{children}</main>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
