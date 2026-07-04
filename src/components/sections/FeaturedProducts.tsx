import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/products/ProductCard"
import { MotionWrapper } from "@/components/shared/MotionWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { PRODUCTS } from "@/data/products"

const FEATURED = PRODUCTS.filter((p) => p.pricePerKg !== null).slice(0, 4)

export function FeaturedProducts() {
  return (
    <section
      id="products-preview"
      className="section-padding bg-white"
      aria-labelledby="featured-heading"
    >
      <div className="container-main">
        <SectionHeading title="الأكثر طلبًا" />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {FEATURED.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <MotionWrapper className="mt-10 text-center">
          <Button variant="default" size="lg" asChild>
            <Link to="/products">
              <span className="relative z-10 inline-flex items-center justify-center gap-2">
                كل المنتجات
                <ArrowLeft className="size-4" />
              </span>
            </Link>
          </Button>
        </MotionWrapper>
      </div>
    </section>
  )
}
