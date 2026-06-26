import type { NavigationProps } from "@/lib/types";

export function Navigation({ logo, links, ctaLabel, ctaVariant = "dark", ctaHref = "mailto:abdullah@elliyeen.com?subject=Strategy%20Call%20Request" }: NavigationProps) {
  const ctaClass = ctaVariant === "blue"
    ? "rounded-xl bg-[#1B5EA8] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#1B5EA8]/20 transition hover:bg-[#164d8e] hover:-translate-y-px"
    : "rounded-lg bg-[#111111] px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-px hover:shadow-md";

  return (
    <nav className="sticky top-0 z-30 border-b border-[#E7E2DA] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-8 py-4">
        <span
          className="font-sans font-semibold tracking-[0.35em] text-[#111111]"
          style={{ fontSize: 22 }}
        >
          {logo}
        </span>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-[#8A837A] transition-colors hover:text-[#111111]"
            >
              {link}
            </a>
          ))}
        </div>

        <a href={ctaHref} className={ctaClass}>
          {ctaLabel}
        </a>
      </div>
    </nav>
  );
}
