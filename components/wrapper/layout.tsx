import React from "react";

// components
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import Head from "next/head";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="flex h-screen">
        <Sidebar />

        <div className="grid w-full">
          <Navbar />

          <div className="overflow-y-scroll">
            <div className="mx-auto w-full max-w-[1200px] p-6">{children}</div>

            <Footer />
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
