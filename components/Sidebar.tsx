import { ArchiveBox, House, ListPlus } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/router";

// components
import ButtonSidebar from "./button/ButtonSidebar";

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="hidden border-r border-gray-100 bg-gray-50 xl:flex xl:h-full xl:min-w-[250px] xl:flex-col xl:gap-[30px] xl:px-[20px] xl:py-[30px]">
      <Link href="/" className="text-center font-bold text-default-900">
        TB Sinar Baja
      </Link>

      <div className="flex flex-1 flex-col overflow-y-scroll">
        <div className="grid gap-1">
          {/* <div
            className={`flex h-10 items-center justify-between rounded-xl px-3 py-2 ${
              router.pathname.startsWith("/owner")
                ? "bg-primary text-white hover:bg-primary/90"
                : router.pathname.startsWith("/admin")
                  ? "bg-lime-500 text-white hover:bg-lime-500/90"
                  : router.pathname.startsWith("/cashier")
                    ? "bg-rose-500 text-white hover:bg-rose-500/90"
                    : "bg-transparent text-gray-600 hover:bg-gray-200"
            }`}
          >
            <div className="flex flex-1 items-center gap-2">
              <House weight="bold" size={20} />
              <div className="text-sm font-semibold">Dashboard</div>
            </div>
          </div> */}

          <ButtonSidebar
            label="Dashboard"
            path="/owner/dashboard"
            icon={<House weight="bold" size={20} />}
          />

          <ButtonSidebar
            label="Produk"
            path="/owner/products"
            icon={<ArchiveBox weight="bold" size={20} />}
          />

          <ButtonSidebar
            label="Kategori"
            path="/owner/categories"
            icon={<ListPlus weight="bold" size={20} />}
          />
        </div>
      </div>
    </div>
  );
}
