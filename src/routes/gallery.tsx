import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import p1 from "@/assets/project1.jpg";
import p2 from "@/assets/project2.jpg";
import p3 from "@/assets/project3.jpg";
import p4 from "@/assets/project4.jpg";
import p5 from "@/assets/project5.jpg";
import p6 from "@/assets/project6.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Projects & Installations — Luminae" },
      {
        name: "description",
        content: "Real homes, real installations. Browse our gallery of UPVC window projects across India.",
      },
      { property: "og:title", content: "Projects & Installations — Luminae" },
      { property: "og:description", content: "A gallery of completed UPVC window installations." },
      { property: "og:image", content: p1 },
    ],
  }),
  component: GalleryPage,
});

const items = [
  { src: p1, title: "Hillside Villa", place: "Lonavala", span: "row-span-2" },
  { src: p2, title: "Skyline Apartment", place: "Mumbai", span: "" },
  { src: p3, title: "Reading Nook", place: "Pune", span: "" },
  { src: p4, title: "Brick Loft", place: "Bengaluru", span: "row-span-2" },
  { src: p5, title: "Tilt & Turn Bedroom", place: "Hyderabad", span: "" },
  { src: p6, title: "Marble Bathroom", place: "Delhi", span: "" },
];

function GalleryPage() {
  return (
    <>
      <section className="container-x pt-12 pb-10 lg:pt-20 lg:pb-12">
        <span className="text-xs uppercase tracking-[0.18em] text-brand">Projects</span>
        <h1 className="mt-2 font-display text-5xl sm:text-6xl">Real homes, real installations</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          A small selection of homes we've helped transform. Every install is
          measured, fabricated, and finished in-house.
        </p>
      </section>

      <section className="container-x pb-20 sm:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[200px] sm:auto-rows-[240px] lg:auto-rows-[280px] gap-3 sm:gap-4">
          {items.map((it, i) => (
            <motion.figure
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl bg-surface ${it.span}`}
            >
              <img
                src={it.src}
                alt={it.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-background opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="font-display text-xl">{it.title}</div>
                <div className="text-xs text-background/70">{it.place}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>
    </>
  );
}
