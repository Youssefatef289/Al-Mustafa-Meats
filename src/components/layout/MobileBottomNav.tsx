import { Link, useLocation } from "react-router-dom"
import { Home, ShoppingBag, LayoutGrid } from "lucide-react"
import { ASSETS, buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/constants"
import { useCartStore } from "@/store/cartStore"
import { useUiStore } from "@/store/uiStore"
import { cn } from "@/lib/utils"

const TABS = [
  { id: "home", label: "الرئيسية", href: "/", icon: Home },
  { id: "products", label: "المنتجات", href: null, icon: LayoutGrid },
  { id: "cart", label: "السلة", href: null, icon: ShoppingBag },
  { id: "whatsapp", label: "واتساب", href: null, icon: null },
] as const

export function MobileBottomNav() {
  const location = useLocation()
  const itemCount = useCartStore((s) => s.items.length)
  const setCartOpen = useCartStore((s) => s.setCartOpen)
  const setCategoriesPickerOpen = useUiStore((s) => s.setCategoriesPickerOpen)
  const whatsappUrl = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-dark/10 bg-white shadow-[0_-4px_20px_rgb(0_0_0/0.08)] md:hidden"
      aria-label="التنقل السفلي"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-4">
        {TABS.map((tab) => {
          if (tab.id === "whatsapp") {
            return (
              <a
                key={tab.id}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold text-[#25D366] transition-colors active:bg-cream"
              >
                <img src={ASSETS.whatsappIcon} alt="" className="size-6" />
                {tab.label}
              </a>
            )
          }

          if (tab.id === "cart") {
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCartOpen(true)}
                className="relative flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold text-dark/70 transition-colors active:bg-cream"
              >
                <ShoppingBag className="size-6" />
                {itemCount > 0 && (
                  <span className="absolute top-1.5 start-1/2 ms-2 flex size-4 items-center justify-center rounded-full bg-brand-red text-[9px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
                {tab.label}
              </button>
            )
          }

          if (tab.id === "products") {
            const isActive = location.pathname.startsWith("/products")
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategoriesPickerOpen(true)}
                className={cn(
                  "relative flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition-colors active:bg-cream",
                  isActive ? "text-brand-red" : "text-dark/60",
                )}
              >
                <LayoutGrid className={cn("size-6", isActive && "stroke-[2.5]")} />
                {isActive && (
                  <span className="absolute top-1 h-0.5 w-6 rounded-full bg-brand-red" />
                )}
                {tab.label}
              </button>
            )
          }

          const isActive = location.pathname === "/"
          const Icon = tab.icon!

          return (
            <Link
              key={tab.id}
              to={tab.href!}
              className={cn(
                "relative flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition-colors active:bg-cream",
                isActive ? "text-brand-red" : "text-dark/60",
              )}
            >
              <Icon className={cn("size-6", isActive && "stroke-[2.5]")} />
              {isActive && (
                <span className="absolute top-1 h-0.5 w-6 rounded-full bg-brand-red" />
              )}
              {tab.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
