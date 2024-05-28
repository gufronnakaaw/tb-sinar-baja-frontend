import { ClockCounterClockwise, House, Tag } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// components
import ButtonSidebar from "@/components/button/ButtonSidebar";

type SidebarMenuAdminProps = {
  itemClasses: {
    base: string;
    trigger: string;
    title: string;
    content: string;
  };
};

export default function SidebarMenuAdmin({
  itemClasses,
}: SidebarMenuAdminProps) {
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
      const trigger = "bg-lime-500 data-[hover=true]:bg-lime-500/90";
      const title = "text-white";

      if (
        (router.pathname.startsWith("/admin/invoices") &&
          router.pathname.includes("/admin/invoices/in")) ||
        router.pathname.includes("/admin/invoices/out")
      ) {
        setInvoicesActive({
          trigger,
          title,
        });
      }

      if (
        (router.pathname.startsWith("/admin/products") &&
          router.pathname.includes("/admin/products/lists")) ||
        router.pathname.includes("/admin/products/stocks") ||
        router.pathname.includes("/admin/products/categories")
      ) {
        setProductsActive({
          trigger,
          title,
        });
      }

      if (
        (router.pathname.startsWith("/admin/suppliers") &&
          router.pathname.includes("/admin/suppliers/lists")) ||
        router.pathname.includes("/admin/suppliers/pricelists")
      ) {
        setSuppliersActive({
          trigger,
          title,
        });
      }

      if (
        (router.pathname.startsWith("/admin/members") &&
          router.pathname.includes("/admin/members/lists")) ||
        router.pathname.includes("/admin/members/levels")
      ) {
        setMembersActive({
          trigger,
          title,
        });
      }

      if (
        (router.pathname.startsWith("/admin/warehouses") &&
          router.pathname.includes("/admin/warehouses/in")) ||
        router.pathname.includes("/admin/warehouses/out") ||
        router.pathname.includes("/admin/warehouses/documents") ||
        router.pathname.includes("/admin/warehouses/lists")
      ) {
        setWarehousesActive({
          trigger,
          title,
        });
      }
    }
  }, [router]);

  return (
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
          {/* <ButtonSidebar
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
                  /> */}

          <ButtonSidebar
            label="Riwayat"
            path="/admin/histories"
            icon={<ClockCounterClockwise weight="bold" size={20} />}
          />

          <ButtonSidebar
            label="Harga Kasir"
            path="/admin/cashierprice"
            icon={<Tag weight="bold" size={20} />}
          />
        </div>
      </div>

      {/* <div>
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
                path="/admin/products/lists"
                icon={<Circle weight="fill" size={6} />}
                className="mx-4"
              />

              <ButtonSidebar
                label="Stok Produk"
                path="/admin/products/stocks"
                icon={<Circle weight="fill" size={6} />}
                className="mx-4"
              />

              <ButtonSidebar
                label="Kategori Produk"
                path="/admin/products/categories"
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
      </div> */}
    </>
  );
}
