import { LangCenNav, langCenNavItems } from "./components/lang-cen-nav";
import "./index.css";

const sectionBaseClasses =
  "scroll-mt-32 min-h-[60vh] rounded-3xl bg-primary-foreground/5 px-8 py-12 shadow-lg ring-1 ring-white/10 backdrop-blur";

export function LangCenApp() {
  return (
    <div className="bg-primary text-primary-foreground min-h-screen">
      <LangCenNav />
      <main className="py-16">
        <div className="container mx-auto flex max-w-5xl flex-col gap-12 px-6">
          <section
            id="language-centre"
            aria-labelledby="language-centre-heading"
            className={`${sectionBaseClasses} flex flex-col justify-center space-y-6`}
          >
            <p className="text-sm uppercase tracking-[0.4em] text-primary-foreground/80">Language Centre</p>
            <h1 id="language-centre-heading" className="text-5xl font-semibold">
              The quick brown fox jumps over the lazy dog.
            </h1>
            <p className="text-lg leading-relaxed text-primary-foreground/90">
              Sphinx of black quartz, judge my vow. This hero spans the Linguistics program vision so we can evaluate
              typography, whitespace, and the Cambridge palette before layering interactive components.
            </p>
          </section>

          {langCenNavItems.map(item => {
            const slug = item.href.slice(1);
            return (
              <section
                key={item.href}
                id={slug}
                aria-labelledby={`${slug}-heading`}
                className={`${sectionBaseClasses} space-y-4`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/70">
                  {item.label}
                </p>
                <h2 id={`${slug}-heading`} className="text-3xl font-semibold">
                  The quick brown fox jumps over the lazy dog.
                </h2>
                <p className="text-base leading-relaxed text-primary-foreground/85">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus egestas elementum erat, sed vehicula
                  urna viverra at. Nulla facilisi. Pellentesque in lorem varius, tempor nunc vel, viverra tellus. Duis
                  pharetra ligula lectus, non laoreet sapien cursus ut.
                </p>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
