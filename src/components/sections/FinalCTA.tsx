import { Button } from "@/components/ui/button"
import { MotionWrapper } from "@/components/shared/MotionWrapper"
import { FacebookIcon, TikTokIcon } from "@/components/shared/SocialIcons"
import {
  ASSETS,
  BRAND,
  PHONES,
  buildWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/constants"

export function FinalCTA() {
  const whatsappUrl = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)

  return (
    <section
      className="bg-brand-red py-20 sm:py-24"
      aria-labelledby="final-cta-heading"
    >
      <div className="container-main px-4 text-center sm:px-6 lg:px-8">
        <MotionWrapper>
          <h2
            id="final-cta-heading"
            className="font-display text-3xl font-black text-white sm:text-4xl lg:text-5xl"
          >
            جاهز تطلب لحمتك الطازة؟
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-white/85">
            اطلب دلوقتي على واتساب — فريقنا جاهز يرد عليك ويأكد طلبك
          </p>

          <Button
            variant="outline"
            size="xl"
            className="mt-8 border-white bg-white text-brand-red hover:bg-white/90"
            asChild
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <span className="relative z-10 inline-flex items-center justify-center gap-2">
                <img src={ASSETS.whatsappIcon} alt="" className="size-6" />
                اطلب على واتساب
              </span>
            </a>
          </Button>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-white">
            <a
              href={`tel:+20${PHONES.main.slice(1)}`}
              className="tabular-nums font-bold hover:opacity-80"
              dir="ltr"
            >
              {PHONES.main}
            </a>
            <span className="text-white/40">|</span>
            <a
              href={whatsappUrl}
              className="tabular-nums font-bold hover:opacity-80"
              dir="ltr"
            >
              {PHONES.whatsapp}
            </a>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <a
              href={BRAND.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
              aria-label="فيسبوك"
            >
              <FacebookIcon className="size-5" />
            </a>
            <a
              href={BRAND.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
              aria-label="تيك توك"
            >
              <TikTokIcon className="size-5" />
            </a>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
