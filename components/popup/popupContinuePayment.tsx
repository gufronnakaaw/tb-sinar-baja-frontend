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
                      isRequired
                      type="number"
                      variant="flat"
                      labelPlacement="outside"
                      label="Tunai"
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
                        color="danger"
                        label={
                          <p className="text-small text-default-900">
                            Tipe <span className="text-danger">*</span>
                          </p>
                        }
                        defaultValue="nota"
                        onChange={(e) => {
                          setTipe(e.target.value);
                        }}
                      >
                        <Radio value="nota">
                          <p className="text-sm font-medium text-default-600">
                            Nota
                          </p>
                        </Radio>
                        <Radio value="faktur">
                          <p className="text-sm font-medium text-default-600">
                            Faktur
                          </p>
                        </Radio>
                      </RadioGroup>

                      {tipe == "faktur" ? (
                        <Input
                          isRequired
                          type="number"
                          variant="flat"
                          labelPlacement="outside"
                          label="Pajak"
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

                  <div className="grid gap-1 border-l-4 border-rose-500 pl-6">
                    <div className="grid grid-cols-[150px_6px_1fr] gap-1 text-sm text-default-900">
                      <div className="font-medium">Biaya Ongkir</div>
                      <div className="font-medium">:</div>
                      <p className="font-medium">{formatRupiah(ongkir)}</p>
                    </div>

                    <div className="grid grid-cols-[150px_6px_1fr] gap-1 text-sm text-default-900">
                      <div className="font-medium">Total Belanja</div>
                      <div className="font-medium">:</div>
                      <p className="font-medium">
                        {formatRupiah(totalBelanja)}
                      </p>
                    </div>

                    {tipe == "faktur" ? (
                      <div className="grid grid-cols-[150px_6px_1fr] gap-1 text-sm text-default-900">
                        <div className="font-medium">Pajak ({pajak} %)</div>
                        <div className="font-medium">:</div>
                        <p className="font-medium">
                          {formatRupiah(totalPajak)}
                        </p>
                      </div>
                    ) : null}

                    <div className="grid grid-cols-[150px_6px_1fr] gap-1 text-sm text-default-900">
                      <div className="font-medium">Total Pembayaran</div>
                      <div className="font-medium">:</div>
                      <p className="font-medium">
                        {formatRupiah(totalPembayaran)}
                      </p>
                    </div>

                    <div className="grid grid-cols-[150px_6px_1fr] gap-1 text-sm text-default-900">
                      <div className="font-medium">Tunai</div>
                      <div className="font-medium">:</div>
                      <p className="font-medium text-rose-500">
                        {formatRupiah(tunai)}
                      </p>
                    </div>

                    <div className="grid grid-cols-[150px_6px_1fr] gap-1 text-sm text-default-900">
                      <div className="font-medium">Kembali</div>
                      <div className="font-medium">:</div>
                      <p className="font-medium text-rose-500">
                        {formatRupiah(kembali)}
                      </p>
                    </div>
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
