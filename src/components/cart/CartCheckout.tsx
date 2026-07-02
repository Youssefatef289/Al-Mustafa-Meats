import { useState, useEffect, type FormEvent, type ReactNode } from "react"
import { MessageCircle, ShoppingBag, Trash2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useCartStore } from "@/store/cartStore"
import { BRANCHES, PAYMENT_METHODS } from "@/lib/constants"
import { PRODUCTS, formatWeight } from "@/data/products"
import { imageSrc } from "@/lib/images"
import { cn } from "@/lib/utils"

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < breakpoint,
  )

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    setIsMobile(mq.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [breakpoint])

  return isMobile
}

function getItemImage(productId: string, fallback?: string): string {
  if (fallback) return fallback
  const product = PRODUCTS.find((p) => p.id === productId)
  return product?.image ?? "/images/Logo.png"
}

export function CartCheckout() {
  const items = useCartStore((s) => s.items)
  const checkout = useCartStore((s) => s.checkout)
  const isOpen = useCartStore((s) => s.isCartOpen)
  const setCartOpen = useCartStore((s) => s.setCartOpen)
  const setCheckout = useCartStore((s) => s.setCheckout)
  const removeItem = useCartStore((s) => s.removeItem)
  const clearCart = useCartStore((s) => s.clearCart)
  const totalPrice = useCartStore((s) => s.totalPrice())
  const getWhatsAppUrl = useCartStore((s) => s.getWhatsAppUrl)
  const [step, setStep] = useState<"cart" | "checkout">("cart")
  const isMobile = useIsMobile()

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault()
    if (!checkout.customerName || !checkout.phone) return
    if (checkout.deliveryType === "delivery" && !checkout.address) return
    if (checkout.deliveryType === "pickup" && !checkout.pickupTime) return

    window.open(getWhatsAppUrl(), "_blank", "noopener,noreferrer")
    clearCart()
    setStep("cart")
  }

  const handleOpenChange = (open: boolean) => {
    setCartOpen(open)
    if (!open) setStep("cart")
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        side={isMobile ? "full" : "left"}
        className={cn("gap-0 overflow-hidden p-0", isMobile && "bg-cream")}
      >
        <SheetHeader className="shrink-0">
          <SheetTitle className="flex items-center gap-2 text-brand-red">
            <ShoppingBag className="size-5" />
            {step === "cart" ? `سلة الطلب (${items.length})` : "إتمام الطلب"}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-1 flex-col overflow-hidden bg-white">
          {step === "cart" ? (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-cream">
                      <Package className="size-8 text-dark/30" />
                    </div>
                    <p className="font-semibold text-dark">السلة فاضية</p>
                    <p className="mt-1 text-sm text-dark/50">أضف منتجات من قائمة المنتجات</p>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {items.map((item) => {
                      const img = getItemImage(item.productId, item.image)
                      const unitLabel =
                        item.priceUnit === "piece" ? "جنيه/قطعة" : "جنيه/كيلو"

                      return (
                        <li
                          key={item.cartKey}
                          className="flex gap-3 rounded-2xl border border-dark/8 bg-cream p-3"
                        >
                          <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-white">
                            <img
                              src={imageSrc(img)}
                              alt={item.name}
                              className="size-full object-cover"
                            />
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-bold text-dark leading-snug">
                                {item.name}
                              </p>
                              <button
                                type="button"
                                onClick={() => removeItem(item.cartKey)}
                                className="shrink-0 rounded-full p-1.5 text-dark/40 hover:bg-white hover:text-brand-red"
                                aria-label={`حذف ${item.name}`}
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </div>
                            <p className="mt-1 text-xs text-dark/55">
                              {formatWeight(item.weight, item.priceUnit)}
                            </p>
                            <p className="mt-0.5 text-xs text-dark/45">
                              {item.pricePerUnit} {unitLabel}
                            </p>
                            {item.lineTotal !== null && (
                              <p className="mt-auto pt-2 tabular-nums text-base font-extrabold text-brand-red">
                                {item.lineTotal} جنيه
                              </p>
                            )}
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>

              {items.length > 0 && (
                <div className="shrink-0 border-t border-dark/10 bg-white p-4">
                  {totalPrice !== null && (
                    <div className="mb-4 flex items-center justify-between rounded-xl bg-brand-red px-4 py-3 text-white">
                      <span className="font-semibold">الإجمالي</span>
                      <span className="tabular-nums text-xl font-black">
                        {totalPrice} جنيه
                      </span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      className="flex-1 rounded-xl"
                      onClick={clearCart}
                    >
                      مسح
                    </Button>
                    <Button
                      className="flex-1 rounded-xl"
                      onClick={() => setStep("checkout")}
                    >
                      متابعة الدفع
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <form
              onSubmit={handleCheckout}
              className="flex flex-1 flex-col overflow-hidden"
            >
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <button
                  type="button"
                  onClick={() => setStep("cart")}
                  className="mb-4 flex items-center gap-1 text-sm font-semibold text-brand-red"
                >
                  ← رجوع للسلة
                </button>

                {/* Order summary mini */}
                <div className="mb-5 rounded-xl border border-dark/10 bg-cream p-3">
                  <p className="mb-2 text-xs font-bold text-dark/60">ملخص الطلب</p>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item.cartKey} className="flex items-center gap-2 text-sm">
                        <img
                          src={imageSrc(getItemImage(item.productId, item.image))}
                          alt=""
                          className="size-10 rounded-lg object-cover"
                        />
                        <span className="flex-1 truncate text-dark">{item.name}</span>
                        {item.lineTotal !== null && (
                          <span className="tabular-nums font-semibold text-brand-red">
                            {item.lineTotal} ج
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <Field label="الاسم" required>
                    <input
                      required
                      value={checkout.customerName}
                      onChange={(e) => setCheckout({ customerName: e.target.value })}
                      className={inputClass}
                      placeholder="اسمك الكامل"
                    />
                  </Field>

                  <Field label="رقم التليفون" required>
                    <input
                      required
                      type="tel"
                      value={checkout.phone}
                      onChange={(e) => setCheckout({ phone: e.target.value })}
                      className={inputClass}
                      placeholder="01XXXXXXXXX"
                      dir="ltr"
                    />
                  </Field>

                  <Field label="طريقة الاستلام" required>
                    <div className="flex gap-2">
                      {(
                        [
                          { id: "delivery", label: "دليفري" },
                          { id: "pickup", label: "استلام من الفرع" },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setCheckout({ deliveryType: opt.id })}
                          className={cn(
                            "flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all",
                            checkout.deliveryType === opt.id
                              ? "bg-brand-red text-white"
                              : "bg-cream text-dark/70",
                          )}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </Field>

                  {checkout.deliveryType === "delivery" ? (
                    <Field label="العنوان" required>
                      <textarea
                        required
                        rows={2}
                        value={checkout.address}
                        onChange={(e) => setCheckout({ address: e.target.value })}
                        className={inputClass}
                        placeholder="العنوان بالتفصيل"
                      />
                    </Field>
                  ) : (
                    <>
                      <Field label="الفرع" required>
                        <select
                          value={checkout.branchId}
                          onChange={(e) => setCheckout({ branchId: e.target.value })}
                          className={inputClass}
                        >
                          {BRANCHES.map((b) => (
                            <option key={b.id} value={b.id}>
                              {b.name} — {b.address}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="ميعاد الاستلام" required>
                        <input
                          required
                          type="datetime-local"
                          value={checkout.pickupTime}
                          onChange={(e) => setCheckout({ pickupTime: e.target.value })}
                          className={inputClass}
                        />
                      </Field>
                    </>
                  )}

                  <Field label="طريقة الدفع" required>
                    <div className="space-y-2">
                      {PAYMENT_METHODS.map((method) => (
                        <label
                          key={method.id}
                          className={cn(
                            "flex cursor-pointer items-center gap-3 rounded-xl border-2 bg-white px-4 py-3 transition-all",
                            checkout.paymentMethod === method.id
                              ? "border-brand-red bg-brand-red/5"
                              : "border-dark/10",
                          )}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={checkout.paymentMethod === method.id}
                            onChange={() => setCheckout({ paymentMethod: method.id })}
                            className="accent-brand-red"
                          />
                          <span className="text-sm font-medium">{method.label}</span>
                        </label>
                      ))}
                    </div>
                  </Field>

                  <Field label="ملاحظات (اختياري)">
                    <textarea
                      rows={2}
                      value={checkout.notes}
                      onChange={(e) => setCheckout({ notes: e.target.value })}
                      className={inputClass}
                      placeholder="أي ملاحظات إضافية..."
                    />
                  </Field>
                </div>
              </div>

              <div className="shrink-0 border-t border-dark/10 bg-white p-4">
                <Button type="submit" variant="whatsapp" size="lg" className="w-full rounded-xl">
                  <MessageCircle className="size-5" />
                  إرسال الطلب على واتساب
                </Button>
              </div>
            </form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-dark">
        {label}
        {required && <span className="text-brand-red"> *</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  "w-full rounded-xl border border-dark/15 bg-white px-4 py-2.5 text-sm transition-colors focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
