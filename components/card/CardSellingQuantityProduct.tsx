import { ListProdukType } from "@/types/selling.type";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button, Input } from "@nextui-org/react";
import { Minus, Plus, Trash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import CustomTooltip from "../tooltip";

type CardSellingQuantityProductProps = {
  kode_item: string;
  nama_produk: string;
  harga: number;
  stok: number;
  qty: number;
  subtotal: number;
  satuan_kecil: string;
  setListProduk: React.Dispatch<React.SetStateAction<ListProdukType[]>>;
};

export default function CardSellingQuantityProduct({
  kode_item,
  nama_produk,
  harga,
  subtotal,
  qty,
  setListProduk,
  stok,
}: CardSellingQuantityProductProps) {
  const [quantity, setQuantity] = useState(qty);
  const [kodeItem, setKodeItem] = useState("");

  useEffect(() => {
    setListProduk((prev) => {
      if (prev.length != 0) {
        const index = prev.findIndex((produk) => produk.kode_item == kodeItem);

        if (index != -1) {
          prev[index] = {
            ...prev[index],
            qty: quantity > prev[index].stok ? prev[index].stok : quantity,
            subtotal:
              quantity > prev[index].stok
                ? prev[index].subtotal
                : prev[index].harga * quantity,
          };

          return [...prev];
        }
      }
      return [...prev];
    });
  }, [quantity, setListProduk, kodeItem]);

  function handleMinus(kode_item: string) {
    setKodeItem(kode_item);
    setQuantity((prev) => (prev - 1 < 1 ? 0 : prev - 1));
  }

  function handlePlus(kode_item: string) {
    setKodeItem(kode_item);
    setQuantity((prev) => prev + 1);
  }

  return (
    <div className="grid grid-cols-[1fr_repeat(3,140px)_42px] items-center gap-10 border-b border-gray-300 p-4">
      <div className="grid font-semibold text-default-600">
        <h4 className="line-clamp-2 font-semibold text-default-900">
          {nama_produk}
        </h4>
        <p className="font-medium text-rose-500">{formatRupiah(harga)}</p>
      </div>

      <div className="flex items-center gap-2 text-sm font-semibold text-default-600">
        <Button
          isIconOnly
          color="danger"
          variant="flat"
          size="sm"
          onClick={() => handleMinus(kode_item)}
          disabled={qty < 1}
        >
          <Minus weight="bold" size={16} />
        </Button>
        <Input
          value={qty ? `${qty}` : ""}
          type="number"
          variant="flat"
          size="sm"
          min={0}
          labelPlacement="outside"
          onChange={(e) => {
            if (e.target.value == "") {
              setKodeItem(kode_item);
              setQuantity(0);
            } else {
              if (parseInt(e.target.value) > stok) {
                setKodeItem(kode_item);
                setQuantity(stok);
              } else {
                setKodeItem(kode_item);
                setQuantity(parseInt(e.target.value));
              }
            }
          }}
        />
        <Button
          isIconOnly
          color="danger"
          variant="flat"
          size="sm"
          onClick={() => handlePlus(kode_item)}
          disabled={qty >= stok}
        >
          <Plus weight="bold" size={16} />
        </Button>
      </div>

      <div className="font-medium text-default-900">{formatRupiah(harga)}</div>

      <div className="font-medium text-default-900">
        {formatRupiah(subtotal)}
      </div>

      <CustomTooltip content="Hapus">
        <Button
          isIconOnly
          variant="flat"
          color="danger"
          size="sm"
          onClick={() => {
            setListProduk((prev) => {
              return prev.filter((produk) => produk.kode_item != kode_item);
            });
          }}
        >
          <Trash weight="bold" size={20} />
        </Button>
      </CustomTooltip>
    </div>
  );
}
