import { useCallback, useEffect, useState } from "react";
import { cn } from "./lib/utils";

import { LangCenNav, exerciseNavItems, langCenNavItems } from "./components/lang-cen-nav";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
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
        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: 0.2 },
    );

    sections.forEach(section => observer.observe(section));
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
        <div className="container mx-auto flex max-w-5xl flex-col gap-12 px-6 pt-12">

          <section id="language-centre" aria-labelledby="language-centre-heading" className="section-panel section-panel-hero">
            <p className={cn("section-label text-sm", activeSection === "language-centre" && "section-label-active")}>
              Language Centre
            </p>
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
                      <AccordionTrigger>Academic mentoring scenario</AccordionTrigger>
                      <AccordionContent>
                        Sample script highlighting student and coach dialogue, infused with Cambridge tone and vocabulary.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="dialogue-2">
                      <AccordionTrigger>International admissions support</AccordionTrigger>
                      <AccordionContent>
                        Demonstrates conversational blocks used for visa, housing, and onboarding queries.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="dialogue-3">
                      <AccordionTrigger>Research collaboration workshops</AccordionTrigger>
                      <AccordionContent>
                        Outlines call-and-response exercises that reinforce technical terminology and pronunciation.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
                {slug === "vocabulary" && (
                  <Tabs defaultValue="semantic" className="mt-6">
                    <TabsList aria-label="Vocabulary lenses">
                      <TabsTrigger value="semantic">Semantic</TabsTrigger>
                      <TabsTrigger value="alphabetic">Alphabetic</TabsTrigger>
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
                          Guided prompt for {entry.label.toLowerCase()}, including context, vocabulary goals, and rubric
                          references for Cambridge tutors.
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
                <div className="flex justify-end">
                  <a href="#language-centre" className="back-to-top" aria-label="Back to top">
                    ↑
                  </a>
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
