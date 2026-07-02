import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronUp } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import { cn } from "@/lib/utils"

export function BackToTopButton() {
  const [visible, setVisible] = useState(false)
  const hasItems = useCartStore((s) => s.items.length > 0)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollToTop}
          className={cn(
            "fixed start-6 z-40 flex size-12 items-center justify-center rounded-full bg-white text-brand-red shadow-soft-lg ring-1 ring-dark/10 transition-transform hover:scale-110 md:size-14",
            "motion-reduce:hover:scale-100",
            hasItems ? "bottom-36 md:bottom-28" : "bottom-32 md:bottom-24",
          )}
          aria-label="العودة للأعلى"
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}
        >
          <ChevronUp className="size-6 md:size-7" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
