import { Accordion, AccordionItem } from "@nextui-org/react";
import {
  ArchiveBox,
  CaretRight,
  Circle,
  ClipboardText,
  ClockClockwise,
  ClockCounterClockwise,
  House,
  Invoice,
  ListBullets,
  ListNumbers,
  Package,
  Truck,
  User,
  Users,
  Wallet,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/router";

// components
import ButtonSidebar from "@/components/button/ButtonSidebar";
import { useEffect, useState } from "react";

interface SidebarProps {
  sidebarOpen?: boolean;
}

export default function Sidebar({ sidebarOpen }: SidebarProps) {
  const router = useRouter();
  const [invoicesActive, setInvoicesActive] = useState<{
    trigger: string;
    title: string;
  }>({
    trigger: "",
    title: "",
  });

  const [productsActive, setProductsActive] = useState<{
    trigger: string;
    title: string;
  }>({
    trigger: "",
    title: "",
  });

  const [suppliersActive, setSuppliersActive] = useState<{
    trigger: string;
    title: string;
  }>({
    trigger: "",
    title: "",
  });

  const [membersActive, setMembersActive] = useState<{
    trigger: string;
    title: string;
  }>({
    trigger: "",
    title: "",
  });

  const [warehousesActive, setWarehousesActive] = useState<{
    trigger: string;
    title: string;
  }>({
    trigger: "",
    title: "",
  });

  useEffect(() => {
    setColor();

    function setColor() {
      const trigger = "bg-primary data-[hover=true]:bg-primary/90";
      const title = "text-white";

      if (
        (router.pathname.startsWith("/owner/invoices") &&
          router.pathname.includes("/owner/invoices/in")) ||
        router.pathname.includes("/owner/invoices/out")
      ) {
        setInvoicesActive({
          trigger,
          title,
        });
      }

      if (
        (router.pathname.startsWith("/owner/products") &&
          router.pathname.includes("/owner/products/lists")) ||
        router.pathname.includes("/owner/products/stocks") ||
        router.pathname.includes("/owner/products/categories")
      ) {
        setProductsActive({
          trigger,
          title,
        });
      }

      if (
        (router.pathname.startsWith("/owner/suppliers") &&
          router.pathname.includes("/owner/suppliers/lists")) ||
        router.pathname.includes("/owner/suppliers/pricelists")
      ) {
        setSuppliersActive({
          trigger,
          title,
        });
      }

      if (
        (router.pathname.startsWith("/owner/members") &&
          router.pathname.includes("/owner/members/lists")) ||
        router.pathname.includes("/owner/members/levels")
      ) {
        setMembersActive({
          trigger,
          title,
        });
      }

      if (
        (router.pathname.startsWith("/owner/warehouses") &&
          router.pathname.includes("/owner/warehouses/in")) ||
        router.pathname.includes("/owner/warehouses/out") ||
        router.pathname.includes("/owner/warehouses/documents") ||
        router.pathname.includes("/owner/warehouses/lists")
      ) {
        setWarehousesActive({
          trigger,
          title,
        });
      }
    }
  }, [router]);

  const itemClasses = {
    base: "p-0 w-full",
    trigger:
      "py-2 px-3 h-10 rounded-xl flex gap-2 items-center data-[hover=true]:bg-gray-200",
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
              <ButtonSidebar
                label="Dashboard"
                path="/owner/dashboard"
                icon={<House weight="bold" size={20} />}
              />

              <div>
                <span className="text-[10px] font-bold uppercase tracking-[2px] text-gray-600">
                  Transaksi
                </span>

                <div className="mt-1 grid gap-1">
                  <ButtonSidebar
                    label="Pre Order"
                    path="/owner/preorders"
                    icon={<ClockClockwise weight="bold" size={20} />}
                  />

                  <ButtonSidebar
                    label="Order"
                    path="/owner/orders"
                    icon={<ClipboardText weight="bold" size={20} />}
                  />

                  <Accordion
                    isCompact
                    itemClasses={{
                      ...itemClasses,
                      trigger: `${itemClasses.trigger} ${invoicesActive.trigger}`,
                      title: `${itemClasses.title} ${invoicesActive.title}`,
                    }}
                    className="p-0"
                  >
                    <AccordionItem
                      aria-label="button"
                      title="Invoice"
                      indicator={
                        <CaretRight
                          weight="bold"
                          size={16}
                          className={`${invoicesActive.title ? invoicesActive.title : "text-gray-600"}`}
                        />
                      }
                      startContent={
                        <Invoice
                          weight="bold"
                          size={20}
                          className={`${invoicesActive.title ? invoicesActive.title : "text-gray-600"}`}
                        />
                      }
                      className="grid gap-1"
                    >
                      <ButtonSidebar
                        label="In"
                        path="/owner/invoices/in"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                      />

                      <ButtonSidebar
                        label="Out"
                        path="/owner/invoices/out"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                      />
                    </AccordionItem>
                  </Accordion>

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
                  <Accordion
                    isCompact
                    itemClasses={{
                      ...itemClasses,
                      trigger: `${itemClasses.trigger} ${productsActive.trigger}`,
                      title: `${itemClasses.title} ${productsActive.title}`,
                    }}
                    className="p-0"
                  >
                    <AccordionItem
                      aria-label="button"
                      title="Produk"
                      indicator={
                        <CaretRight
                          weight="bold"
                          size={16}
                          className={`${productsActive.title ? productsActive.title : "text-gray-600"}`}
                        />
                      }
                      startContent={
                        <ArchiveBox
                          weight="bold"
                          size={20}
                          className={`${productsActive.title ? productsActive.title : "text-gray-600"}`}
                        />
                      }
                      className="grid gap-1"
                    >
                      <ButtonSidebar
                        label="Daftar Produk"
                        path="/owner/products/lists"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                      />

                      <ButtonSidebar
                        label="Stok Produk"
                        path="/owner/products/stocks"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                      />

                      <ButtonSidebar
                        label="Kategori Produk"
                        path="/owner/products/categories"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                      />
                    </AccordionItem>
                  </Accordion>

                  <Accordion
                    isCompact
                    itemClasses={{
                      ...itemClasses,
                      trigger: `${itemClasses.trigger} ${suppliersActive.trigger}`,
                      title: `${itemClasses.title} ${suppliersActive.title}`,
                    }}
                    className="p-0"
                  >
                    <AccordionItem
                      aria-label="button"
                      title="Supplier"
                      indicator={
                        <CaretRight
                          weight="bold"
                          size={16}
                          className={`${suppliersActive.title ? suppliersActive.title : "text-gray-600"}`}
                        />
                      }
                      startContent={
                        <Truck
                          weight="bold"
                          size={20}
                          className={`${suppliersActive.title ? suppliersActive.title : "text-gray-600"}`}
                        />
                      }
                      className="grid gap-1"
                    >
                      <ButtonSidebar
                        label="Daftar Supplier"
                        path="/owner/suppliers/lists"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                      />

                      <ButtonSidebar
                        label="Harga Supplier"
                        path="/owner/suppliers/pricelists"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                      />
                    </AccordionItem>
                  </Accordion>

                  <Accordion
                    isCompact
                    itemClasses={{
                      ...itemClasses,
                      trigger: `${itemClasses.trigger} ${membersActive.trigger}`,
                      title: `${itemClasses.title} ${membersActive.title}`,
                    }}
                    className="p-0"
                  >
                    <AccordionItem
                      aria-label="button"
                      title="Member"
                      indicator={
                        <CaretRight
                          weight="bold"
                          size={16}
                          className={`${membersActive.title ? membersActive.title : "text-gray-600"}`}
                        />
                      }
                      startContent={
                        <Users
                          weight="bold"
                          size={20}
                          className={`${membersActive.title ? membersActive.title : "text-gray-600"}`}
                        />
                      }
                      className="grid gap-1"
                    >
                      <ButtonSidebar
                        label="Daftar Member"
                        path="/owner/members/lists"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                      />

                      <ButtonSidebar
                        label="Level Member"
                        path="/owner/members/levels"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                      />
                    </AccordionItem>
                  </Accordion>

                  <Accordion
                    isCompact
                    itemClasses={{
                      ...itemClasses,
                      trigger: `${itemClasses.trigger} ${warehousesActive.trigger}`,
                      title: `${itemClasses.title} ${warehousesActive.title}`,
                    }}
                    className="p-0"
                  >
                    <AccordionItem
                      aria-label="button"
                      title="Gudang"
                      indicator={
                        <CaretRight
                          weight="bold"
                          size={16}
                          className={`${warehousesActive.title ? warehousesActive.title : "text-gray-600"}`}
                        />
                      }
                      startContent={
                        <Package
                          weight="bold"
                          size={20}
                          className={`${warehousesActive.title ? warehousesActive.title : "text-gray-600"}`}
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
                    icon={<User weight="bold" size={20} />}
                  />
                </div>
              </div>
            </>
          ) : null}

          {router.pathname.startsWith("/admin") ? (
            <>
              <ButtonSidebar
                label="Dashboard"
                path="/admin/dashboard"
                icon={<House weight="bold" size={20} />}
              />

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
