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
import { Pencil, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { KeyedMutator } from "swr";

import CustomTooltip from "@/components/tooltip";
import usePagination from "@/hooks/usepagination";
import { PricelistType } from "@/types/suppliers.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";

export default function SuppliersSubPricelistsTable({
  pricelist,
  id_supplier,
  mutate,
  role,
  nama,
}: {
  pricelist: PricelistType[] | undefined;
  id_supplier?: string;
  mutate: KeyedMutator<any>;
  role: string;
  nama: string;
}) {
  const { page, pages, data, setPage } = usePagination(
    pricelist ? pricelist : [],
    10,
  );

  const router = useRouter();

  const columnsSuppliersPricelists = [
    { name: "Kode Item", uid: "kode_item" },
    { name: "Nama Produk", uid: "nama_produk" },
    { name: "Harga", uid: "harga" },
    { name: "Harga Grosir", uid: "harga_grosir" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellSuppliersPricelists(
    produk: PricelistType,
    columnKey: React.Key,
  ) {
    const cellValue = produk[columnKey as keyof PricelistType];

    switch (columnKey) {
      case "kode_item":
        return <div className="w-max text-default-900">{produk.kode_item}</div>;
      case "nama_produk":
        return (
          <div className="w-max text-default-900">{produk.nama_produk}</div>
        );
      case "harga":
        return (
          <div className="w-max text-default-900">
            {formatRupiah(produk.harga)}
          </div>
        );
      case "harga_grosir":
        return (
          <div className="w-max text-default-900">
            {formatRupiah(produk.harga_grosir)}
          </div>
        );
      case "action":
        return (
          <div className="flex max-w-[110px] items-center gap-1">
            <CustomTooltip content="Edit">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() =>
                  router.push(
                    `/${role}/purchases/pricelists/edit?id_supplier=${id_supplier}&nama=${nama}&nama_produk=${produk.nama_produk}&kode_item=${produk.kode_item}&harga=${produk.harga}&harga_grosir=${produk.harga_grosir}`,
                  )
                }
              >
                <Pencil weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>

            <CustomTooltip content="Hapus">
              <Button
                isIconOnly
                variant="light"
                color="danger"
                size="sm"
                onClick={() => {
                  deletePricelist(produk.kode_item);
                }}
              >
                <Trash weight="bold" size={20} />
              </Button>
            </CustomTooltip>
          </div>
        );

      default:
        return cellValue;
    }
  }

  async function deletePricelist(produk_id: string) {
    if (!confirm("apakah anda yakin?")) return;
    try {
      await fetcher({
        url: `/supplier/pricelist/${id_supplier}/${encodeURIComponent(produk_id)}`,
        method: "DELETE",
      });

      alert("produk berhasil dihapus");
      mutate();
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
    <>
      <Table
        isHeaderSticky
        aria-label="suppliers table"
        color="primary"
        selectionMode="none"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader columns={columnsSuppliersPricelists}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>

        <TableBody items={data} emptyContent="Produk tidak ditemukan!">
          {(pricelist) => (
            <TableRow key={pricelist.kode_item}>
              {(columnKey) => (
                <TableCell>
                  {renderCellSuppliersPricelists(pricelist, columnKey)}
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
        classNames={{
          cursor: role == "owner" ? "bg-primary" : "bg-teal-500",
        }}
      />
    </>
  );
}
