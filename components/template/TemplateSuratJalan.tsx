import { forwardRef } from "react";

import { DocumentResponse } from "@/pages/owner/warehouses/documents/[id]";
import { formatDate } from "@/utils/formatDate";

const SuratJalan = (props: DocumentResponse, ref: any) => {
  const warehouses = Array.from(
    new Set(props.transaksi.transaksidetail.map((item) => item.gudang)),
  );

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
            <div className="mt-2">
              <h5 className="text-[10px] font-medium text-black">Kepada</h5>
              <h5 className="text-[10px] font-medium text-black">
                Yth. {props.transaksi.penerima}
              </h5>
              <h5 className="text-[10px] font-medium text-black">
                {props.transaksi.alamat}
              </h5>
            </div>
          </div>

          <div>
            <h1 className="text-center font-bold uppercase text-black">
              Surat Jalan
            </h1>
          </div>

          <div className="grid grid-cols-3">
            <div className="grid h-3">
              <div className="grid">
                <div className="grid w-[250px] grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-black">
                  <div className="font-medium">ID Transaksi</div>
                  <div className="font-medium">:</div>
                  <p className="font-medium">{props.transaksi.id_transaksi}</p>
                </div>

                <div className="grid w-[250px] grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-black">
                  <div className="font-medium">No. Surat Jalan</div>
                  <div className="font-medium">:</div>
                  <p className="font-medium">{props.id_suratjalan}</p>
                </div>

                <div className="grid w-[250px] grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-black">
                  <div className="font-medium">Tanggal</div>
                  <div className="font-medium">:</div>
                  <p className="font-medium">
                    {formatDate(props.transaksi.created_at)}
                  </p>
                </div>

                <div className="grid w-[250px] grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-black">
                  <div className="font-medium">No. Telpon</div>
                  <div className="font-medium">:</div>
                  <p className="font-medium">
                    {!props.transaksi.no_telp ? "-" : props.transaksi.no_telp}
                  </p>
                </div>
                <div className="grid w-[250px] grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-black">
                  <div className="font-medium">Nama Driver</div>
                  <div className="font-medium">:</div>
                  <p className="font-medium">
                    {!props.nama_driver ? "-" : props.nama_driver}
                  </p>
                </div>

                <div className="grid w-[250px] grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-black">
                  <div className="font-medium">Keterangan</div>
                  <div className="font-medium">:</div>
                  <p className="font-medium">{props.transaksi.keterangan}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-1">
          <div className="grid grid-cols-[1fr_100px] gap-4">
            <div className="grid gap-1 text-[10px]">
              <p className="font-medium text-black">
                Kami kirimkan barang-barang dibawah ini dengan kendaraan{" "}
                {props.kendaraan}, bernomor {props.plat_kendaraan}
              </p>
            </div>
          </div>

          <table className="table-auto border border-black">
            <thead>
              <tr className="border-b border-black text-left text-[10px] font-medium text-black">
                <th className="px-2 py-1">Jumlah</th>
                <th className="px-2 py-1">Nama Barang</th>
                <th className="px-2 py-1">Lokasi</th>
              </tr>
            </thead>

            <tbody>
              {props.transaksi.transaksidetail.map((item) => (
                <tr
                  key={item.nama_produk}
                  className="text-left text-[10px] text-black"
                >
                  <td className="w-[100px] px-2 py-1">
                    {item.jumlah} {item.satuan}
                  </td>
                  <td className="w-max px-2 py-1">{item.nama_produk}</td>
                  <td className="w-[150px] px-2 py-1">
                    {item.gudang}, {item.rak}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="grid gap-10 text-center">
            <h4 className="text-[10px] font-medium text-black">
              Disiapkan oleh,
            </h4>
            <div className="text-sm font-medium text-black">
              (..................................)
            </div>
          </div>

          {warehouses.map((warehouse) => {
            return (
              <>
                <div className="grid gap-10 text-center">
                  <h4 className="text-[10px] font-medium text-black">
                    {warehouse},
                  </h4>
                  <div className="text-sm font-medium text-black">
                    (..................................)
                  </div>
                </div>
              </>
            );
          })}

          <div className="grid gap-10 text-center">
            <h4 className="text-[10px] font-medium text-black">
              Diterima oleh,
            </h4>
            <div className="text-sm font-medium text-black">
              (..................................)
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const TemplateSuratJalan = forwardRef(SuratJalan);
