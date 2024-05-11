import CustomTooltip from "@/components/tooltip";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button } from "@nextui-org/react";

type CardSellingProductProps = {
  kode_item?: string;
  nama_produk: string;
  harga: number;
  gudang: string;
  rak: string;
  stok: number;
};

export default function CardSellingProduct({
  nama_produk,
  harga,
  gudang,
  rak,
  stok,
}: CardSellingProductProps) {
  return (
    <div className="grid gap-[20px] rounded-xl border border-default-300 p-4 transition hover:border-rose-500">
      <div className="grid gap-1">
        <CustomTooltip content={nama_produk}>
          <h1 className="line-clamp-2 text-lg font-bold text-default-900">
            {nama_produk}
          </h1>
        </CustomTooltip>
        <h1 className="font-semibold text-rose-500">{formatRupiah(harga)}</h1>
      </div>

      <div className="grid grid-cols-[1fr_100px] items-end gap-2">
        <div className="flex items-center gap-6">
          <div className="grid">
            <p className="text-[12px] font-medium text-default-600">Stok:</p>
            <h4 className="font-semibold text-default-900">{stok}</h4>
          </div>

          <div className="grid">
            <p className="text-[12px] font-medium text-default-600">Lokasi:</p>
            <h4 className="line-clamp-1 font-semibold capitalize text-default-900">
              {gudang}, {rak}
            </h4>
          </div>
        </div>

        <Button
          variant="flat"
          color="danger"
          size="sm"
          className="w-max font-medium"
        >
          Tambahkan
        </Button>
      </div>
    </div>
  );
}
