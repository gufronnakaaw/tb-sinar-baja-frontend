import ButtonBack from "@/components/button/ButtonBack";
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import usePagination from "@/hooks/usepagination";
import { GlobalResponse } from "@/types/global.type";
import { InvoiceType } from "@/types/invoice.type";
import { FinalType } from "@/types/preorders.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { formatDateWithoutTime } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { getLocalTimeZone } from "@internationalized/date";
import {
  Button,
  DatePicker,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const getServerSideProps = (async () => {
  const preorder: GlobalResponse<FinalType[]> = await fetcher({
    url: "/preorder",
    method: "GET",
  });

  return {
    props: {
      preorder: preorder.data,
    },
  };
}) satisfies GetServerSideProps<{ preorder: FinalType[] }>;

export default function CreateInvoice({
  preorder,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { page, pages, data, setPage } = usePagination(
    preorder ? preorder : [],
    10,
  );
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selection, setSelection] = useState("");
  const [input, setInput] = useState({
    nomor_invoice: "",
    jatuh_tempo: "",
    tagihan: 0,
    sisa: 0,
  });

  const [singlePreorder, setSinglePreorder] = useState<FinalType>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (selection) {
      getPreorderById();
    }

    async function getPreorderById() {
      try {
        const result: GlobalResponse<FinalType> = await fetcher({
          url: "/preorder/?id_preorder=" + selection,
          method: "GET",
        });

        setSinglePreorder(result.data);
        setInput((prev) => {
          return {
            ...prev,
            tagihan: result.data.total,
            sisa: result.data.total,
          };
        });
      } catch (error) {
        alert("terjadi kesalahan saat mendapatkan data preorder");
        console.log(error);
      }
    }
  }, [selection]);

  const columnsPreorder = [
    { name: "ID Preorder", uid: "id_preorder" },
    { name: "Nama Supplier", uid: "nama_supplier" },
  ];

  const renderCellPreorder = (item: FinalType, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof FinalType];

    switch (columnKey) {
      case "id_preorder":
        return <div className="text-default-900">{item.id_preorder}</div>;
      case "nama_supplier":
        return <div className="text-default-900">{item.nama_supplier}</div>;
      default:
        return cellValue;
    }
  };

  async function createInvoice(withPayment: boolean) {
    try {
      const result: GlobalResponse<InvoiceType> = await fetcher({
        url: "/invoice",
        method: "POST",
        data: {
          preorder_id: selection,
          ...input,
        },
      });
      alert("buat invoice berhasil");

      if (withPayment) {
        return router.push(
          "/owner/purchases/invin/payments?id_invoice=" +
            result.data.id_invoice,
        );
      }
      return router.back();
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

  const preorderFilter = data.filter((item) => item.status == "kosong");

  const filter = preorderFilter.filter((item) => {
    return (
      item.id_preorder.toLowerCase().includes(search.toLowerCase()) ||
      item.nama_supplier.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <Layout title="Buat Invoice">
      <Container className="gap-8">
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                <ModalBody className="grid gap-5">
                  <p className="text-center">
                    Apakah anda ingin langsung melakukan pembayaran?
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      color="default"
                      variant="flat"
                      onClick={() => {
                        createInvoice(false);
                      }}
                    >
                      Tidak
                    </Button>
                    <Button
                      className="bg-primary text-white"
                      onClick={() => {
                        createInvoice(true);
                      }}
                    >
                      Ya
                    </Button>
                  </div>
                </ModalBody>
                <ModalFooter></ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <ButtonBack
            onClick={() => router.back()}
            className="justify-self-start text-primary"
          >
            Kembali
          </ButtonBack>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-4 xl:flex xl:items-end xl:justify-between">
            <InputSearchBar
              placeholder="Cari ID PO atau Nama Supplier"
              className="w-full"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Table
            isHeaderSticky
            aria-label="po table"
            color="default"
            selectionMode="single"
            classNames={customStyleTable}
            className="scrollbar-hide"
            onSelectionChange={(e) => {
              setInput({
                nomor_invoice: "",
                jatuh_tempo: "",
                tagihan: 0,
                sisa: 0,
              });
              setSinglePreorder(undefined);
              const set = new Set(e);
              setSelection(set.values().next().value);
            }}
          >
            <TableHeader columns={columnsPreorder}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={filter} emptyContent="Preorder kosong!">
              {(item) => (
                <TableRow key={item.id_preorder}>
                  {(columnKey) => (
                    <TableCell>{renderCellPreorder(item, columnKey)}</TableCell>
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
              cursor: "bg-primary",
            }}
          />

          {selection ? (
            <>
              <Divider />

              <div className="grid w-max gap-2 border-l-4 border-primary p-[1rem_0_1rem_1rem]">
                <h4 className="text-[18px] font-bold text-default-900">
                  Informasi Preorder
                </h4>

                <div className="grid gap-[2px]">
                  <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
                    <div className="text-sm font-medium text-default-600">
                      ID Preorder
                    </div>
                    <div className="font-medium">:</div>
                    <p className="font-bold text-primary">
                      {!singlePreorder?.id_preorder
                        ? "-"
                        : singlePreorder?.id_preorder}
                    </p>
                  </div>
                  <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
                    <div className="text-sm font-medium text-default-600">
                      Tujuan Preorder
                    </div>
                    <div className="font-medium">:</div>
                    <p className="font-bold text-primary">
                      {!singlePreorder?.nama_supplier
                        ? "-"
                        : singlePreorder?.nama_supplier}
                    </p>
                  </div>
                  <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
                    <div className="text-sm font-medium text-default-600">
                      Sumber Preorder
                    </div>
                    <div className="font-medium">:</div>
                    <p className="font-bold capitalize text-primary">
                      {!singlePreorder?.sumber.split("_").join(" ")
                        ? "-"
                        : singlePreorder?.sumber.split("_").join(" ")}
                    </p>
                  </div>
                  <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
                    <div className="grid text-sm font-medium text-default-600">
                      Total
                    </div>
                    <div className="font-medium">:</div>
                    <p className="font-bold text-primary">
                      {!singlePreorder?.total
                        ? "-"
                        : formatRupiah(singlePreorder?.total as number)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <Input
                  value={input.nomor_invoice}
                  isRequired
                  variant="flat"
                  color="default"
                  label="Nomor Invoice Supplier"
                  labelPlacement="outside"
                  name="nomor_invoice"
                  placeholder="Ex: nomorinvoice"
                  onChange={(e) => {
                    setInput({
                      ...input,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />

                <I18nProvider locale="id-ID">
                  <DatePicker
                    isRequired
                    label="Jatuh Tempo"
                    labelPlacement="outside"
                    onChange={(e) => {
                      const str = e.toDate(getLocalTimeZone()).toString();
                      setInput({
                        ...input,
                        jatuh_tempo: formatDateWithoutTime(str),
                      });
                    }}
                  />
                </I18nProvider>

                <Input
                  value={`${input.tagihan}`}
                  isRequired
                  variant="flat"
                  color="default"
                  label="Tagihan"
                  labelPlacement="outside"
                  name="tagihan"
                  placeholder={`${formatRupiah(input.tagihan)}`}
                  onChange={(e) => {
                    setInput({
                      ...input,
                      [e.target.name]: parseInt(e.target.value),
                      sisa: parseInt(e.target.value),
                    });
                  }}
                />
              </div>

              <Button
                variant="solid"
                color="default"
                size="md"
                className="w-max justify-self-end bg-primary font-medium text-white"
                onClick={() => {
                  if (Object.values(input).includes("")) {
                    return alert("field tidak boleh kosong");
                  }
                  onOpen();
                }}
              >
                Buat Invoice
              </Button>
            </>
          ) : null}
        </div>
      </Container>
    </Layout>
  );
}
