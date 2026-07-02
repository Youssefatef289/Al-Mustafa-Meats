import { Phone } from "lucide-react"
import { PHONES } from "@/lib/constants"
import { useCartStore } from "@/store/cartStore"
import { cn } from "@/lib/utils"

export function PhoneFloatButton() {
  const hasItems = useCartStore((s) => s.items.length > 0)

  return (
    <a
      href={`tel:+20${PHONES.main.slice(1)}`}
      className={cn(
        "fixed end-6 z-40 flex size-14 items-center justify-center rounded-full bg-brand-red text-white shadow-soft-lg transition-transform hover:scale-110 md:size-16",
        "motion-reduce:hover:scale-100",
        hasItems ? "bottom-24 md:bottom-8" : "bottom-20 md:bottom-8",
      )}
      aria-label={`اتصل بنا ${PHONES.main}`}
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <Phone className="size-6 md:size-7" />
    </a>
  )
}
