import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import NavBar from "@/components/Navbar";

export const dynamic = 'force-dynamic'
const mont = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TUF",
  description: "TakUForward",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
         <link rel="shortcut icon" href="logo.png" type="image/x-icon" />
      </head>
      <body className={`${mont.className} w-full bg-neutral-200 dark:bg-neutral-900 tabular-nums min-h-fit h-[100%]`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
     <main className="flex min-h-fit h-full gap-4 w-full max-w-[96rem] mx-auto justify-start items-start p-4 text-sm flex-wrap">
        <NavBar/>
       <div className="flex-1 h-full min-h-fit">
            {children}
       </div>
    </main>
          </ThemeProvider>
      </body>
    </html>
  );
}
