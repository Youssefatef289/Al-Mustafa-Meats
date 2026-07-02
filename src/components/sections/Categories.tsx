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

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {PRODUCT_CATEGORIES.filter((c) => c.id !== "all").map((cat, index) => (
            <MotionWrapper key={cat.id} delay={index * 0.06}>
              <Link
                to={`/products?category=${cat.id}`}
                className="group block overflow-hidden rounded-2xl bg-white shadow-soft transition-all hover:scale-[1.02] hover:shadow-card-hover"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={imageSrc(cat.image)}
                    alt={cat.label}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3
                    id={index === 0 ? "categories-heading" : undefined}
                    className="font-display text-lg font-bold text-dark"
                  >
                    {cat.label}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-red">
                    اعرض المنتجات
                    <ArrowLeft className="size-4" />
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
