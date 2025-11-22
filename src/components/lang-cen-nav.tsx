import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";

import { GraduationCap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export const langCenNavItems = [
  { label: "Introduction", href: "#introduction" },
  { label: "Dialogues", href: "#dialogues" },
  { label: "Vocabulary", href: "#vocabulary" },
  { label: "Grammar", href: "#grammar" },
  { label: "Pronunciation", href: "#pronunciation" },
  { label: "Exercises", href: "#exercises" },
];

export function LangCenNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>(langCenNavItems[0]?.href ?? "");
  const navId = useId();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = langCenNavItems
      .map(item => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0.25, 0.5, 0.75],
      },
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const handleNavItem = (href: string) => {
    closeMenu();
    setActiveHref(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur text-foreground">
      <div className="container mx-auto flex items-center justify-between gap-4 px-6 py-4">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-primary"
          aria-label="Go to landing page"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span>eLearning</span>
        </a>

        <nav aria-label="Primary navigation" className="hidden md:flex">
          <NavList orientation="horizontal" activeHref={activeHref} onItemClick={handleNavItem} />
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls={navId}
            onClick={() => setIsOpen(prev => !prev)}
          >
            {isOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </Button>
        </div>
      </div>

      <nav
        id={navId}
        aria-label="Primary navigation mobile"
        className={cn(
          "md:hidden border-t border-border/60 bg-background/95 px-6 transition-[max-height] duration-300 ease-out",
          isOpen ? "max-h-screen py-4" : "max-h-0 overflow-hidden",
        )}
      >
        <NavList orientation="vertical" activeHref={activeHref} onItemClick={handleNavItem} />
      </nav>
    </header>
  );
}

type NavListProps = {
  orientation: "horizontal" | "vertical";
  activeHref: string;
  onItemClick?: (href: string) => void;
};

function NavList({ orientation, activeHref, onItemClick }: NavListProps) {
  return (
    <ul
      className={cn("items-center gap-6 text-[0.5rem] font-medium tracking-wide", {
        "flex": orientation === "horizontal",
        "flex-col gap-4 py-2": orientation === "vertical",
      })}
    >
      {langCenNavItems.map(item => {
        const isActive = activeHref === item.href;
        return (
          <li key={item.href}>
            <a
              href={item.href}
              onClick={() => onItemClick?.(item.href)}
              className={cn(
                "inline-flex items-center pb-1 text-[0.6rem] transition-all duration-200",
                isActive
                  ? "border-b-[3px] border-solid border-primary text-primary font-semibold"
                  : "border-b border-solid border-transparent text-foreground/70 hover:border-primary hover:text-primary",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
