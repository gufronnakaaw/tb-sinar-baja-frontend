import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import { Eye, Pencil, Trash } from "@phosphor-icons/react";

import CustomTooltip from "@/components/tooltip";
import usePagination from "@/hooks/usepagination";
import { PenggunaType } from "@/types/users.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import { useRouter } from "next/router";
import { KeyedMutator } from "swr";

export default function UsersTable({
  pengguna,
  onOpen,
  setPassword,
  mutate,
}: {
  pengguna: PenggunaType[] | undefined;
  onOpen: () => void;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  mutate: KeyedMutator<any>;
}) {
  const { page, pages, data, setPage } = usePagination(
    pengguna ? pengguna : [],
    10,
  );
  const router = useRouter();

  const columnsUsers = [
    { name: "Username", uid: "username" },
    { name: "Nama", uid: "nama" },
    { name: "Kata Sandi", uid: "password_encrypt" },
    { name: "Role", uid: "role" },
    { name: "Dibuat pada", uid: "created_at" },
    { name: "Diubah Pada", uid: "updated_at" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellUsers(user: PenggunaType, columnKey: React.Key) {
    const cellValue = user[columnKey as keyof PenggunaType];

    switch (columnKey) {
      case "username":
        return <div className="w-max text-default-900">{user.username}</div>;
      case "nama":
        return <div className="w-max text-default-900">{user.nama}</div>;
      case "password_encrypt":
        return (
          <div className="w-max text-default-900">
            <CustomTooltip content="Lihat">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() => {
                  seePassword(user.username, user.password_encrypt);
                }}
              >
                <Eye weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>
          </div>
        );
      case "role":
        return (
          <div className="w-max text-default-900">
            {user.role.split(",").join(" dan ")}
          </div>
        );
      case "created_at":
        return (
          <div className="w-max text-default-900">
            {formatDate(user.created_at)}
          </div>
        );
      case "updated_at":
        return (
          <div className="w-max text-default-900">
            {formatDate(user.updated_at)}
          </div>
        );
      case "action":
        return (
          <div className="flex max-w-[110px] items-center gap-1">
            <CustomTooltip content="Edit">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() =>
                  router.push(`/owner/users/edit?username=${user.username}`)
                }
              >
                <Pencil weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>

            <CustomTooltip content="Hapus">
              <Button
                isIconOnly
                variant="light"
                color="danger"
                size="sm"
                onClick={() => {
                  handleDelete(user.username);
                }}
              >
                <Trash weight="bold" size={20} />
              </Button>
            </CustomTooltip>
          </div>
        );

      default:
        return cellValue;
    }
  }

  async function seePassword(username: string, password_encrypt: string) {
    try {
      const result: { data: { password: string } } = await fetcher({
        url: `/pengguna/lihat?username=${username}&password_encrypt=${encodeURIComponent(password_encrypt)}`,
        method: "GET",
      });

      onOpen();
      setPassword(result.data.password);
    } catch (error) {
      const response = error as {
        success: boolean;
        status_code: number;
        error: { name: string; message: string };
      };

      if (response.status_code >= 500) {
        console.log(response.error);
        return alert("terjadi masalah pada server");
      }

      if (response.status_code >= 400) {
        console.log(response.error);
        return alert(response.error.message);
      }

      console.log(response.error);
      return alert("terjadi error tidak diketahui pada aplikasi");
    }
  }

  async function handleDelete(username: string) {
    if (!confirm("apakah anda yakin?")) return;

    try {
      await fetcher({
        url: "/pengguna/" + username,
        method: "DELETE",
      });

      alert("pengguna berhasil dihapus");
      mutate();
    } catch (error) {
      const response = error as {
        success: boolean;
        status_code: number;
        error: { name: string; message: string };
      };

      if (response.status_code >= 500) {
        console.log(response.error);
        return alert("terjadi masalah pada server");
      }

      if (response.status_code >= 400) {
        console.log(response.error);
        return alert(response.error.message);
      }

      console.log(response.error);
      return alert("terjadi error tidak diketahui pada aplikasi");
    }
  }

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="users table"
        color="primary"
        selectionMode="single"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader columns={columnsUsers}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>

        <TableBody items={data}>
          {(user) => (
            <TableRow key={user.username}>
              {(columnKey) => (
                <TableCell>{renderCellUsers(user, columnKey)}</TableCell>
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
    </>
  );
}
