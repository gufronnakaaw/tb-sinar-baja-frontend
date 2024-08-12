import { ReturnDetail, ReturnDetailPage } from "@/types/return.type";
import { formatDateWithoutTime } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { angkaTerbilang } from "@/utils/terbilang";
import { forwardRef } from "react";

const NotaReturnDetail = (props: ReturnDetailPage, ref: any) => {
  function checkDiskonItem(item: ReturnDetail) {
    if (item.diskon_langsung_item) {
      return item.diskon_langsung_item;
    }

    if (item.diskon_persen_item) {
      return item.diskon_persen_item;
    }

    return 0;
  }

  return (
    <>
      <div className="container grid gap-1 pt-4 font-inter" ref={ref}>
        <div className="grid grid-cols-2 gap-4">
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

          <div className="grid justify-end">
            <div className="flex flex-col">
              <h1 className="font-bold uppercase text-black">Nota Retur</h1>
              <div className="grid h-3">
                <div className="grid">
                  <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                    <div className="font-medium">Nomor</div>
                    <div className="font-medium">:</div>
                    <p className="font-medium">{props.id_return}</p>
                  </div>

                  <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                    <div className="font-medium">ID Transaksi</div>
                    <div className="font-medium">:</div>
                    <p className="font-medium">
                      {props.transaksi.id_transaksi}
                    </p>
                  </div>

                  <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                    <div className="font-medium">Pembeli</div>
                    <div className="font-medium">:</div>
                    <p className="font-medium">{props.transaksi.penerima}</p>
                  </div>

                  <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                    <div className="font-medium">Tanggal</div>
                    <div className="font-medium">:</div>
                    <p className="font-medium">
                      {formatDateWithoutTime(props.created_at)}
                    </p>
                  </div>

                  <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                    <div className="font-medium">No. Telpon</div>
                    <div className="font-medium">:</div>
                    <p className="font-medium">
                      {props.transaksi.no_telp ?? "-"}
                    </p>
                  </div>

                  <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                    <div className="font-medium">Metode</div>
                    <div className="font-medium">:</div>
                    <p className="font-medium capitalize">{props.metode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4">
          <table className="table-auto border border-black">
            <thead>
              <tr className="border-b border-black text-left text-[10px] font-medium text-black">
                <th className="px-2 py-1">Jumlah</th>
                <th className="px-2 py-1">Kode Item</th>
                <th className="px-2 py-1">Nama Produk</th>
                <th className="px-2 py-1">Harga Asli</th>
                <th className="px-2 py-1">Pot</th>
                <th className="px-2 py-1">Diskon Per Item</th>
                <th className="px-2 py-1">Harga Setelah Diskon</th>
                <th className="px-2 py-1">Pinalti Per Item</th>
                <th className="px-2 py-1">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {props.returndetail.map((item) => (
                <tr
                  key={item.kode_item}
                  className="text-left text-[10px] text-black"
                >
                  <td className="w-[100px] px-2 py-1">
                    {item.jumlah} {item.satuan}
                  </td>
                  <td className="w-[100px] px-2 py-1">{item.kode_item}</td>
                  <td className="w-max px-2 py-1">{item.nama_produk}</td>
                  <td className="px-2 py-1">{formatRupiah(item.harga)}</td>
                  <td className="px-2 py-1">
                    {formatRupiah(checkDiskonItem(item))}
                  </td>
                  <td className="px-2 py-1">
                    {formatRupiah(item.diskon_per_item)}
                  </td>
                  <td className="px-2 py-1">
                    {formatRupiah(item.harga_setelah_diskon)}
                  </td>
                  <td className="px-2 py-1">
                    {formatRupiah(item.penalti_item)}
                  </td>
                  <td className="px-2 py-1">
                    {formatRupiah(item.total_pengembalian)}
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
                  {angkaTerbilang(props.jumlah)}
                </p>
              </div>
            </div>

            <div className="grid justify-self-end border border-black p-2">
              <div className="grid grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="w-24 font-medium">Subtotal</div>
                <div className="font-medium">:</div>
                <p className="font-medium">
                  {formatRupiah(
                    props.returndetail.reduce(
                      (a, b) => a + b.harga_setelah_diskon * b.jumlah,
                      0,
                    ),
                  )}
                </p>
              </div>
              <div className="grid grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="w-24 font-medium">Penalti Keseluruhan</div>
                <div className="font-medium">:</div>
                <p className="font-medium">
                  {formatRupiah(
                    props.penalti_keseluruhan
                      ? props.penalti_keseluruhan
                      : props.returndetail.reduce(
                          (a, b) => a + b.penalti_item,
                          0,
                        ),
                  )}
                </p>
              </div>
              <div className="grid grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="w-24 font-medium">Total</div>
                <div className="font-medium">:</div>
                <p className="font-medium">{formatRupiah(props.jumlah)}</p>
              </div>
            </div>
          </div>

          <div className="mr-5 mt-2 grid justify-self-end">
            <h1 className="text-[10px] font-normal text-black">
              Kediri, {formatDateWithoutTime(props.created_at)}
            </h1>
            <h1 className="mt-1 text-center text-[10px] font-bold text-black">
              TB. SINAR BAJA
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export const TemplateNotaReturnDetail = forwardRef(NotaReturnDetail);
