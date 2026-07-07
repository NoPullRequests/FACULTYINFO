import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PageTransitionProvider } from "@/components/providers/page-transition-provider";

/**
 * Public site chrome — navbar + footer (excluded from /admin).
 */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </main>
      <Footer />
    </>
  );
}
