import "./index.css";

export function LangCenApp() {
  return (
    <main className="min-h-screen bg-primary text-primary-foreground">
      <div className="container mx-auto flex min-h-screen flex-col items-start justify-center gap-8 px-6 py-16">
        <p className="text-sm uppercase tracking-[0.4em] text-primary-foreground/80">Language Centre</p>
        <h1 className="text-6xl font-semibold">The quick brown fox jumps over the lazy dog.</h1>
        <h2 className="text-4xl font-medium">Sphinx of black quartz, judge my vow.</h2>
        <p className="max-w-3xl text-lg leading-relaxed text-primary-foreground/90">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper ut nisl eget auctor. Nunc
          accumsan dapibus ipsum non facilisis.
        </p>
      </div>
    </main>
  );
}
