import Head from "next/head";
import React from "react";

// components
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/NavbarDashboard";
import Sidebar from "@/components/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function DashboardLayout({
  children,
  title,
}: DashboardLayoutProps) {
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
}
