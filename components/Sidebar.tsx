import Link from "next/link";
import { useRouter } from "next/router";

// components
import SidebarMenuAdmin from "./SidebarMenuAdmin";
import SidebarMenuOwner from "./SidebarMenuOwner";

interface SidebarProps {
  sidebarOpen?: boolean;
}

export default function Sidebar({ sidebarOpen }: SidebarProps) {
  const router = useRouter();

  const itemClasses = {
    base: "p-0 w-full",
    trigger:
      "py-2 px-3 h-10 rounded-xl flex gap-2 items-center data-[hover=true]:bg-gray-200",
    title: "text-sm font-semibold text-gray-600",
    content: "text-small",
  };

  function setColor() {
    if (router.pathname.startsWith("/owner")) {
      return "bg-primary";
    }

    if (router.pathname.startsWith("/admin")) {
      return "bg-teal-500";
    }

    if (router.pathname.startsWith("/cashier")) {
      return "bg-rose-500";
    }
  }

  return (
    <div
      className={`fixed top-0 z-40 grid h-screen min-w-[250px] grid-rows-[24px_1fr] gap-[30px] border-r border-gray-100 bg-gray-50 px-[20px] py-[30px] shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-all duration-500 xl:static xl:shadow-none ${
        sidebarOpen ? "left-0" : "-left-full"
      }`}
    >
      <Link
        href="/"
        className="inline-flex w-max items-center gap-2 justify-self-end xl:justify-self-center"
      >
        <div className={`h-6 w-6 rounded-full ${setColor()}`} />

        <div className="font-bold text-default-900">TB. SINAR BAJA</div>
      </Link>

      <div className="flex flex-1 flex-col overflow-y-scroll scrollbar-hide">
        <div className="grid gap-5">
          {router.pathname.startsWith("/owner") ? (
            <SidebarMenuOwner itemClasses={itemClasses} />
          ) : null}

          {router.pathname.startsWith("/admin") ? (
            <SidebarMenuAdmin itemClasses={itemClasses} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
