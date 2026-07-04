import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cartStore"
import { cn } from "@/lib/utils"

export function OrderSummaryBar() {
  const items = useCartStore((s) => s.items)
  const totalPrice = useCartStore((s) => s.totalPrice())
  const setCartOpen = useCartStore((s) => s.setCartOpen)

  if (items.length === 0) return null

  return (
    <div
      className={cn(
        "fixed inset-x-0 z-40 border-t border-dark/10 bg-white shadow-soft-lg",
        "bottom-16 md:bottom-0",
        "pb-[env(safe-area-inset-bottom)] md:pb-[env(safe-area-inset-bottom)]",
      )}
      role="region"
      aria-label="ملخص الطلب"
    >
      <div className="container-main flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-brand-red/10">
            <ShoppingBag className="size-5 text-brand-red" />
          </div>
          <div>
            <p className="text-sm font-bold text-dark">
              {items.length} منتج في السلة
            </p>
            {totalPrice !== null && (
              <p className="tabular-nums text-xs font-semibold text-brand-red">
                {totalPrice} جنيه
              </p>
            )}
          </div>
        </div>

        <Button
          variant="default"
          onClick={() => setCartOpen(true)}
        >
          متابعة الدفع
        </Button>
      </div>
    </div>
  )
}
