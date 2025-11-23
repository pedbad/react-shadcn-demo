import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { APITester } from "./APITester";
import bunLogo from "./logo.svg";
import reactLogo from "./react.svg";
import tailwindLogo from "./icons/tailwind.svg";
import shadcnLogo from "./icons/shadcn.svg";
import "./index.css";

export function App() {
  return (
    <div className="w-full px-6 py-8 text-center relative z-10 space-y-10">
      <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
        {[{ src: bunLogo, label: "Bun", href: "https://bun.sh", rotation: "group-hover:[transform:rotateX(360deg)]", glow: "bg-[radial-gradient(circle,theme(colors.destructive)_0%,transparent_70%)]" }, { src: reactLogo, label: "React", href: "https://react.dev", rotation: "group-hover:[transform:rotateY(360deg)]", glow: "bg-[radial-gradient(circle,theme(colors.ring)_0%,transparent_70%)]" }, { src: tailwindLogo, label: "Tailwind", href: "https://tailwindcss.com", rotation: "group-hover:[transform:rotate3d(1,1,0,360deg)]", glow: "bg-[radial-gradient(circle,theme(colors.chart-3)_0%,transparent_70%)]" }, { src: shadcnLogo, label: "shadcn/ui", href: "https://ui.shadcn.com", rotation: "group-hover:[transform:rotate3d(1,-1,0,360deg)]", glow: "bg-[radial-gradient(circle,theme(colors.chart-4)_0%,transparent_70%)]" }].map(logo => (
          <a key={logo.label} href={logo.href} target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-3">
            <span className={`relative inline-flex h-36 w-36 items-center justify-center rounded-full transition duration-300 ${logo.glow} opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]`}>
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
        <CardFooter className="justify-center">
          <Button asChild>
            <a href="/langcen">Visit the Language Centre demo</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
