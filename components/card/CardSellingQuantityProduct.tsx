import { Button, Input } from "@nextui-org/react";
import { Minus, Plus } from "@phosphor-icons/react";

export default function CardSellingQuantityProduct() {
  return (
    <div className="grid grid-cols-4 items-center gap-16">
      <div className="grid font-semibold text-default-600">
        <h4 className="line-clamp-2 font-medium text-default-900">
          C-truss Mini SNI tbl KD 10
        </h4>
        <p className="font-medium text-rose-500">Rp 93.000</p>
      </div>

      <div className="flex items-center gap-4 text-sm font-semibold text-default-600">
        <Button isIconOnly color="danger" variant="flat" size="sm">
          <Minus weight="bold" size={16} />
        </Button>
        <Input
          type="number"
          variant="flat"
          size="sm"
          defaultValue="1"
          labelPlacement="outside"
        />
        <Button isIconOnly color="danger" variant="flat" size="sm">
          <Plus weight="bold" size={16} />
        </Button>
      </div>

      <div className="font-bold text-default-900">Rp 93.000</div>

      <div className="font-bold text-default-900">Rp 200.000</div>
    </div>
  );
}
