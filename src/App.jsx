import { lazy, Suspense } from "react";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Footer from "./components/Footer.jsx";
import LazySection from "./components/LazySection.jsx";
import useCleanAnchors from "./useCleanAnchors.js";

// Each section is its own JS chunk, fetched only when scrolled near.
const sections = [
  ["about", lazy(() => import("./sections/About.jsx"))],
  ["services", lazy(() => import("./sections/Services.jsx"))],
  ["process", lazy(() => import("./sections/Process.jsx"))],
  ["projects", lazy(() => import("./sections/Projects.jsx"))],
  ["skills", lazy(() => import("./sections/Skills.jsx"))],
  ["testimonials", lazy(() => import("./sections/Testimonials.jsx"))],
  ["contact", lazy(() => import("./sections/Contact.jsx"))],
];

export default function App() {
  useCleanAnchors();
  return (
    <>
      <Nav />
      <Hero />
      <main>
        {sections.map(([id, Section]) => (
          <LazySection key={id} id={id}>
            <Suspense fallback={<div className="ph" />}>
              <Section />
            </Suspense>
          </LazySection>
        ))}
      </main>
      <Footer />
    </>
  );
}
