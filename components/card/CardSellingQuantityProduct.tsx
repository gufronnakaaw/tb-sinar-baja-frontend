import { Button, Input } from "@nextui-org/react";
import { Minus, Plus, Trash } from "@phosphor-icons/react";
import CustomTooltip from "../tooltip";

export default function CardSellingQuantityProduct() {
  return (
    <div className="grid grid-cols-[1fr_repeat(3,140px)_42px] items-center gap-10 border-b border-gray-300 py-4">
      <div className="grid font-semibold text-default-600">
        <h4 className="line-clamp-2 font-semibold text-default-900">
          C-truss Mini SNI tbl KD 10
        </h4>
        <p className="font-medium text-rose-500">Rp 93.000</p>
      </div>

      <div className="flex items-center gap-2 text-sm font-semibold text-default-600">
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

      <div className="font-medium text-default-900">Rp 93.000</div>

      <div className="font-medium text-default-900">Rp 200.000</div>

      <CustomTooltip content="Hapus">
        <Button isIconOnly variant="flat" color="danger" size="sm">
          <Trash weight="bold" size={20} />
        </Button>
      </CustomTooltip>
    </div>
  );
}
