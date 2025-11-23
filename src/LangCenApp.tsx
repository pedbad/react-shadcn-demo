import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { cn } from "./lib/utils";

import layersIcon from "./icons/layers.svg";
import typeIcon from "./icons/type.svg";

import { LangCenNav, exerciseNavItems, langCenNavItems } from "./components/lang-cen-nav";
import { Icon } from "./components/Icon";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Switch } from "./components/ui/switch";
import { Badge } from "./components/ui/badge";
import infoIcon from "./icons/info.svg";
import externalLinkIcon from "./icons/external-link.svg";
import arrowDownAz from "./icons/arrow-down-az.svg";
import arrowUpAz from "./icons/arrow-up-az.svg";
import "./index.css";

const lightPalette = [
  { label: "background", color: "oklch(0.98 0.005 85)", text: "oklch(0.12 0.005 240)" },
  { label: "foreground", color: "oklch(0.12 0.005 240)", text: "oklch(0.98 0.005 85)" },
  { label: "card", color: "oklch(1 0 0)", text: "oklch(0.12 0.005 240)" },
  { label: "card-foreground", color: "oklch(0.12 0.005 240)", text: "oklch(0.98 0.005 85)" },
  { label: "popover", color: "oklch(1 0 0)", text: "oklch(0.12 0.005 240)" },
  { label: "popover-foreground", color: "oklch(0.12 0.005 240)", text: "oklch(0.98 0.005 85)" },
  { label: "primary", color: "oklch(0.38 0.08 245)", text: "oklch(1 0 0)" },
  { label: "primary-foreground", color: "oklch(1 0 0)", text: "oklch(0.12 0.005 240)" },
  { label: "secondary", color: "oklch(0.92 0.005 240)", text: "oklch(0.12 0.005 240)" },
  { label: "secondary-foreground", color: "oklch(0.12 0.005 240)", text: "oklch(0.98 0.005 85)" },
  { label: "muted", color: "oklch(0.95 0.005 240)", text: "oklch(0.55 0.005 240)" },
  { label: "muted-foreground", color: "oklch(0.55 0.005 240)", text: "oklch(0.98 0.005 85)" },
  { label: "accent", color: "oklch(0.85 0.02 245)", text: "oklch(0.12 0.005 240)" },
  { label: "accent-foreground", color: "oklch(0.12 0.005 240)", text: "oklch(0.98 0.005 85)" },
  { label: "destructive", color: "oklch(0.577 0.245 27.325)", text: "oklch(1 0 0)" },
  { label: "border", color: "oklch(0.88 0.005 240)", text: "oklch(0.12 0.005 240)" },
  { label: "input", color: "oklch(0.88 0.005 240)", text: "oklch(0.12 0.005 240)" },
  { label: "ring", color: "oklch(0.48 0.1 245)", text: "oklch(1 0 0)" },
  { label: "chart-1", color: "oklch(0.38 0.08 245)", text: "oklch(1 0 0)" },
  { label: "chart-2", color: "oklch(0.55 0.08 245)", text: "oklch(1 0 0)" },
  { label: "chart-3", color: "oklch(0.75 0.05 245)", text: "oklch(0.12 0.005 240)" },
  { label: "chart-4", color: "oklch(0.55 0.005 240)", text: "oklch(1 0 0)" },
  { label: "chart-5", color: "oklch(0.8 0.002 240)", text: "oklch(0.12 0.005 240)" },
  { label: "sidebar", color: "oklch(0.98 0.005 85)", text: "oklch(0.12 0.005 240)" },
  { label: "sidebar-foreground", color: "oklch(0.12 0.005 240)", text: "oklch(0.98 0.005 85)" },
  { label: "sidebar-primary", color: "oklch(0.38 0.08 245)", text: "oklch(1 0 0)" },
  { label: "sidebar-primary-foreground", color: "oklch(1 0 0)", text: "oklch(0.12 0.005 240)" },
  { label: "sidebar-accent", color: "oklch(0.85 0.02 245)", text: "oklch(0.12 0.005 240)" },
  { label: "sidebar-accent-foreground", color: "oklch(0.12 0.005 240)", text: "oklch(0.98 0.005 85)" },
  { label: "sidebar-border", color: "oklch(0.88 0.005 240)", text: "oklch(0.12 0.005 240)" },
  { label: "sidebar-ring", color: "oklch(0.48 0.1 245)", text: "oklch(1 0 0)" },
];

