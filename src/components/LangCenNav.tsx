import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";

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
  const navId = useId();

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

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between gap-4 px-6 py-4">
        <a href="/" className="text-lg font-semibold tracking-tight text-primary" aria-label="Go to landing page">
          eLearning
        </a>

        <nav aria-label="Primary" className="hidden md:flex">
          <NavList orientation="horizontal" onNavigate={closeMenu} />
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
        aria-label="Primary mobile"
        className={cn(
          "md:hidden border-t border-border/60 bg-background/95 px-6 transition-[max-height] duration-300 ease-out",
          isOpen ? "max-h-screen py-4" : "max-h-0 overflow-hidden",
        )}
      >
        <NavList orientation="vertical" onNavigate={closeMenu} />
      </nav>
    </header>
  );
}

type NavListProps = {
  orientation: "horizontal" | "vertical";
  onNavigate?: () => void;
};

function NavList({ orientation, onNavigate }: NavListProps) {
  return (
    <ul
      className={cn("items-center gap-6 text-sm font-medium", {
        "flex": orientation === "horizontal",
        "flex-col gap-4 py-2": orientation === "vertical",
      })}
    >
      {langCenNavItems.map(item => (
        <li key={item.href}>
          <a
            href={item.href}
            onClick={onNavigate}
            className="text-foreground/80 transition-colors hover:text-foreground"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
