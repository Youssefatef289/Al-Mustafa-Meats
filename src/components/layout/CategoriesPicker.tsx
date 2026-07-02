import { useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { LayoutGrid, X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { PRODUCT_CATEGORIES } from "@/data/products"
import { imageSrc } from "@/lib/images"
import { useUiStore } from "@/store/uiStore"
import { cn } from "@/lib/utils"

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.12 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
}

export function CategoriesPicker() {
  const open = useUiStore((s) => s.categoriesPickerOpen)
  const setOpen = useUiStore((s) => s.setCategoriesPickerOpen)
  const navigate = useNavigate()

  const handleSelect = (categoryId: string) => {
    setOpen(false)
    if (categoryId === "all") {
      navigate("/products")
    } else {
      navigate(`/products?category=${categoryId}`)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="full"
        className="gap-0 overflow-hidden bg-cream p-0 md:inset-y-0 md:left-0 md:h-full md:max-w-md md:rounded-none"
      >
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <SheetHeader className="shrink-0 border-b border-dark/8 bg-white px-4 py-5">
            <SheetTitle className="flex items-center gap-2 text-brand-red">
              <LayoutGrid className="size-5" />
              اختار قسم المنتجات
            </SheetTitle>
          </SheetHeader>
        </motion.div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <AnimatePresence mode="wait">
            {open && (
              <motion.div
                key="categories-grid"
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-2 gap-3"
              >
                {PRODUCT_CATEGORIES.map((cat) => (
                  <motion.button
                    key={cat.id}
                    type="button"
                    variants={cardVariants}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelect(cat.id)}
                    className={cn(
                      "group overflow-hidden rounded-2xl bg-white text-start shadow-soft transition-shadow",
                      "hover:shadow-card-hover",
                    )}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={imageSrc(cat.image)}
                        alt={cat.label}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <p className="font-display text-sm font-bold text-dark sm:text-base">
                        {cat.label}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="shrink-0 border-t border-dark/8 bg-white p-4 md:hidden"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-dark/5 py-3 text-sm font-semibold text-dark transition-colors hover:bg-dark/10"
          >
            <X className="size-4" />
            إغلاق
          </button>
        </motion.div>
      </SheetContent>
    </Sheet>
  )
}
