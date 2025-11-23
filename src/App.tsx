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
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
        {[{ src: bunLogo, label: "Bun" }, { src: reactLogo, label: "React" }, { src: tailwindLogo, label: "Tailwind" }, { src: shadcnLogo, label: "shadcn/ui" }].map(logo => (
          <div key={logo.label} className="flex flex-col items-center gap-2">
            <img src={logo.src} alt={`${logo.label} logo`} className="h-16 w-16" />
            <span className="text-xs uppercase tracking-[0.2em] text-foreground/70">{logo.label}</span>
          </div>
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
