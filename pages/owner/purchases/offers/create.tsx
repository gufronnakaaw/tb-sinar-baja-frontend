import ButtonBack from "@/components/button/ButtonBack";
import CustomTooltip from "@/components/tooltip";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import usePagination from "@/hooks/usepagination";
import { GlobalResponse } from "@/types/global.type";
import { ProdukPenawaran } from "@/types/preorders.type";
import { PricelistType, SupplierType } from "@/types/suppliers.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { SATUANLIST } from "@/utils/satuan";
import {
  Button,
  Divider,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { Plus, Trash } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CreateOffers(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const router = useRouter();
  const [supplier, setSupplier] = useState("");
  const [pricelist, setPricelist] = useState<PricelistType[]>([]);
  const [loadingPricelist, setLoadingPricelist] = useState(false);
  const [pesanan, setPesanan] = useState<ProdukPenawaran[]>([]);
  const { page, pages, data, setPage } = usePagination(pricelist, 3);

  useEffect(() => {
    if (supplier) {
      getPricelist();
    }

    async function getPricelist() {
      setLoadingPricelist(true);
      try {
        const result: GlobalResponse<PricelistType[]> = await fetcher({
          url: "/supplier/pricelist?id_supplier=" + supplier,
          method: "GET",
        });

        setLoadingPricelist(false);
        setPricelist(result.data);
      } catch (error) {
        setLoadingPricelist(false);
        alert("ups sepertinya ada masalah pada server");
        console.log(error);
      }
    }
  }, [supplier]);

  const columnsPricelist = [
    { name: "Kode Pabrik", uid: "kode_pabrik" },
    { name: "Nama Produk", uid: "nama_produk" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellPricelist(item: PricelistType, columnKey: React.Key) {
    const cellValue = item[columnKey as keyof PricelistType];

    switch (columnKey) {
      case "kode_pabrik":
        return <div className="text-default-900">{item.kode_pabrik}</div>;
      case "nama_produk":
        return <div className="w-max text-default-900">{item.nama_produk}</div>;
      case "action":
        return (
          <div className="flex max-w-[110px] items-center gap-1">
            <CustomTooltip content="Tambah Ke Daftar Pesanan">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() => {
                  setPesanan((prev) => {
                    if (
                      prev.find(
                        (element) => element.nama_produk == item.nama_produk,
                      )
                    ) {
                      return [...prev];
                    }

                    return [
                      ...prev,
                      {
                        kode_item: item.kode_item,
                        kode_pabrik: !item.kode_pabrik
                          ? null
                          : item.kode_pabrik,
                        nama_produk: item.nama_produk,
                        harga: null,
                        jumlah: null,
                        qty: 1,
                        satuan: "",
                      },
                    ];
                  });
                }}
              >
                <Plus weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>
          </div>
        );

      default:
        return cellValue;
    }
  }

  const columnsPesanan = [
    { name: "Kode Pabrik", uid: "kode_pabrik" },
    { name: "Nama Produk", uid: "nama_produk" },
    { name: "Qty", uid: "qty" },
    { name: "Satuan", uid: "satuan" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellPesanan(item: ProdukPenawaran, columnKey: React.Key) {
    const cellValue = item[columnKey as keyof ProdukPenawaran];

    switch (columnKey) {
      case "kode_pabrik":
        return <div className="text-default-900">{item.kode_pabrik}</div>;
      case "nama_produk":
        return <div className="w-max text-default-900">{item.nama_produk}</div>;
      case "qty":
        return (
          <div className="w-[80px] text-default-900">
            <Input
              value={item.qty ? `${item.qty}` : ""}
              type="number"
              variant="flat"
              size="sm"
              min={0}
              labelPlacement="outside"
              step="0.01"
              onChange={(e) => {
                if (!e.target.value) {
                  setPesanan((prev) => {
                    if (prev.length != 0) {
                      const index = prev.findIndex(
                        (produk) => produk.nama_produk == item.nama_produk,
                      );

                      if (index != -1) {
                        prev[index] = {
                          ...prev[index],
                          qty: 0,
                        };

                        return [...prev];
                      }
                    }
                    return [...prev];
                  });
                } else {
                  setPesanan((prev) => {
                    if (prev.length != 0) {
                      const index = prev.findIndex(
                        (produk) => produk.nama_produk == item.nama_produk,
                      );

                      if (index != -1) {
                        prev[index] = {
                          ...prev[index],
                          qty: parseFloat(e.target.value),
                        };

                        return [...prev];
                      }
                    }
                    return [...prev];
                  });
                }
              }}
            />
          </div>
        );
      case "satuan":
        return (
          <div className="w-[120px] text-default-900">
            <Select
              label="Satuan"
              className="w-full"
              size="sm"
              onChange={(e) => {
                if (!e.target.value) {
                  setPesanan((prev) => {
                    if (prev.length != 0) {
                      const index = prev.findIndex(
                        (produk) => produk.nama_produk == item.nama_produk,
                      );

                      if (index != -1) {
                        prev[index] = {
                          ...prev[index],
                          satuan: "",
                        };

                        return [...prev];
                      }
                    }
                    return [...prev];
                  });
                } else {
                  setPesanan((prev) => {
                    if (prev.length != 0) {
                      const index = prev.findIndex(
                        (produk) => produk.nama_produk == item.nama_produk,
                      );

                      if (index != -1) {
                        prev[index] = {
                          ...prev[index],
                          satuan: e.target.value,
                        };

                        return [...prev];
                      }
                    }
                    return [...prev];
                  });
                }
              }}
            >
              {SATUANLIST.map((item) => {
                return <SelectItem key={item}>{item}</SelectItem>;
              })}
            </Select>
          </div>
        );
      case "action":
        return (
          <div className="flex max-w-[110px] items-center gap-1">
            <CustomTooltip content="Hapus Pesanan">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() => {
                  setPesanan((prev) => {
                    return prev.filter(
                      (element) => element.nama_produk != item.nama_produk,
                    );
                  });
                }}
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

  async function createPenawaran() {
    try {
      await fetcher({
        url: "/penawaran",
        method: "POST",
        data: {
          supplier_id: supplier,
          produk: pesanan,
        },
      });
      alert("buat penawaran berhasil");
      return router.back();
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
    <Layout title="Buat Penawaran">
      <Container className="gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <ButtonBack
            onClick={() => router.back()}
            className="justify-self-start text-primary"
          >
            Kembali
          </ButtonBack>
        </div>

        <Select
          isRequired
          label="Pilih Supplier"
          className="w-full"
          size="sm"
          onChange={(e) => {
            if (!e.target.value) {
              setPricelist([]);
              setPesanan([]);
              return alert("tidak boleh kosong!");
            }
            setSupplier(e.target.value);
            setPesanan([]);
          }}
        >
          {props.supplier.map((item) => {
            return <SelectItem key={item.id_supplier}>{item.nama}</SelectItem>;
          })}
        </Select>

        <Table
          isHeaderSticky
          aria-label="pricelist table"
          color="default"
          selectionMode="none"
          classNames={customStyleTable}
          className="scrollbar-hide"
        >
          <TableHeader columns={columnsPricelist}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>

          <TableBody
            items={data}
            emptyContent="Produk kosong!"
            isLoading={loadingPricelist}
          >
            {(item) => (
              <TableRow key={item.nama_produk}>
                {(columnKey) => (
                  <TableCell>{renderCellPricelist(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Pagination
          isCompact
          showControls
          color="default"
          page={page}
          total={pages}
          onChange={setPage}
          className="justify-self-center"
          classNames={{
            cursor: "bg-primary",
          }}
        />

        <Divider className="my-4" />

        <h4 className="border-l-4 border-primary pl-4 text-[18px] font-semibold text-default-900">
          Daftar Pesanan
        </h4>

        <Table
          isHeaderSticky
          aria-label="pesanan table"
          color="default"
          selectionMode="none"
          classNames={customStyleTable}
          className="scrollbar-hide"
        >
          <TableHeader columns={columnsPesanan}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>

          <TableBody items={pesanan} emptyContent="Pesanan kosong!">
            {(item) => (
              <TableRow key={item.nama_produk}>
                {(columnKey) => (
                  <TableCell>{renderCellPesanan(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Button
          variant="solid"
          size="md"
          className="w-max justify-self-end bg-primary font-medium text-white"
          onClick={createPenawaran}
          isDisabled={!pesanan.length}
        >
          Buat Penawaran
        </Button>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async () => {
  const supplier: GlobalResponse<SupplierType[]> = await fetcher({
    url: "/supplier",
    method: "GET",
  });

  return {
    props: {
      supplier: supplier.data,
    },
  };
}) satisfies GetServerSideProps<{ supplier: SupplierType[] }>;
