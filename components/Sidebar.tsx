import { Accordion, AccordionItem } from "@nextui-org/react";
import {
  ArchiveBox,
  CaretRight,
  Circle,
  ClockCounterClockwise,
  House,
  ListPlus,
  Package,
  Truck,
  Users,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/router";

// components
import ButtonSidebar from "@/components/button/ButtonSidebar";

interface SidebarProps {
  sidebarOpen?: boolean;
}

export default function Sidebar({ sidebarOpen }: SidebarProps) {
  const router = useRouter();

  const itemClasses = {
    base: "p-0 w-full",
    trigger:
      "py-2 px-3 h-10 data-[hover=true]:bg-gray-200 rounded-xl flex gap-2 items-center",
    title: "text-sm font-semibold text-gray-600",
    content: "text-small",
  };

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
        <div
          className={`h-6 w-6 rounded-full ${
            router.pathname.startsWith("/owner")
              ? "bg-primary"
              : router.pathname.startsWith("/admin")
                ? "bg-lime-500"
                : router.pathname.startsWith("/cashier")
                  ? "bg-rose-500"
                  : null
          }`}
        />

        <div className="font-bold text-default-900">TB Sinar Baja</div>
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
              <ButtonSidebar
                label="Stok"
                path="/owner/stocks"
                icon={<Package weight="bold" size={20} />}
              />

              <Accordion isCompact itemClasses={itemClasses} className="p-0">
                <AccordionItem
                  aria-label="button"
                  title="Supplier"
                  indicator={<CaretRight weight="bold" size={16} />}
                  startContent={
                    <Truck weight="bold" size={20} className="text-gray-600" />
                  }
                  className="grid gap-1"
                >
                  <ButtonSidebar
                    label="Daftar Supplier"
                    path="/owner/supplier/lists"
                    icon={<Circle weight="fill" size={6} />}
                    className="mx-4"
                  />

                  <ButtonSidebar
                    label="Harga Supplier"
                    path="/owner/supplier/pricelists"
                    icon={<Circle weight="fill" size={6} />}
                    className="mx-4"
                  />

                  <ButtonSidebar
                    label="Preorder"
                    path="/owner/supplier/preorders"
                    icon={<Circle weight="fill" size={6} />}
                    className="mx-4"
                  />

                  <ButtonSidebar
                    label="Order"
                    path="/owner/supplier/orders"
                    icon={<Circle weight="fill" size={6} />}
                    className="mx-4"
                  />

                  <ButtonSidebar
                    label="Invoice"
                    path="/owner/supplier/invoices"
                    icon={<Circle weight="fill" size={6} />}
                    className="mx-4"
                  />

                  <ButtonSidebar
                    label="Pembayaran"
                    path="/owner/supplier/payments"
                    icon={<Circle weight="fill" size={6} />}
                    className="mx-4"
                  />
                </AccordionItem>
              </Accordion>

              <ButtonSidebar
                label="Riwayat"
                path="/owner/histories"
                icon={<ClockCounterClockwise weight="bold" size={20} />}
              />

              <ButtonSidebar
                label="Pengguna"
                path="/owner/users"
                icon={<Users weight="bold" size={20} />}
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

              <Accordion isCompact itemClasses={itemClasses} className="p-0">
                <AccordionItem
                  aria-label="button"
                  title="Supplier"
                  indicator={<CaretRight weight="bold" size={16} />}
                  startContent={
                    <Package
                      weight="bold"
                      size={20}
                      className="text-gray-600"
                    />
                  }
                  className="grid gap-1"
                >
                  <ButtonSidebar
                    label="Supplier 1"
                    path="#"
                    icon={<Circle weight="fill" size={6} />}
                    className="mx-4"
                  />

                  <ButtonSidebar
                    label="Supplier 2"
                    path="#"
                    icon={<Circle weight="fill" size={6} />}
                    className="mx-4"
                  />
                </AccordionItem>
              </Accordion>
            </>
          ) : null}

          {router.pathname.startsWith("/cashier") ? (
            <ButtonSidebar
              label="Dashboard"
              path="/cashier/dashboard"
              icon={<House weight="bold" size={20} />}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
