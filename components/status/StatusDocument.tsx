import { Chip } from "@nextui-org/react";

interface StatusDocumentProps {
  text: string;
}

export default function StatusDocument({ text }: StatusDocumentProps) {
  return (
    <Chip
      variant="flat"
      size="sm"
      classNames={{
        base: "px-3",
        content: "font-normal capitalize",
      }}
      className={
        text === "Faktur"
          ? "bg-green-500 text-white"
          : "bg-amber-500 text-white"
      }
    >
      {text}
    </Chip>
  );
}
