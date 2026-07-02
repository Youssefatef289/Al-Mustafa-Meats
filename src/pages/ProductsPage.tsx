import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ProductCard } from "@/components/products/ProductCard"
import { SectionHeading } from "@/components/shared/SectionHeading"
import {
  PRODUCT_CATEGORIES,
  getProductsByCategory,
  type ProductCategoryId,
} from "@/data/products"
import { imageSrc } from "@/lib/images"
import { cn } from "@/lib/utils"

const VALID_CATEGORIES = PRODUCT_CATEGORIES.map((c) => c.id)

function parseCategory(param: string | null): ProductCategoryId {
  if (param && VALID_CATEGORIES.includes(param as ProductCategoryId)) {
    return param as ProductCategoryId
  }
  return "all"
}

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const paramCat = searchParams.get("category")
  const [active, setActive] = useState<ProductCategoryId>(() =>
    parseCategory(paramCat),
  )
  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    setActive(parseCategory(paramCat))
  }, [paramCat])

  useEffect(() => {
    const tabEl = tabRefs.current[active]
    const container = tabsContainerRef.current
    if (!tabEl || !container) return

    const tabLeft = tabEl.offsetLeft
    const tabWidth = tabEl.offsetWidth
    const containerWidth = container.offsetWidth
    const scrollLeft = tabLeft - containerWidth / 2 + tabWidth / 2

    container.scrollTo({ left: scrollLeft, behavior: "smooth" })
  }, [active])

  const products = getProductsByCategory(active)
  const activeCategory = PRODUCT_CATEGORIES.find((c) => c.id === active)

  const handleTabChange = (id: ProductCategoryId) => {
    setActive(id)
    if (id === "all") {
      setSearchParams({})
    } else {
      setSearchParams({ category: id })
    }
  }

  return (
    <div className="min-h-screen bg-cream pb-16 pt-4 md:pb-0 md:pt-6">
      <div className="container-main px-3 sm:px-6 lg:px-8">
        <SectionHeading
          title="منتجاتنا"
          subtitle="اختار القسم وحدد الوزن — السعر بيتحدث تلقائيًا"
        />

        <div
          ref={tabsContainerRef}
          className="mb-8 flex gap-2 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              ref={(el) => {
                tabRefs.current[cat.id] = el
              }}
              type="button"
              onClick={() => handleTabChange(cat.id)}
              className={cn(
                "relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all sm:px-5 sm:py-2.5 sm:text-sm",
                active === cat.id
                  ? "bg-brand-red text-white shadow-soft"
                  : "bg-white text-dark/70 hover:bg-brand-red/10 hover:text-brand-red",
              )}
            >
              <img
                src={imageSrc(cat.image)}
                alt=""
                className="size-6 rounded-full object-cover sm:size-7"
              />
              {cat.label}
              {active === cat.id && (
                <motion.span
                  layoutId="active-tab-dot"
                  className="absolute -bottom-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-brand-red md:hidden"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mb-6 overflow-hidden rounded-2xl sm:mb-8"
          >
            <div className="relative h-28 sm:h-40">
              <img
                src={imageSrc(activeCategory?.image ?? "")}
                alt={activeCategory?.label}
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-dark/70 to-transparent" />
              <div className="absolute inset-y-0 start-0 flex items-center p-4 sm:p-6">
                <div>
                  <h2 className="font-display text-xl font-black text-white sm:text-3xl">
                    {activeCategory?.label}
                  </h2>
                  {active === "all" && (
                    <p className="mt-1 text-xs text-white/80 sm:text-sm">
                      {products.length} منتج متاح
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5"
          >
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {products.length === 0 && (
          <p className="py-16 text-center text-dark/50">
            لا توجد منتجات في هذا القسم حاليًا
          </p>
        )}
      </div>
    </div>
  )
}
