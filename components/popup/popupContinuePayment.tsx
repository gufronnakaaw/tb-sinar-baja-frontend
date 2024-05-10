import { formatRupiah } from "@/utils/formatRupiah";
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
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { Printer } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useEffect } from "react";

type PopupContinuePaymentProps = {
  setTelp: Dispatch<SetStateAction<string>>;
  setPenerima: Dispatch<SetStateAction<string>>;
  setKet: Dispatch<SetStateAction<string>>;
  setAlamat: Dispatch<SetStateAction<string>>;
  setOngkir: Dispatch<SetStateAction<number>>;
  setPengiriman: Dispatch<SetStateAction<string>>;
  setTipe: Dispatch<SetStateAction<string>>;
  setTunai: Dispatch<SetStateAction<number>>;
  setTotalPembayaran: Dispatch<SetStateAction<number>>;
  setKembali: Dispatch<SetStateAction<number>>;
  setPajak: Dispatch<SetStateAction<number>>;
  setTotalPajak: Dispatch<SetStateAction<number>>;
  totalPajak: number;
  pajak: number;
  tunai: number;
  totalBelanja: number;
  totalPembayaran: number;
  kembali: number;
  ongkir: number;
  tipe: string;
  handlePrint: () => void;
};

export default function PopupContinuePayment({
  setTelp,
  setPenerima,
  setKet,
  setAlamat,
  setOngkir,
  setPengiriman,
  setTipe,
  setTunai,
  setTotalPembayaran,
  setKembali,
  setTotalPajak,
  totalPajak,
  setPajak,
  pajak,
  tunai,
  totalBelanja,
  totalPembayaran,
  kembali,
  ongkir,
  tipe,
  handlePrint,
}: PopupContinuePaymentProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (tipe == "nota") {
      setTotalPembayaran(ongkir + totalBelanja);
    }
  }, [ongkir, tipe, setTotalPembayaran, totalBelanja]);

  useEffect(() => {
    if (tunai == 0) {
      setKembali(0);
    }

    if (tunai - totalPembayaran > 0) {
      setKembali(tunai - totalPembayaran);
    } else {
      setKembali(0);
    }
  }, [tunai, setKembali, totalPembayaran]);

  return (
    <>
      <Button
        onPress={onOpen}
        variant="solid"
        className="bg-rose-500 py-8 font-semibold text-white"
      >
        Lanjutkan Pembayaran
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-semibold text-default-900">
                Informasi Tambahan
              </ModalHeader>

              <ModalBody>
                <div className="grid gap-8">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="text"
                        variant="flat"
                        labelPlacement="outside"
                        label="No. Telp (opsional)"
                        placeholder="Masukan no. telp..."
                        className="w-full"
                        onChange={(e) => {
                          setTelp(e.target.value);
                        }}
                      />

                      <Input
                        type="text"
                        variant="flat"
                        labelPlacement="outside"
                        label="Penerima (opsional)"
                        placeholder="Masukan penerima"
                        className="w-full"
                        onChange={(e) => {
                          setPenerima(e.target.value);
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Textarea
                        type="text"
                        variant="flat"
                        maxRows={3}
                        labelPlacement="outside"
                        label="Keterangan (opsional)"
                        placeholder="Masukan keterangan..."
                        className="w-full"
                        onChange={(e) => {
                          setKet(e.target.value);
                        }}
                      />

                      <Textarea
                        type="text"
                        variant="flat"
                        maxRows={3}
                        labelPlacement="outside"
                        label="Alamat (opsional)"
                        placeholder="Masukan alamat lengkap..."
                        className="w-full"
                        onChange={(e) => {
                          setAlamat(e.target.value);
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="number"
                        variant="flat"
                        labelPlacement="outside"
                        label="Biaya Ongkir (opsional)"
                        placeholder="Masukan biaya ongkir..."
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-sm text-default-600">Rp</span>
                          </div>
                        }
                        className="w-full"
                        onChange={(e) => {
                          if (e.target.value == "") {
                            setOngkir(0);
                          } else {
                            setOngkir(parseInt(e.target.value));
                          }
                        }}
                      />

                      <Input
                        type="text"
                        variant="flat"
                        labelPlacement="outside"
                        label="Waktu Pengiriman (opsional)"
                        placeholder="Masukan waktu pengiriman..."
                        className="w-full"
                        onChange={(e) => {
                          setPengiriman(e.target.value);
                        }}
                      />
                    </div>
                    <Input
                      type="number"
                      variant="flat"
                      labelPlacement="outside"
                      label={
                        <p>
                          Tunai <span className="text-danger">*</span>
                        </p>
                      }
                      placeholder="Masukan tunai..."
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-sm text-default-600">Rp</span>
                        </div>
                      }
                      className="w-full"
                      onChange={(e) => {
                        if (e.target.value == "") {
                          setTunai(0);
                        } else {
                          setTunai(parseInt(e.target.value));
                        }
                      }}
                      min={0}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <RadioGroup
                        orientation="horizontal"
                        label={
                          <p>
                            Tipe <span className="text-danger">*</span>
                          </p>
                        }
                        defaultValue="nota"
                        onChange={(e) => {
                          setTipe(e.target.value);
                        }}
                      >
                        <Radio value="nota">
                          <p className="text-sm text-default-600">Nota</p>
                        </Radio>
                        <Radio value="faktur">
                          <p className="text-sm text-default-600">Faktur</p>
                        </Radio>
                      </RadioGroup>

                      {tipe == "faktur" ? (
                        <Input
                          type="number"
                          variant="flat"
                          labelPlacement="outside"
                          label={
                            <p>
                              Pajak <span className="text-danger">*</span>
                            </p>
                          }
                          placeholder="Masukan persen pajak..."
                          startContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-sm text-default-600">
                                %
                              </span>
                            </div>
                          }
                          className="w-full"
                          onChange={(e) => {
                            if (e.target.value == "") {
                              setPajak(0);
                            } else {
                              setPajak(parseInt(e.target.value));
                            }
                          }}
                          min={0}
                        />
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <table>
                      <tr>
                        <td>Biaya Ongkir</td>
                        <td colSpan={3}></td>
                        <td></td>
                        <td>:</td>
                        <td>
                          <p>{formatRupiah(ongkir)}</p>
                        </td>
                      </tr>
                      <tr>
                        <td>Total Belanja</td>
                        <td colSpan={3}></td>
                        <td></td>
                        <td>:</td>
                        <td>
                          <p>{formatRupiah(totalBelanja)}</p>
                        </td>
                      </tr>
                      {tipe == "faktur" ? (
                        <tr>
                          <td>Pajak ({pajak} %) </td>
                          <td colSpan={3}></td>
                          <td></td>
                          <td>:</td>
                          <td>
                            <p>{formatRupiah(totalPajak)}</p>
                          </td>
                        </tr>
                      ) : null}
                      <tr>
                        <td>Total Pembayaran</td>
                        <td colSpan={3}></td>
                        <td></td>
                        <td>:</td>
                        <td>
                          <p>{formatRupiah(totalPembayaran)}</p>
                        </td>
                      </tr>
                      <tr>
                        <td>Tunai</td>
                        <td colSpan={3}></td>
                        <td></td>
                        <td>:</td>
                        <td>
                          <p className="text-rose-500">{formatRupiah(tunai)}</p>
                        </td>
                      </tr>
                      <tr>
                        <td>Kembali</td>
                        <td colSpan={3}></td>
                        <td></td>
                        <td>:</td>
                        <td>
                          <p className="text-rose-500">
                            {formatRupiah(kembali)}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="font-medium"
                >
                  Batal
                </Button>

                <Button
                  variant="solid"
                  endContent={<Printer weight="bold" size={17} />}
                  className="bg-rose-500 font-semibold text-white"
                  onClick={handlePrint}
                >
                  Cetak
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
