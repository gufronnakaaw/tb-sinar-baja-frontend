import { Button } from "@nextui-org/react";
import { ArrowRight } from "@phosphor-icons/react";

// components
import CustomTooltip from "@/components/tooltip";

// utils
import { ListProdukAdmin } from "@/pages/admin/selling";
import { ProdukSearchType } from "@/types/products.type";
import { formatRupiah } from "@/utils/formatRupiah";

export default function CardSellingAdmin({
  setListProdukAdmin,
  item,
  field,
  level,
}: {
  item: ProdukSearchType;
  field?: string;
  level?: string;
  setListProdukAdmin: React.Dispatch<React.SetStateAction<ListProdukAdmin[]>>;
}) {
  const produk = {
    kode_item: item.kode_item,
    nama_produk: !item.nama_produk_asli ? "-" : item.nama_produk_asli,
    stok: !item.stok ? 0 : item.stok,
    qty: 1,
    satuan_kecil: !item.satuan_kecil ? "-" : item.satuan_kecil,
    harga: item[field as keyof ProdukSearchType],
    gudang: !item.gudang ? "-" : item.gudang,
    rak: !item.rak ? "-" : item.rak,
    diskon_langsung_item: 0,
    diskon_persen_item: 0,
    total_harga: item[field as keyof ProdukSearchType],
    subtotal: item[field as keyof ProdukSearchType] * 1,
    hargaquantity: item.hargaquantity,
    harga_selected: item[field as keyof ProdukSearchType],
  };

  function handleAddProduk() {
    setListProdukAdmin((prev) => {
      if (prev.find((produk) => produk.kode_item == item.kode_item)) {
        return [...prev];
      }

      return [...prev, produk];
    });
  }
  return (
    <div className="grid grid-cols-[1fr_50px] items-center rounded-xl border border-default-300  p-4 transition hover:border-teal-500">
      <div className="grid w-3/4 gap-[2px]">
        {/* <CustomTooltip content={item.nama_produk_asli}>
          <h1 className="line-clamp-1 font-bold text-default-900">
            {item.nama_produk_asli}
          </h1>
        </CustomTooltip> */}
        <h1 className="font-bold text-default-900">{item.nama_produk_asli}</h1>
        <div className="grid grid-cols-[45px_6px_1fr] gap-1 text-sm text-black">
          <div className="font-medium">Harga</div>
          <div className="font-medium">:</div>
          <p className="font-bold text-teal-500">
            {formatRupiah(item[field as keyof ProdukSearchType])}
          </p>
        </div>
        <div className="grid grid-cols-[45px_6px_1fr] gap-1 text-sm text-black">
          <div className="font-medium">Stok</div>
          <div className="font-medium">:</div>
          <p className="font-bold text-teal-500">
            {item.stok} {item.satuan_kecil}
          </p>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4">
        {item[field as keyof ProdukSearchType] ? (
          <CustomTooltip content="Tambahkan">
            <Button
              isIconOnly
              variant="flat"
              className="bg-teal-200 text-teal-500"
              size="sm"
              onClick={handleAddProduk}
            >
              <ArrowRight weight="bold" size={20} />
            </Button>
          </CustomTooltip>
        ) : null}
      </div>
    </div>
  );
}
