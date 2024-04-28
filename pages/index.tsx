import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="container flex h-screen w-full items-center justify-center">
      <div className="inline-flex items-center gap-4">
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
