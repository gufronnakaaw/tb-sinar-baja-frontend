import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useRouter } from "next/router";

// components
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import usePagination from "@/hooks/usepagination";

import InputSearchBar from "@/components/input/InputSearchBar";
import {
  columnsDocuments,
  renderCellDocuments,
} from "@/headers/owner/warehouses/documents";
import { GlobalResponse } from "@/types/global.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useState } from "react";
import useSWR from "swr";

type DocumentType = {
  id_suratjalan: string;
  transaksi_id: string;
  nama_driver: string;
  kendaraan: string;
  plat_kendaraan: string;
  verifikasi: boolean;
  transaksi: {
    penerima: string;
  };
};

export default function WarehousesDocumentsPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<DocumentType[]>>(
    {
      url: "/suratjalan",
      method: "GET",
    },
    fetcher,
    {
      fallbackData: props.documents,
      refreshInterval: 15000,
    },
  );
  if (swr.isLoading) {
    return;
  }

  if (swr.error) {
    console.log(swr.error);
  }

  const filter = swr.data?.data.filter((item) => {
    return (
      item.id_suratjalan.toLowerCase().includes(search.toLowerCase()) ||
      item.transaksi_id.toLowerCase().includes(search.toLowerCase()) ||
      item.transaksi.penerima.toLowerCase().includes(search.toLowerCase())
    );
  });

  return <SubComponentDocumentsPage {...{ documents: filter, setSearch }} />;
}

function SubComponentDocumentsPage({
  documents,
  setSearch,
}: {
  documents: DocumentType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const router = useRouter();

  const { page, pages, data, setPage } = usePagination(
    documents ? documents : [],
    10,
  );

  return (
    <Layout title="Surat Jalan">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">Surat Jalan</h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari ID Surat Jalan atau ID Transaksi atau penerima"
              className="w-full sm:max-w-[500px]"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Table
            isHeaderSticky
            aria-label="surat jalan table"
            color="primary"
            selectionMode="single"
            classNames={customStyleTable}
            className="scrollbar-hide"
          >
            <TableHeader columns={columnsDocuments}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={data}>
              {(item) => (
                <TableRow key={item.id_suratjalan}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCellDocuments(item, columnKey, router)}
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

export const getServerSideProps = (async () => {
  const result = await fetcher({
    url: "/suratjalan",
    method: "GET",
  });

  const documents: GlobalResponse<DocumentType[]> = result as GlobalResponse<
    DocumentType[]
  >;

  return {
    props: {
      documents,
    },
  };
}) satisfies GetServerSideProps<{ documents: GlobalResponse<DocumentType[]> }>;
