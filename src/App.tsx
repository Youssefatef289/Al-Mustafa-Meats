import { Routes, Route, useLocation } from "react-router-dom"
import { ScrollToTop } from "@/components/layout/ScrollToTop"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloatButton } from "@/components/layout/WhatsAppFloatButton"
import { PhoneFloatButton } from "@/components/layout/PhoneFloatButton"
import { CartToast } from "@/components/layout/CartToast"
import { MobileBottomNav } from "@/components/layout/MobileBottomNav"
import { OrderSummaryBar } from "@/components/layout/OrderSummaryBar"
import { CartCheckout } from "@/components/cart/CartCheckout"
import { CategoriesPicker } from "@/components/layout/CategoriesPicker"
import { BackToTopButton } from "@/components/layout/BackToTopButton"
import { Hero } from "@/components/sections/Hero"
import { TrustBar } from "@/components/sections/TrustBar"
import { Categories } from "@/components/sections/Categories"
import { HomeProducts } from "@/components/sections/HomeProducts"
import { HowToOrder } from "@/components/sections/HowToOrder"
import { WhyUs } from "@/components/sections/WhyUs"
import { Gallery } from "@/components/sections/Gallery"
import { Testimonials } from "@/components/sections/Testimonials"
import { FAQ } from "@/components/sections/FAQ"
import { ProductsPage } from "@/pages/ProductsPage"
import { useCartStore } from "@/store/cartStore"
import { cn } from "@/lib/utils"

function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Categories />
      <HomeProducts />
      <HowToOrder />
      <WhyUs />
      <Gallery />
      <Testimonials />
      <FAQ />
    </>
  )
}

function App() {
  const hasItems = useCartStore((s) => s.items.length > 0)
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main
        className={cn(
          "pb-16 md:pb-0",
          hasItems && "md:pb-20",
          location.pathname !== "/" && "pt-[4.5rem] sm:pt-20",
        )}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </main>
      <Footer />
      <OrderSummaryBar />
      <CartCheckout />
      <CategoriesPicker />
      <CartToast />
      <MobileBottomNav />
      <BackToTopButton />
      <WhatsAppFloatButton />
      <PhoneFloatButton />
    </>
  )
}

export default App
