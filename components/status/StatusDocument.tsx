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
        content: "font-semibold capitalize",
      }}
      className={
        text === "Faktur"
          ? "bg-primary-100 text-primary"
          : "bg-success-100 text-success"
      }
    >
      {text}
    </Chip>
  );
}
