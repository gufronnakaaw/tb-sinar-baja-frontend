import { Accordion, AccordionItem } from "@nextui-org/react";
import {
  ArchiveBox,
  CaretRight,
  Circle,
  ClockCounterClockwise,
  House,
  Package,
  Tag,
  Truck,
  Users,
} from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// components
import ButtonSidebar from "@/components/button/ButtonSidebar";

type SidebarMenuOwnerProps = {
  itemClasses: {
    base: string;
    trigger: string;
    title: string;
    content: string;
  };
};

export default function SidebarMenuOwner({
  itemClasses,
}: SidebarMenuOwnerProps) {
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

  return (
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
          {/* <ButtonSidebar
                    label="Pre Order"
                    path="/owner/preorders"
                    icon={<ClockClockwise weight="bold" size={20} />}
                  /> */}

          {/* <ButtonSidebar
                    label="Order"
                    path="/owner/orders"
                    icon={<ClipboardText weight="bold" size={20} />}
                  /> */}

          {/* <Accordion
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
                        label="Masuk"
                        path="/owner/invoices/in"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                      />

                      <ButtonSidebar
                        label="Keluar"
                        path="/owner/invoices/out"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                      />
                    </AccordionItem>
                  </Accordion> */}

          {/* <ButtonSidebar
                    label="Pembayaran"
                    path="/owner/payments"
                    icon={<Wallet weight="bold" size={20} />}
                    isDev={true}
                  /> */}

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

          {/* <Accordion
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
                        isDev={true}
                      />

                      <ButtonSidebar
                        label="Level Member"
                        path="/owner/members/levels"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                        isDev={true}
                      />
                    </AccordionItem>
                  </Accordion> */}

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
              {/* <ButtonSidebar
                        label="In"
                        path="/owner/warehouses/in"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                      /> */}

              {/* <ButtonSidebar
                        label="Out"
                        path="/owner/warehouses/out"
                        icon={<Circle weight="fill" size={6} />}
                        className="mx-4"
                      /> */}

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

          <ButtonSidebar
            label="Harga Kasir"
            path="/owner/cashierprice"
            icon={<Tag weight="bold" size={20} />}
          />
        </div>
      </div>
    </>
  );
}
