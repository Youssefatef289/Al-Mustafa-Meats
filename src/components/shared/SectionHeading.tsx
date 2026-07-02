import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        centered && "text-center",
        className,
      )}
    >
      <h2
        className={cn(
          "font-display text-3xl font-extrabold sm:text-4xl",
          light ? "text-white" : "text-dark",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 max-w-2xl text-base sm:text-lg",
            centered && "mx-auto",
            light ? "text-white/80" : "text-dark/65",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
