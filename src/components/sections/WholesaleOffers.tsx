import { useState, type FormEvent } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionWrapper } from "@/components/shared/MotionWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { buildWhatsAppUrl } from "@/lib/constants"

export function WholesaleOffers() {
  const [form, setForm] = useState({
    businessName: "",
    businessType: "",
    phone: "",
    meatType: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const message = [
      "السلام عليكم، عايز أطلب عرض سعر جملة من لحوم المصطفى",
      "",
      `اسم النشاط: ${form.businessName}`,
      `نوع النشاط: ${form.businessType}`,
      `رقم التليفون: ${form.phone}`,
      `نوع اللحوم المطلوبة: ${form.meatType}`,
    ].join("\n")

    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer")
    setSubmitted(true)
  }

  return (
    <section
      id="wholesale"
      className="section-padding bg-cream"
      aria-labelledby="wholesale-heading"
    >
      <div className="container-main">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <MotionWrapper>
            <SectionHeading
              title="عندك مطعم أو محل مأكولات؟"
              subtitle="أسعار جملة مميزة للمطاعم والكافيهات والفنادق — تواصل معانا لعرض سعر مخصص"
              centered={false}
            />
            <p className="text-sm text-dark/60">
              بنوفر كميات كبيرة من لحوم بلدي طازة ومجمدات بأسعار تنافسية، مع
              توصيل مبرد ومواعيد ثابتة تناسب نشاطك.
            </p>
          </MotionWrapper>

          <MotionWrapper delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-white p-6 shadow-soft sm:p-8"
            >
              <h3
                id="wholesale-heading"
                className="mb-6 font-display text-lg font-bold text-dark"
              >
                اطلب عرض سعر
              </h3>

              <div className="space-y-4">
                {[
                  { key: "businessName", label: "اسم النشاط", placeholder: "مثال: مطعم الكبابجي" },
                  { key: "businessType", label: "نوع النشاط", placeholder: "مطعم / كافيه / فندق / محل" },
                  { key: "phone", label: "رقم التليفون", placeholder: "01XXXXXXXXX" },
                  { key: "meatType", label: "نوع اللحوم المطلوبة", placeholder: "ضأن / كندوز / مصنعات..." },
                ].map((field) => (
                  <div key={field.key}>
                    <label
                      htmlFor={field.key}
                      className="mb-1.5 block text-sm font-medium text-dark"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.key}
                      type="text"
                      required
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                      className="w-full rounded-xl border border-dark/15 bg-cream px-4 py-2.5 text-sm transition-colors focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                    />
                  </div>
                ))}
              </div>

              <Button type="submit" variant="default" className="mt-6 w-full" size="lg">
                <Send className="size-4" />
                {submitted ? "جاري فتح واتساب..." : "اطلب عرض سعر"}
              </Button>
            </form>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
