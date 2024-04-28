export default function MenuPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-2 text-xl font-bold capitalize text-default-900">
        cashier menu page
      </h1>
      <ul className="list-disc">
        <li>penjualan</li>
        <li>daftar transaksi</li>
        <li>penutupan</li>
      </ul>
    </div>
  );
}
