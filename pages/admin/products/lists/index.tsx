import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR, { KeyedMutator } from "swr";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import PopupImportProducts from "@/components/popup/PopupImportProducts";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import {
  columnsProduk,
  renderCellProduk,
} from "@/headers/admin/products/lists";

// utils
import usePagination from "@/hooks/usepagination";
import { GlobalResponse } from "@/types/global.type";
import { ProdukType } from "@/types/products.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";

type ProdukTypeSubComponent = {
  kode_item: string;
  barcode?: any;
  kode_pabrik?: any;
  kode_toko?: any;
  kode_supplier?: any;
  nama_produk: string;
  nama_produk_asli?: string;
  nama_produk_sebutan?: any;
  merk?: any;
  tipe?: any;
  satuan_besar?: any;
  satuan_kecil?: string;
  isi_satuan_besar?: any;
  konversi?: any;
  harga_pokok?: number;
  harga_1?: number;
  harga_2?: number;
  harga_3?: number;
  harga_4: number;
  harga_5?: any;
  harga_6?: any;
  stok?: number;
  created_at: string;
  updated_at?: string;
  rak?: string;
  stok_aman: number;
  subkategori?: string;
  gudang?: string;
  kategori: string;
  status_stok: string;
}[];

export default function ProductsListsPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [search, setSearch] = useState("");

  const swr = useSWR<GlobalResponse<ProdukType>>(
    {
      url: `/produk?size=5000`,
      method: "GET",
    },
    fetcher,
    {
      fallbackData: props.produk,
    },
  );

  if (swr.isLoading) {
    return;
  }

  if (swr.error) {
    console.log(swr.error);
  }

  const filter = swr.data?.data.produk.filter((item) => {
    return (
      item.nama_produk.toLowerCase().includes(search.toLowerCase()) ||
      item.kode_item.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <SubComponentProductsListsPage
      {...{ produk: filter, setSearch, mutate: swr.mutate }}
    />
  );
}

function SubComponentProductsListsPage({
  produk,
  setSearch,
  mutate,
}: {
  produk: ProdukTypeSubComponent | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  mutate: KeyedMutator<any>;
}) {
  const { page, pages, data, setPage } = usePagination(
    produk ? produk : [],
    10,
  );

  const router = useRouter();

  return (
    <Layout title="Daftar Produk">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Daftar Produk
        </h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari Kode Item atau Nama Produk"
              className="w-full sm:max-w-[500px]"
              onChange={(e) => setSearch(e.target.value)}
            />

            <PopupImportProducts {...{ mutate }} />
          </div>

          <Table
            isHeaderSticky
            aria-label="products table"
            color="primary"
            selectionMode="single"
            classNames={customStyleTable}
            className="scrollbar-hide"
          >
            <TableHeader columns={columnsProduk}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={data}>
              {(item) => (
                <TableRow key={item.kode_item}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCellProduk(item, columnKey, router)}
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
    url: "/produk",
    method: "GET",
  });

  const produk: GlobalResponse<ProdukType> = result;

  return {
    props: {
      produk,
    },
  };
}) satisfies GetServerSideProps<{ produk: GlobalResponse<ProdukType> }>;