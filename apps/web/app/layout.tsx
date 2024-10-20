import "@benjamin/ui/benjamin-ui-global.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer, ThemeProvider } from "~/components";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Benjamin",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="bg-gbg dark:bg-slate-900 dark:text-white min-h-screen">
            <main className="w-full min-h-main lg:w-content h-auto mx-auto pt-0 lg:pt-20 px-5 lg:px-10 md:px-10 md:w-content md:pt-10">
              {children}
            </main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
