import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import AppContextProvider from "@/providers/AppContextProvider";
import QueryProvider from "@/providers/QueryProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="relative mx-auto border-b border-[#f3f3f3]">
        <Navbar />
      </header>
      <QueryProvider>
        <AppContextProvider>
          {children}
          <Toaster />
        </AppContextProvider>
      </QueryProvider>
    </>
  );
}
