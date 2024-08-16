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
      <div className="container grid h-screen w-full grid-rows-[1fr_100px] items-center justify-center gap-4">
        <div className="grid gap-4">
          <h5 className="text-center text-xl font-medium text-default-900">
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
              className="bg-teal-500 font-semibold text-white sm:w-40"
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

          <div className="px-3 lg:px-0">
            <Button
              size="lg"
              onClick={() =>
                window.open(
                  "http://sinarbajakediri.my.id/tutorialscm/",
                  "_blank",
                )
              }
              className="w-full bg-zinc-300 font-semibold text-zinc-600"
            >
              Tutorial
            </Button>
          </div>
        </div>

        <p className="max-w-[500px] text-center text-sm font-medium text-default-500">
          TB. Sinar Baja - Jl. Letjend Sutoyo No.67, Burengan, Kec. Pesantren,
          Kabupaten Kediri, Jawa Timur 64131
        </p>
      </div>
    </>
  );
}
