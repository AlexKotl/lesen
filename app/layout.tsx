import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lesen",
  description: "Your language teacher",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex justify-center items-center py-4 ">
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="me-8"
          />
          <Button variant="link">Home</Button>
          <Button variant="link">About</Button>
          <Button variant="link">Contacts</Button>
        </header>
        <div className="mx-auto max-w-4xl p-4 my-8">{children}</div>
        <footer className="text-center py-4">
          <small> 2024 &copy; Your foreighn language daily reading</small>
        </footer>
      </body>
    </html>
  );
}
