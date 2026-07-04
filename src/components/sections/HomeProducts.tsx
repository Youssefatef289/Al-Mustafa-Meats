import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/products/ProductCard"
import { MotionWrapper } from "@/components/shared/MotionWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { getProductsByCategory } from "@/data/products"

const HOME_PRODUCTS = getProductsByCategory("meats")
  .filter((p) => p.pricePerKg !== null)
  .slice(0, 6)

export function HomeProducts() {
  return (
    <section
      id="products-preview"
      className="section-padding bg-white"
      aria-labelledby="home-products-heading"
    >
      <div className="container-main">
        <SectionHeading
          title="منتجاتنا"
          subtitle="لحوم طازة يوميًا — اختار منتجك وحدد الوزن"
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {HOME_PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <MotionWrapper className="mt-8 text-center sm:mt-10">
          <Button variant="default" size="lg" asChild>
            <Link to="/products">
              <span className="relative z-10 inline-flex items-center justify-center gap-2">
                عرض كل المنتجات
                <ArrowLeft className="size-4" />
              </span>
            </Link>
          </Button>
        </MotionWrapper>
      </div>
    </section>
  )
}
