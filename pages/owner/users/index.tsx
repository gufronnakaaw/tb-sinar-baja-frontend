import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
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

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

// dummy data
import { users } from "@/_dummy/users";

type UserType = (typeof users)[0];

export default function UsersPage() {
  const { page, pages, data, setPage } = usePagination(users, 10);

  const columns = [
    { name: "Nama Pengguna", uid: "name", sortable: true },
    { name: "Username", uid: "username", sortable: false },
    { name: "Kata Sandi", uid: "password", sortable: false },
    { name: "Dibuat Pada", uid: "created_at", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

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
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari nama pengguna..."
              className="w-full sm:max-w-[500px]"
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
            >
              Tambah Pengguna
            </Button>
          </div>

          <Table
            isHeaderSticky
            aria-label="users table"
            color="primary"
            selectionMode="single"
            classNames={customStyleTable}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={data}>
              {(user) => (
                <TableRow key={user.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(user, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
            className="justify-self-center"
          />
        </div>
      </Container>
    </Layout>
  );
}
