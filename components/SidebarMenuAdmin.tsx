import {
  CaretRight,
  Circle,
  ClockCounterClockwise,
  Gear,
  House,
  Storefront,
  Users,
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
  const [invoicesActive, setInvoicesActive] = useState<{
    trigger: string;
    title: string;
  }>({
    trigger: "",
    title: "",
  });

  const [historiesActive, setHistoriesActive] = useState<{
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

  const [membersActive, setMembersActive] = useState<{
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
        (router.pathname.startsWith("/admin/histories") &&
          router.asPath.includes("/admin/histories?role=kasir")) ||
        router.asPath.includes("/admin/histories?role=admin") ||
        router.pathname.includes("/admin/histories/[id]")
      ) {
        setHistoriesActive({
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
        (router.pathname.startsWith("/admin/settings") &&
          router.pathname.includes("/admin/settings/quantityprice")) ||
        router.pathname.includes("/admin/settings/cashierprice")
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

      <ButtonSidebar
        label="Penjualan"
        path="/admin/selling"
        icon={<Storefront weight="bold" size={20} />}
      />

      <Accordion
        isCompact
        itemClasses={{
          ...itemClasses,
          trigger: `${itemClasses.trigger} ${historiesActive.trigger}`,
          title: `${itemClasses.title} ${historiesActive.title}`,
        }}
        className="p-0"
      >
        <AccordionItem
          aria-label="button"
          title="Riwayat"
          indicator={
            <CaretRight
              weight="bold"
              size={16}
              className={`${historiesActive.title ? historiesActive.title : "text-gray-600"}`}
            />
          }
          startContent={
            <ClockCounterClockwise
              weight="bold"
              size={20}
              className={`${historiesActive.title ? historiesActive.title : "text-gray-600"}`}
            />
          }
          className="grid gap-1"
        >
          <ButtonSidebar
            label="Penjualan Admin"
            path="/admin/histories?role=admin"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Penjualan Kasir"
            path="/admin/histories?role=kasir"
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
            path="/admin/members/lists"
            icon={<Circle weight="fill" size={6} />}
            className="mx-4"
          />

          <ButtonSidebar
            label="Level Member"
            path="/admin/members/levels"
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
        </AccordionItem>
      </Accordion>
    </div>
  );
}
