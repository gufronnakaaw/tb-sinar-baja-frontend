import Link from "next/link";
import { useRouter } from "next/router";

interface SidebarButtonProps {
  label: string;
  path: string;
  className?: string;
  icon: React.ReactNode;
  isDev?: boolean;
}

export default function ButtonSidebar({
  icon,
  label,
  className,
  path,
  isDev,
}: SidebarButtonProps) {
  const router = useRouter();

  function setActive(path: string) {
    const ownerColor = "bg-primary text-white hover:bg-primary/90";
    const adminColor = "bg-lime-500 text-white hover:bg-lime-500/90";
    const cashierColor = "bg-rose-500 text-white hover:bg-rose-500/90";
    const defaultColor = "bg-transparent text-gray-600 hover:bg-gray-200";

    if (
      router.pathname.startsWith("/owner") &&
      router.pathname.includes(path)
    ) {
      return ownerColor;
    }

    if (
      router.pathname.startsWith("/admin") &&
      router.pathname.includes(path)
    ) {
      return adminColor;
    }

    if (
      router.pathname.startsWith("/cashier") &&
      router.pathname.includes(path)
    ) {
      return cashierColor;
    }

    return defaultColor;
  }

  return (
    <Link
      href={path}
      className={`flex h-10 items-center justify-between rounded-xl px-3 py-2 ${setActive(path)} ${className}`}
      onClick={(e) => {
        if (isDev) {
          e.preventDefault();
          return alert("dalam tahap pengembangan");
        }
      }}
    >
      <div className="flex flex-1 items-center gap-2">
        <>{icon}</>
        <div className="text-sm font-semibold">{label}</div>
      </div>
    </Link>
  );
}
