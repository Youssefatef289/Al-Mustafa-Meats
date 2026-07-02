import { ASSETS, buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function WhatsAppFloatButton() {
  const whatsappUrl = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-8 start-8 z-40 hidden size-16 items-center justify-center rounded-full bg-[#25D366] shadow-soft-lg transition-transform hover:scale-110 md:flex",
        "motion-reduce:hover:scale-100 animate-pulse-ring",
      )}
      aria-label="تواصل معنا على واتساب"
    >
      <img src={ASSETS.whatsappIcon} alt="" className="size-10" />
    </a>
  )
}
