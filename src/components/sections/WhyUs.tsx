import { CheckCircle2 } from "lucide-react"
import { MotionWrapper } from "@/components/shared/MotionWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { BRAND } from "@/lib/constants"
import { imageSrc } from "@/lib/images"

const POINTS = [
  "لحوم بلدي 100% من مصدر موثوق",
  "ذبح يومي، مفيش تخزين",
  "تقطيع حسب الطلب بواسطة جزارين محترفين",
  "تغليف نظيف ومحكم يحافظ على الطزاجة",
  "رد سريع على الطلبات على واتساب",
] as const

const WHY_US_IMAGE = "/images/ليه تختار.jpg"

export function WhyUs() {
  return (
    <section
      id="about"
      className="section-padding bg-cream"
      aria-labelledby="whyus-heading"
    >
      <div className="container-main">
        <SectionHeading title={`ليه تختار ${BRAND.name}؟`} />

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <MotionWrapper>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={imageSrc(WHY_US_IMAGE)}
                alt={`${BRAND.name} — لحوم طازة بلدي`}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.1}>
            <ul className="space-y-4">
              {POINTS.map((point, index) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-red" />
                  <span
                    id={index === 0 ? "whyus-heading" : undefined}
                    className="text-base font-medium text-dark/85"
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
