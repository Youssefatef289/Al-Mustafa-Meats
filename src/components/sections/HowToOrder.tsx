import { MotionWrapper } from "@/components/shared/MotionWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"

const STEPS = [
  {
    step: 1,
    title: "اختار المنتجات وحدد الوزن",
    description: "تصفح الأقسام، حدد الكمية، والسعر بيتحدث تلقائيًا",
  },
  {
    step: 2,
    title: "أضف للسلة وأكّد الطلب",
    description: "املأ بياناتك واختر دليفري أو استلام من أقرب فرع — وبعدين أرسل الطلب على واتساب",
  },
  {
    step: 3,
    title: "استلم طلبك طازة",
    description: "بنوصلك لباب البيت داخل بني سويف، أو تستلم من الفرع في الميعاد اللي يناسبك",
  },
] as const

export function HowToOrder() {
  return (
    <section className="section-padding bg-white" aria-labelledby="howto-heading">
      <div className="container-main">
        <SectionHeading title="طريقة الطلب" subtitle="٣ خطوات بسيطة وطلبك يوصلك" />

        <div className="relative grid gap-8 md:grid-cols-3">
          <div
            className="absolute top-10 end-[16%] start-[16%] hidden h-0.5 bg-brand-red/20 md:block"
            aria-hidden="true"
          />

          {STEPS.map((step, index) => (
            <MotionWrapper key={step.step} delay={index * 0.1}>
              <div className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex size-16 items-center justify-center rounded-full bg-brand-red font-display text-2xl font-black text-white shadow-soft">
                  {step.step}
                </div>
                <h3
                  id={index === 0 ? "howto-heading" : undefined}
                  className="mt-5 font-display text-lg font-bold text-dark"
                >
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-dark/65">
                  {step.description}
                </p>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
