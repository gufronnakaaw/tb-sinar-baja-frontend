import { Button } from "@nextui-org/react";
import { Plus } from "@phosphor-icons/react";

// components
import CustomTooltip from "@/components/tooltip";

// utils
import { formatRupiah } from "@/utils/formatRupiah";

type CardSellingProductProps = {
  kode_item?: string;
  nama_produk: string;
  harga: number;
  gudang: string;
  rak: string;
  stok: number;
};

export default function CardSellingProduct({
  kode_item,
  nama_produk,
  harga,
  gudang,
  rak,
  stok,
}: CardSellingProductProps) {
  return (
    <div className="grid gap-[20px] rounded-xl border border-default-300 p-4 transition hover:border-rose-500">
      <div className="grid gap-[2px]">
        <CustomTooltip content={nama_produk}>
          <h1 className="line-clamp-1 font-bold text-default-900">
            {nama_produk}
          </h1>
        </CustomTooltip>
        <h6 className="text-sm font-semibold text-rose-500">{kode_item}</h6>
      </div>

      <div className="flex items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="grid">
            <p className="text-[12px] font-medium text-default-600">Harga:</p>
            <h4 className="font-bold text-rose-500">{formatRupiah(harga)}</h4>
          </div>

          <div className="grid">
            <p className="text-[12px] font-medium text-default-600">Stok:</p>
            <h4 className="text-sm font-semibold text-default-900">{stok}</h4>
          </div>

          <div className="grid">
            <p className="text-[12px] font-medium text-default-600">Lokasi:</p>
            <h4 className="line-clamp-1 text-sm font-semibold capitalize text-default-900">
              {gudang}, {rak}
            </h4>
          </div>
        </div>

        <CustomTooltip content="Tambahkan">
          <Button isIconOnly variant="flat" color="danger" size="sm">
            <Plus weight="bold" size={20} />
          </Button>
        </CustomTooltip>
      </div>
    </div>
  );
}
