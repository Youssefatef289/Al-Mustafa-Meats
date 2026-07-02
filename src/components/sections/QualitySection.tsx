import { MotionWrapper } from "@/components/shared/MotionWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"

const STEPS = [
  {
    title: "ذبح واختيار اللحم",
    description: "لحوم بلدي طازة من مصادر موثوقة — اختيار يومي للجودة",
    image:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&h=350&fit=crop&auto=format&fm=webp&q=80",
    alt: "اختيار لحوم بلدي طازة",
  },
  {
    title: "تغليف فاكيوم وتبريد",
    description: "تغليف محكم يحافظ على الطزاجة وسلسلة تبريد كاملة",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&h=350&fit=crop&auto=format&fm=webp&q=80",
    alt: "تغليف فاكيوم للحوم",
  },
  {
    title: "توصيل بعربية مبرّدة",
    description: "من الجزارة لباب بيتك — توصيل مبرد لكل القاهرة والجيزة",
    image:
      "https://images.unsplash.com/photo-1588347818035-8a046a390de0?w=500&h=350&fit=crop&auto=format&fm=webp&q=80",
    alt: "توصيل لحوم مبردة",
  },
] as const

export function QualitySection() {
  return (
    <section
      className="section-padding bg-dark"
      aria-labelledby="quality-heading"
    >
      <div className="container-main">
        <SectionHeading
          title="من الجزارة لباب بيتك.. بأعلى معايير الجودة"
          light
        />

        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <MotionWrapper key={step.title} delay={index * 0.08}>
              <article className="overflow-hidden rounded-2xl bg-white/5">
                <div className="aspect-[10/7] overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.alt}
                    loading="lazy"
                    className="size-full object-cover opacity-90"
                  />
                </div>
                <div className="p-5">
                  <h3
                    id={index === 0 ? "quality-heading" : undefined}
                    className="font-display text-lg font-bold text-white"
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/65">{step.description}</p>
                </div>
              </article>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
