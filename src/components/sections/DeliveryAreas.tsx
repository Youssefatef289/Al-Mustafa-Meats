import { MapPin } from "lucide-react"
import { MotionWrapper } from "@/components/shared/MotionWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { BRANCHES } from "@/lib/constants"

export function DeliveryAreas() {
  return (
    <section
      id="delivery"
      className="section-padding bg-white"
      aria-labelledby="delivery-heading"
    >
      <div className="container-main">
        <SectionHeading
          title="بنوصل لبني سويف والقاهرة والجيزة"
          subtitle="توصيل مبرد — الحد الأدنى للطلب يختلف حسب المنطقة"
        />

        <MotionWrapper>
          <div className="mb-8 flex items-center justify-center gap-2 rounded-2xl bg-cream px-4 py-3 text-center text-sm text-dark/70">
            <MapPin className="size-5 shrink-0 text-brand-red" />
            <span>توصيل مبرد (cold chain) طول الطريق</span>
          </div>
        </MotionWrapper>

        <div className="grid gap-4 sm:grid-cols-3">
          {BRANCHES.map((branch, index) => (
            <MotionWrapper key={branch.id} delay={index * 0.08}>
              <div className="rounded-2xl border border-dark/8 bg-cream p-5 shadow-soft">
                <h3
                  id={index === 0 ? "delivery-heading" : undefined}
                  className="font-display font-bold text-brand-red"
                >
                  {branch.name}
                </h3>
                <p className="mt-2 text-sm text-dark/70">{branch.address}</p>
              </div>
            </MotionWrapper>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-dark/50">
          مواعيد التوصيل: يوميًا من 10 ص لـ 10 م — هنأكدلك الميعاد على واتساب
        </p>
      </div>
    </section>
  )
}
