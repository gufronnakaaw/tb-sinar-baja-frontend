import usePagination from "@/hooks/usepagination";
import { MemberType } from "@/types/members";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatDate } from "@/utils/formatDate";
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
import { Pencil, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import CustomTooltip from "../tooltip";

export default function MembersTable({
  member,
  role,
}: {
  member: MemberType[] | undefined;
  role: string;
}) {
  const { page, pages, data, setPage } = usePagination(
    member ? member : [],
    10,
  );

  const router = useRouter();

  const columnsMember = [
    { name: "ID Member", uid: "id_member" },
    { name: "Nama", uid: "nama" },
    { name: "Level", uid: "level" },
    { name: "Perusahaan", uid: "perusahaan" },
    { name: "Alamat", uid: "alamat" },
    { name: "Email", uid: "email" },
    { name: "No Telp", uid: "no_telp" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellMember(member: MemberType, columnKey: React.Key) {
    const cellValue = member[columnKey as keyof MemberType];

    switch (columnKey) {
      case "id_member":
        return <div className="text-default-900">{member.id_member}</div>;
      case "nama":
        return <div className="w-max text-default-900">{member.nama}</div>;
      case "level":
        return <div className="w-max text-default-900">{member.level}</div>;
      case "perusahaan":
        return (
          <div className="w-max text-default-900">{member.perusahaan}</div>
        );
      case "alamat":
        return <div className="w-max text-default-900">{member.alamat}</div>;
      case "email":
        return <div className="w-max text-default-900">{member.email}</div>;
      case "no_telp":
        return <div className="w-max text-default-900">{member.no_telp}</div>;
      case "created_at":
        return (
          <div className="w-max text-default-900">
            {formatDate(member.created_at)}
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
                  router.push(
                    `/${role}/members/levels/edit?id_level=${member.id_member}`,
                  )
                }
              >
                <Pencil weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>

            <CustomTooltip content="Hapus">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() => handleDeleteMember(member.id_member)}
              >
                <Trash weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>
          </div>
        );

      default:
        return cellValue;
    }
  }

  async function handleDeleteMember(id_member: string) {}

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="member table"
        color="primary"
        selectionMode="single"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader columns={columnsMember}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>

        <TableBody items={data} emptyContent="Member tidak ditemukan!">
          {(member) => (
            <TableRow key={member.id_member}>
              {(columnKey) => (
                <TableCell>{renderCellMember(member, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        isCompact
        showControls
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
        className="justify-self-center"
        classNames={{
          cursor: role == "owner" ? "bg-primary" : "bg-lime-500",
        }}
      />
    </>
  );
}
