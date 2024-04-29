import { ArchiveBox, House, ListPlus } from "@phosphor-icons/react";
import Link from "next/link";

// components
import ButtonSidebar from "@/components/button/ButtonSidebar";

export default function Sidebar() {
  return (
    <div className="hidden border-r border-gray-100 bg-gray-50 xl:flex xl:h-full xl:min-w-[250px] xl:flex-col xl:gap-[30px] xl:px-[20px] xl:py-[30px]">
      <Link href="/" className="text-center font-bold text-default-900">
        TB Sinar Baja
      </Link>

      <div className="flex flex-1 flex-col overflow-y-scroll">
        <div className="grid gap-1">
          <ButtonSidebar
            label="Dashboard"
            path="/dashboard"
            icon={<House weight="bold" size={20} />}
          />

          <ButtonSidebar
            label="Produk"
            path="#"
            icon={<ArchiveBox weight="bold" size={20} />}
          />

          <ButtonSidebar
            label="Kategori"
            path="#"
            icon={<ListPlus weight="bold" size={20} />}
          />
        </div>
      </div>
    </div>
  );
}
