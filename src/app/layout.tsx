import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "@/layouts/MainLayout";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import Providers from "@/providers/providers";
import EditModal from "@/components/modals/EditModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Twi-tter Clone app ",
  description:
    "This is a twi-tter clone app created with Next.js, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}

    >
      <body>
        <Providers>
          <RegisterModal />
          <LoginModal />
          <EditModal />
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
