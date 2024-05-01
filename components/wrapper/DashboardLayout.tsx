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
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className="flex h-screen">
        <Sidebar sidebarOpen={sidebarOpen} />

        <div className="grid w-full">
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <div className="overflow-y-scroll">
            <div className="mx-auto w-full max-w-[1200px] p-6">{children}</div>

            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}
