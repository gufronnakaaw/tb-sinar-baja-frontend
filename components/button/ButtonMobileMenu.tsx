import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { ArchiveBox, House, List, ListPlus } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function ButtonMobileMenu() {
  const router = useRouter();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          aria-label="menu list mobile view button"
          variant="bordered"
          size="sm"
          radius="md"
          color="default"
          className="xl:hidden"
        >
          <List weight="bold" size={16} className="text-default-900" />
        </Button>
      </DropdownTrigger>

      <DropdownMenu aria-label="profile actions">
        <DropdownItem
          key="dashboard"
          startContent={<House weight="bold" size={20} />}
          onClick={() => alert("masih dalam tahap pengembangan")}
        >
          Dashboard
        </DropdownItem>

        <DropdownItem
          key="product"
          startContent={<ArchiveBox weight="bold" size={20} />}
          onClick={() => alert("masih dalam tahap pengembangan")}
        >
          Produk
        </DropdownItem>

        <DropdownItem
          key="categories"
          startContent={<ListPlus weight="bold" size={20} />}
          onClick={() => alert("masih dalam tahap pengembangan")}
        >
          Kategori
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
