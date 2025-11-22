import { useEffect, useId, useState } from "react";
import { GraduationCap, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuTriggerButton } from "./ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";

export const langCenNavItems = [
  { label: "Introduction", href: "#introduction" },
  { label: "Dialogues", href: "#dialogues" },
  { label: "Vocabulary", href: "#vocabulary" },
  { label: "Grammar", href: "#grammar" },
  { label: "Pronunciation", href: "#pronunciation" },
  { label: "Exercises", href: "#exercises" },
];

export const exerciseNavItems = [
  { label: "Exercise one", value: "exercise-1" },
  { label: "Exercise two", value: "exercise-2" },
  { label: "Exercise three", value: "exercise-3" },
  { label: "Exercise four", value: "exercise-4" },
  { label: "Exercise five", value: "exercise-5" },
];

type LangCenNavProps = {
  onExerciseNavigate?: (value: string) => void;
};

export function LangCenNav({ onExerciseNavigate }: LangCenNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>(langCenNavItems[0]?.href ?? "");
  const navId = useId();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = langCenNavItems
      .map(item => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      let current = sections[0]!;

      for (const section of sections) {
        if (scrollPosition >= section.offsetTop) {
          current = section;
        }
      }

      setActiveHref(`#${current.id}`);
    };

    const handleScroll = () => {
      requestAnimationFrame(updateActiveSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
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
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 md:px-6 py-4">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-primary -ml-2 md:-ml-4 mr-auto"
          aria-label="Go to landing page"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span>eLearning</span>
        </a>

        <nav aria-label="Primary navigation" className="hidden md:flex items-center justify-end gap-6 pr-4">
          <NavList
            orientation="horizontal"
            activeHref={activeHref}
            onItemClick={handleNavItem}
            onExerciseNavigate={value => {
              onExerciseNavigate?.(value);
            }}
          />
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
        <NavList
          orientation="vertical"
          activeHref={activeHref}
          onItemClick={handleNavItem}
          onExerciseNavigate={value => {
            onExerciseNavigate?.(value);
          }}
        />
      </nav>
    </header>
  );
}

type NavListProps = {
  orientation: "horizontal" | "vertical";
  activeHref: string;
  onItemClick?: (href: string) => void;
  onExerciseNavigate?: (value: string) => void;
};

function NavList({ orientation, activeHref, onItemClick, onExerciseNavigate }: NavListProps) {
  return (
    <ul
      className={cn("items-center gap-6", {
        "flex": orientation === "horizontal",
        "flex flex-col items-stretch gap-3 py-2 text-sm": orientation === "vertical",
      })}
    >
      {langCenNavItems.map(item => {
        const isActive = activeHref === item.href;
        const isVertical = orientation === "vertical";

        if (item.label === "Exercises" && orientation === "horizontal") {
          return (
            <li key="exercises-dropdown">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <DropdownMenuTriggerButton type="button">Exercises</DropdownMenuTriggerButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {exerciseNavItems.map(entry => (
                    <DropdownMenuItem
                      key={entry.value}
                      onClick={() => {
                        onExerciseNavigate?.(entry.value);
                      }}
                    >
                      {entry.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          );
        }

        return (
          <li key={item.href}>
            <a
              href={item.href}
              onClick={() => onItemClick?.(item.href)}
              className={cn(
                "nav-link",
                isVertical ? "nav-link-vertical" : "nav-link-horizontal",
                isActive
                  ? isVertical
                    ? "nav-link-vertical-active"
                    : "nav-link-horizontal-active"
                  : undefined,
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </a>
            {item.label === "Exercises" && isVertical && (
              <ul className="mt-2 space-y-1 pl-4 text-xs text-foreground/70">
                {exerciseNavItems.map(entry => (
                  <li key={entry.value}>
                    <button
                      type="button"
                      className="text-left transition-colors hover:text-primary"
                      onClick={() => {
                        onExerciseNavigate?.(entry.value);
                        onItemClick?.(item.href);
                      }}
                    >
                      {entry.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
