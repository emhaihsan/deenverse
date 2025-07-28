// components/ui/BackButton.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton({
  href,
  className = "",
  children = "Kembali",
}: {
  href: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center text-emerald-600 hover:text-emerald-800 ${className}`}
    >
      <ArrowLeft className="w-4 h-4 mr-1" />
      {children}
    </Link>
  );
}
