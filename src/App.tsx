import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/Icon";
import { APITester } from "./APITester";
import bunLogo from "./logo.svg";
import reactLogo from "./react.svg";
import tailwindLogo from "./icons/tailwind.svg";
import shadcnLogo from "./icons/shadcn.svg";
import externalLinkIcon from "./icons/external-link.svg";
import "./index.css";

export function App() {
  return (
    <div className="w-full px-6 py-8 text-center relative z-10 space-y-10">
      <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
        {[{ src: bunLogo, label: "Bun", href: "https://bun.sh", rotation: "group-hover:[transform:rotateX(360deg)]", glow: "bg-[radial-gradient(circle,theme(colors.destructive)_0%,transparent_70%)]" }, { src: reactLogo, label: "React", href: "https://react.dev", rotation: "group-hover:[transform:rotateY(360deg)]", glow: "bg-[radial-gradient(circle,theme(colors.ring)_0%,transparent_70%)]" }, { src: tailwindLogo, label: "Tailwind", href: "https://tailwindcss.com", rotation: "group-hover:[transform:rotate3d(1,1,0,360deg)]", glow: "bg-[radial-gradient(circle,theme(colors.chart-3)_0%,transparent_70%)]" }, { src: shadcnLogo, label: "shadcn/ui", href: "https://ui.shadcn.com", rotation: "group-hover:[transform:rotate3d(1,-1,0,360deg)]", glow: "bg-[radial-gradient(circle,theme(colors.chart-4)_0%,transparent_70%)]" }].map(logo => (
          <a key={logo.label} href={logo.href} target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-3">
            <span className="relative inline-flex h-36 w-36 items-center justify-center rounded-full">
              <span className={`absolute inset-0 rounded-full transition duration-300 ${logo.glow} opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]`} />
              <img
                src={logo.src}
                alt={`${logo.label} logo`}
                className={`h-24 w-24 transition duration-700 transform ${logo.rotation}`}
              />
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-foreground/70">{logo.label}</span>
          </a>
        ))}
      </div>
      <div className="space-y-3 text-sm leading-relaxed text-foreground/80">
        <p>
          <a href="https://bun.sh" target="_blank" rel="noreferrer" className="font-semibold text-primary underline-offset-4 hover:underline inline-flex items-center gap-1">
            Bun
            <Icon src={externalLinkIcon} className="h-4 w-4" />
          </a>{" "}
          is a modern JavaScript runtime and package manager built for speed. Lightning-fast installs, a built-in bundler, and an integrated test runner reduce setup time and keep the developer experience simple.
        </p>
        <p>
          <a href="https://tailwindcss.com" target="_blank" rel="noreferrer" className="font-semibold text-primary underline-offset-4 hover:underline inline-flex items-center gap-1">
            Tailwind CSS
            <Icon src={externalLinkIcon} className="h-4 w-4" />
          </a>{" "}
          embraces a utility-first approach, letting us compose responsive, consistent interfaces directly in JSX without writing bespoke styles for every component.
        </p>
        <p>
          <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer" className="font-semibold text-primary underline-offset-4 hover:underline inline-flex items-center gap-1">
            shadcn/ui
            <Icon src={externalLinkIcon} className="h-4 w-4" />
          </a>{" "}
          provides accessible, unstyled primitives that pair perfectly with Tailwind, so we keep full control over branding and aesthetics while shipping quickly.
        </p>
      </div>
      <Card>
        <CardHeader className="gap-4">
          <CardTitle className="text-3xl font-bold">Bun + React</CardTitle>
          <CardDescription>
            Edit <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono">src/App.tsx</code> and save to
            test HMR
          </CardDescription>
        </CardHeader>
        <CardContent>
          <APITester />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <a href="langcen.html">Visit the Language Centre demo</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="landing.html">Explore the landing grid</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
