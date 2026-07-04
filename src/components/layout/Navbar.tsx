import { useState, useEffect, type ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, ShoppingBag, LayoutGrid } from "lucide-react"
import { motion } from "framer-motion"
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
import { useUiStore } from "@/store/uiStore"
import { cn } from "@/lib/utils"

function NavIconButton({
  onClick,
  href,
  label,
  active,
  children,
  className,
}: {
  onClick?: () => void
  href?: string
  label: string
  active?: boolean
  children: ReactNode
  className?: string
}) {
  const content = (
    <>
      {children}
      {active && (
        <motion.span
          layoutId="nav-active-line"
          className="absolute -bottom-1 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-brand-red"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </>
  )

  const baseClass = cn(
    "relative flex size-10 items-center justify-center rounded-full transition-colors",
    className,
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        aria-label={label}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={baseClass} aria-label={label}>
      {content}
    </button>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === "/"
  const isProducts = location.pathname.startsWith("/products")
  const itemCount = useCartStore((s) => s.items.length)
  const setCartOpen = useCartStore((s) => s.setCartOpen)
  const setCategoriesPickerOpen = useUiStore((s) => s.setCategoriesPickerOpen)
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
        scrolled && !isHeroMode && "shadow-md",
      )}
    >
      <div
        className={cn(
          "container-main flex items-center justify-between gap-2 px-3 transition-all duration-300 sm:gap-3 sm:px-6 lg:px-8",
          scrolled && !isHeroMode ? "h-[4.5rem] sm:h-20" : "h-16 sm:h-[4.5rem]",
          isHeroMode && "h-16 sm:h-[4.5rem]",
        )}
      >
        <Link
          to="/"
          className="flex min-w-0 shrink items-center gap-2"
          aria-label={`${BRAND.name} — الرئيسية`}
        >
          <img
            src={ASSETS.logo}
            alt=""
            className="size-8 rounded-lg object-contain sm:size-10"
          />
          <span
            className={cn(
              "truncate font-display text-base font-extrabold sm:text-xl",
              isHeroMode ? "text-white drop-shadow-sm" : "text-brand-red",
            )}
          >
            {BRAND.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="التنقل">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? location.pathname === "/"
                : link.href.startsWith("/#")
                  ? false
                  : location.pathname === link.href

            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "group relative px-4 py-2.5 text-sm font-medium transition-colors",
                  isHeroMode
                    ? "text-white/90 hover:text-white"
                    : isActive
                      ? "text-brand-red"
                      : "text-dark/75 hover:text-brand-red",
                )}
              >
                {link.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 bottom-0.5 h-0.5 origin-center rounded-full transition-transform duration-300 ease-out",
                    isHeroMode ? "bg-white" : "bg-brand-red",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            )
          })}
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
            className={cn(isHeroMode && "border-white/80 text-white hover:bg-white/15")}
            asChild
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <span className="relative z-10 inline-flex items-center justify-center gap-2">
                <img src={ASSETS.whatsappIcon} alt="" className="size-4" />
                اطلب الان 
              </span>
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-0.5 sm:gap-1 lg:hidden">
          <NavIconButton
            href={whatsappUrl}
            label="واتساب"
            className={cn(
              isHeroMode
                ? "bg-white/15 text-white hover:bg-white/25"
                : "bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20",
            )}
          >
            <img src={ASSETS.whatsappIcon} alt="" className="size-5" />
          </NavIconButton>

          <NavIconButton
            onClick={() => setCategoriesPickerOpen(true)}
            label="أقسام المنتجات"
            active={isProducts}
            className={cn(
              isHeroMode
                ? "bg-white/15 text-white hover:bg-white/25"
                : "bg-cream text-dark hover:bg-brand-red/10",
            )}
          >
            <LayoutGrid className="size-5" />
          </NavIconButton>

          <NavIconButton
            onClick={() => setCartOpen(true)}
            label="فتح السلة"
            className={cn(
              isHeroMode
                ? "bg-white/15 text-white hover:bg-white/25"
                : "bg-cream text-dark hover:bg-brand-red/10",
            )}
          >
            <ShoppingBag className="size-5" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -end-0.5 flex size-4 items-center justify-center rounded-full bg-brand-red text-[9px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </NavIconButton>
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
                  className="group relative rounded-xl px-4 py-3 text-base font-medium text-dark/80 transition-colors hover:text-brand-red"
                >
                  {link.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-4 bottom-2 h-0.5 origin-center scale-x-0 rounded-full bg-brand-red transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
