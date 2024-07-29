// components
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { EntryType } from "@/types/entry.type";
import { GlobalResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import {
  Button,
  Checkbox,
  Input,
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

export default function Entry({
  entry,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [entryItems, setEntryItems] = useState<EntryType[]>(
    entry.map((item) => {
      return {
        ...item,
        gudang_id: "",
        jumlah_entry: "",
        checklist: true,
      };
    }),
  );

  async function updateStok() {
    const filterData = entryItems.filter((item) => item.checklist);

    if (!filterData.length) {
      return alert("Silahkan checklist minimal 1 item");
    }

    try {
      await fetcher({
        url: "/gudang/stok",
        method: "PATCH",
        data: {
          list_produk: filterData,
        },
      });

      alert("entry gudang berhasil");
      return router.reload();
    } catch (error) {
      const response = error as {
        success: boolean;
        status_code: number;
        error: { name: string; message: string };
      };

      if (response.status_code >= 500) {
        console.log(response.error);
        return alert("terjadi masalah pada server");
      }

      if (response.status_code >= 400) {
        console.log(response.error);
        return alert(response.error.message);
      }

      console.log(response.error);
      return alert("terjadi error tidak diketahui pada aplikasi");
    }
  }

  return (
    <Layout title="List Barang Masuk">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          List Barang Masuk
        </h4>

        <div className="grid gap-4">
          <Table
            isHeaderSticky
            aria-label="entry table"
            color="default"
            selectionMode="none"
            classNames={{
              wrapper: "rounded-none shadow-none p-1",
            }}
            className="scrollbar-hide"
          >
            <TableHeader>
              <TableColumn>#</TableColumn>
              <TableColumn>Kode Item</TableColumn>
              <TableColumn>Nama Produk</TableColumn>
              <TableColumn>Qty</TableColumn>
              <TableColumn>Lokasi Produk</TableColumn>
              <TableColumn>Gudang</TableColumn>
              <TableColumn>Jumlah</TableColumn>
            </TableHeader>
            <TableBody items={entryItems} emptyContent="Entry item kosong">
              {(item) => {
                return (
                  <TableRow key={item.kode_item}>
                    <TableCell>
                      <Checkbox
                        value={item.checklist}
                        onValueChange={(e) =>
                          setEntryItems((prev) => {
                            if (prev.length != 0) {
                              const index = prev.findIndex(
                                (produk) => produk.kode_item == item.kode_item,
                              );

                              if (index != -1) {
                                prev[index] = {
                                  ...prev[index],
                                  checklist: e,
                                };

                                return [...prev];
                              }
                            }
                            return [...prev];
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>{item.kode_item}</TableCell>
                    <TableCell>{item.nama_produk}</TableCell>
                    <TableCell>{item.jumlah}</TableCell>
                    <TableCell>{item.gudang.join(", ")}</TableCell>
                    <TableCell>
                      <Input
                        value={item.gudang_id}
                        type="text"
                        variant="flat"
                        color="default"
                        onChange={(e) =>
                          setEntryItems((prev) => {
                            if (prev.length != 0) {
                              const index = prev.findIndex(
                                (produk) => produk.kode_item == item.kode_item,
                              );

                              if (index != -1) {
                                prev[index] = {
                                  ...prev[index],
                                  gudang_id: e.target.value.toUpperCase(),
                                };

                                return [...prev];
                              }
                            }
                            return [...prev];
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.jumlah_entry}
                        type="text"
                        variant="flat"
                        color="default"
                        onChange={(e) =>
                          setEntryItems((prev) => {
                            if (prev.length != 0) {
                              const index = prev.findIndex(
                                (produk) => produk.kode_item == item.kode_item,
                              );

                              if (index != -1) {
                                prev[index] = {
                                  ...prev[index],
                                  jumlah_entry: e.target.value.toUpperCase(),
                                };

                                return [...prev];
                              }
                            }
                            return [...prev];
                          })
                        }
                      />
                    </TableCell>
                  </TableRow>
                );
              }}
            </TableBody>
          </Table>

          <Button
            variant="solid"
            size="md"
            className="w-max justify-self-end bg-teal-500 font-medium text-white"
            onClick={updateStok}
          >
            Simpan ke gudang
          </Button>
        </div>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async () => {
  const entry: GlobalResponse<EntryType[]> = await fetcher({
    url: "/gudang/entry",
    method: "GET",
  });

  return {
    props: {
      entry: entry.data,
    },
  };
}) satisfies GetServerSideProps<{ entry: EntryType[] }>;
