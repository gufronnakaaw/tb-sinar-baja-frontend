import { Chip } from "@nextui-org/react";
import { Circle } from "@phosphor-icons/react";

interface StatusStockProps {
  text: string;
}

export default function StatusStock({ text }: StatusStockProps) {
  return (
    <Chip
      variant="flat"
      color={
        text === "stok aman"
          ? "success"
          : text === "stok menipis"
            ? "warning"
            : "danger"
      }
      size="lg"
      startContent={<Circle weight="fill" size={8} className="animate-ping" />}
      classNames={{
        base: "px-3",
        content: "font-semibold capitalize",
      }}
    >
      {text}
    </Chip>
  );
}
