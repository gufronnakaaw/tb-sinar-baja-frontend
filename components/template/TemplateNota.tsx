import { ListProduk, TransaksiType } from "@/types/transactions.type";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { angkaTerbilang } from "@/utils/terbilang";
import { forwardRef } from "react";

const Nota = (props: TransaksiType, ref: any) => {
  function checkDiskon(item: ListProduk) {
    if (!item.diskon_langsung_item && !item.diskon_persen_item) {
      return 0;
    }

    if (item.diskon_langsung_item) {
      return formatRupiah(item.diskon_langsung_item);
    }

    if (item.diskon_persen_item) {
      return `${item.diskon_persen_item}%`;
    }
  }

  return (
    <>
      <div className="container grid gap-1 pt-4 font-inter" ref={ref}>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-1">
            <h1 className="font-bold text-black">TB. SINAR BAJA</h1>
            <p className="max-w-[300px] text-[10px] font-medium text-black">
              Jl. Letjend Sutoyo No.67, Burengan, Kec. Pesantren, Kabupaten
              Kediri, Jawa Timur 64131
            </p>
            <p className="max-w-[300px] text-[10px] font-medium text-black">
              082140735711
            </p>
          </div>

          <h1 className="text-center font-bold uppercase text-black">
            {props.pajak ? "FAKTUR" : "NOTA"}
          </h1>
        </div>

        <div className="grid w-full grid-cols-2 items-start gap-8">
          <div className="grid">
            <div className="grid grid-cols-[30px_6px_1fr] gap-1 text-[10px] text-black">
              <div className="font-medium">No</div>
              <div className="font-medium">:</div>
              <p className="font-medium">{props.id_transaksi}</p>
            </div>

            <div className="grid grid-cols-[30px_6px_1fr] gap-1 text-[10px] text-black">
              <div className="font-medium">Tgl</div>
              <div className="font-medium">:</div>
              <p className="font-medium">{formatDate(props.created_at)}</p>
            </div>

            <div className="grid w-[250px] grid-cols-[30px_6px_1fr] gap-1 text-[10px] text-black">
              <div className="font-medium">Ket</div>
              <div className="font-medium">:</div>
              <p className="break-all font-medium">{props.keterangan}</p>
            </div>
          </div>

          <div className="grid">
            <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-black">
              <div className="font-medium">Penerima</div>
              <div className="font-medium">:</div>
              <p className="font-medium">{props.penerima}</p>
            </div>

            <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-black">
              <div className="font-medium">No. Telp</div>
              <div className="font-medium">:</div>
              <p className="font-medium">{props.no_telp}</p>
            </div>

            <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-black">
              <div className="font-medium">Pengiriman</div>
              <div className="font-medium">:</div>
              <p className="font-medium">{props.pengiriman}</p>
            </div>

            <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-black">
              <div className="font-medium">Alamat</div>
              <div className="font-medium">:</div>
              <p className="break-all font-medium">{props.alamat}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <table className="table-auto border border-black">
            <thead>
              <tr className="divide-x-1 divide-black border-b border-black text-left text-[10px] font-medium text-black">
                <th className="px-2 py-1">Jumlah</th>
                <th className="px-2 py-1">Kode Item</th>
                <th className="px-2 py-1">Nama Produk</th>
                <th className="px-2 py-1">Harga</th>
                <th className="px-2 py-1">Potongan</th>
                <th className="px-2 py-1">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {props.list_produk?.map((transaction) => (
                <tr
                  key={transaction.kode_item}
                  className="text-left text-[10px] text-black"
                >
                  <td className="w-[100px] px-2 py-1">
                    {transaction.jumlah} {transaction.satuan}
                  </td>
                  <td className="w-max px-2 py-1">{transaction.kode_item}</td>
                  <td className="w-max px-2 py-1">{transaction.nama_produk}</td>
                  <td className="px-2 py-1">
                    {formatRupiah(transaction.harga)}
                  </td>
                  <td className="px-2 py-1">{checkDiskon(transaction)}</td>
                  <td className="px-2 py-1">
                    {formatRupiah(transaction.sub_total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between">
            <div className="grid">
              <div className="grid grid-cols-[45px_2px_1fr] gap-1 text-[10px] text-black">
                <div className="w-24 font-bold italic">Terbilang</div>
                <div className="font-bold italic">:</div>
                <p className="font-bold capitalize italic">
                  {angkaTerbilang(props.total_pembayaran)}
                </p>
              </div>
              <div className="grid grid-cols-[45px_2px_1fr] gap-1 text-[10px] text-black">
                <div className="w-24 font-bold italic">Status</div>
                <div className="font-bold italic">:</div>
                <p className="font-bold capitalize italic">
                  {props.metode == "tempo" ? "Preorder" : props.metode},{" "}
                  {props.status == "piutang" ? "Belum Lunas" : props.status}
                </p>
              </div>
            </div>

            <div className="grid justify-self-end border border-black p-2">
              <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="w-24 font-medium">Ongkir</div>
                <div className="font-medium">:</div>
                <p className="font-medium">{formatRupiah(props.ongkir)}</p>
              </div>

              <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="w-24 font-medium">Subtotal</div>
                <div className="font-medium">:</div>
                <p className="font-medium">
                  {formatRupiah(props.total_belanja)}
                </p>
              </div>

              {props.pajak ? (
                <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-black">
                  <div className="w-24 font-medium">
                    Pajak ({props.persen_pajak}%)
                  </div>
                  <div className="font-medium">:</div>
                  <p className="font-medium">{formatRupiah(props.pajak)}</p>
                </div>
              ) : null}

              {props.diskon || props.persen_diskon ? (
                <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-black">
                  <div className="w-24 font-medium">
                    Diskon{" "}
                    {props.persen_diskon ? `(${props.persen_diskon}%)` : null}
                  </div>
                  <div className="font-medium">:</div>
                  <p className="font-medium">
                    {formatRupiah(props.diskon ? props.diskon : 0)}
                  </p>
                </div>
              ) : null}

              <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="w-24 font-medium">Total</div>
                <div className="font-medium">:</div>
                <p className="font-medium">
                  {formatRupiah(props.total_pembayaran)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const TemplateNota = forwardRef(Nota);
