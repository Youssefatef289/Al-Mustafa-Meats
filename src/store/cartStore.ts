import { create } from "zustand"
import { BRANCHES, PAYMENT_METHODS, buildWhatsAppUrl } from "@/lib/constants"
import {
  calcLineTotal,
  formatWeight,
  type PriceUnit,
} from "@/data/products"

export interface CartItem {
  cartKey: string
  productId: string
  name: string
  image: string
  pricePerUnit: number
  priceUnit: PriceUnit
  weight: number
  lineTotal: number | null
}

export type DeliveryType = "delivery" | "pickup"
export type PaymentMethodId = (typeof PAYMENT_METHODS)[number]["id"]

export interface CheckoutData {
  customerName: string
  phone: string
  deliveryType: DeliveryType
  address: string
  branchId: string
  pickupTime: string
  paymentMethod: PaymentMethodId
  notes: string
}

interface CartState {
  items: CartItem[]
  checkout: CheckoutData
  isCartOpen: boolean
  toast: string | null
  addItem: (item: Omit<CartItem, "cartKey" | "lineTotal">) => void
  removeItem: (cartKey: string) => void
  clearCart: () => void
  setCheckout: (data: Partial<CheckoutData>) => void
  setCartOpen: (open: boolean) => void
  hideToast: () => void
  totalItems: () => number
  totalPrice: () => number | null
  buildWhatsAppMessage: () => string
  getWhatsAppUrl: () => string
}

const defaultCheckout: CheckoutData = {
  customerName: "",
  phone: "",
  deliveryType: "delivery",
  address: "",
  branchId: BRANCHES[0].id,
  pickupTime: "",
  paymentMethod: "cash_on_delivery",
  notes: "",
}

let toastTimer: ReturnType<typeof setTimeout> | null = null

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  checkout: { ...defaultCheckout },
  isCartOpen: false,
  toast: null,

  addItem: (item) => {
    const cartKey = `${item.productId}-${item.weight}`
    const lineTotal = calcLineTotal(item.pricePerUnit, item.weight)

    set((state) => {
      const existing = state.items.find((i) => i.cartKey === cartKey)
      const items = existing
        ? state.items.map((i) =>
            i.cartKey === cartKey
              ? {
                  ...i,
                  weight: i.weight + item.weight,
                  lineTotal: calcLineTotal(
                    i.pricePerUnit,
                    i.weight + item.weight,
                  ),
                }
              : i,
          )
        : [...state.items, { ...item, cartKey, lineTotal }]

      return { items }
    })

    const message = `تمت إضافة ${item.name} للسلة ✓`
    if (toastTimer) clearTimeout(toastTimer)
    set({ toast: message })
    toastTimer = setTimeout(() => set({ toast: null }), 2200)
  },

  removeItem: (cartKey) => {
    set((state) => ({
      items: state.items.filter((i) => i.cartKey !== cartKey),
    }))
  },

  clearCart: () =>
    set({ items: [], checkout: { ...defaultCheckout }, isCartOpen: false }),

  setCheckout: (data) =>
    set((state) => ({ checkout: { ...state.checkout, ...data } })),

  setCartOpen: (open) => set({ isCartOpen: open }),

  hideToast: () => {
    if (toastTimer) clearTimeout(toastTimer)
    set({ toast: null })
  },

  totalItems: () => get().items.length,

  totalPrice: () => {
    const { items } = get()
    if (items.some((i) => i.lineTotal === null)) return null
    return items.reduce((sum, i) => sum + (i.lineTotal ?? 0), 0)
  },

  buildWhatsAppMessage: () => {
    const { items, checkout } = get()
    const paymentLabel =
      PAYMENT_METHODS.find((p) => p.id === checkout.paymentMethod)?.label ?? ""
    const branch = BRANCHES.find((b) => b.id === checkout.branchId)

    const productLines = items.map((item) => {
      const weightLabel = formatWeight(item.weight, item.priceUnit)
      const price =
        item.lineTotal !== null ? ` — ${item.lineTotal} جنيه` : ""
      return `• ${item.name} (${weightLabel})${price}`
    })

    const total = get().totalPrice()

    const lines = [
      "السلام عليكم، طلب جديد من موقع لحوم المصطفى 🥩",
      "",
      "📦 المنتجات:",
      ...productLines,
      total !== null ? `\n💰 الإجمالي: ${total} جنيه` : "",
      "",
      `👤 الاسم: ${checkout.customerName || "—"}`,
      `📱 التليفون: ${checkout.phone || "—"}`,
      "",
      checkout.deliveryType === "delivery"
        ? `🚚 توصيل دليفري\n📍 العنوان: ${checkout.address || "—"}`
        : `🏪 استلام من الفرع: ${branch?.name ?? "—"}\n📍 ${branch?.address ?? ""}\n⏰ الميعاد: ${checkout.pickupTime || "—"}`,
      "",
      `💳 طريقة الدفع: ${paymentLabel}`,
      checkout.notes ? `📝 ملاحظات: ${checkout.notes}` : "",
    ].filter(Boolean)

    return lines.join("\n")
  },

  getWhatsAppUrl: () => buildWhatsAppUrl(get().buildWhatsAppMessage()),
}))
