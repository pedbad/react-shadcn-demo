import { LangCenNav, langCenNavItems } from "./components/lang-cen-nav";
import "./index.css";

export function LangCenApp() {
  return (
    <div className="min-h-screen bg-[color:oklch(0.96_0.01_240_/_0.9)] text-primary-foreground">
      <LangCenNav />
      <main className="py-16">
        <div className="container mx-auto flex max-w-5xl flex-col gap-12 px-6">
          <section className="hero-banner">
            <div className="hero-banner-grid">
              <div className="hero-banner-copy">
                <p className="section-label text-sm text-primary-foreground/80">Cambridge Language Centre</p>
                <h1 className="text-4xl font-semibold leading-tight">
                  Empowering learners through tailored linguistic experiences.
                </h1>
                <p className="body-lead max-w-2xl text-primary-foreground/85">
                  Explore immersive dialogues, curated vocabulary, and guided pronunciation drills—all grounded in the
                  Cambridge palette.
                </p>
              </div>
              <figure className="hero-banner-figure">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=80"
                  alt="Learners collaborating at the Language Centre"
                  className="hero-banner-image"
                  loading="lazy"
                />
                <figcaption className="sr-only">Students collaborating at the Language Centre</figcaption>
              </figure>
            </div>
          </section>

          <section id="language-centre" aria-labelledby="language-centre-heading" className="section-panel section-panel-hero">
            <p className="section-label text-sm">Language Centre</p>
            <h1 id="language-centre-heading" className="heading-hero">
              The quick brown fox jumps over the lazy dog.
            </h1>
            <p className="body-lead">
              Sphinx of black quartz, judge my vow. This hero spans the Linguistics program vision so we can evaluate
              typography, whitespace, and the Cambridge palette before layering interactive components.
            </p>
          </section>

          {langCenNavItems.map(item => {
            const slug = item.href.slice(1);
            return (
              <section key={item.href} id={slug} aria-labelledby={`${slug}-heading`} className="section-panel space-y-4">
                <p className="section-label">{item.label}</p>
                <h2 id={`${slug}-heading`} className="heading-section">
                  The quick brown fox jumps over the lazy dog.
                </h2>
                <p className="body-copy">
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
