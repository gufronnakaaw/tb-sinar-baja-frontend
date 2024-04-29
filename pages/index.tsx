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
      <div className="container flex h-screen w-full flex-col justify-center">
        <h5 className="mb-4 text-center text-xl font-medium text-default-900">
          Silakan pilih role untuk login:
        </h5>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            color="primary"
            size="lg"
            onClick={() => router.push("/owner")}
            className="font-semibold sm:w-40"
          >
            Owner
          </Button>

          <Button
            size="lg"
            onClick={() => router.push("/admin")}
            className="bg-lime-500 font-semibold text-white sm:w-40"
          >
            Admin
          </Button>

          <Button
            size="lg"
            onClick={() => router.push("/cashier")}
            className="bg-rose-500 font-semibold text-white sm:w-40"
          >
            Kasir
          </Button>
        </div>
      </div>
    </>
  );
}
