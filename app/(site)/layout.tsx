import { getUser } from "@/actions";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import AppContextProvider from "@/providers/AppContextProvider";
import QueryProvider from "@/providers/QueryProvider";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  return (
    <>
      <header className="relative mx-auto border-b border-[#f3f3f3] z-20">
        <Navbar user={user} />
      </header>
      <QueryProvider>
        <AppContextProvider>{children}</AppContextProvider>
      </QueryProvider>
    </>
  );
}
