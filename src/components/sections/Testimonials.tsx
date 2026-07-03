import { Star, User, Quote } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { MotionWrapper } from "@/components/shared/MotionWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { TESTIMONIALS } from "@/data/testimonials"
import { cn } from "@/lib/utils"

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} من 5 نجوم`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-5 sm:size-6",
            i < rating ? "fill-amber text-amber" : "fill-dark/10 text-dark/20",
          )}
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section
      className="bg-white py-20 sm:py-28 lg:py-32"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <SectionHeading title="آراء العملاء" />

        <MotionWrapper>
          <Carousel
            opts={{ align: "center", loop: true, direction: "rtl" }}
            className="mx-auto max-w-5xl px-10 sm:px-14"
          >
            <CarouselContent className="-ms-4">
              {TESTIMONIALS.map((item, index) => (
                <CarouselItem
                  key={item.id}
                  className="basis-full ps-4 md:basis-1/2 lg:basis-1/2"
                >
                  <article className="relative flex min-h-[220px] flex-col rounded-3xl bg-cream p-8 shadow-soft sm:min-h-[260px] sm:p-10">
                    <Quote className="absolute top-6 end-6 size-10 text-brand-red/15" />
                    <div className="flex items-center gap-4">
                      <div className="flex size-14 items-center justify-center rounded-full bg-brand-red/10 sm:size-16">
                        <User className="size-7 text-brand-red sm:size-8" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-dark sm:text-lg">
                          {item.name}
                        </p>
                        {item.area && (
                          <p className="text-xs text-dark/50 sm:text-sm">{item.area}</p>
                        )}
                        <StarRating rating={item.rating} />
                      </div>
                    </div>
                    <p
                      id={index === 0 ? "testimonials-heading" : undefined}
                      className="mt-6 flex-1 text-base leading-relaxed text-dark/75 sm:text-lg"
                    >
                      {item.comment}
                    </p>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="end-auto start-0 size-11" />
            <CarouselNext className="start-auto end-0 size-11" />
          </Carousel>
        </MotionWrapper>
      </div>
    </section>
  )
}
