import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { DotsThreeVertical, Pencil, Trash } from "@phosphor-icons/react";
import React from "react";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// dummy data
import { users } from "@/_dummy/users";

type UserType = (typeof users)[0];

export default function UsersPage() {
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "created_at",
    direction: "descending",
  });

  const columns = [
    { name: "Nama Pengguna", uid: "name", sortable: true },
    { name: "Username", uid: "username", sortable: false },
    { name: "Kata Sandi", uid: "password", sortable: false },
    { name: "Dibuat Pada", uid: "created_at", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

  const sortedItems = [...users].sort((a: UserType, b: UserType) => {
    const first = a[sortDescriptor.column as keyof UserType] as number;
    const second = b[sortDescriptor.column as keyof UserType] as number;
    const cmp = first < second ? -1 : first > second ? 1 : 0;

    return sortDescriptor.direction === "descending" ? -cmp : cmp;
  });

  const renderCell = (user: UserType, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof UserType];

    switch (columnKey) {
      case "name":
        return (
          <div className="text-default-900 xl:line-clamp-1 xl:max-w-[300px]">
            {user.name}
          </div>
        );
      case "username":
        return <div className="text-default-900">{user.username}</div>;
      case "password":
        return <div className="text-default-900">{user.password}</div>;
      case "created_at":
        return <div className="text-default-900">{user.created_at}</div>;
      case "action":
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light" color="default" size="sm">
                <DotsThreeVertical weight="bold" size={18} />
              </Button>
            </DropdownTrigger>

            <DropdownMenu aria-label="users table action">
              <DropdownItem
                key="edit"
                color="default"
                startContent={<Pencil weight="bold" size={18} />}
              >
                Edit Pengguna
              </DropdownItem>

              <DropdownItem
                key="delete"
                color="danger"
                startContent={<Trash weight="bold" size={18} />}
                onClick={() => confirm("Apakah anda yakin?")}
                className="text-danger"
              >
                Hapus Pengguna
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );

      default:
        return cellValue;
    }
  };

  return (
    <Layout title="Users Page">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Tabel Pengguna
        </h4>

        <div className="grid gap-4">
          <InputSearchBar placeholder="Cari nama pengguna..." />

          <Table
            isHeaderSticky
            removeWrapper
            aria-label="users table"
            color="primary"
            selectionMode="single"
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            classNames={{
              base: "max-h-[calc(100vh-100px)] overflow-scroll",
              table: "min-w-[700px]",
            }}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid} allowsSorting={column.sortable}>
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>

            <TableBody items={sortedItems}>
              {(user) => (
                <TableRow key={user.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(user, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Container>
    </Layout>
  );
}
