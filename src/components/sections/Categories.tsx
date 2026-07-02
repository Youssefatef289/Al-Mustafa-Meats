import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { imageSrc } from "@/lib/images"
import { MotionWrapper } from "@/components/shared/MotionWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { PRODUCT_CATEGORIES } from "@/data/products"

export function Categories() {
  return (
    <section className="section-padding bg-cream" aria-labelledby="categories-heading">
      <div className="container-main">
        <SectionHeading title="اختار قسمك" />

        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {PRODUCT_CATEGORIES.filter((c) => c.id !== "all").map((cat, index) => (
            <MotionWrapper key={cat.id} delay={index * 0.05}>
              <Link
                to={`/products?category=${cat.id}`}
                className="group block overflow-hidden rounded-xl bg-white transition-transform hover:scale-[1.02] active:scale-[0.98] sm:rounded-2xl"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={imageSrc(cat.image)}
                    alt={cat.label}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-2 sm:p-3">
                  <h3
                    id={index === 0 ? "categories-heading" : undefined}
                    className="line-clamp-2 font-display text-[11px] font-bold leading-tight text-dark sm:text-sm"
                  >
                    {cat.label}
                  </h3>
                  <span className="mt-1.5 hidden items-center gap-1 text-xs font-semibold text-brand-red sm:inline-flex">
                    اعرض
                    <ArrowLeft className="size-3" />
                  </span>
                </div>
              </Link>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
