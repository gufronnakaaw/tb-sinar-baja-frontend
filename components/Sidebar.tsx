import { Accordion, AccordionItem } from "@nextui-org/react";
import {
  ArchiveBox,
  CaretRight,
  Circle,
  ClipboardText,
  ClockCounterClockwise,
  House,
  Invoice,
  ListBullets,
  ListNumbers,
  Package,
  Truck,
  Users,
  Wallet,
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
        <div className="grid gap-5">
          {router.pathname.startsWith("/owner") ? (
            <>
              <div className="grid gap-1">
                <ButtonSidebar
                  label="Dashboard"
                  path="/owner/dashboard"
                  icon={<House weight="bold" size={20} />}
                />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-[2px] text-gray-600">
                  Transaksi
                </span>

                <div className="mt-1 grid gap-1">
                  <ButtonSidebar
                    label="Order"
                    path="/owner/orders"
                    icon={<ClipboardText weight="bold" size={20} />}
                  />

                  <ButtonSidebar
                    label="Invoice"
                    path="/owner/invoices"
                    icon={<Invoice weight="bold" size={20} />}
                  />

                  <ButtonSidebar
                    label="Pembayaran"
                    path="/owner/payments"
                    icon={<Wallet weight="bold" size={20} />}
                  />

                  <ButtonSidebar
                    label="Riwayat"
                    path="/owner/histories"
                    icon={<ClockCounterClockwise weight="bold" size={20} />}
                  />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-[2px] text-gray-600">
                  Pengaturan
                </span>

                <div className="mt-1 grid gap-1">
                  <ButtonSidebar
                    label="Produk"
                    path="/owner/products"
                    icon={<ArchiveBox weight="bold" size={20} />}
                  />

                  <ButtonSidebar
                    label="Stok"
                    path="/owner/stocks"
                    icon={<ListNumbers weight="bold" size={20} />}
                  />

                  <ButtonSidebar
                    label="Kategori"
                    path="/owner/categories"
                    icon={<ListBullets weight="bold" size={20} />}
                  />

                  <Accordion
                    isCompact
                    itemClasses={itemClasses}
                    className="p-0"
                  >
                    <AccordionItem
                      aria-label="button"
                      title="Supplier"
                      indicator={<CaretRight weight="bold" size={16} />}
                      startContent={
                        <Truck
                          weight="bold"
                          size={20}
                          className="text-gray-600"
                        />
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
                    </AccordionItem>
                  </Accordion>

                  <Accordion
                    isCompact
                    itemClasses={itemClasses}
                    className="p-0"
                  >
                    <AccordionItem
                      aria-label="button"
                      title="Gudang"
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
                        label="In"
                        path="/owner/warehouses/in"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                      />

                      <ButtonSidebar
                        label="Out"
                        path="/owner/warehouses/out"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                      />

                      <ButtonSidebar
                        label="Surat Jalan"
                        path="/owner/warehouses/documents"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                      />

                      <ButtonSidebar
                        label="Daftar Gudang"
                        path="/owner/warehouses/lists"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                      />
                    </AccordionItem>
                  </Accordion>

                  <ButtonSidebar
                    label="Pengguna"
                    path="/owner/users"
                    icon={<Users weight="bold" size={20} />}
                  />
                </div>
              </div>
            </>
          ) : null}

          {router.pathname.startsWith("/admin") ? (
            <>
              <div className="grid gap-1">
                <ButtonSidebar
                  label="Dashboard"
                  path="/admin/dashboard"
                  icon={<House weight="bold" size={20} />}
                />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-[2px] text-gray-600">
                  Transaksi
                </span>

                <div className="mt-1 grid gap-1">
                  <ButtonSidebar
                    label="Order"
                    path="/admin/orders"
                    icon={<ClipboardText weight="bold" size={20} />}
                  />

                  <ButtonSidebar
                    label="Invoice"
                    path="/admin/invoices"
                    icon={<Invoice weight="bold" size={20} />}
                  />

                  <ButtonSidebar
                    label="Pembayaran"
                    path="/admin/payments"
                    icon={<Wallet weight="bold" size={20} />}
                  />

                  <ButtonSidebar
                    label="Riwayat"
                    path="/admin/histories"
                    icon={<ClockCounterClockwise weight="bold" size={20} />}
                  />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-[2px] text-gray-600">
                  Pengaturan
                </span>

                <div className="mt-1 grid gap-1">
                  <ButtonSidebar
                    label="Produk"
                    path="/admin/products"
                    icon={<ArchiveBox weight="bold" size={20} />}
                  />

                  <ButtonSidebar
                    label="Stok"
                    path="/admin/stocks"
                    icon={<ListNumbers weight="bold" size={20} />}
                  />

                  <ButtonSidebar
                    label="Kategori"
                    path="/admin/categories"
                    icon={<ListBullets weight="bold" size={20} />}
                  />

                  <Accordion
                    isCompact
                    itemClasses={itemClasses}
                    className="p-0"
                  >
                    <AccordionItem
                      aria-label="button"
                      title="Supplier"
                      indicator={<CaretRight weight="bold" size={16} />}
                      startContent={
                        <Truck
                          weight="bold"
                          size={20}
                          className="text-gray-600"
                        />
                      }
                      className="grid gap-1"
                    >
                      <ButtonSidebar
                        label="Daftar Supplier"
                        path="/admin/supplier/lists"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                      />

                      <ButtonSidebar
                        label="Harga Supplier"
                        path="/admin/supplier/pricelists"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                      />
                    </AccordionItem>
                  </Accordion>

                  <Accordion
                    isCompact
                    itemClasses={itemClasses}
                    className="p-0"
                  >
                    <AccordionItem
                      aria-label="button"
                      title="Gudang"
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
                        label="In"
                        path="/admin/warehouses/in"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                      />

                      <ButtonSidebar
                        label="Out"
                        path="/admin/warehouses/out"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                      />

                      <ButtonSidebar
                        label="Surat Jalan"
                        path="/admin/warehouses/documents"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                      />

                      <ButtonSidebar
                        label="Daftar Gudang"
                        path="/admin/warehouses/lists"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                      />
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </>
          ) : null}

          {router.pathname.startsWith("/cashier") ? (
            <>
              <div className="grid gap-1">
                <ButtonSidebar
                  label="Dashboard"
                  path="/cashier/dashboard"
                  icon={<House weight="bold" size={20} />}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
