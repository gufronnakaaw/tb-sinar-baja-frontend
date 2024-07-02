import {
  CaretRight,
  ChartLine,
  Circle,
  Gear,
  House,
  Money,
  Package,
  ShoppingCartSimple,
} from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// components
import ButtonSidebar from "@/components/button/ButtonSidebar";
import { Accordion, AccordionItem } from "@nextui-org/react";

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

  const [sellingActive, setSellingActive] = useState<{
    trigger: string;
    title: string;
  }>({
    trigger: "",
    title: "",
  });

  const [purchasesActive, setPurchasesActive] = useState<{
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

  const [financeActive, setFinanceActive] = useState<{
    trigger: string;
    title: string;
  }>({
    trigger: "",
    title: "",
  });

  const [settingsActive, setSettingsActive] = useState<{
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
        router.pathname.startsWith("/owner/selling") &&
        (router.asPath.includes("/owner/selling/histories?role=kasir") ||
          router.asPath.includes("/owner/selling/histories?role=admin") ||
          router.pathname.includes("/owner/selling/histories/[id]") ||
          router.pathname.includes("/owner/selling/documents") ||
          router.pathname.includes("/owner/selling/documents/[id]") ||
          router.pathname.includes("/owner/selling/documents/edit/[id]") ||
          router.pathname.includes("/owner/selling/return") ||
          router.pathname.includes("/owner/selling/return/create") ||
          router.pathname.includes("/owner/selling/return/detail"))
      ) {
        setSellingActive({
          trigger,
          title,
        });
      }

      if (
        router.pathname.startsWith("/owner/purchases") &&
        (router.pathname.includes("/owner/purchases/suppliers") ||
          router.pathname.includes("/owner/purchases/suppliers/edit") ||
          router.pathname.includes("/owner/purchases/pricelists") ||
          router.pathname.includes("/owner/purchases/pricelists/edit") ||
          router.pathname.includes("/owner/purchases/pricelists/detail") ||
          router.pathname.includes("/owner/purchases/preorders") ||
          router.pathname.includes("/owner/purchases/preorders/create") ||
          router.pathname.includes("/owner/purchases/preorders/detail") ||
          router.pathname.includes("/owner/purchases/offers") ||
          router.pathname.includes("/owner/purchases/offers/create") ||
          router.pathname.includes("/owner/purchases/offers/detail") ||
          router.pathname.includes("/owner/purchases/invin") ||
          router.pathname.includes("/owner/purchases/invin/create") ||
          router.pathname.includes("/owner/purchases/invin/histories") ||
          router.pathname.includes("/owner/purchases/invin/payments") ||
          router.pathname.includes("/owner/purchases/invout") ||
          router.pathname.includes("/owner/purchases/invout/create"))
      ) {
        setPurchasesActive({
          trigger,
          title,
        });
      }

      if (
        router.pathname.startsWith("/owner/warehouses") &&
        (router.asPath.includes("/owner/warehouses/products") ||
          router.asPath.includes("/owner/warehouses/products/detail") ||
          router.asPath.includes("/owner/warehouses/products/edit") ||
          router.asPath.includes("/owner/warehouses/stocks") ||
          router.asPath.includes("/owner/warehouses/stocks/edit") ||
          router.asPath.includes("/owner/warehouses/categories") ||
          router.asPath.includes("/owner/warehouses/categories/edit") ||
          router.asPath.includes("/owner/warehouses/categories/detail/[id]") ||
          router.asPath.includes("/owner/warehouses/broken") ||
          router.asPath.includes("/owner/warehouses/lists") ||
          router.asPath.includes("/owner/warehouses/lists/edit"))
      ) {
        setWarehousesActive({
          trigger,
          title,
        });
      }

      if (
        router.pathname.startsWith("/owner/finance") &&
        (router.asPath.includes("/owner/finance/profit") ||
          router.asPath.includes("/owner/finance/loss") ||
          router.asPath.includes("/owner/finance/debt") ||
          router.asPath.includes("/owner/finance/receivable"))
      ) {
        setFinanceActive({
          trigger,
          title,
        });
      }

      if (
        router.pathname.startsWith("/owner/settings") &&
        (router.pathname.includes("/owner/settings/quantityprice") ||
          router.pathname.includes("/owner/settings/cashierprice") ||
          router.pathname.includes("/owner/settings/members/lists") ||
          router.pathname.includes("/owner/settings/members/lists/edit") ||
          router.pathname.includes("/owner/settings/members/levels") ||
          router.pathname.includes("/owner/settings/members/levels/edit") ||
          router.pathname.includes("/owner/settings/users"))
      ) {
        setSettingsActive({
          trigger,
          title,
        });
      }
    }
  }, [router]);

  return (
    <div className="grid gap-1">
      <ButtonSidebar
        label="Dashboard"
        path="/owner/dashboard"
        icon={<House weight="bold" size={20} />}
      />

      <Accordion
        isCompact
        itemClasses={{
          ...itemClasses,
          trigger: `${itemClasses.trigger} ${sellingActive.trigger}`,
          title: `${itemClasses.title} ${sellingActive.title}`,
        }}
        className="p-0"
      >
        <AccordionItem
          aria-label="button"
          title="Penjualan"
          indicator={
            <CaretRight
              weight="bold"
              size={16}
              className={`${sellingActive.title ? sellingActive.title : "text-gray-600"}`}
            />
          }
          startContent={
            <ChartLine
              weight="bold"
              size={20}
              className={`${sellingActive.title ? sellingActive.title : "text-gray-600"}`}
            />
          }
          className="grid gap-1"
        >
          <ButtonSidebar
            label="Riwayat Admin"
            path="/owner/selling/histories?role=admin"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Riwayat Kasir"
            path="/owner/selling/histories?role=kasir"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Surat Jalan"
            path="/owner/selling/documents"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Retur Penjualan"
            path="/owner/selling/return"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />
        </AccordionItem>
      </Accordion>

      <Accordion
        isCompact
        itemClasses={{
          ...itemClasses,
          trigger: `${itemClasses.trigger} ${purchasesActive.trigger}`,
          title: `${itemClasses.title} ${purchasesActive.title}`,
        }}
        className="p-0"
      >
        <AccordionItem
          aria-label="button"
          title="Pembelian"
          indicator={
            <CaretRight
              weight="bold"
              size={16}
              className={`${purchasesActive.title ? purchasesActive.title : "text-gray-600"}`}
            />
          }
          startContent={
            <ShoppingCartSimple
              weight="bold"
              size={20}
              className={`${purchasesActive.title ? purchasesActive.title : "text-gray-600"}`}
            />
          }
          className="grid gap-1"
        >
          <ButtonSidebar
            label="Buat Penawaran"
            path="/owner/purchases/offers"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Buat Preorder"
            path="/owner/purchases/preorders"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Invoice Masuk"
            path="/owner/purchases/invin"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Invoice Keluar"
            path="/owner/purchases/invout"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Supplier"
            path="/owner/purchases/suppliers"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Pricelist Supplier"
            path="/owner/purchases/pricelists"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Form Barang Masuk"
            path="/owner/purchases/forms"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
            isDev={true}
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
            label="Produk"
            path="/owner/warehouses/products"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Stok Produk"
            path="/owner/warehouses/stocks"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Kategori Produk"
            path="/owner/warehouses/categories"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Barang Rusak"
            path="/owner/warehouses/broken"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
            isDev={true}
          />

          <ButtonSidebar
            label="Barang Masuk"
            path="/owner/warehouses/broken"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
            isDev={true}
          />

          <ButtonSidebar
            label="Daftar Gudang"
            path="/owner/warehouses/lists"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />
        </AccordionItem>
      </Accordion>

      <Accordion
        isCompact
        itemClasses={{
          ...itemClasses,
          trigger: `${itemClasses.trigger} ${financeActive.trigger}`,
          title: `${itemClasses.title} ${financeActive.title}`,
        }}
        className="p-0"
      >
        <AccordionItem
          aria-label="button"
          title="Keuangan"
          indicator={
            <CaretRight
              weight="bold"
              size={16}
              className={`${financeActive.title ? financeActive.title : "text-gray-600"}`}
            />
          }
          startContent={
            <Money
              weight="bold"
              size={20}
              className={`${financeActive.title ? financeActive.title : "text-gray-600"}`}
            />
          }
          className="grid gap-1"
        >
          <ButtonSidebar
            label="Laba"
            path="/owner/finance/profit"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
            isDev={true}
          />

          <ButtonSidebar
            label="Rugi"
            path="/owner/finance/loss"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
            isDev={true}
          />

          <ButtonSidebar
            label="Hutang"
            path="/owner/finance/debt"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
            isDev={true}
          />

          <ButtonSidebar
            label="Piutang"
            path="/owner/finance/receivable"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
            isDev={true}
          />
        </AccordionItem>
      </Accordion>

      <Accordion
        isCompact
        itemClasses={{
          ...itemClasses,
          trigger: `${itemClasses.trigger} ${settingsActive.trigger}`,
          title: `${itemClasses.title} ${settingsActive.title}`,
        }}
        className="p-0"
      >
        <AccordionItem
          aria-label="button"
          title="Pengaturan"
          indicator={
            <CaretRight
              weight="bold"
              size={16}
              className={`${settingsActive.title ? settingsActive.title : "text-gray-600"}`}
            />
          }
          startContent={
            <Gear
              weight="bold"
              size={20}
              className={`${settingsActive.title ? settingsActive.title : "text-gray-600"}`}
            />
          }
          className="grid gap-1"
        >
          <ButtonSidebar
            label="Harga Kasir"
            path="/owner/settings/cashierprice"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Harga Quantity"
            path="/owner/settings/quantityprice"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Member"
            path="/owner/settings/members/lists"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Level Member"
            path="/owner/settings/members/levels"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Pengguna"
            path="/owner/settings/users"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />
        </AccordionItem>
      </Accordion>
    </div>
  );
}
