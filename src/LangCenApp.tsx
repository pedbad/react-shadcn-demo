import { useCallback, useEffect, useState } from "react";
import { cn } from "./lib/utils";

import layersIcon from "./icons/layers.svg";
import typeIcon from "./icons/type.svg";

import { LangCenNav, exerciseNavItems, langCenNavItems } from "./components/lang-cen-nav";
import { Icon } from "./components/Icon";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import infoIcon from "./icons/info.svg";
import "./index.css";

export function LangCenApp() {
  const [openExercises, setOpenExercises] = useState<string[]>([exerciseNavItems[0].value]);
  const [activeSection, setActiveSection] = useState<string>("language-centre");

  const handleExerciseNavigate = useCallback((value: string) => {
    setOpenExercises(prev => (prev.includes(value) ? prev : [...prev, value]));
    if (typeof document !== "undefined") {
      requestAnimationFrame(() => {
        const target = document.getElementById(value);
        if (!target) return;
        const navHeight = document.querySelector("header")?.clientHeight ?? 80;
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = ["language-centre", ...langCenNavItems.map(item => item.href.slice(1))]
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        visible.forEach(entry => {
          entry.target.classList.toggle("section-visible", entry.isIntersecting);
        });
        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: 0.2 },
    );

    sections.forEach(section => {
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[color:oklch(0.96_0.01_240_/_0.9)] text-foreground">
      <LangCenNav onExerciseNavigate={handleExerciseNavigate} />
      <main className="pb-16">
        <div className="w-full">
          <figure>
            <img
              src="https://images.unsplash.com/photo-1487611459768-bd414656ea10?auto=format&fit=crop&w=2600&q=80"
              alt="Cambridge Language Centre banner"
              className="hero-banner-image"
              loading="lazy"
            />
          </figure>
        </div>
        <div className="flex flex-col">
          <section id="language-centre" aria-labelledby="language-centre-heading" className="section-panel section-panel-hero">
            <div className="section-inner">
              <p className={cn("section-label text-sm", activeSection === "language-centre" && "section-label-active")}>
                Language Centre
              </p>
              <h1 id="language-centre-heading" className="heading-hero">
                The quick brown fox jumps over the lazy dog.
              </h1>
            <div className="body-lead">
              <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/80 p-4 text-left shadow-sm">
                <Icon src={infoIcon} className="mt-1 h-6 w-6 text-primary" />
                <p>
                  This demo runs on Bun v1.3.1 with React 19, Tailwind CSS 4, shadcn/ui components, the Inter typeface, and custom SVG icons inspired by the lucide set to showcase our full prototyping stack.
                </p>
              </div>
              <RadioGroup className="mt-4 flex flex-wrap gap-4 text-sm text-foreground/80">
                {[
                  { label: "Bun v1.3.1", href: "https://bun.sh" },
                  { label: "React v19.0.0", href: "https://react.dev" },
                  { label: "Tailwind CSS v4", href: "https://tailwindcss.com" },
                  { label: "shadcn/ui", href: "https://ui.shadcn.com" },
                  { label: "Inter font", href: "https://rsms.me/inter" },
                  { label: "Lucide icons", href: "https://lucide.dev" },
                ].map(item => (
                  <label key={item.label} className="flex cursor-pointer items-center gap-2 rounded-full border border-border/60 px-4 py-2 shadow-sm transition hover:border-primary/60">
                    <RadioGroupItem value={item.href} className="data-[state=checked]:border-primary" />
                    <span className="text-left">{item.label}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>
            </div>
          </section>

          {langCenNavItems.map(item => {
            const slug = item.href.slice(1);
            return (
              <section key={item.href} id={slug} aria-labelledby={`${slug}-heading`} className="section-panel">
                <div className="section-inner">
                  <p className={cn("section-label", activeSection === slug && "section-label-active")}>{item.label}</p>
                  <h2 id={`${slug}-heading`} className="heading-section">
                    The quick brown fox jumps over the lazy dog.
                  </h2>
                  <p className="body-copy">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus egestas elementum erat, sed vehicula
                    urna viverra at. Nulla facilisi. Pellentesque in lorem varius, tempor nunc vel, viverra tellus. Duis
                    pharetra ligula lectus, non laoreet sapien cursus ut.
                  </p>
                  {slug === "dialogues" && (
                    <Accordion type="multiple" className="divide-y divide-border/60 rounded-2xl border border-border/80 bg-background/80">
                    <AccordionItem value="dialogue-1">
                      <AccordionTrigger>Dialogue one</AccordionTrigger>
                        <AccordionContent>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="dialogue-2">
                        <AccordionTrigger>Dialogue two</AccordionTrigger>
                        <AccordionContent>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="dialogue-3">
                        <AccordionTrigger>Dialogue three</AccordionTrigger>
                        <AccordionContent>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}
                  {slug === "vocabulary" && (
                    <Tabs defaultValue="semantic" className="mt-6">
                      <TabsList aria-label="Vocabulary lenses">
                        <TabsTrigger value="semantic">
                          <Icon src={layersIcon} className="mr-2 h-4 w-4" />
                          Semantic
                        </TabsTrigger>
                        <TabsTrigger value="alphabetic">
                          <Icon src={typeIcon} className="mr-2 h-4 w-4" />
                          Alphabetic
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="semantic">
                        <ul className="space-y-3 text-sm text-foreground/80">
                          <li>
                            <strong>Academic register:</strong> inference, synthesis, discourse, epistemic, translational.
                          </li>
                          <li>
                            <strong>Community register:</strong> matriculation, pastoral care, bursary, residence hall.
                          </li>
                        </ul>
                      </TabsContent>
                      <TabsContent value="alphabetic">
                        <dl className="grid gap-3 text-sm text-foreground/80 md:grid-cols-2">
                          <div>
                            <dt className="font-semibold">A–M</dt>
                            <dd>Alumni, Bursary, Corpus, Dissertation, Faculty, Matriculation.</dd>
                          </div>
                          <div>
                            <dt className="font-semibold">N–Z</dt>
                            <dd>Notation, Oration, Practicum, Quadrangle, Refectory, Vivat.</dd>
                          </div>
                        </dl>
                      </TabsContent>
                    </Tabs>
                  )}
                  {slug === "exercises" && (
                    <Accordion
                      type="multiple"
                      className="rounded-2xl border border-border/80 bg-background/80"
                      value={openExercises}
                      onValueChange={value => {
                        setOpenExercises(Array.isArray(value) ? value : []);
                      }}
                    >
                      {exerciseNavItems.map(entry => (
                        <AccordionItem key={entry.value} value={entry.value} id={entry.value}>
                          <AccordionTrigger>{entry.label}</AccordionTrigger>
                          <AccordionContent>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                    </Accordion>
                  )}
                </div>
                {slug === "language-centre" ? null : (
                  <div className="pointer-events-none absolute bottom-4 right-4">
                    <a href="#language-centre" className="back-to-top pointer-events-auto" aria-label="Back to top">
                      ↑
                    </a>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
