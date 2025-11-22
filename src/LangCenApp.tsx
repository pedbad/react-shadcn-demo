import { LangCenNav, langCenNavItems } from "@/components/LangCenNav";
import "./index.css";

export function LangCenApp() {
  return (
    <div className="bg-primary text-primary-foreground min-h-screen">
      <LangCenNav />
      <main className="py-16">
        <div className="container mx-auto flex max-w-4xl flex-col gap-16 px-6">
          <header className="space-y-4">
            <p className="text-sm uppercase tracking-[0.4em] text-primary-foreground/80">Language Centre</p>
            <h1 className="text-5xl font-semibold">The quick brown fox jumps over the lazy dog.</h1>
            <p className="text-lg leading-relaxed text-primary-foreground/90">
              Sphinx of black quartz, judge my vow. This page remains intentionally minimal so we can validate typography,
              whitespace, and our Cambridge color tokens before layering in shadcn components.
            </p>
          </header>

          <div className="space-y-16">
            {langCenNavItems.map(item => (
              <section key={item.href} id={item.href.slice(1)} aria-labelledby={`${item.href.slice(1)}-heading`}>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/70">
                  {item.label}
                </p>
                <h2 id={`${item.href.slice(1)}-heading`} className="mt-3 text-3xl font-semibold">
                  The quick brown fox jumps over the lazy dog.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-primary-foreground/85">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus egestas elementum erat, sed vehicula
                  urna viverra at. Nulla facilisi. Pellentesque in lorem varius, tempor nunc vel, viverra tellus.
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
