import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MotionWrapper } from "@/components/shared/MotionWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { FAQ_ITEMS } from "@/data/products"

export function FAQ() {
  return (
    <section className="section-padding bg-cream" aria-labelledby="faq-heading">
      <div className="container-main max-w-3xl">
        <SectionHeading title="أسئلة شائعة" />

        <MotionWrapper>
          <Accordion type="single" collapsible>
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger id={index === 0 ? "faq-heading" : undefined}>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </MotionWrapper>
      </div>
    </section>
  )
}
