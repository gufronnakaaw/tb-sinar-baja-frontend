import { Button } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Select Role</title>
      </Head>
      <div className="container flex h-screen w-full flex-col items-center justify-center">
        <h5 className="mb-4 text-xl font-medium text-default-900">
          Silakan pilih role untuk login:
        </h5>

        <div className="inline-flex flex-wrap items-center gap-2">
          <Button
            color="primary"
            size="lg"
            onClick={() => router.push("/owner")}
            className="w-36 font-semibold"
          >
            Owner
          </Button>

          <Button
            size="lg"
            onClick={() => router.push("/admin")}
            className="w-36 bg-lime-500 font-semibold text-white"
          >
            Admin
          </Button>

          <Button
            size="lg"
            onClick={() => router.push("/cashier")}
            className="w-36 bg-rose-500 font-semibold text-white"
          >
            Kasir
          </Button>
        </div>
      </div>
    </>
  );
}
