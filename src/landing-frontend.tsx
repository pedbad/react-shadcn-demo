import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LandingApp } from "./LandingApp";

const elem = document.getElementById("root")!;
const app = (
  <StrictMode>
    <LandingApp />
  </StrictMode>
);

if (import.meta.hot) {
  const root = (import.meta.hot.data.root ??= createRoot(elem));
  root.render(app);
} else {
  createRoot(elem).render(app);
}
