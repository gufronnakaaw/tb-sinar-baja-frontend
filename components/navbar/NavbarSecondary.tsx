import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

export default function NavbarCashier() {
  const { status, data } = useSession();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 mx-auto max-w-7xl border-b border-gray-200/40 bg-white">
      <div className="container flex h-20 items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2"
        >
          <div className="h-6 w-6 rounded-full bg-rose-500" />

          <div className="font-bold text-default-900">TB. SINAR BAJA</div>
        </Link>

        <Dropdown>
          <DropdownTrigger>
            <div className="inline-flex items-center gap-2 hover:cursor-pointer">
              <Avatar
                isBordered
                size="sm"
                color="default"
                showFallback
                src="https://images.unsplash.com/broken"
              />

              <div className="-space-y-1">
                <h6 className="mb-1 text-sm font-bold text-default-900">
                  {status == "authenticated" ? data?.user.nama : null}
                </h6>
                <p className="text-[12px] font-medium uppercase text-default-500">
                  TB. SINAR BAJA
                </p>
              </div>
            </div>
          </DropdownTrigger>

          <DropdownMenu aria-label="profile actions">
            <DropdownSection aria-label="danger zone section" title="Navigasi">
              <DropdownItem
                key="navigation"
                color="danger"
                onClick={() => window.open("/admin/dashboard")}
                className="font-bold text-danger-600"
              >
                Admin Menu
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  );
}
