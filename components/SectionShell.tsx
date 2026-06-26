import type { SectionShellProps } from "@/lib/types";

export function SectionShell({ number, title, subtitle, children }: SectionShellProps) {
  return (
    <section className="mx-auto max-w-[1280px] px-8 py-12">
      <div className="mb-8 flex flex-col gap-1">
        <div className="flex items-center gap-3">
          {number && (
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#111111] text-xs font-bold text-white">
              {number}
            </div>
          )}
          <h2
            className="font-sans font-bold uppercase tracking-[0.08em] text-[#111111]"
            style={{ fontSize: number ? 14 : 22 }}
          >
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className={`text-sm text-[#5F5A52] ${number ? "ml-10" : ""}`}>{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}
