// components
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { EntryType } from "@/types/entry.type";
import { GlobalResponse } from "@/types/global.type";
import { WarehouseListType } from "@/types/warehouses.type";
import { fetcher } from "@/utils/fetcher";
import {
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
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
import useSWR from "swr";

export default function Entry({
  entry,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const swr = useSWR<GlobalResponse<WarehouseListType[]>>({
    url: "/gudang",
    method: "GET",
  });

  const [entryItems, setEntryItems] = useState<EntryType[]>(
    entry.map((item) => {
      return {
        ...item,
        gudang_id: "",
        jumlah_entry: "",
        checklist: false,
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
                        isSelected={item.checklist}
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
                      <Select
                        label="Pilih Gudang"
                        selectionMode="multiple"
                        selectedKeys={
                          item.gudang_id
                            ? item.gudang_id.split(",").filter(Boolean)
                            : []
                        }
                        onSelectionChange={(keys) => {
                          setEntryItems((prev) =>
                            prev.map((produk) =>
                              produk.kode_item === item.kode_item
                                ? {
                                    ...produk,
                                    gudang_id: Array.from(keys).join(","),
                                  }
                                : produk,
                            ),
                          );
                        }}
                        items={swr.data?.data || []}
                        className="min-w-[120px]"
                        size="sm"
                      >
                        {(gudang) => (
                          <SelectItem
                            key={gudang.kode_gudang}
                            value={gudang.kode_gudang}
                          >
                            {gudang.nama}
                          </SelectItem>
                        )}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.jumlah_entry}
                        type="number"
                        variant="flat"
                        color="default"
                        min="0"
                        max={item.jumlah}
                        onChange={(e) => {
                          const inputValue = parseInt(e.target.value) || 0;
                          const finalValue =
                            inputValue > item.jumlah ? item.jumlah : inputValue;

                          setEntryItems((prev) =>
                            prev.map((produk) =>
                              produk.kode_item === item.kode_item
                                ? {
                                    ...produk,
                                    jumlah_entry: finalValue.toString(),
                                  }
                                : produk,
                            ),
                          );
                        }}
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
            className="w-max justify-self-end bg-primary font-medium text-white"
            onClick={updateStok}
            isDisabled={
              !entryItems.some((item) => item.checklist) ||
              entryItems
                .filter((item) => item.checklist)
                .some((item) => !item.jumlah_entry || !item.gudang_id)
            }
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
