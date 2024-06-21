import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

// components
import ButtonBack from "@/components/button/ButtonBack";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import { GlobalResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { PRICENAME } from "@/utils/price";

type ProdukDetailType = {
  kode_item: string;
  barcode: any;
  kode_pabrik: any;
  kode_toko: any;
  kode_supplier: any;
  nama_produk: string;
  nama_produk_asli: string;
  nama_produk_sebutan: any;
  merk: any;
  tipe: any;
  satuan_besar: any;
  satuan_kecil: string;
  isi_satuan_besar: any;
  konversi: any;
  harga_pokok: number;
  harga_1: number;
  harga_2: number;
  harga_3: number;
  harga_4: number;
  harga_5: any;
  harga_6: any;
  stok: number;
  created_at: string;
  updated_at: string;
  rak: string;
  stok_aman: number;
  subkategori: string;
  gudang: string;
  kategori: string;
  status_stok: string;
};

export default function ProductDetail({
  produk,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  function exclude(produk: ProdukDetailType, keys: string[]) {
    return Object.fromEntries(
      Object.entries(produk).filter(([key]) => !keys.includes(key)),
    );
  }

  const backup = { ...produk.data };

  Object.assign(backup, {
    kategori: `${produk.data.kategori} - ${produk.data.subkategori}`,
    gudang: `${produk.data.gudang} - ${produk.data.rak}`,
  });

  const filter = exclude(backup, [
    "kode_supplier",
    "subkategori",
    "rak",
    "barcode",
  ]);

  const detail = [];

  for (const key in filter) {
    if (
      key == "harga_1" ||
      key == "harga_2" ||
      key == "harga_3" ||
      key == "harga_4" ||
      key == "harga_5" ||
      key == "harga_6"
    ) {
      detail.push(
        <>
          <div className="grid grid-cols-[170px_10px_10fr] gap-1 text-sm text-default-900">
            <div className="text-sm font-medium capitalize text-default-600">
              {PRICENAME[key].split("_").join(" ")}
            </div>
            <div className="font-medium">:</div>
            <p className="font-bold text-teal-500">
              {!filter[key as keyof ProdukDetailType]
                ? "-"
                : formatRupiah(filter[key as keyof ProdukDetailType])}
            </p>
          </div>
        </>,
      );
    } else {
      let value = "";
      switch (key) {
        case "konversi":
          value += formatRupiah(filter[key as keyof ProdukDetailType]);
          break;
        case "harga_pokok":
          value += formatRupiah(filter[key as keyof ProdukDetailType]);
          break;
        case "harga_diskon":
          value += formatRupiah(filter[key as keyof ProdukDetailType]);
          break;
        case "created_at":
          value += formatDate(filter[key as keyof ProdukDetailType]);
          break;
        case "updated_at":
          value += formatDate(filter[key as keyof ProdukDetailType]);
          break;
        default:
          value += filter[key as keyof ProdukDetailType];
          break;
      }

      let header = "";
      switch (key) {
        case "gudang":
          header += "lokasi";
          break;
        case "created_at":
          header += "dibuat pada";
          break;
        case "updated_at":
          header += "diubah pada";
          break;
        default:
          header += key.split("_").join(" ");
          break;
      }

      detail.push(
        <>
          <div className="grid grid-cols-[170px_10px_10fr] gap-1 text-sm text-default-900">
            <div className="text-sm font-medium capitalize text-default-600">
              {header}
            </div>
            <div className="font-medium">:</div>
            <p className="font-bold text-teal-500">
              {!filter[key as keyof ProdukDetailType] ? "-" : value}
            </p>
          </div>
        </>,
      );
    }
  }

  return (
    <Layout title="Detail Produk">
      <Container className="gap-8">
        <ButtonBack
          onClick={() => router.back()}
          className="justify-self-start text-teal-500"
        >
          Kembali
        </ButtonBack>

        <div className="grid gap-6">
          <h4 className="border-l-4 border-teal-500 pl-4 text-[18px] font-bold text-default-900">
            Detail Produk {produk.data.nama_produk}
          </h4>

          <div className="columns-2 gap-6">
            <div className="grid gap-2">{detail}</div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ query }) => {
  const result = await fetcher({
    url: "/produk?kode_item=" + query?.kode_item,
    method: "GET",
  });

  const produk: GlobalResponse<ProdukDetailType> = result;

  return {
    props: {
      produk,
    },
  };
}) satisfies GetServerSideProps<{ produk: GlobalResponse<ProdukDetailType> }>;
