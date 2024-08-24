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
      const trigger = "bg-teal-500 data-[hover=true]:bg-teal-500/90";
      const title = "text-white";

      if (
        router.pathname.startsWith("/admin/selling") &&
        (router.asPath.includes("/admin/selling/histories?role=kasir") ||
          router.asPath.includes("/admin/selling/histories?role=admin") ||
          router.pathname.includes("/admin/selling/histories/[id]") ||
          router.pathname.includes("/admin/selling/documents") ||
          router.pathname.includes("/admin/selling/documents/[id]") ||
          router.pathname.includes("/admin/selling/documents/edit/[id]") ||
          router.pathname.includes("/admin/selling/return") ||
          router.pathname.includes("/admin/selling/return/create") ||
          router.pathname.includes("/admin/selling/return/detail") ||
          router.pathname.includes("/admin/selling/invout") ||
          router.pathname.includes("/admin/selling/invout/create"))
      ) {
        setSellingActive({
          trigger,
          title,
        });
      }

      if (
        router.pathname.startsWith("/admin/purchases") &&
        (router.pathname.includes("/admin/purchases/suppliers") ||
          router.pathname.includes("/admin/purchases/suppliers/edit") ||
          router.pathname.includes("/admin/purchases/pricelists") ||
          router.pathname.includes("/admin/purchases/pricelists/edit") ||
          router.pathname.includes("/admin/purchases/pricelists/detail") ||
          router.pathname.includes("/admin/purchases/preorders") ||
          router.pathname.includes("/admin/purchases/preorders/create") ||
          router.pathname.includes("/admin/purchases/preorders/detail") ||
          router.pathname.includes("/admin/purchases/offers") ||
          router.pathname.includes("/admin/purchases/offers/create") ||
          router.pathname.includes("/admin/purchases/offers/detail") ||
          router.pathname.includes("/admin/purchases/invin") ||
          router.pathname.includes("/admin/purchases/invin/create") ||
          router.pathname.includes("/admin/purchases/invin/histories") ||
          router.pathname.includes("/admin/purchases/invin/payments") ||
          router.pathname.includes("/admin/purchases/form"))
      ) {
        setPurchasesActive({
          trigger,
          title,
        });
      }

      if (
        router.pathname.startsWith("/admin/warehouses") &&
        (router.asPath.includes("/admin/warehouses/products") ||
          router.asPath.includes("/admin/warehouses/products/detail") ||
          router.asPath.includes("/admin/warehouses/products/edit") ||
          router.asPath.includes("/admin/warehouses/stocks") ||
          router.asPath.includes("/admin/warehouses/stocks/edit") ||
          router.asPath.includes("/admin/warehouses/categories") ||
          router.asPath.includes("/admin/warehouses/categories/edit") ||
          router.asPath.includes("/admin/warehouses/categories/detail/[id]") ||
          router.asPath.includes("/admin/warehouses/broken") ||
          router.asPath.includes("/admin/warehouses/lists") ||
          router.asPath.includes("/admin/warehouses/lists/edit") ||
          router.asPath.includes("/admin/warehouses/entry"))
      ) {
        setWarehousesActive({
          trigger,
          title,
        });
      }

      if (
        router.pathname.startsWith("/admin/finance") &&
        (router.asPath.includes("/admin/finance/profit") ||
          router.asPath.includes("/admin/finance/loss") ||
          router.asPath.includes("/admin/finance/debt") ||
          router.asPath.includes("/admin/finance/receivable"))
      ) {
        setFinanceActive({
          trigger,
          title,
        });
      }

      if (
        router.pathname.startsWith("/admin/settings") &&
        (router.pathname.includes("/admin/settings/quantityprice") ||
          router.pathname.includes("/admin/settings/cashierprice") ||
          router.pathname.includes("/admin/settings/members/lists") ||
          router.pathname.includes("/admin/settings/members/lists/edit") ||
          router.pathname.includes("/admin/settings/members/levels") ||
          router.pathname.includes("/admin/settings/members/levels/edit"))
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
        path="/admin/dashboard"
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
            label="Penjualan Admin"
            path="/admin/selling"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4 bg-transparent !text-gray-600 hover:!bg-gray-200"
          />

          <ButtonSidebar
            label="Riwayat Admin"
            path="/admin/selling/histories?role=admin"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Riwayat Kasir"
            path="/admin/selling/histories?role=kasir"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Surat Jalan"
            path="/admin/selling/documents"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Retur Penjualan"
            path="/admin/selling/return"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Invoice Keluar"
            path="/admin/selling/invout"
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
            path="/admin/purchases/offers"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Buat Preorder"
            path="/admin/purchases/preorders"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Invoice Masuk"
            path="/admin/purchases/invin"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Supplier"
            path="/admin/purchases/suppliers"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Pricelist Supplier"
            path="/admin/purchases/pricelists"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Form Barang Masuk"
            path="/admin/purchases/form"
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
            label="Produk"
            path="/admin/warehouses/products"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Stok Produk"
            path="/admin/warehouses/stocks"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Kategori Produk"
            path="/admin/warehouses/categories"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Berita Acara"
            path="/admin/warehouses/broken"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Barang Masuk"
            path="/admin/warehouses/entry"
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
            path="/admin/finance/profit"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Rugi"
            path="/admin/finance/loss"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
            isDev={true}
          />

          <ButtonSidebar
            label="Hutang"
            path="/admin/finance/debt"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Piutang"
            path="/admin/finance/receivable"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
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
            path="/admin/settings/cashierprice"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Harga Quantity"
            path="/admin/settings/quantityprice"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Member"
            path="/admin/settings/members/lists"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Level Member"
            path="/admin/settings/members/levels"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />
        </AccordionItem>
      </Accordion>
    </div>
  );
}
