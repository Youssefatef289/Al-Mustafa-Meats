import { Link } from "react-router-dom"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionWrapper } from "@/components/shared/MotionWrapper"
import { ASSETS, BRAND, buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/constants"

export function Hero() {
  const whatsappUrl = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-label="القسم الرئيسي"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="size-full object-cover"
          poster="/images/Logo.png"
        >
          <source src={ASSETS.heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-dark/40" />
      </div>

      <div className="container-main relative z-10 px-4 pb-20 pt-24 text-center sm:px-6 sm:pt-28 lg:px-8">
        <MotionWrapper className="mx-auto max-w-2xl">
          <span className="mb-5 inline-block rounded-full bg-brand-red px-4 py-1.5 text-sm font-bold text-white shadow-lg">
            دليفري واستلام من ٣ فروع — بني سويف
          </span>

          <h1 className="font-display text-3xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            {BRAND.name}
            <br />
            <span className="text-amber">{BRAND.tagline}</span>
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-base text-white/90 sm:text-lg">
            لحوم، مشويات، دواجن ومصنعات طازة يوميًا — اطلب أونلاين بسهولة
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button variant="default" size="lg" className="rounded-full shadow-lg" asChild>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-5" />
                اطلب دلوقتي
              </a>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full" asChild>
              <Link to="/products">المنتجات</Link>
            </Button>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
