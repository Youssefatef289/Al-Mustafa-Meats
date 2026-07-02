import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, MessageCircle, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { calcLineTotal, formatWeight, type Product } from "@/data/products"
import { imageSrc } from "@/lib/images"
import { useCartStore } from "@/store/cartStore"
import { buildWhatsAppUrl } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const isPiece = product.priceUnit === "piece"
  const step = isPiece ? 1 : 0.25
  const min = isPiece ? 1 : 0.25
  const max = isPiece ? 50 : 20

  const [weight, setWeight] = useState<number>(1)
  const addItem = useCartStore((s) => s.addItem)

  const lineTotal = calcLineTotal(product.pricePerKg, weight)
  const unitLabel = isPiece ? "ج/قطعة" : "ج/كجم"

  const decrease = () => {
    setWeight((w) => Math.max(min, +(w - step).toFixed(2)))
  }

  const increase = () => {
    setWeight((w) => Math.min(max, +(w + step).toFixed(2)))
  }

  const handleAddToCart = () => {
    if (product.pricePerKg === null) return
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      pricePerUnit: product.pricePerKg,
      priceUnit: product.priceUnit,
      weight,
    })
  }

  const handleOrderNow = () => {
    const msg = product.pricePerKg
      ? `السلام عليكم، عايز أطلب: ${product.name} — ${formatWeight(weight, product.priceUnit)}${lineTotal ? ` (${lineTotal} جنيه)` : ""} من لحوم المصطفى`
      : `السلام عليكم، عايز أستفسر عن سعر: ${product.name} من لحوم المصطفى`
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer")
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3) }}
      className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-soft sm:rounded-2xl"
    >
      <div className="relative aspect-square overflow-hidden bg-cream">
        <img
          src={imageSrc(product.image)}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-2.5 sm:p-4">
        <h3 className="line-clamp-2 font-display text-sm font-bold leading-snug text-dark sm:text-base">
          {product.name}
        </h3>

        <p className="mt-1 tabular-nums text-xs font-semibold text-brand-red sm:text-sm">
          {product.pricePerKg !== null
            ? `${product.pricePerKg} ${unitLabel}`
            : "السعر عند الطلب"}
        </p>

        {product.pricePerKg !== null && (
          <>
            <p className="mt-1 tabular-nums text-xs font-bold text-dark sm:text-sm">
              الإجمالي:{" "}
              <span className="text-brand-red">
                {lineTotal !== null ? `${lineTotal} ج` : "—"}
              </span>
            </p>

            <div className="mt-2 sm:mt-3">
              <div className="flex items-center justify-between gap-1 rounded-lg border border-dark/10 bg-cream px-1 py-1 sm:rounded-xl sm:px-2 sm:py-1.5">
                <button
                  type="button"
                  onClick={decrease}
                  disabled={weight <= min}
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full bg-white sm:size-8",
                    weight <= min ? "opacity-40" : "hover:bg-brand-red hover:text-white",
                  )}
                  aria-label="تقليل"
                >
                  <Minus className="size-3.5 sm:size-4" />
                </button>
                <div className="min-w-0 flex-1 text-center">
                  <p className="truncate text-[10px] font-medium text-dark/55 sm:text-xs">
                    {formatWeight(weight, product.priceUnit)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={increase}
                  disabled={weight >= max}
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full bg-white sm:size-8",
                    weight >= max ? "opacity-40" : "hover:bg-brand-red hover:text-white",
                  )}
                  aria-label="زيادة"
                >
                  <Plus className="size-3.5 sm:size-4" />
                </button>
              </div>
            </div>
          </>
        )}

        <div className="mt-auto flex flex-col gap-1.5 pt-2 sm:flex-row sm:gap-2 sm:pt-3">
          <Button
            variant="default"
            size="sm"
            className="h-8 flex-1 rounded-lg text-xs sm:h-9 sm:rounded-xl sm:text-sm"
            onClick={handleOrderNow}
          >
            <MessageCircle className="size-3.5 sm:size-4" />
            اطلب
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="h-8 flex-1 rounded-lg text-xs sm:h-9 sm:rounded-xl sm:text-sm"
            onClick={handleAddToCart}
            disabled={product.pricePerKg === null}
          >
            <ShoppingCart className="size-3.5 sm:size-4" />
            السلة
          </Button>
        </div>
      </div>
    </motion.article>
  )
}
