import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  calcLineTotal,
  formatWeightNumeric,
  getMinOrderHint,
  type Product,
} from "@/data/products"
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
  const defaultWeight = isPiece ? 1 : 0.5

  const [weight, setWeight] = useState<number>(defaultWeight)
  const addItem = useCartStore((s) => s.addItem)

  const lineTotal = calcLineTotal(product.pricePerKg, weight)
  const unitSuffix = isPiece ? "ج/قطعة" : "ج/كجم"

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
      ? `السلام عليكم، عايز أطلب: ${product.name} — ${formatWeightNumeric(weight, product.priceUnit)}${lineTotal ? ` (${lineTotal} جنيه)` : ""} من لحوم المصطفى`
      : `السلام عليكم، عايز أستفسر عن سعر: ${product.name} من لحوم المصطفى`
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer")
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.25) }}
      className="flex h-full flex-col overflow-hidden rounded-2xl bg-white"
    >
      <div className="aspect-square overflow-hidden rounded-2xl bg-cream">
        <img
          src={imageSrc(product.image)}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-2.5 sm:p-3.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 min-w-0 flex-1 font-display text-sm font-bold leading-snug text-dark sm:text-base">
            {product.name}
          </h3>
          <p className="shrink-0 text-end text-sm font-extrabold tabular-nums text-brand-red sm:text-base">
            {product.pricePerKg !== null
              ? lineTotal !== null
                ? `${lineTotal} ج.م`
                : `${product.pricePerKg} ${unitSuffix}`
              : "عند الطلب"}
          </p>
        </div>

        {product.pricePerKg !== null && (
          <>
            <div className="mt-2.5">
              <div className="flex items-center justify-between gap-1 rounded-xl bg-cream px-1 py-1 sm:px-1.5">
                <button
                  type="button"
                  onClick={decrease}
                  disabled={weight <= min}
                  className={cn(
                    "flex size-7 items-center justify-center rounded-lg bg-white text-dark sm:size-8",
                    weight <= min ? "opacity-40" : "hover:bg-brand-red hover:text-white",
                  )}
                  aria-label="تقليل"
                >
                  <Minus className="size-3.5 sm:size-4" />
                </button>
                <p className="min-w-0 flex-1 text-center text-xs font-bold tabular-nums text-dark">
                  {formatWeightNumeric(weight, product.priceUnit)}
                </p>
                <button
                  type="button"
                  onClick={increase}
                  disabled={weight >= max}
                  className={cn(
                    "flex size-7 items-center justify-center rounded-lg bg-white text-dark sm:size-8",
                    weight >= max ? "opacity-40" : "hover:bg-brand-red hover:text-white",
                  )}
                  aria-label="زيادة"
                >
                  <Plus className="size-3.5 sm:size-4" />
                </button>
              </div>
            </div>

            <p className="mt-1.5 text-center text-[10px] text-dark/40 sm:text-xs">
              {getMinOrderHint(product.priceUnit)}
            </p>
          </>
        )}

        <div className="mt-auto flex gap-1.5 pt-2.5 sm:gap-2 sm:pt-3">
          <Button
            variant="default"
            size="sm"
            className="h-8 flex-1 rounded-xl text-xs font-bold sm:h-9 sm:text-sm"
            onClick={handleOrderNow}
          >
            اطلب الآن
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="h-8 flex-1 rounded-xl bg-cream text-xs font-bold text-dark hover:bg-brand-red/10 sm:h-9 sm:text-sm"
            onClick={handleAddToCart}
            disabled={product.pricePerKg === null}
          >
            <ShoppingCart className="size-3.5 sm:size-4" />
            سلة
          </Button>
        </div>
      </div>
    </motion.article>
  )
}
