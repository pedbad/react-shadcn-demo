import { useEffect, useId, useState } from "react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip";
import brandIcon from "./icons/graduation.svg";
import eyeIcon from "./icons/eye.svg";
import eyeOffIcon from "./icons/eye-off.svg";
import infoIcon from "./icons/info.svg";
import panelLeftIcon from "./icons/panel-left.svg";
import externalLinkIcon from "./icons/external-link.svg";
import "./index.css";

const numberWords = [
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
];

const learningObjects = numberWords.map((word, index) => {
  const slug = `learning-object-${word.toLowerCase()}`;
  return {
    title: `Learning Object ${word}`,
    slug,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dui turpis, cursus ut porta id, cursus vitae libero.",
    image: `https://picsum.photos/seed/learning-${index + 1}/600/360`,
  };
});

export function LandingApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarId = useId();

  useEffect(() => {
    if (!sidebarOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full items-center justify-between px-6 py-4">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-primary transition hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Scroll to top"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon src={brandIcon} className="h-5 w-5" />
            </span>
            eLearning
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(prev => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-controls={sidebarId}
              aria-expanded={sidebarOpen}
            >
              <Icon src={sidebarOpen ? eyeOffIcon : eyeIcon} className="h-4 w-4" aria-hidden="true" />
              <span>{sidebarOpen ? "Hide list" : "Show list"}</span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      {sidebarOpen && (
        <div
          role="presentation"
          className="fixed inset-0 z-20 bg-background/70 backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        id={sidebarId}
        aria-label="Learning object shortcuts"
        aria-hidden={!sidebarOpen}
        className={cn(
          "fixed left-4 top-24 z-30 w-[min(20rem,calc(100%-2rem))] max-h-[calc(100vh-7rem)] transform transition-transform duration-300 ease-out md:top-28 md:w-80 md:max-h-[calc(100vh-10rem)]",
          sidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-[120%] opacity-0 pointer-events-none"
        )}
        data-open={sidebarOpen}
      >
        <div
          className={cn(
            "rounded-2xl border border-border/70 bg-background/95 p-4 shadow-2xl backdrop-blur",
            sidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
            sidebarOpen ? "block" : "hidden"
          )}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">Learning Objects</p>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="text-xs font-medium text-foreground/70 transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Close
            </button>
          </div>
          <nav className="space-y-1 text-sm">
            {learningObjects.map(obj => (
              <a
                key={obj.slug}
                href={`#${obj.slug}`}
                onClick={() => setSidebarOpen(false)}
                className="block rounded-full border border-transparent px-3 py-2 transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {obj.title}
              </a>
            ))}
          </nav>
        </div>
      </aside>
      <main className="mx-auto w-full max-w-7xl space-y-8 p-6" aria-labelledby="learning-grid-heading">
        <section className="space-y-6" aria-live="polite">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Content grid</p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Open learning objects list"
              >
                <Icon src={panelLeftIcon} className="h-5 w-5" aria-hidden="true" />
              </button>
              <h1 id="learning-grid-heading" className="text-3xl font-semibold tracking-tight">
                Learning objects overview
              </h1>
            </div>
          </div>
          <TooltipProvider delayDuration={150}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {learningObjects.map(obj => (
                <Card
                  key={obj.slug}
                  id={obj.slug}
                  tabIndex={0}
                  className="transition-shadow duration-300 hover:shadow-[0_0_35px_var(--primary)] focus-visible:shadow-[0_0_35px_var(--primary)] focus-visible:outline-none"
                >
                  <CardHeader className="flex items-start justify-between gap-3">
                    <CardTitle>{obj.title}</CardTitle>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/70 text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          aria-label={`More details about ${obj.title}`}
                        >
                          <Icon src={infoIcon} className="h-8 w-8" aria-hidden="true" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="left" align="center" className="max-w-lg text-base leading-relaxed">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et nulla bibendum, varius sem non,
                          maximus erat.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <img src={obj.image} alt={obj.title} className="h-48 w-full rounded-xl object-cover" />
                    <p className="text-sm text-foreground/70">{obj.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full cursor-pointer" variant="secondary">
                      View {obj.title}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TooltipProvider>
        </section>
      </main>
    </div>
  );
}

export default LandingApp;
