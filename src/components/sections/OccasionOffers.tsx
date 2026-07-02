import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionWrapper } from "@/components/shared/MotionWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { OCCASION_OFFERS } from "@/data/products"
import { imageSrc } from "@/lib/images"
import { buildWhatsAppUrl, offerOrderMessage } from "@/lib/constants"

export function OccasionOffers() {
  return (
    <section
      id="offers"
      className="section-padding bg-[#F5E6D0]"
      aria-labelledby="offers-heading"
    >
      <div className="container-main">
        <SectionHeading
          title="عندك عزومة أو مناسبة؟"
          subtitle="بنجهزلك دبايح كاملة وتقطيع حسب الطلب لأي مناسبة (عيد الأضحى، سبوع، خطوبة، عزومة مشاوي)"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {OCCASION_OFFERS.map((offer, index) => (
            <MotionWrapper key={offer.id} delay={index * 0.08}>
              <article className="overflow-hidden rounded-2xl bg-white shadow-soft transition-all hover:scale-[1.02] hover:shadow-card-hover">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={imageSrc(offer.image)}
                    alt={offer.imageAlt}
                    loading="lazy"
                    className="size-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3
                    id={index === 0 ? "offers-heading" : undefined}
                    className="font-display text-xl font-bold text-dark"
                  >
                    {offer.name}
                  </h3>
                  <p className="mt-2 text-sm text-dark/65">{offer.description}</p>
                </div>
              </article>
            </MotionWrapper>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="default" size="lg" asChild>
            <a
              href={buildWhatsAppUrl(offerOrderMessage("عرض المناسبة"))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-5" />
              احجز عرض المناسبة
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
