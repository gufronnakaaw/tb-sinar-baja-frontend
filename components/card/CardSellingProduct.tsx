import { Button } from "@nextui-org/react";
import { ArrowRight } from "@phosphor-icons/react";

// components
import CustomTooltip from "@/components/tooltip";

// utils
import { ProdukType } from "@/types/products.type";
import { ListProdukType } from "@/types/selling.type";
import { formatRupiah } from "@/utils/formatRupiah";

type CardSellingProductProps = ProdukType & {
  setListProduk: React.Dispatch<React.SetStateAction<ListProdukType[]>>;
  field: string | undefined;
};

export default function CardSellingProduct(props: CardSellingProductProps) {
  return (
    <div className="grid gap-[20px] rounded-xl border border-default-300 p-4 transition hover:border-rose-500">
      <div className="grid gap-[2px]">
        <CustomTooltip content={props.nama_produk_asli}>
          <h1 className="line-clamp-1 font-bold text-default-900">
            {props.nama_produk_asli}
          </h1>
        </CustomTooltip>
        <h6 className="text-sm font-semibold text-rose-500">
          {props.kode_item}
        </h6>
      </div>

      <div className="flex items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="grid">
            <p className="text-[12px] font-medium text-default-600">Harga:</p>
            <h4 className="font-bold text-rose-500">
              {formatRupiah(props[props.field as keyof ProdukType])}
            </h4>
          </div>

          <div className="grid">
            <p className="text-[12px] font-medium text-default-600">Stok:</p>
            <h4 className="text-sm font-semibold text-default-900">
              {props.stok} {props.satuan_kecil}
            </h4>
          </div>

          <div className="grid">
            <p className="text-[12px] font-medium text-default-600">Lokasi:</p>
            <h4 className="line-clamp-1 text-sm font-semibold capitalize text-default-900">
              {props.gudang} - {props.rak}
            </h4>
          </div>
        </div>

        {props[props.field as keyof ProdukType] ? (
          <CustomTooltip content="Tambahkan">
            <Button
              isIconOnly
              variant="flat"
              color="danger"
              size="sm"
              onClick={() => {
                props.setListProduk((prev) => {
                  if (
                    prev.find((produk) => produk.kode_item == props.kode_item)
                  ) {
                    return [...prev];
                  }

                  return [
                    ...prev,
                    {
                      nama_produk: !props.nama_produk_asli
                        ? "-"
                        : props.nama_produk_asli,
                      kode_item: props.kode_item,
                      stok: !props.stok ? 0 : props.stok,
                      qty: 1,
                      satuan_kecil: !props.satuan_kecil
                        ? "-"
                        : props.satuan_kecil,
                      harga: props[props.field as keyof ProdukType],
                      gudang: !props.gudang ? "-" : props.gudang,
                      rak: !props.rak ? "-" : props.rak,
                      subtotal: props[props.field as keyof ProdukType] * 1,
                    },
                  ];
                });
              }}
            >
              <ArrowRight weight="bold" size={20} />
            </Button>
          </CustomTooltip>
        ) : null}
      </div>
    </div>
  );
}
