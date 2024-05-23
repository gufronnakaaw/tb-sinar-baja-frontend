import { Button } from "@nextui-org/react";
import { Eye, Pencil, Trash } from "@phosphor-icons/react";
import { NextRouter } from "next/router";
import React from "react";

// components & utils
import CustomTooltip from "@/components/tooltip";
import { formatDate } from "@/utils/formatDate";

type PenggunaTable = {
  username: string;
  nama: string;
  password_encrypt: string;
  role: string;
  created_at: string;
  updated_at: string;
};

export const columnsUsers = [
  { name: "Username", uid: "username" },
  { name: "Nama", uid: "nama" },
  { name: "Kata Sandi", uid: "password_encrypt" },
  { name: "Role", uid: "role" },
  { name: "Dibuat pada", uid: "created_at" },
  { name: "Diubah Pada", uid: "updated_at" },
  { name: "Aksi", uid: "action" },
];

export function renderCellUsers(
  user: PenggunaTable,
  columnKey: React.Key,
  router: NextRouter,
  seePassword: (username: string, password_encrypt: string) => Promise<void>,
  handleDelete: (username: string) => Promise<void>,
) {
  const cellValue = user[columnKey as keyof PenggunaTable];

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
