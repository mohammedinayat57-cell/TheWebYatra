"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ label = "Back" }: { label?: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-warm-700 dark:hover:text-warm-400 transition-colors group mb-6"
    >
      <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
      {label}
    </button>
  );
}
