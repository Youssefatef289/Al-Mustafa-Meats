import { Link } from "react-router-dom"
import { Mail, MapPin, Phone } from "lucide-react"
import { FacebookIcon, TikTokIcon } from "@/components/shared/SocialIcons"
import {
  ASSETS,
  BRANCHES,
  BRAND,
  NAV_LINKS,
  PHONES,
  buildWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/constants"

export function Footer() {
  const whatsappUrl = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)
  const year = new Date().getFullYear()

  return (
    <footer
      id="contact"
      className="bg-dark pt-16 pb-8 text-white/80"
      aria-label="تذييل الموقع"
    >
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img src={ASSETS.logo} alt="" className="size-12 rounded-lg" />
              <span className="font-display text-xl font-extrabold text-brand-red">
                {BRAND.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              فرع اللحوم التابع لـ {BRAND.parentBrand}. لحوم بلدي طازة ومصنعة
              بجودة بريميوم.
            </p>
          </div>

          <div>
            <h3 className="font-display font-bold text-white">روابط سريعة</h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors hover:text-brand-red"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-white">فروعنا — بني سويف</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {BRANCHES.map((b) => (
                <li key={b.id} className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-amber" />
                  <span>
                    <strong className="text-white">{b.name}:</strong> {b.address}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-white">تواصل معنا</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`tel:+20${PHONES.main.slice(1)}`}
                  className="flex items-center gap-2 hover:text-brand-red"
                >
                  <Phone className="size-4 text-amber" />
                  <span className="tabular-nums" dir="ltr">{PHONES.main}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-brand-red"
                >
                  <img src={ASSETS.whatsappIcon} alt="" className="size-4" />
                  <span className="tabular-nums" dir="ltr">{PHONES.whatsapp} واتساب</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:+20${PHONES.secondary.slice(1)}`}
                  className="flex items-center gap-2 hover:text-brand-red"
                >
                  <Phone className="size-4 text-amber" />
                  <span className="tabular-nums" dir="ltr">{PHONES.secondary}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-2 hover:text-brand-red"
                >
                  <Mail className="size-4 text-amber" />
                  {BRAND.email}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a
                href={BRAND.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-brand-red"
                aria-label="فيسبوك"
              >
                <FacebookIcon className="size-5" />
              </a>
              <a
                href={BRAND.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-brand-red"
                aria-label="تيك توك"
              >
                <TikTokIcon className="size-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/45">
          © {year} {BRAND.name} — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  )
}
