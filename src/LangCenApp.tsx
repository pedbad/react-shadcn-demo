import "./index.css";

export function LangCenApp() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto max-w-3xl py-16 space-y-10">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Language Centre</p>
          <h1 className="text-4xl font-semibold">Elevating Cambridge communication</h1>
          <p className="text-base text-muted-foreground">
            This page will host demos of the shadcn components we&apos;re crafting for the Language Centre. For now, it
            illustrates the typographic scale and our Cambridge palette.
          </p>
        </header>

        <article className="space-y-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">Academic excellence, applied linguistics</h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper ut nisl eget auctor. Nunc
              accumsan dapibus ipsum non facilisis. Pellentesque sed efficitur libero. Suspendisse potenti. Pellentesque
              ultrices condimentum elit, auctor suscipit justo cursus eget.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-semibold">Collaborative learning environments</h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              Curabitur necismod lectus vitae dignissim semper. Duis et vestibulum enim. Sed efficitur tellus odio, ac
              consectetur metus imperdiet sagittis. Donec elementum risus nibh, sit amet ullamcorper ipsum feugiat vel.
            </p>
          </section>
        </article>
      </section>
    </main>
  );
}
