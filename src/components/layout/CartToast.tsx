import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { useCartStore } from "@/store/cartStore"

export function CartToast() {
  const toast = useCartStore((s) => s.toast)
  const hideToast = useCartStore((s) => s.hideToast)

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-none fixed inset-x-0 top-1/2 z-[60] flex justify-center px-4"
          style={{ marginTop: "-2rem" }}
        >
          <div
            role="status"
            aria-live="polite"
            className="pointer-events-auto flex max-w-sm items-center gap-3 rounded-2xl bg-dark px-5 py-4 text-white shadow-2xl"
            onClick={hideToast}
          >
            <CheckCircle2 className="size-6 shrink-0 text-[#25D366]" />
            <p className="text-sm font-semibold leading-snug">{toast}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
