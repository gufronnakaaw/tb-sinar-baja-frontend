import Head from "next/head";

// components
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/NavbarSecondary";

interface SecondaryLayoutProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export default function SecondaryLayout({
  children,
  title,
  className,
}: SecondaryLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      <main
        className={`mx-auto min-h-screen max-w-[1120px] overflow-hidden ${className}`}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
