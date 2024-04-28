import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="container flex h-screen w-full flex-col items-center justify-center">
      <h5 className="mb-4 text-xl font-semibold text-default-900">
        Silakan pilih role untuk login:
      </h5>

      <div className="inline-flex items-center gap-2">
        <Button
          variant="solid"
          color="primary"
          size="lg"
          onClick={() => router.push("/owner")}
          className="font-semibold"
        >
          Owner
        </Button>

        <Button
          variant="bordered"
          color="primary"
          size="lg"
          onClick={() => router.push("/cashier")}
          className="font-semibold"
        >
          Kasir
        </Button>
      </div>
    </div>
  );
}
