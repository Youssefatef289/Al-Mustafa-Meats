import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionWrapper } from "@/components/shared/MotionWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { GALLERY_IMAGES } from "@/data/products"
import { imageSrc } from "@/lib/images"
import { BRAND } from "@/lib/constants"

export function Gallery() {
  return (
    <section className="section-padding bg-white" aria-labelledby="gallery-heading">
      <div className="container-main">
        <SectionHeading title="معرض الصور" subtitle="شوف جودة لحومنا ومنتجاتنا" />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {GALLERY_IMAGES.map((img, index) => (
            <MotionWrapper key={img.id} delay={index * 0.04}>
              <div
                className={`overflow-hidden rounded-2xl shadow-soft ${
                  index === 0 ? "col-span-2 row-span-2 md:col-span-1 md:row-span-1" : ""
                }`}
              >
                <img
                  src={imageSrc(img.src)}
                  alt={img.alt}
                  loading="lazy"
                  id={index === 0 ? "gallery-heading" : undefined}
                  className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </MotionWrapper>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outlineDark" size="lg" asChild>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="size-4" />
              تابعنا على انستجرام
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
