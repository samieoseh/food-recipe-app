import Container from "@/components/Container";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import QueryProvider from "../providers/QueryProvider";
import FavoriteContextProvider from "@/providers/FavoriteContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Food Recipe App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b">
          <Container>
            <Navbar />
          </Container>
        </header>
        <QueryProvider>
          <FavoriteContextProvider>{children}</FavoriteContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
