import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { SignOut } from "@phosphor-icons/react";

// components
import { useRouter } from "next/router";
import ButtonMobileMenu from "../button/ButtonMobileMenu";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="bg-white px-6">
      <div className="flex h-20 items-center justify-between xl:justify-end">
        <ButtonMobileMenu />

        <Dropdown>
          <DropdownTrigger>
            <div className="inline-flex items-center gap-2 hover:cursor-pointer">
              <Avatar
                isBordered
                size="sm"
                color="default"
                src="https://i.pravatar.cc/150?u=a04258114e29026302d"
              />

              <div className="-space-y-1">
                <h6 className="mb-1 text-sm font-bold text-default-900">
                  {router.pathname.startsWith("/owner") ? "Owner" : null}
                  {router.pathname.startsWith("/admin") ? "Admin" : null}
                  {router.pathname.startsWith("/cashier") ? "Kasir" : null}
                </h6>
                <p className="text-[12px] font-medium uppercase text-default-500">
                  TB Sinar Baja
                </p>
              </div>
            </div>
          </DropdownTrigger>

          <DropdownMenu aria-label="profile actions">
            <DropdownSection
              aria-label="danger zone section"
              title="Anda Yakin?"
            >
              <DropdownItem
                key="logout"
                color="danger"
                startContent={<SignOut weight="bold" size={18} />}
                onClick={() => confirm("apakah anda yakin?")}
                className="font-bold text-danger-600"
              >
                Keluar
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  );
}
