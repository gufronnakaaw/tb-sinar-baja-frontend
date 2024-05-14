import { Button } from "@nextui-org/react";
import { Pencil, Trash } from "@phosphor-icons/react";
import { NextRouter } from "next/router";
import React from "react";

// components & utils
import CustomTooltip from "@/components/tooltip";
import { UserType } from "@/types/users.type";

type UsersTable = {
  name: string;
  username: string;
  password: string;
  created_at: string;
};

export const columnsUsers = [
  { name: "Nama Pengguna", uid: "name" },
  { name: "Username", uid: "username" },
  { name: "Kata Sandi", uid: "password" },
  { name: "Dibuat Pada", uid: "created_at" },
  { name: "Aksi", uid: "action" },
];

export function renderCellUsers(
  user: UserType,
  columnKey: React.Key,
  router: NextRouter,
) {
  const cellValue = user[columnKey as keyof UsersTable];

  switch (columnKey) {
    case "name":
      return (
        <div className="line-clamp-1 w-max max-w-[250px] text-default-900">
          {user.name}
        </div>
      );
    case "username":
      return <div className="w-max text-default-900">{user.username}</div>;
    case "password":
      return <div className="w-max text-default-900">{user.password}</div>;
    case "created_at":
      return <div className="w-max text-default-900">{user.created_at}</div>;
    case "action":
      return (
        <div className="flex max-w-[110px] items-center gap-1">
          <CustomTooltip content="Edit">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => router.push("/owner/users")}
            >
              <Pencil weight="bold" size={20} className="text-default-600" />
            </Button>
          </CustomTooltip>

          <CustomTooltip content="Hapus">
            <Button isIconOnly variant="light" color="danger" size="sm">
              <Trash weight="bold" size={20} />
            </Button>
          </CustomTooltip>
        </div>
      );

    default:
      return cellValue;
  }
}
