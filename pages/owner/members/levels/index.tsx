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

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import CustomTooltip from "@/components/tooltip";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

import { MembersLevelsType, memberLevels } from "@/_dummy/members";

export default function MembersLevelsPage() {
  const { page, pages, data, setPage } = usePagination(memberLevels, 10);

  const columns = [
    { name: "ID Member", uid: "members_id", sortable: false },
    { name: "Nama", uid: "name", sortable: true },
    { name: "Dibuat Pada", uid: "created_at", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

  const renderCell = (members: MembersLevelsType, columnKey: React.Key) => {
    const cellValue = members[columnKey as keyof MembersLevelsType];

    switch (columnKey) {
      case "members_id":
        return <div className="text-default-900">{members.id}</div>;
      case "name":
        return <div className="w-max text-default-900">{members.name}</div>;
      case "created_at":
        return (
          <div className="w-max text-default-900">{members.created_at}</div>
        );
      case "action":
        return (
          <div className="flex max-w-[110px] items-center gap-1">
            <CustomTooltip content="Edit">
              <Button isIconOnly variant="light" size="sm">
                <Pencil weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>

            <CustomTooltip content="Detail">
              <Button isIconOnly variant="light" size="sm">
                <Eye weight="bold" size={20} className="text-default-600" />
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
  };
  return (
    <Layout title="Level Member">
      <Container className="grid gap-8">
        <h4 className="text-lg font-semibold text-default-900">Level Member</h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari level..."
              className="w-full sm:max-w-[500px]"
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
            >
              Tambah Level
            </Button>
          </div>

          <Table
            isHeaderSticky
            aria-label="members table"
            color="primary"
            selectionMode="single"
            classNames={customStyleTable}
            className="scrollbar-hide"
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={data}>
              {(members) => (
                <TableRow key={members.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(members, columnKey)}</TableCell>
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
          />
        </div>
      </Container>
    </Layout>
  );
}
