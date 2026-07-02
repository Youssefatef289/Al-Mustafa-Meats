export const WHATSAPP_NUMBER = "201080702828"

export const PHONES = {
  main: "01060078301",
  whatsapp: "01080702828",
  secondary: "01080702929",
} as const

export const BRAND = {
  name: "لحوم المصطفى",
  tagline: "المضمون فى عالم اللحوم",
  parentBrand: "مطعم مشويات لحوم المصطفى",
  email: "info@almustafameats.com",
  workingHours: "يوميًا: 9 ص — 11 م",
  facebook: "https://www.facebook.com/almostafameat",
  instagram: "https://instagram.com/",
} as const

export const BRANCHES = [
  {
    id: "branch-1",
    name: "الفرع الأول",
    address: "بني سويف - صلاح سالم - شارع المدارس",
  },
  {
    id: "branch-2",
    name: "الفرع الثاني",
    address: "بني سويف - الحمرايا - أمام مترو ماكس",
  },
  {
    id: "branch-3",
    name: "الفرع الثالث",
    address: "بني سويف - الحي الأول شارع الأندلس بجوار سوبر ماركت تميم",
  },
] as const

export const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "المنتجات" },
  { href: "/#about", label: "عن الجزارة" },
  { href: "/#contact", label: "تواصل معنا" },
] as const

export const PAYMENT_METHODS = [
  { id: "instapay", label: "إنستا باي" },
  { id: "vodafone_cash", label: "فودافون كاش" },
  { id: "cash_on_delivery", label: "نقدي عند الاستلام" },
] as const

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "السلام عليكم، عايز أطلب من لحوم المصطفى 🥩"

export function offerOrderMessage(offerName: string): string {
  return `السلام عليكم، عايز أحجز: ${offerName} من لحوم المصطفى`
}

export const ASSETS = {
  logo: "/images/Logo.png",
  heroVideo: "/images/Hero.mp4",
  whatsappIcon: "/images/icon-whatsapp.png",
} as const

export function productImageUrl(relativePath: string): string {
  return `/images/${relativePath.split("/").map(encodeURIComponent).join("/")}`
}