const darkPalette = [
  { label: "background", color: "oklch(0.145 0 0)", text: "oklch(0.985 0 0)" },
  { label: "foreground", color: "oklch(0.985 0 0)", text: "oklch(0.145 0 0)" },
  { label: "card", color: "oklch(0.205 0 0)", text: "oklch(0.985 0 0)" },
  { label: "card-foreground", color: "oklch(0.985 0 0)", text: "oklch(0.145 0 0)" },
  { label: "popover", color: "oklch(0.205 0 0)", text: "oklch(0.985 0 0)" },
  { label: "popover-foreground", color: "oklch(0.985 0 0)", text: "oklch(0.145 0 0)" },
  { label: "primary", color: "oklch(0.6 0.12 245)", text: "oklch(0.145 0 0)" },
  { label: "primary-foreground", color: "oklch(0.145 0 0)", text: "oklch(0.985 0 0)" },
  { label: "secondary", color: "oklch(0.25 0 0)", text: "oklch(0.985 0 0)" },
  { label: "secondary-foreground", color: "oklch(0.985 0 0)", text: "oklch(0.145 0 0)" },
  { label: "muted", color: "oklch(0.2 0 0)", text: "oklch(0.7 0.01 240)" },
  { label: "muted-foreground", color: "oklch(0.7 0.01 240)", text: "oklch(0.145 0 0)" },
  { label: "accent", color: "oklch(0.3 0.01 245)", text: "oklch(0.985 0 0)" },
  { label: "accent-foreground", color: "oklch(0.985 0 0)", text: "oklch(0.145 0 0)" },
  { label: "destructive", color: "oklch(0.704 0.191 22.216)", text: "oklch(0.145 0 0)" },
  { label: "border", color: "oklch(0.3 0 0)", text: "oklch(0.985 0 0)" },
  { label: "input", color: "oklch(0.3 0 0)", text: "oklch(0.985 0 0)" },
  { label: "ring", color: "oklch(0.7 0.12 245)", text: "oklch(0.145 0 0)" },
  { label: "chart-1", color: "oklch(0.6 0.12 245)", text: "oklch(0.145 0 0)" },
  { label: "chart-2", color: "oklch(0.75 0.1 245)", text: "oklch(0.145 0 0)" },
  { label: "chart-3", color: "oklch(0.85 0.05 245)", text: "oklch(0.145 0 0)" },
  { label: "chart-4", color: "oklch(0.5 0.005 240)", text: "oklch(0.985 0 0)" },
  { label: "chart-5", color: "oklch(0.3 0.002 240)", text: "oklch(0.985 0 0)" },
  { label: "sidebar", color: "oklch(0.205 0 0)", text: "oklch(0.985 0 0)" },
  { label: "sidebar-foreground", color: "oklch(0.985 0 0)", text: "oklch(0.145 0 0)" },
  { label: "sidebar-primary", color: "oklch(0.6 0.12 245)", text: "oklch(0.145 0 0)" },
  { label: "sidebar-primary-foreground", color: "oklch(0.985 0 0)", text: "oklch(0.145 0 0)" },
  { label: "sidebar-accent", color: "oklch(0.3 0.01 245)", text: "oklch(0.985 0 0)" },
  { label: "sidebar-accent-foreground", color: "oklch(0.985 0 0)", text: "oklch(0.145 0 0)" },
  { label: "sidebar-border", color: "oklch(0.3 0 0)", text: "oklch(0.985 0 0)" },
  { label: "sidebar-ring", color: "oklch(0.7 0.12 245)", text: "oklch(0.145 0 0)" },
];

const lightThemeVars: CSSProperties = {
  "--background": "oklch(0.98 0.005 85)",
  "--foreground": "oklch(0.12 0.005 240)",
  "--card": "oklch(1 0 0)",
  "--card-foreground": "oklch(0.12 0.005 240)",
  "--popover": "oklch(1 0 0)",
  "--popover-foreground": "oklch(0.12 0.005 240)",
  "--primary": "oklch(0.38 0.08 245)",
  "--primary-foreground": "oklch(1 0 0)",
  "--secondary": "oklch(0.92 0.005 240)",
  "--secondary-foreground": "oklch(0.12 0.005 240)",
  "--muted": "oklch(0.95 0.005 240)",
  "--muted-foreground": "oklch(0.55 0.005 240)",
  "--accent": "oklch(0.85 0.02 245)",
  "--accent-foreground": "oklch(0.12 0.005 240)",
  "--destructive": "oklch(0.577 0.245 27.325)",
  "--border": "oklch(0.88 0.005 240)",
  "--input": "oklch(0.88 0.005 240)",
  "--ring": "oklch(0.48 0.1 245)",
};

const darkThemeVars: CSSProperties = {
  "--background": "oklch(0.145 0 0)",
  "--foreground": "oklch(0.985 0 0)",
  "--card": "oklch(0.205 0 0)",
  "--card-foreground": "oklch(0.985 0 0)",
  "--popover": "oklch(0.205 0 0)",
  "--popover-foreground": "oklch(0.985 0 0)",
  "--primary": "oklch(0.6 0.12 245)",
  "--primary-foreground": "oklch(0.145 0 0)",
  "--secondary": "oklch(0.25 0 0)",
  "--secondary-foreground": "oklch(0.985 0 0)",
  "--muted": "oklch(0.2 0 0)",
  "--muted-foreground": "oklch(0.7 0.01 240)",
  "--accent": "oklch(0.3 0.01 245)",
  "--accent-foreground": "oklch(0.985 0 0)",
  "--destructive": "oklch(0.704 0.191 22.216)",
  "--border": "oklch(0.3 0 0)",
  "--input": "oklch(0.3 0 0)",
  "--ring": "oklch(0.7 0.12 245)",
};

