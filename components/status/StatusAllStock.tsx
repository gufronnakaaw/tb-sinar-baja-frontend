export default function StatusAllStock() {
  return (
    <div className="grid h-auto w-full gap-4 rounded-xl border border-l-8 border-default-200 p-4">
      <h4 className="font-bold capitalize text-default-900">
        Status semua stok
      </h4>

      <div className="flex flex-wrap items-center gap-2 md:gap-4">
        <div className="flex items-center gap-0.5 text-default-900">
          <div className="text-[12px] font-medium">Stok Aman :</div>
          <p className="rounded-[100px] bg-success-100 px-2 py-1 text-sm font-bold text-success">
            1287 produk
          </p>
        </div>

        <div className="flex items-center gap-0.5 text-default-900">
          <div className="text-[12px] font-medium">Stok Menipis :</div>
          <p className="rounded-[100px] bg-warning-100 px-2 py-1 text-sm font-bold text-warning">
            29 produk
          </p>
        </div>

        <div className="flex items-center gap-0.5 text-default-900">
          <div className="text-[12px] font-medium">Stok Bahaya :</div>
          <p className="rounded-[100px] bg-danger-100 px-2 py-1 text-sm font-bold text-danger">
            283 produk
          </p>
        </div>
      </div>
    </div>
  );
}
