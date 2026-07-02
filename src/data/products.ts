import catalog from "./productCatalog.json"

export type ProductCategoryId =
  | "all"
  | "offal"
  | "meats"
  | "grills"
  | "processed"
  | "sandwiches"

export type PriceUnit = "kg" | "piece"

export interface Product {
  id: string
  name: string
  categoryId: ProductCategoryId
  image: string
  pricePerKg: number | null
  priceUnit: PriceUnit
}

export interface ProductCategory {
  id: ProductCategoryId
  label: string
  folder: string
  image: string
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "all",
    label: "جميع المنتجات",
    folder: "",
    image: "/images/قسم اللحوم/لحم مفروم 420.jpg",
  },
  {
    id: "meats",
    label: "قسم اللحوم",
    folder: "قسم اللحوم",
    image: "/images/قسم اللحوم/استيك 450.webp",
  },
  {
    id: "grills",
    label: "مشويات",
    folder: "مشويات",
    image: "/images/مشويات/كفته 500.jpg",
  },
  {
    id: "processed",
    label: "مصنعات اللحوم",
    folder: "مصنعات اللحوم",
    image: "/images/مصنعات اللحوم/كفته 420.jpg",
  },
  {
    id: "offal",
    label: "فواكه المدبح",
    folder: "فواكه المدبح",
    image: "/images/فواكه المدبح/كوارع 300.jpg",
  },
  {
    id: "sandwiches",
    label: "السندوتشات",
    folder: "السندوتشات",
    image: "/images/السندوتشات/سندوتش برجر 40.jpg",
  },
]

export const PRODUCTS = catalog as Product[]

export function getProductsByCategory(categoryId: ProductCategoryId): Product[] {
  if (categoryId === "all") return PRODUCTS
  return PRODUCTS.filter((p) => p.categoryId === categoryId)
}

export function formatWeight(weight: number, unit: PriceUnit): string {
  if (unit === "piece") {
    return weight === 1 ? "قطعة واحدة" : `${weight} قطع`
  }
  if (weight === 0.25) return "ربع كيلو"
  if (weight === 0.5) return "نص كيلو"
  if (weight === 0.75) return "ثلاثة أرباع كيلو"
  return `${weight} كيلو`
}

export function calcLineTotal(price: number | null, weight: number): number | null {
  if (price === null) return null
  return Math.round(price * weight)
}

export const FAQ_ITEMS = [
  {
    id: "fresh-or-frozen",
    question: "اللحوم طازة ولا مجمدة؟",
    answer:
      "لحومنا الطازة بتتقطع يوميًا في الجزارة. المجمدات متاحة كفئة منفصلة ومُعلَّمة بوضوح. كل طلب طازة بيتغلف ويتبرد قبل التوصيل.",
  },
  {
    id: "quality-delivery",
    question: "إزاي بتحافظوا على الجودة أثناء التوصيل؟",
    answer:
      "بنستخدم تغليف فاكيوم وسلسلة تبريد (cold chain) من الجزارة لحد باب بيتك. العربيات مبرّدة والطلبات بتخرج في مواعيد محددة عشان نضمن الطزاجة.",
  },
  {
    id: "custom-cut",
    question: "ممكن أطلب تقطيع مخصص؟",
    answer:
      "أكيد! اكتب تفاصيل التقطيع في رسالة الواتساب أو اتصل بينا، وجزارينا المحترفين هيقطعوا حسب طلبك بالظبط.",
  },
  {
    id: "delivery-time",
    question: "إمتى بيوصل الطلب؟",
    answer:
      "التوصيل خلال 24-48 ساعة حسب المنطقة ووقت الطلب. هنأكدلك الميعاد على واتساب بعد ما تبعت الطلب.",
  },
  {
    id: "payment",
    question: "طرق الدفع المتاحة إيه؟",
    answer:
      "إنستا باي، فودافون كاش، ونقدي عند الاستلام. هنبلغك بالتفاصيل لما تأكد الطلب على واتساب.",
  },
  {
    id: "return",
    question: "ممكن أرجع أو أستبدل المنتج؟",
    answer:
      "لو في مشكلة في الجودة، تواصل معانا فورًا على واتساب وهنحل الموضوع — ضمان الجودة أو استرجاع الفلوس.",
  },
] as const

export const OCCASION_OFFERS = [
  {
    id: "lamb-sacrifice",
    name: "دبيحة ضأن كاملة",
    description: "ذبيحة ضأن بلدي كاملة مع التقطيع والتغليف والتوصيل المبرد",
    image: "/images/قسم اللحوم/ريش  ضانى 440.jpg",
    imageAlt: "دبيحة ضأن كاملة",
  },
  {
    id: "beef-sacrifice",
    name: "دبيحة كندوز",
    description: "ذبيحة كندوز بلدي — اختيار الوزن والتقطيع حسب الطلب",
    image: "/images/قسم اللحوم/لحم احمر 440.jpg",
    imageAlt: "دبيحة كندوز",
  },
  {
    id: "custom-cut",
    name: "تقطيع مخصص",
    description: "تقطيع حسب طلبك لأي مناسبة — عزومة، خطوبة، أو سبوع",
    image: "/images/قسم اللحوم/لحم مفروم 420.jpg",
    imageAlt: "تقطيع لحوم مخصص",
  },
] as const

export const GALLERY_IMAGES = [
  { id: "1", src: "/images/قسم اللحوم/ريش  ضانى 440.jpg", alt: "ريش ضاني" },
  { id: "2", src: "/images/مشويات/كفته 500.jpg", alt: "كفتة مشويات" },
  { id: "3", src: "/images/مصنعات اللحوم/برجر 380.jpg", alt: "برجر بلدي" },
  { id: "4", src: "/images/السندوتشات/سندوتش برجر 40.jpg", alt: "سندوتش برجر" },
  { id: "5", src: "/images/مشويات/حواوشى اسكندرانى   عادى 85.jpg", alt: "حواوشي" },
  { id: "6", src: "/images/فواكه المدبح/كوارع 300.jpg", alt: "كوارع" },
]
