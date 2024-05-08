import { Chip } from "@nextui-org/react";

interface StatusPaymentProps {
  text: string;
}

export default function StatusPayment({ text }: StatusPaymentProps) {
  return (
    <Chip
      variant="flat"
      color={
        text === "lunas" ? "success" : text === "piutang" ? "danger" : "default"
      }
      size="sm"
      classNames={{
        base: "px-3",
        content: "font-medium capitalize",
      }}
    >
      {text}
    </Chip>
  );
}
