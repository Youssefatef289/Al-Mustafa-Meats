export interface Testimonial {
  id: string
  name: string
  rating: number
  comment: string
  isPlaceholder: boolean
}

/** ⚠️ استبدل بآراء عملاء حقيقية قبل النشر */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "[اسم العميل — placeholder]",
    rating: 5,
    comment:
      "[تعليق توضيحي — مثال: \"اللحمة وصلت طازة جدًا والتقطيع ممتاز. هطلب تاني أكيد.\"]",
    isPlaceholder: true,
  },
  {
    id: "2",
    name: "[اسم العميل — placeholder]",
    rating: 5,
    comment:
      "[تعليق توضيحي — مثال: \"الكفتة المصنعة عندهم أحسن حاجة جربتها.\"]",
    isPlaceholder: true,
  },
  {
    id: "3",
    name: "[اسم العميل — placeholder]",
    rating: 5,
    comment:
      "[تعليق توضيحي — مثال: \"التوصيل المبرد ممتاز واللحمة وصلت ساقعة.\"]",
    isPlaceholder: true,
  },
  {
    id: "4",
    name: "[اسم العميل — placeholder]",
    rating: 4,
    comment:
      "[تعليق توضيحي — مثال: \"حجزنا ذبيحة العيد وكل حاجة كانت تمام.\"]",
    isPlaceholder: true,
  },
]
