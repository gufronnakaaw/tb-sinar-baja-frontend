import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import { SignOut } from "@phosphor-icons/react";

export default function NavbarCashier() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 mx-auto max-w-[1120px] border-b border-gray-200/40 bg-white">
      <div className="container flex h-20 items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2"
        >
          <div className="h-6 w-6 rounded-full bg-cyan-600" />

          <div className="font-bold text-default-900">TB Sinar Baja</div>
        </Link>

        <Dropdown>
          <DropdownTrigger>
            <div className="inline-flex items-center gap-2 hover:cursor-pointer">
              <Avatar
                isBordered
                size="sm"
                color="default"
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
              />

              <div className="-space-y-1">
                <h6 className="mb-1 text-sm font-bold text-default-900">
                  Kasir
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
