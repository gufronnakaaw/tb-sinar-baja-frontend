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
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

import { members } from "@/_dummy/members";
import {
  columnsMembersLists,
  renderCellMembersLists,
} from "@/headers/owner/members/lists";
import { useRouter } from "next/router";

export default function MembersListsPage() {
  const { page, pages, data, setPage } = usePagination(members, 10);
  const router = useRouter();

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
            className="scrollbar-hide"
          >
            <TableHeader columns={columnsMembersLists}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={data}>
              {(member) => (
                <TableRow key={member.id}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCellMembersLists(member, columnKey, router)}
                    </TableCell>
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
