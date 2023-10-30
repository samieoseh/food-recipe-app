import Container from "@/components/Container";
import "../globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Food Recipe App",
  description: "Generated by create next app",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Container className="py-4">
        <h2>Logo</h2>
      </Container>
      {children}
      <div className="absolute bottom-0 w-full py-4">
        <Container>
          <p className="text-xs text-center">
            By continuing, you agree to the{" "}
            <Link href="/login" className="underline text-xs ">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/login" className="underline text-xs ">
              Privacy Policy
            </Link>{" "}
            and to recieve our latest updates{" "}
          </p>
        </Container>
      </div>
    </>
  );
}