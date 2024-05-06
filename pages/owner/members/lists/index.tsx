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

// components
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import { MembersType, members } from "@/_dummy/members";
import InputSearchBar from "@/components/input/InputSearchBar";
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

export default function MembersListsPage() {
  const { page, pages, data, setPage } = usePagination(members, 10);

  const columns = [
    { name: "ID Member", uid: "members_id", sortable: false },
    { name: "Nama", uid: "name", sortable: true },
    { name: "Level", uid: "level", sortable: true },
    { name: "Dibuat Pada", uid: "created_at", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

  const renderCell = (members: MembersType, columnKey: React.Key) => {
    const cellValue = members[columnKey as keyof MembersType];

    switch (columnKey) {
      case "members_id":
        return <div className="text-default-900">{members.id}</div>;
      case "name":
        return <div className="text-default-900">{members.name}</div>;
      case "level":
        return <div className="text-default-900">{members.level}</div>;
      case "created_at":
        return <div className="text-default-900">{members.created_at}</div>;
      case "action":
        return (
          <Button
            variant="bordered"
            color="default"
            size="sm"
            onClick={() => alert(`ID Order: ${members.id}`)}
            className="font-medium"
          >
            Detail
          </Button>
        );

      default:
        return cellValue;
    }
  };
  return (
    <Layout title="Daftar Member">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Daftar Member
        </h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari member..."
              className="w-full sm:max-w-[500px]"
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
            >
              Tambah Member
            </Button>
          </div>

          <Table
            isHeaderSticky
            aria-label="members table"
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
