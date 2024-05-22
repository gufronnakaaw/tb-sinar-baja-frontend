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
import { NextRouter, useRouter } from "next/router";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

import LoadingScreen from "@/components/LoadingScreen";
import CustomTooltip from "@/components/tooltip";
import { GlobalResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { Eye } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import useSWR, { KeyedMutator } from "swr";

type SupplierType = {
  id_supplier: string;
  nama: string;
  email: string;
  no_telp: string;
  alamat_kantor: string;
  alamat_gudang: string;
  keterangan: string;
  bank: string;
  atas_nama: string;
  no_rekening: string;
  created_at: string;
};

export default function PricelistPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<SupplierType[]>>(
    {
      url: "/supplier",
      method: "GET",
    },
    fetcher,
    {
      fallbackData: props.supplier,
      refreshInterval: 10000,
    },
  );
  if (swr.isLoading) {
    return <LoadingScreen role="owner" />;
  }

  if (swr.error) {
    console.log(swr.error);
  }

  const filter = swr.data?.data.filter((item) => {
    return (
      item.id_supplier.toLowerCase().includes(search.toLowerCase()) ||
      item.nama.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <SubComponentSuppliersPage
      {...{ supplier: filter, setSearch, mutate: swr.mutate }}
    />
  );
}

function SubComponentSuppliersPage({
  supplier,
  setSearch,
  mutate,
}: {
  supplier: SupplierType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  mutate: KeyedMutator<any>;
}) {
  const { page, pages, data, setPage } = usePagination(
    supplier ? supplier : [],
    10,
  );
  const [input, setInput] = useState({});

  const router = useRouter();

  const columnsSupplier = [
    { name: "ID Supplier", uid: "id_supplier" },
    { name: "Nama", uid: "nama" },
    { name: "Aksi", uid: "action" },
  ];

  function renderSupplier(
    supplier: SupplierType,
    columnKey: React.Key,
    router: NextRouter,
  ) {
    const cellValue = supplier[columnKey as keyof SupplierType];

    switch (columnKey) {
      case "id_supplier":
        return <div className="text-default-900">{supplier.id_supplier}</div>;
      case "nama":
        return <div className="w-max text-default-900">{supplier.nama}</div>;
      case "action":
        return (
          <div className="flex max-w-[110px] items-center gap-1">
            <CustomTooltip content="Detail Harga">
              <Button isIconOnly variant="light" size="sm">
                <Eye weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>
          </div>
        );

      default:
        return cellValue;
    }
  }

  return (
    <Layout title="Harga Supplier">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Daftar Supplier
        </h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari ID Supplier atau Nama"
              className="w-full sm:max-w-[500px]"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Table
            isHeaderSticky
            aria-label="suppliers table"
            color="primary"
            selectionMode="single"
            classNames={customStyleTable}
            className="scrollbar-hide"
          >
            <TableHeader columns={columnsSupplier}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={data}>
              {(supplier) => (
                <TableRow key={supplier.id_supplier}>
                  {(columnKey) => (
                    <TableCell>
                      {renderSupplier(supplier, columnKey, router)}
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
    url: "/supplier",
    method: "GET",
  });

  const supplier: GlobalResponse<SupplierType[]> = result;

  return {
    props: {
      supplier,
    },
  };
}) satisfies GetServerSideProps<{ supplier: GlobalResponse<SupplierType[]> }>;
