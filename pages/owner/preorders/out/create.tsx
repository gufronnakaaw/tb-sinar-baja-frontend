import ButtonBack from "@/components/button/ButtonBack";
import SelectHarga from "@/components/selects/SelectHarga";
import SelectSatuan from "@/components/selects/SelectSatuan";
import ProductFinalTable from "@/components/tables/ProductFinalTable";
import CustomTooltip from "@/components/tooltip";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { FilterApi, FilterProduk } from "@/types/filter.type";
import { GlobalResponse } from "@/types/global.type";
import {
  PenawaranDetail,
  PenawaranType,
  ProdukFinal,
  ProdukFinalSupplier,
} from "@/types/preorders.type";
import { ProdukKategoriType } from "@/types/products.type";
import { PricelistType, SupplierType } from "@/types/suppliers.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { formatDateWithoutTime } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { SATUANLIST } from "@/utils/satuan";
import {
  Button,
  Divider,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
} from "@nextui-org/react";
import { Plus, Trash } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CreatePreorder(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const router = useRouter();

  const [sumber, setSumber] = useState("non_supplier");
  const [input, setInput] = useState({});
  const [kategori, setKategori] = useState("");
  const [produk, setProduk] = useState<FilterProduk[]>([]);
  const [pesanan, setPesanan] = useState<ProdukFinal[]>([]);

  const [pembuatan, setPembuatan] = useState("buat_baru");
  const [supplier, setSupplier] = useState("");
  const [pesananSupplier, setPesananSupplier] = useState<ProdukFinalSupplier[]>(
    [],
  );
  const [penawaran, setPenawaran] = useState<PenawaranType[]>([]);
  const [idPenawaran, setIdPenawaran] = useState("");
  const [loading, setLoading] = useState(false);
  const [pricelist, setPricelist] = useState<PricelistType[]>([]);
  const [loadingPricelist, setLoadingPricelist] = useState(false);

  useEffect(() => {
    if (!kategori) {
      setProduk([]);
      setPesanan([]);
    } else {
      getProduk();
      setPesanan([]);
    }

    async function getProduk() {
      setLoading(true);

      try {
        const result: GlobalResponse<FilterApi> = await fetcher({
          url: "/produk/filter?id_kategori=" + kategori,
          method: "GET",
        });

        setLoading(false);
        setProduk(result.data.produk);
      } catch (error) {
        setLoading(false);
        alert("terjadi kesalahan saat mendapatkan data produk");
        console.log(error);
      }
    }
  }, [kategori]);

  useEffect(() => {
    if (supplier) {
      getPricelist();
    } else {
      setPesanan([]);
      setPricelist([]);
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
  }, [supplier, pembuatan]);

  useEffect(() => {
    if (pembuatan == "buat_dari_penawaran") {
      getPenawaran();
    }

    async function getPenawaran() {
      try {
        const result: GlobalResponse<PenawaranType[]> = await fetcher({
          url: "/penawaran",
          method: "GET",
        });

        setPenawaran(result.data);
      } catch (error) {
        alert("ups sepertinya ada masalah pada server");
        console.log(error);
      }
    }
  }, [pembuatan]);

  useEffect(() => {
    if (idPenawaran) {
      getPenawaranById();
    }

    async function getPenawaranById() {
      try {
        const result: GlobalResponse<PenawaranDetail> = await fetcher({
          url: "/penawaran?id_penawaran=" + idPenawaran,
          method: "GET",
        });

        const dataPricelist = await getPricelist(result.data.supplier_id);

        const mapping = result.data.produk.map((item) => {
          const find = dataPricelist?.find(
            (element) => element.nama_produk == item.nama_produk,
          );

          return {
            kode_item: item.kode_item,
            kode_pabrik: item.kode_pabrik,
            nama_produk: item.nama_produk,
            harga: !find?.harga ? 0 : find?.harga,
            harga_grosir: !find?.harga_grosir ? 0 : find?.harga_grosir,
            tipe_harga: "harga",
            qty: item.qty,
            satuan: item.satuan,
            subharga: !find?.harga ? 0 : find?.harga,
            jumlah: !find?.harga ? 0 : find?.harga * item.qty,
          };
        });

        setSupplier(result.data.supplier_id);
        setPesananSupplier(mapping);
      } catch (error) {
        alert("ups sepertinya ada masalah pada server");
        console.log(error);
      }
    }

    async function getPricelist(id_supplier: string) {
      try {
        const result: GlobalResponse<PricelistType[]> = await fetcher({
          url: "/supplier/pricelist?id_supplier=" + id_supplier,
          method: "GET",
        });

        return result.data;
      } catch (error) {
        alert("ups sepertinya ada masalah pada server");
        console.log(error);
      }
    }
  }, [idPenawaran]);

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
                  setPesananSupplier((prev) => {
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
                        harga: item.harga,
                        harga_grosir: item.harga_grosir,
                        tipe_harga: "harga",
                        qty: 1,
                        satuan: "",
                        subharga: item.harga,
                        jumlah: 1 * item.harga,
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
    { name: "Harga", uid: "harga" },
    { name: "Jumlah", uid: "jumlah" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellPesanan(item: ProdukFinal, columnKey: React.Key) {
    const cellValue = item[columnKey as keyof ProdukFinal];

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
              step="0.01"
              labelPlacement="outside"
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
                          jumlah: 0,
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
                          jumlah:
                            parseFloat(e.target.value) * prev[index].harga,
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
            <SelectSatuan setPesanan={setPesanan} item={item} />
          </div>
        );
      case "harga":
        return (
          <div className="w-[100px] text-default-900">
            <Input
              value={item.harga ? `${item.harga}` : ""}
              type="number"
              variant="flat"
              size="sm"
              min={0}
              labelPlacement="outside"
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
                          harga: 0,
                          jumlah: 0,
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
                          harga: parseInt(e.target.value),
                          jumlah: prev[index].qty * parseInt(e.target.value),
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
      case "jumlah":
        return (
          <div className="w-[100px] text-default-900">
            {formatRupiah(item.jumlah)}
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

  const columnsPesananSupplier = [
    { name: "Kode Pabrik", uid: "kode_pabrik" },
    { name: "Nama Produk", uid: "nama_produk" },
    { name: "Qty", uid: "qty" },
    { name: "Satuan", uid: "satuan" },
    { name: "Tipe Harga", uid: "tipe_harga" },
    { name: "Harga", uid: "harga" },
    { name: "Jumlah", uid: "jumlah" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellPesananSupplier(
    item: ProdukFinalSupplier,
    columnKey: React.Key,
    pembuatan: string,
  ) {
    const cellValue = item[columnKey as keyof ProdukFinalSupplier];

    switch (columnKey) {
      case "kode_pabrik":
        return <div className="text-default-900">{item.kode_pabrik}</div>;
      case "nama_produk":
        return <div className="w-max text-default-900">{item.nama_produk}</div>;
      case "qty":
        return (
          <div className="w-[80px] text-default-900">
            {pembuatan == "buat_dari_penawaran" ? (
              <>{item.qty}</>
            ) : (
              <Input
                value={item.qty ? `${item.qty}` : ""}
                type="number"
                variant="flat"
                size="sm"
                min={0}
                step="0.01"
                labelPlacement="outside"
                onChange={(e) => {
                  if (!e.target.value) {
                    setPesananSupplier((prev) => {
                      if (prev.length != 0) {
                        const index = prev.findIndex(
                          (produk) => produk.nama_produk == item.nama_produk,
                        );

                        if (index != -1) {
                          prev[index] = {
                            ...prev[index],
                            qty: 0,
                            subharga: item[
                              item.tipe_harga as keyof ProdukFinalSupplier
                            ] as number,
                            jumlah: 0,
                          };

                          return [...prev];
                        }
                      }
                      return [...prev];
                    });
                  } else {
                    setPesananSupplier((prev) => {
                      if (prev.length != 0) {
                        const index = prev.findIndex(
                          (produk) => produk.nama_produk == item.nama_produk,
                        );

                        if (index != -1) {
                          prev[index] = {
                            ...prev[index],
                            qty: parseFloat(e.target.value),
                            subharga: item[
                              item.tipe_harga as keyof ProdukFinalSupplier
                            ] as number,
                            jumlah:
                              parseFloat(e.target.value) *
                              (item[
                                item.tipe_harga as keyof ProdukFinalSupplier
                              ] as number),
                          };

                          return [...prev];
                        }
                      }
                      return [...prev];
                    });
                  }
                }}
              />
            )}
          </div>
        );
      case "satuan":
        return (
          <div className="w-[120px] text-default-900">
            {pembuatan == "buat_dari_penawaran" ? (
              <>{item.satuan}</>
            ) : (
              <Select
                isRequired
                label="Satuan"
                className="w-full"
                size="sm"
                onChange={(e) => {
                  if (!e.target.value) {
                    setPesananSupplier((prev) => {
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
                    setPesananSupplier((prev) => {
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
            )}
          </div>
        );
      case "tipe_harga":
        return (
          <div className="w-[150px] text-default-900">
            <SelectHarga {...{ setPesananSupplier, item }} />
          </div>
        );
      case "harga":
        return (
          <div className="w-[100px] text-default-900">
            {formatRupiah(item.subharga)}
          </div>
        );
      case "jumlah":
        return (
          <div className="w-[100px] text-default-900">
            {formatRupiah(item.jumlah)}
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
                  setPesananSupplier((prev) => {
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

  const columnsPenawaran = [
    {
      name: "ID Penawaran",
      uid: "id_penawaran",
    },
    {
      name: "Supplier",
      uid: "supplier",
    },
    {
      name: "Tanggal",
      uid: "created_at",
    },
  ];

  function renderCellPenawaran(item: PenawaranType, columnKey: React.Key) {
    const cellValue = item[columnKey as keyof PenawaranType];

    switch (columnKey) {
      case "id_penawaran":
        return <div className="text-default-900">{item.id_penawaran}</div>;
      case "supplier":
        return (
          <div className="w-max text-default-900">{item.nama_supplier}</div>
        );
      case "created_at":
        return (
          <div className="w-max text-default-900">
            {formatDateWithoutTime(item.created_at)}
          </div>
        );
      default:
        return cellValue;
    }
  }

  async function createPreorder() {
    const defaultInput = input as any;

    try {
      if (sumber == "non_supplier") {
        if (Object.keys(defaultInput).length < 5 && pesanan.length < 1) {
          return alert("silahkan isi dengan data lengkap");
        }

        await fetcher({
          url: "/preorder",
          method: "POST",
          data: {
            supplier_id: null,
            nama_supplier: defaultInput.nama,
            email_supplier: defaultInput.email,
            no_telp: defaultInput.no_telp,
            alamat: defaultInput.alamat,
            keterangan: defaultInput.keterangan,
            tipe: "non_supplier",
            total: pesanan.reduce((a, b) => a + b.jumlah, 0),
            produk: pesanan,
          },
        });
      } else {
        if (!supplier && pesananSupplier.length < 1) {
          return alert("silahkan isi dengan data lengkap");
        }

        await fetcher({
          url: "/preorder",
          method: "POST",
          data: {
            supplier_id: supplier,
            tipe: "supplier",
            total: pesananSupplier.reduce((a, b) => a + b.jumlah, 0),
            produk: pesananSupplier,
          },
        });
      }

      alert("buat preorder berhasil");
      return router.push("/owner/preorders/out");
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
    <Layout title="Buat Pre Order">
      <Container className="gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <ButtonBack onClick={() => router.push("/owner/preorders/out")}>
            Kembali
          </ButtonBack>
        </div>

        <RadioGroup
          label="Pilih Sumber"
          orientation="horizontal"
          isRequired
          defaultValue={sumber}
          onValueChange={(e) => {
            setSumber(e);
            if (e == "supplier") {
              setInput({});
              setKategori("");
              setProduk([]);
              setPesanan([]);
            } else {
              setPembuatan("buat_baru");
              setSupplier("");
              setPricelist([]);
              setIdPenawaran("");
              setPesananSupplier([]);
            }
          }}
        >
          <Radio value="non_supplier">Non Supplier</Radio>
          <Radio value="supplier">Supplier</Radio>
        </RadioGroup>

        {sumber == "non_supplier" ? (
          <>
            <div className="grid grid-cols-3 gap-2">
              <Input
                isRequired
                variant="flat"
                color="default"
                label="Nama"
                labelPlacement="outside"
                name="nama"
                placeholder="Ex: Toko Besi"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
              />

              <Input
                isRequired
                variant="flat"
                color="default"
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Ex: tokobesi@mail.com"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
              />

              <Input
                isRequired
                variant="flat"
                color="default"
                label="No Telpon"
                labelPlacement="outside"
                name="no_telp"
                placeholder="Ex: 081122334455"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Textarea
                isRequired
                variant="flat"
                maxRows={3}
                label="Alamat"
                labelPlacement="outside"
                name="alamat"
                placeholder="Ex: Jln Melati"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <Textarea
                isRequired
                variant="flat"
                maxRows={3}
                label="Keterangan"
                labelPlacement="outside"
                name="keterangan"
                placeholder="Ex: Toko Besi"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </div>

            <h4 className="border-l-4 border-primary pl-4 text-[18px] font-semibold text-default-900">
              Pilih Produk
            </h4>

            <Select
              defaultSelectedKeys={kategori}
              isRequired
              label="Pilih Kategori"
              className="w-full"
              size="sm"
              onChange={(e) => {
                if (!e.target.value) {
                  setKategori("");
                  return alert("tidak boleh kosong");
                }
                setKategori(e.target.value);
              }}
            >
              {props.kategori.map((item) => {
                return (
                  <SelectItem key={item.id_kategori}>{item.nama}</SelectItem>
                );
              })}
            </Select>

            <ProductFinalTable
              {...{ produk, role: "owner", isLoading: loading, setPesanan }}
            />
          </>
        ) : (
          <>
            <RadioGroup
              label="Tipe Pembuatan"
              orientation="horizontal"
              isRequired
              defaultValue={pembuatan}
              onValueChange={(e) => {
                setPembuatan(e);
                setPesananSupplier([]);
                if (e == "buat_dari_penawaran") {
                  setSupplier("");
                  setPricelist([]);
                } else {
                  setIdPenawaran("");
                }
              }}
            >
              <Radio value="buat_baru">Buat Baru</Radio>
              <Radio value="buat_dari_penawaran">Buat Dari Penawaran</Radio>
            </RadioGroup>

            {pembuatan == "buat_baru" ? (
              <>
                <Select
                  isRequired
                  label="Pilih Supplier"
                  className="w-full"
                  size="sm"
                  selectedKeys={[supplier]}
                  onChange={(e) => setSupplier(e.target.value)}
                >
                  {props.supplier.map((item) => {
                    return (
                      <SelectItem key={item.id_supplier}>
                        {item.nama}
                      </SelectItem>
                    );
                  })}
                </Select>

                <Table
                  isHeaderSticky
                  aria-label="pricelist table"
                  color="primary"
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
                    items={pricelist}
                    emptyContent="Produk kosong!"
                    isLoading={loadingPricelist}
                  >
                    {(item) => (
                      <TableRow key={item.nama_produk}>
                        {(columnKey) => (
                          <TableCell>
                            {renderCellPricelist(item, columnKey)}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </>
            ) : (
              <>
                <Table
                  isHeaderSticky
                  aria-label="penawaran table"
                  color="primary"
                  selectionMode="single"
                  classNames={customStyleTable}
                  className="scrollbar-hide"
                  onSelectionChange={(e) => {
                    setPesananSupplier([]);
                    const set = new Set(e);
                    setIdPenawaran(set.values().next().value);
                  }}
                >
                  <TableHeader columns={columnsPenawaran}>
                    {(column) => (
                      <TableColumn key={column.uid}>{column.name}</TableColumn>
                    )}
                  </TableHeader>

                  <TableBody items={penawaran} emptyContent="Penawaran kosong!">
                    {(item) => (
                      <TableRow key={item.id_penawaran}>
                        {(columnKey) => (
                          <TableCell>
                            {renderCellPenawaran(item, columnKey)}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </>
            )}
          </>
        )}

        <Divider className="my-4" />

        <h4 className="border-l-4 border-primary pl-4 text-[18px] font-semibold text-default-900">
          Daftar Pesanan
        </h4>

        {sumber == "non_supplier" ? (
          <Table
            isHeaderSticky
            aria-label="pesanan table"
            color="primary"
            selectionMode="none"
            classNames={customStyleTable}
            className="scrollbar-hide"
            bottomContent={
              <div className="flex justify-end">
                <div className="grid w-[200px] grid-cols-[60px_6px_1fr] gap-1 text-[14px] text-black">
                  <div className="font-medium">Subtotal</div>
                  <div className="font-medium">:</div>
                  <p className="font-medium">
                    {formatRupiah(pesanan.reduce((a, b) => a + b.jumlah, 0))}
                  </p>
                </div>
              </div>
            }
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
        ) : (
          <Table
            isHeaderSticky
            aria-label="pesanan table"
            color="primary"
            selectionMode="none"
            classNames={customStyleTable}
            className="scrollbar-hide"
            bottomContent={
              <div className="flex justify-end">
                <div className="grid w-[200px] grid-cols-[60px_6px_1fr] gap-1 text-[14px] text-black">
                  <div className="font-medium">Subtotal</div>
                  <div className="font-medium">:</div>
                  <p className="font-medium">
                    {formatRupiah(
                      pesananSupplier.reduce((a, b) => a + b.jumlah, 0),
                    )}
                  </p>
                </div>
              </div>
            }
          >
            <TableHeader columns={columnsPesananSupplier}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={pesananSupplier} emptyContent="Pesanan kosong!">
              {(item) => (
                <TableRow key={item.nama_produk}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCellPesananSupplier(item, columnKey, pembuatan)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}

        <Button
          variant="solid"
          color="primary"
          size="md"
          className="w-max justify-self-end font-medium"
          onClick={createPreorder}
        >
          Buat Pre Order
        </Button>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async () => {
  const kategoriFetcher = fetcher({
    url: "/kategori",
    method: "GET",
  });

  const supplierFetcher = fetcher({
    url: "/supplier",
    method: "GET",
  });

  const [kategori, supplier]: [
    GlobalResponse<ProdukKategoriType[]>,
    GlobalResponse<SupplierType[]>,
  ] = await Promise.all([kategoriFetcher, supplierFetcher]);

  return {
    props: {
      kategori: kategori.data,
      supplier: supplier.data,
    },
  };
}) satisfies GetServerSideProps<{
  kategori: ProdukKategoriType[];
  supplier: SupplierType[];
}>;
