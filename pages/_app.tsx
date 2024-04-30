import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  function setColor() {
    const ownerColor = "#006FEE";
    const adminColor = "#84cc16";
    const cashierColor = "#f43f5e";
    const defaultColor = "#000";

    if (router.pathname.startsWith("/owner")) {
      return ownerColor;
    }

    if (router.pathname.startsWith("/admin")) {
      return adminColor;
    }

    if (router.pathname.startsWith("/cashier")) {
      return cashierColor;
    }

    return defaultColor;
  }

  return (
    <NextUIProvider>
      <NextNProgress color={setColor()} />
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
