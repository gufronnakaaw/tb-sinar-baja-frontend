import { Button } from "@nextui-org/react";
import { Eye, Pencil, Trash } from "@phosphor-icons/react";
import { NextRouter } from "next/router";
import React from "react";

// components & utils
import CustomTooltip from "@/components/tooltip";
import { MembersType } from "@/types/members";

type MembersListsTable = {
  id: string;
  name: string;
  level: string;
  created_at: string;
};

export const columnsMembersLists = [
  { name: "ID Member", uid: "members_id" },
  { name: "Nama", uid: "name" },
  { name: "Level", uid: "level" },
  { name: "Dibuat Pada", uid: "created_at" },
  { name: "Aksi", uid: "action" },
];

export function renderCellMembersLists(
  member: MembersType,
  columnKey: React.Key,
  router: NextRouter,
) {
  const cellValue = member[columnKey as keyof MembersListsTable];

  switch (columnKey) {
    case "members_id":
      return <div className="text-default-900">{member.id}</div>;
    case "name":
      return <div className="w-max text-default-900">{member.name}</div>;
    case "level":
      return <div className="w-max text-default-900">{member.level}</div>;
    case "created_at":
      return <div className="w-max text-default-900">{member.created_at}</div>;
    case "action":
      return (
        <div className="flex max-w-[110px] items-center gap-1">
          <CustomTooltip content="Detail">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => router.push("/owner/members/lists")}
            >
              <Eye weight="bold" size={20} className="text-default-600" />
            </Button>
          </CustomTooltip>

          <CustomTooltip content="Edit">
            <Button isIconOnly variant="light" size="sm">
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
