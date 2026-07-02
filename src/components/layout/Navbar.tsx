import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  ASSETS,
  BRAND,
  NAV_LINKS,
  buildWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/constants"
import { useCartStore } from "@/store/cartStore"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === "/"
  const itemCount = useCartStore((s) => s.items.length)
  const setCartOpen = useCartStore((s) => s.setCartOpen)
  const whatsappUrl = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)

  const isHeroMode = isHome && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [location.pathname])

  useEffect(() => {
    setScrolled(false)
  }, [location.pathname])

  return (
    <header
      className={cn(
        "top-0 z-50 w-full transition-all duration-300",
        isHeroMode
          ? "absolute bg-gradient-to-b from-dark/50 to-transparent"
          : "fixed border-b border-dark/5 bg-white shadow-sm",
      )}
    >
      <div className="container-main flex h-14 items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${BRAND.name} — الرئيسية`}
        >
          <img
            src={ASSETS.logo}
            alt=""
            className="size-9 rounded-lg object-contain sm:size-11"
          />
          <span
            className={cn(
              "font-display text-lg font-extrabold sm:text-xl",
              isHeroMode ? "text-white drop-shadow-sm" : "text-brand-red",
            )}
          >
            {BRAND.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="التنقل">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isHeroMode
                  ? "text-white/90 hover:bg-white/15 hover:text-white"
                  : location.pathname === link.href ||
                      (link.href === "/" && location.pathname === "/")
                    ? "bg-brand-red/10 text-brand-red"
                    : "text-dark/75 hover:bg-cream hover:text-brand-red",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className={cn(
              "relative flex size-10 items-center justify-center rounded-full transition-colors",
              isHeroMode
                ? "bg-white/15 text-white hover:bg-white/25"
                : "bg-cream text-dark hover:bg-brand-red/10",
            )}
            aria-label="فتح السلة"
          >
            <ShoppingBag className="size-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -end-1 flex size-5 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>

          <Button
            variant={isHeroMode ? "outline" : "default"}
            size="sm"
            className={cn("rounded-full", isHeroMode && "border-white/80 text-white hover:bg-white/15")}
            asChild
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <img src={ASSETS.whatsappIcon} alt="" className="size-4" />
              اطلب دلوقتي
            </a>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "hidden md:inline-flex lg:hidden",
                isHeroMode ? "text-white hover:bg-white/15" : "text-dark",
              )}
              aria-label="فتح القائمة"
            >
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white pt-12">
            <SheetHeader>
              <SheetTitle className="text-brand-red">{BRAND.name}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium hover:bg-cream"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