export function LangCenApp() {
  const [openExercises, setOpenExercises] = useState<string[]>([exerciseNavItems[0].value]);
  const [activeSection, setActiveSection] = useState<string>("language-centre");
  const [darkPreview, setDarkPreview] = useState(false);
  const [alphabeticAscending, setAlphabeticAscending] = useState(true);

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
            <div className="section-inner space-y-6">
              <div>
                <p className={cn("section-label text-sm", activeSection === "language-centre" && "section-label-active")}>
                  Language Centre
                </p>
                <h1 id="language-centre-heading" className="heading-hero">
                  The quick brown fox jumps over the lazy dog.
                </h1>
              </div>
              <div className="body-lead space-y-6">
                <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/80 p-4 text-left shadow-sm">
                  <Icon src={infoIcon} className="mt-1 h-6 w-6 text-primary" />
                  <p>
                    This demo runs on Bun v1.3.1 with React 19, Tailwind CSS 4, shadcn/ui components, the Inter typeface, and custom SVG icons inspired by the lucide set to showcase our full prototyping stack.
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
                  <RadioGroup className="grid gap-4 text-base text-foreground/80">
                    {[
                      { label: "Bun v1.3.1", href: "https://bun.sh" },
                      { label: "React v19.0.0", href: "https://react.dev" },
                      { label: "Tailwind CSS v4", href: "https://tailwindcss.com" },
                      { label: "shadcn/ui", href: "https://ui.shadcn.com" },
                      { label: "Inter font", href: "https://rsms.me/inter" },
                      { label: "Lucide icons", href: "https://lucide.dev" },
                    ].map(item => (
                      <label key={item.label} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border/60 px-4 py-3 shadow-sm transition hover:border-primary/60">
                      <RadioGroupItem value={item.href} className="data-[state=checked]:border-primary h-6 w-6" />
                        <span className="text-left flex-1">{item.label}</span>
                        <Icon src={externalLinkIcon} className="h-4 w-4 text-primary" />
                      </label>
                    ))}
                  </RadioGroup>
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground/60">Light palette</p>
                    <div className="grid gap-2">
                      {lightPalette.map(entry => (
                        <Badge key={entry.label} style={{ backgroundColor: entry.color, color: entry.text }}>
                          {entry.label} · {entry.color}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground/60">Dark palette</p>
                    <div className="grid gap-2">
                      {darkPalette.map(entry => (
                        <Badge key={entry.label} style={{ backgroundColor: entry.color, color: entry.text }}>
                          {entry.label} · {entry.color}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-background/80 p-4 shadow-sm">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground/60">Button preview</p>
                    <p className="text-xs text-foreground/60">Toggle to view light or dark button styles</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium">
                    Light
                    <Switch checked={darkPreview} onCheckedChange={setDarkPreview} />
                    Dark
                  </div>
                </div>
                <div
                  className="rounded-2xl border border-border/60 p-4 shadow-sm"
                  style={darkPreview ? darkThemeVars : lightThemeVars}
                >
                  <div className={cn(darkPreview && "text-white")}> 
                    <div className="grid gap-4 text-sm md:grid-cols-3">
                      {["primary", "secondary", "tertiary"].map(variant => (
                        <div key={variant} className="space-y-2">
                          <p className="text-xs uppercase tracking-[0.3em] text-foreground/60">{variant} buttons</p>
                          <div className="flex flex-wrap gap-2">
                            {["xs", "sm", "md", "lg", "xl"].map(size => (
                              <button key={size} className={cn("btn", `btn-${variant}`, `btn-${size}`)}>
                                {variant} · {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
                          <Icon src={arrowDownAz} className="mr-2 h-4 w-4" />
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
                        <div className="space-y-4">
                          <button
                            type="button"
                            className="ml-auto flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-[0.3em] text-foreground/70"
                            onClick={() => setAlphabeticAscending(prev => !prev)}
                          >
                            {alphabeticAscending ? "A → Z" : "Z → A"}
                            <Icon src={alphabeticAscending ? arrowDownAz : arrowUpAz} className="h-4 w-4 text-primary" />
                          </button>
                          <div className="rounded-2xl border border-border/60 bg-background/80">
                            {Array.from({ length: 26 }, (_, i) => String.fromCharCode(alphabeticAscending ? 65 + i : 90 - i)).map(letter => (
                              <div key={letter} className="border-b border-border/40 px-4 py-3 text-sm last:border-b-0">
                                <p className="font-semibold">{letter}</p>
                                <p className="text-foreground/70">Sample definition for {letter}…</p>
                              </div>
                            ))}
                          </div>
                        </div>
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
