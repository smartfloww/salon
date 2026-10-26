"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { HomePage } from "@/components/site/pages/Home";
import { ServicesPage } from "@/components/site/pages/Services";
import { GalleryPage } from "@/components/site/pages/Gallery";
import { StoryPage } from "@/components/site/pages/Story";
import { VisitPage } from "@/components/site/pages/Visit";
import { PAGE_META, parseHash, type RouteId } from "@/components/site/routes";

export default function Page() {
  // Start with "home" for SSR; the real hash is applied on mount.
  const [route, setRoute] = useState<RouteId>("home");

  useEffect(() => {
    const apply = () => {
      const r = parseHash(window.location.hash);
      if (r) setRoute(r); // in-page anchors (e.g. #main) are not routes
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  useEffect(() => {
    const meta = PAGE_META[route];
    document.title = meta.title;
    // Keep the social/meta description in sync with the active page.
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [route]);

  return (
    <div className="flex min-h-svh flex-col bg-porcelain">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header route={route} />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <div key={route} className="page-enter">
          {route === "home" ? <HomePage /> : null}
          {route === "services" ? <ServicesPage /> : null}
          {route === "gallery" ? <GalleryPage /> : null}
          {route === "story" ? <StoryPage /> : null}
          {route === "visit" ? <VisitPage /> : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}
