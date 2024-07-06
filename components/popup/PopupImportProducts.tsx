import { ProdukType } from "@/types/products.type";
import { WarehousesType } from "@/types/warehouses.type";
import { ZodError } from "@/types/zod.error";
import { columnsXlsx } from "@/utils/columnsXlsx";
import { fetcher } from "@/utils/fetcher";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Select,
  Selection,
  SelectItem,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { Upload, UploadSimple, WarningCircle } from "@phosphor-icons/react";
import { useState } from "react";
import { KeyedMutator } from "swr";
import * as xlsx from "xlsx";
import LoadingUpload from "../LoadingUpload";
import CustomTooltip from "../tooltip";

type ErrorResponse = {
  success: boolean;
  status_code: number;
  error: {
    name: string;
    message: string;
    errors: unknown;
  };
};

export default function PopupImportProducts({
  mutate,
  role,
  gudang,
  page,
}: {
  mutate: KeyedMutator<any>;
  role: string;
  gudang: WarehousesType[];
  page: "stocks" | "products";
}) {
  const uploadDisclosure = useDisclosure();
  const errorDisclosure = useDisclosure();

  const [file, setFile] = useState<File | null>(null);
  const [sheet, setSheet] = useState("Pricelist");
  const [errors, setErrors] = useState<
    { baris: number; kolom: string; pesan: string }[] | null
  >([]);
  const [loading, setLoading] = useState(false);
  const [kodeGudang, setKodeGudang] = useState("");
  const [textLoading, setTextLoading] = useState("");
  const [keysUpload, setKeysUpload] = useState<Selection>(new Set([]));
  const [tipe, setTipe] = useState("all");

  async function readFileXlsx(file: File) {
    setLoading(true);
    setTextLoading("Membaca file");

    const data = await file.arrayBuffer();

    const workbook = xlsx.read(data);

    const headers = xlsx.utils.sheet_to_json(workbook.Sheets[sheet], {
      raw: true,
      header: 1,
    })[0] as string[];

    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]) as any[];

    const results = [];

    for (let i = 0; i < rows.length; i++) {
      const defaultObj = {};

      for (let j = 0; j < headers.length; j++) {
        const key = headers[j].toLocaleLowerCase().replace(/ /g, "_");

        switch (key) {
          case "sub_kategori_produk":
            Object.assign(defaultObj, {
              subkategori_id: !rows[i][headers[j]] ? null : rows[i][headers[j]],
            });
            break;
          default:
            Object.assign(defaultObj, {
              [key]: !rows[i][headers[j]] ? null : rows[i][headers[j]],
            });
        }
      }

      results.push(defaultObj);
    }

    return { headers, results };
  }

  async function handleCreateProduk() {
    if (!file) return;

    if (page == "stocks") {
      if (Array.from(keysUpload).length == 0) {
        return alert("silahkan pilih kolom terlebih dahulu!!");
      }
    }

    if (tipe == "custom" && Array.from(keysUpload).length == 0) {
      return alert("silahkan pilih kolom terlebih dahulu!!");
    }

    const { results } = await readFileXlsx(file);

    const seen = new Set();
    const duplicateIndexes: number[] = [];

    results.forEach((result, index) => {
      const produk = result as ProdukType;
      if (seen.has(produk.kode_item)) {
        duplicateIndexes.push(index);
      } else {
        seen.add(produk.kode_item);
      }
    });

    if (duplicateIndexes.length != 0) {
      setLoading(false);
      setFile(null);
      setSheet("Pricelist");
      setKodeGudang("");
      setKeysUpload(new Set([]));
      setTipe("all");
      uploadDisclosure.onClose();

      setErrors(
        duplicateIndexes.map((element) => {
          return {
            baris: element + 2,
            kolom: "-",
            pesan: "Duplikat",
          };
        }),
      );

      return errorDisclosure.onOpen();
    }

    const filterKeysUpload = Array.from(keysUpload);

    const dataByKeysUpload = results.map((item) => {
      return Object.fromEntries(
        Object.entries(item).filter(([key]) =>
          ["kode_item", ...filterKeysUpload].includes(key),
        ),
      );
    });

    try {
      setTextLoading("Sedang mengunggah data");

      const data = {
        gudang_id: kodeGudang,
      };

      if (page == "stocks") {
        Object.assign(data, {
          produk: dataByKeysUpload,
        });
      }

      if (page == "products" && tipe == "all") {
        Object.assign(data, {
          produk: results,
        });
      }

      if (page == "products" && tipe == "custom") {
        Object.assign(data, {
          produk: dataByKeysUpload,
        });
      }

      await fetcher({
        url: "/produk/bulk",
        method: "POST",
        data,
      });

      alert(`${results.length} data berhasil diunggah ke database`);
      mutate();

      setLoading(false);
      setFile(null);
      setSheet("Pricelist");
      setKodeGudang("");
      setKeysUpload(new Set([]));
      setTipe("all");
      uploadDisclosure.onClose();
    } catch (error) {
      setLoading(false);
      setFile(null);
      setSheet("Pricelist");
      setKodeGudang("");
      setKeysUpload(new Set([]));
      setTipe("all");
      uploadDisclosure.onClose();

      const response = error as ErrorResponse;

      if (response.status_code >= 500) {
        if (response.error.name == "PrismaClientKnownRequestError") {
          const prisma = response.error as {
            name: string;
            message: string;
            errors: {
              code: string;
              meta?: string[];
              stack: string;
            };
          };

          console.log(error);

          if (prisma.errors.code == "P2002") {
            return alert(`kode ${prisma.errors.code}. ada kolom yang duplikat`);
          }

          if (prisma.errors.code == "P2003") {
            return alert(
              `kode ${prisma.errors.code}. periksa kode gudang/subkategori id karena kode gudang/subkategori id tidak ada dalam database`,
            );
          }
        }

        console.log(error);
        return alert("kode error 500. terjadi masalah pada server");
      }

      if (response.status_code >= 400) {
        if (response.error.name == "ZodError") {
          const zod = response.error as ZodError;

          const mapping = zod.errors.map((item) => {
            return {
              baris: item.field[1] + 2,
              kolom: item.field[2],
              pesan: item.message,
            };
          });

          setErrors(mapping);
          return errorDisclosure.onOpen();
        }

        console.log(error);
        return alert(
          `kode error ${response.status_code}. terjadi kesalahan saat input data. periksa kembali file excel anda.`,
        );
      }

      console.log(error);
      return alert("kode error tidak diketahui. terjadi masalah pada aplikasi");
    }
  }

  return (
    <>
      {loading ? <LoadingUpload text={textLoading} /> : null}

      <Button
        onPress={uploadDisclosure.onOpen}
        variant="solid"
        startContent={<Upload weight="bold" size={18} />}
        className={`w-full font-medium text-white sm:w-max ${role == "owner" ? "bg-primary" : "bg-teal-500"}`}
      >
        Unggah
      </Button>

      <Modal
        isOpen={uploadDisclosure.isOpen}
        onOpenChange={uploadDisclosure.onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="lg"
        onClose={() => {
          setLoading(false);
          setFile(null);
          setSheet("Pricelist");
          setKodeGudang("");
          setKeysUpload(new Set([]));
          setTipe("all");
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-semibold text-default-900">
                Unggah Produk
              </ModalHeader>

              <ModalBody>
                <div className="grid gap-6">
                  <Input
                    defaultValue={sheet}
                    variant="flat"
                    color="default"
                    label="Nama Sheet"
                    labelPlacement="outside"
                    placeholder="Masukan nama sheet..."
                    onChange={(e) => setSheet(e.target.value)}
                  />

                  <Select
                    isRequired
                    label="Pilih Gudang"
                    size="sm"
                    className="w-full"
                    onChange={(e) => {
                      if (!e.target.value) return;

                      setKodeGudang(e.target.value);
                    }}
                    selectedKeys={[kodeGudang]}
                  >
                    {gudang.map((item) => (
                      <SelectItem
                        key={item.kode_gudang}
                        value={item.kode_gudang}
                      >
                        {item.nama}
                      </SelectItem>
                    ))}
                  </Select>

                  <div className="grid gap-1.5">
                    <span className="inline-flex text-sm after:ml-[2px] after:text-danger after:content-['*']">
                      Cari Berkas
                    </span>
                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      className="rounded-xl bg-default-100 px-2 py-2 text-small text-foreground-500 file:mr-4 file:rounded-md file:border-0 file:bg-default-200 file:px-2 file:py-[2px] file:text-sm file:font-medium file:text-primary hover:file:bg-default-300"
                      onChange={async (e) => {
                        if (!e.target.files) return;
                        setFile(e.target.files[0]);
                      }}
                    />
                  </div>

                  {page == "products" ? (
                    <>
                      <RadioGroup
                        value={tipe}
                        label={
                          <span className="inline-flex items-center">
                            Pilih Kolom
                            {
                              <CustomTooltip content="Jika anda ingin mengunggah produk baru, wajib untuk memilih semua kolom!">
                                <WarningCircle
                                  weight="bold"
                                  size={16}
                                  className="ml-1 cursor-pointer text-default-600"
                                />
                              </CustomTooltip>
                            }
                          </span>
                        }
                        orientation="horizontal"
                        isRequired
                        onValueChange={(e) => {
                          setKeysUpload(new Set([]));
                          setTipe(e);
                        }}
                      >
                        <Radio value="all">Semua Kolom</Radio>
                        <Radio value="custom">Custom</Radio>
                      </RadioGroup>

                      {tipe == "custom" ? (
                        <div className="overflow-x-auto">
                          <Select
                            isRequired
                            label="Pilih Kolom"
                            size="sm"
                            className="w-full"
                            selectionMode="multiple"
                            onSelectionChange={setKeysUpload}
                            selectedKeys={keysUpload}
                          >
                            {columnsXlsx.map((item) => (
                              <SelectItem
                                key={item.toLowerCase()}
                                value={item.toLowerCase()}
                              >
                                {item.split("_").join(" ")}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      ) : null}
                    </>
                  ) : null}

                  {page == "stocks" ? (
                    <Select
                      isRequired
                      label="Pilih Kolom"
                      size="sm"
                      className="w-full"
                      selectionMode="multiple"
                      onSelectionChange={setKeysUpload}
                      selectedKeys={keysUpload}
                    >
                      {["Stok", "Stok_Aman"].map((item) => (
                        <SelectItem
                          key={item.toLowerCase()}
                          value={item.toLowerCase()}
                        >
                          {item.split("_").join(" ")}
                        </SelectItem>
                      ))}
                    </Select>
                  ) : null}
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    setLoading(false);
                    setFile(null);
                    setSheet("Pricelist");
                    setKodeGudang("");
                    setKeysUpload(new Set([]));
                    setTipe("all");

                    onClose();
                  }}
                  className="font-medium"
                >
                  Batal
                </Button>

                {loading ? (
                  <Button
                    variant="solid"
                    startContent={<Spinner color="white" size="sm" />}
                    className={`text-white ${role == "owner" ? "bg-primary" : "bg-teal-500"} ${loading ? "cursor-not-allowed justify-self-end font-medium" : ""}`}
                  >
                    Tunggu
                  </Button>
                ) : (
                  <Button
                    variant="solid"
                    startContent={<UploadSimple weight="bold" size={18} />}
                    onClick={handleCreateProduk}
                    className={`font-medium text-white ${role == "owner" ? "bg-primary" : "bg-teal-500"}`}
                  >
                    Unggah Produk
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={errorDisclosure.isOpen}
        onOpenChange={errorDisclosure.onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="lg"
        onClose={() => {
          setErrors(null);
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-semibold text-default-900">
                Rincian Error
              </ModalHeader>

              <ModalBody>
                <div className="grid gap-6">
                  <table>
                    <thead>
                      <th>Baris</th>
                      <th>Kolom</th>
                      <th>Pesan</th>
                    </thead>
                    <tbody>
                      {errors?.map((error, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <p className="text-center">{error.baris}</p>
                            </td>
                            <td>
                              <p className="text-center capitalize">
                                {error.kolom.split("_").join(" ")}
                              </p>
                            </td>
                            <td>
                              <p className="text-center">{error.pesan}</p>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </ModalBody>

              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
