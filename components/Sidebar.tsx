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
          {router.pathname.startsWith("/owner") ? (
            <>
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
            </>
          ) : null}

          {router.pathname.startsWith("/admin") ? (
            <>
              <ButtonSidebar
                label="Dashboard"
                path="/admin/dashboard"
                icon={<House weight="bold" size={20} />}
              />

              <ButtonSidebar
                label="Produk"
                path="/admin/products"
                icon={<ArchiveBox weight="bold" size={20} />}
              />

              <ButtonSidebar
                label="Kategori"
                path="/admin/categories"
                icon={<ListPlus weight="bold" size={20} />}
              />
            </>
          ) : null}

          {router.pathname.startsWith("/cashier") ? (
            <>
              <ButtonSidebar
                label="Dashboard"
                path="/cashier/dashboard"
                icon={<House weight="bold" size={20} />}
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
