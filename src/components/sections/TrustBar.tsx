import { ShieldCheck, Truck, Clock, BadgeCheck } from "lucide-react"
import { MotionWrapper } from "@/components/shared/MotionWrapper"

const TRUST_ITEMS = [
  { icon: ShieldCheck, text: "لحوم بلدي 100% من مصادر موثوقة" },
  { icon: Truck, text: "توصيل داخل بني سويف" },
  { icon: Clock, text: "استلام من الفرع أو دليفري" },
  { icon: BadgeCheck, text: "ضمان الجودة أو استرجاع الفلوس" },
] as const

export function TrustBar() {
  return (
    <section className="border-y border-dark/8 bg-white py-8" aria-label="مميزات الثقة">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {TRUST_ITEMS.map((item, index) => (
            <MotionWrapper key={item.text} delay={index * 0.05}>
              <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-start">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-red/10">
                  <item.icon className="size-6 text-brand-red" />
                </div>
                <p className="text-sm font-medium leading-snug text-dark/80">
                  {item.text}
                </p>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
