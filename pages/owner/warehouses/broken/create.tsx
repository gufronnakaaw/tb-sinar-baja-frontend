import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// components & utils
import ButtonBack from "@/components/button/ButtonBack";
import InputSearchBar from "@/components/input/InputSearchBar";
import CustomTooltip from "@/components/tooltip";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import usePagination from "@/hooks/usepagination";
import { BrokenItem } from "@/types/broken.type";
import { ProdukSearchType } from "@/types/products.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { Plus, Trash } from "@phosphor-icons/react";
import { useDebounce } from "use-debounce";

type Harga = {
  harga_1: string;
  harga_2: string;
  harga_3: string;
  harga_4: string;
  harga_5: string;
  harga_6: string;
};

const harga = [
  "harga_pokok",
  "harga_1",
  "harga_2",
  "harga_3",
  "harga_4",
  "harga_5",
  "harga_6",
];

const translateHarga = {
  harga_pokok: "Harga Pokok",
  harga_1: "Harga Distributor",
  harga_2: "Harga Agen",
  harga_3: "Harga Grosir",
  harga_4: "Harga Toko",
  harga_5: "Harga Aplikator",
  harga_6: "Harga Retail",
};

export default function StockUpdate() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 500);
  const [produk, setProduk] = useState<ProdukSearchType[]>([]);
  const { page, pages, data, setPage } = usePagination(produk, 5);
  const [brokenItems, setBrokenItems] = useState<BrokenItem[]>([]);

  useEffect(() => {
    if (searchValue != "") {
      getProduk(searchValue);
    } else {
      setProduk([]);
    }

    async function getProduk(search: string) {
      try {
        const data = await fetcher({
          url: "/produk?search=" + encodeURI(search),
          method: "GET",
        });

        setProduk(data.data);
      } catch (error) {
        console.log(error);
        alert("ups sepertinya tidak bisa mencari produk");
      }
    }
  }, [searchValue]);

  async function handleAdd() {
    setLoading(true);

    try {
      await fetcher({
        url: "/beritaacara",
        method: "POST",
        data: {
          list_produk: brokenItems.map((item) => {
            return {
              kode_item: item.kode_item,
              nama_produk: item.nama_produk,
              jumlah: item.jumlah,
              harga: item.harga,
              satuan: item.satuan,
              gudang: item.gudang_id,
              rak: item.rak,
              alasan: item.alasan,
              tipe_harga: item.tipe_harga,
            };
          }),
        },
      });
      alert("buat berita acara berhasil");

      setLoading(false);

      return router.back();
    } catch (error) {
      setLoading(false);

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
    <Layout title="Buat Berita Acara">
      <Container className="gap-12">
        <ButtonBack
          onClick={() => router.back()}
          className="justify-self-start text-primary"
        >
          Kembali
        </ButtonBack>

        <div className="grid gap-2">
          <InputSearchBar
            placeholder="Cari Kode Item atau Nama Produk"
            className="w-full"
            onChange={(e) => setSearch(e.target.value)}
          />

          <Table
            isHeaderSticky
            aria-label="produk table"
            color="default"
            selectionMode="none"
            classNames={customStyleTable}
            className="scrollbar-hide"
          >
            <TableHeader>
              <TableColumn>Kode Item</TableColumn>
              <TableColumn>Nama Produk</TableColumn>
              <TableColumn>Aksi</TableColumn>
            </TableHeader>
            <TableBody items={data} emptyContent="Produk kosong!">
              {(item) => (
                <TableRow key={item.kode_item}>
                  <TableCell>{item.kode_item}</TableCell>
                  <TableCell>{item.nama_produk}</TableCell>
                  <TableCell>
                    <CustomTooltip content="Tambah ke daftar barang">
                      <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        onClick={() => {
                          setBrokenItems((prev) => {
                            if (
                              prev.find(
                                (produk) => produk.kode_item == item.kode_item,
                              )
                            ) {
                              return [...prev];
                            }

                            return [
                              ...prev,
                              {
                                kode_item: item.kode_item,
                                nama_produk: item.nama_produk,
                                gudang: item.gudang ?? [],
                                harga_pokok: item.harga_pokok ?? 0,
                                harga_1: item.harga_1 ?? 0,
                                harga_2: item.harga_2 ?? 0,
                                harga_3: item.harga_3 ?? 0,
                                harga_4: item.harga_4 ?? 0,
                                harga_5: item.harga_5 ?? 0,
                                harga_6: item.harga_6 ?? 0,
                                satuan: item.satuan_kecil ?? "",
                                rak: item.rak ?? "",
                                jumlah: 0,
                                alasan: "",
                                harga: 0,
                                tipe_harga: "",
                                gudang_id: "",
                              },
                            ];
                          });
                        }}
                      >
                        <Plus
                          weight="bold"
                          size={20}
                          className="text-default-600"
                        />
                      </Button>
                    </CustomTooltip>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {produk.length ? (
            <Pagination
              isCompact
              showControls
              page={page}
              total={pages}
              onChange={setPage}
              className="justify-self-center"
              classNames={{
                cursor: "bg-primary",
              }}
            />
          ) : null}

          <h4 className="mt-8 border-l-4 border-primary pl-4 text-[18px] font-semibold text-default-900">
            Daftar Barang
          </h4>

          <Table
            isHeaderSticky
            aria-label="produk table"
            color="default"
            selectionMode="none"
            classNames={customStyleTable}
            className="scrollbar-hide"
          >
            <TableHeader>
              <TableColumn>Kode Item</TableColumn>
              <TableColumn>Nama Produk</TableColumn>
              <TableColumn className="w-[120px]">Jumlah</TableColumn>
              <TableColumn className="w-[150px]">Alasan</TableColumn>
              <TableColumn className="w-[200px]">Landasan Harga</TableColumn>
              <TableColumn className="w-[165px]">Gudang</TableColumn>
              <TableColumn>Aksi</TableColumn>
            </TableHeader>
            <TableBody items={brokenItems}>
              {(item) => (
                <TableRow key={item.kode_item}>
                  <TableCell>{item.kode_item}</TableCell>
                  <TableCell>{item.nama_produk}</TableCell>
                  <TableCell>
                    <Input
                      value={!item.jumlah ? "" : `${item.jumlah}`}
                      type="number"
                      variant="flat"
                      size="sm"
                      min={0}
                      step=".01"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!value) {
                          setBrokenItems((prev) => {
                            if (prev.length != 0) {
                              const index = prev.findIndex(
                                (produk) => produk.kode_item == item.kode_item,
                              );

                              if (index != -1) {
                                prev[index] = {
                                  ...prev[index],
                                  jumlah: 0,
                                };

                                return [...prev];
                              }
                            }
                            return [...prev];
                          });
                        } else {
                          setBrokenItems((prev) => {
                            if (prev.length != 0) {
                              const index = prev.findIndex(
                                (produk) => produk.kode_item == item.kode_item,
                              );

                              if (index != -1) {
                                prev[index] = {
                                  ...prev[index],
                                  jumlah: parseFloat(value),
                                };

                                return [...prev];
                              }
                            }
                            return [...prev];
                          });
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      variant="flat"
                      size="sm"
                      onChange={(e) => {
                        const value = e.target.value;
                        setBrokenItems((prev) => {
                          if (prev.length != 0) {
                            const index = prev.findIndex(
                              (produk) => produk.kode_item == item.kode_item,
                            );

                            if (index != -1) {
                              prev[index] = {
                                ...prev[index],
                                alasan: value,
                              };

                              return [...prev];
                            }
                          }
                          return [...prev];
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      label="Harga"
                      size="sm"
                      isRequired
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!value) {
                          setBrokenItems((prev) => {
                            if (prev.length != 0) {
                              const index = prev.findIndex(
                                (produk) => produk.kode_item == item.kode_item,
                              );

                              if (index != -1) {
                                prev[index] = {
                                  ...prev[index],
                                  tipe_harga: "",
                                  harga: 0,
                                };

                                return [...prev];
                              }
                            }
                            return [...prev];
                          });
                        } else {
                          setBrokenItems((prev) => {
                            if (prev.length != 0) {
                              const index = prev.findIndex(
                                (produk) => produk.kode_item == item.kode_item,
                              );

                              if (index != -1) {
                                prev[index] = {
                                  ...prev[index],
                                  tipe_harga: value,
                                  harga: prev[index][value as keyof Harga],
                                };

                                return [...prev];
                              }
                            }
                            return [...prev];
                          });
                        }
                      }}
                    >
                      {harga.map((el) => {
                        return (
                          <SelectItem key={el} value={el}>
                            {translateHarga[el as keyof Harga]}
                          </SelectItem>
                        );
                      })}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      label="Gudang"
                      size="sm"
                      items={item.gudang}
                      isRequired
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!value) {
                          setBrokenItems((prev) => {
                            if (prev.length != 0) {
                              const index = prev.findIndex(
                                (produk) => produk.kode_item == item.kode_item,
                              );

                              if (index != -1) {
                                prev[index] = {
                                  ...prev[index],
                                  gudang_id: "",
                                };

                                return [...prev];
                              }
                            }
                            return [...prev];
                          });
                        } else {
                          setBrokenItems((prev) => {
                            if (prev.length != 0) {
                              const index = prev.findIndex(
                                (produk) => produk.kode_item == item.kode_item,
                              );

                              if (index != -1) {
                                prev[index] = {
                                  ...prev[index],
                                  gudang_id: value,
                                };

                                return [...prev];
                              }
                            }
                            return [...prev];
                          });
                        }
                      }}
                    >
                      {(data) => (
                        <SelectItem key={data.nama} value={data.nama}>
                          {data.nama}
                        </SelectItem>
                      )}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <CustomTooltip content="Hapus">
                      <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        onClick={() =>
                          setBrokenItems((prev) =>
                            prev.filter(
                              (prev) => prev.kode_item != item.kode_item,
                            ),
                          )
                        }
                      >
                        <Trash
                          weight="bold"
                          size={20}
                          className="text-default-600"
                        />
                      </Button>
                    </CustomTooltip>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {loading ? (
            <Button
              variant="solid"
              startContent={<Spinner color="white" size="sm" />}
              className={`bg-primary text-white ${loading ? "cursor-not-allowed justify-self-end font-medium" : ""}`}
            >
              Tunggu
            </Button>
          ) : (
            <Button
              variant="solid"
              size="md"
              onClick={handleAdd}
              className="w-max justify-self-end bg-primary font-medium text-white "
            >
              Buat
            </Button>
          )}
        </div>
      </Container>
    </Layout>
  );
}
