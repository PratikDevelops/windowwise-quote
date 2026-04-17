import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Volume2,
  Zap,
  CloudRain,
  ShieldCheck,
  Star,
  Award,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { useQuote } from "@/components/site/QuoteProvider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luminae — Premium UPVC Windows for Modern Homes" },
      {
        name: "description",
        content:
          "German-engineered UPVC windows. Sound-insulated, energy-efficient, weather-resistant. Custom built for your home.",
      },
      { property: "og:title", content: "Luminae — Premium UPVC Windows" },
      { property: "og:description", content: "Custom UPVC windows. Free quote in 24 hours." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { openQuote } = useQuote();
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Modern interior with premium UPVC sliding windows"
            width={1920}
            height={1280}
            className="h-full w-full object-cover"
          />
          {/* Stronger left-fade on mobile, softer on desktop for full-bleed feel */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/40 sm:bg-gradient-to-r sm:from-background sm:via-background/85 sm:to-background/30" />
        </div>

        <div className="container-x relative pt-10 pb-20 sm:pt-16 sm:pb-24 lg:pt-28 lg:pb-40">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft text-brand px-3 py-1 text-[11px] sm:text-xs font-medium tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              German-engineered · Made in India
            </span>
            <h1 className="mt-4 sm:mt-5 font-display text-[2.25rem] leading-[1.05] sm:text-5xl lg:text-7xl text-balance">
              Premium UPVC Windows for{" "}
              <span className="italic text-brand">Modern Homes</span>
            </h1>
            <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg text-muted-foreground text-balance">
              Custom-fabricated, precision-installed window systems that block
              the noise, hold the weather, and let in only the light you want.
            </p>
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
              <Link
                to="/quote"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-medium text-brand-foreground shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all"
              >
                Start Guided Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={() => openQuote()}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur px-6 py-3.5 text-sm font-medium hover:bg-card transition-colors"
              >
                Quick quote
              </button>
            </div>

            <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-6 max-w-md">
              {[
                { k: "12,400+", v: "Installations" },
                { k: "10 yr", v: "Warranty" },
                { k: "4.9★", v: "Customer rating" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-xl sm:text-2xl">{s.k}</div>
                  <div className="text-[11px] sm:text-xs text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container-x py-16 sm:py-20 lg:py-28">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {[
            {
              icon: Volume2,
              title: "Sound Insulation",
              body: "Multi-chamber profiles with acoustic glazing reduce outside noise by up to 38 dB.",
            },
            {
              icon: Zap,
              title: "Energy Efficiency",
              body: "Low-E coated double glazing keeps interiors cool — slashing AC load year-round.",
            },
            {
              icon: CloudRain,
              title: "Weather Resistance",
              body: "Triple gasket sealing, UV-stable profiles. Engineered for monsoons and coastal winds.",
            },
          ].map((f) => (
            <div key={f.title} className="bg-card p-6 sm:p-8 lg:p-10">
              <div className="grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-xl bg-brand-soft text-brand">
                <f.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="mt-4 sm:mt-5 font-display text-xl sm:text-2xl">{f.title}</h3>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-x py-12 sm:py-16 lg:py-20">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-8 sm:mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.18em] text-brand">Collection</span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl">
              Window systems, made to fit
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-brand transition-colors"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {products.slice(0, 3).map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-surface py-16 sm:py-20 lg:py-28 mt-8 sm:mt-12">
        <div className="container-x">
          <span className="text-xs uppercase tracking-[0.18em] text-brand">Loved by homeowners</span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl max-w-2xl">
            Quiet rooms. Lower bills. No regrets.
          </h2>
          <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                quote:
                  "We replaced every window in our 3BHK. The traffic noise from the highway is just… gone. Honestly worth every rupee.",
                name: "Rohan Mehta",
                role: "Bengaluru",
              },
              {
                quote:
                  "Site team was meticulous. They masked, measured, and finished a 14-window install in two days with zero mess.",
                name: "Anjali Sharma",
                role: "Mumbai",
              },
              {
                quote:
                  "Our AC bill dropped almost a third the first summer. The tilt-turn windows are a daily pleasure.",
                name: "Vikram Iyer",
                role: "Hyderabad",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-2xl bg-card border border-border p-5 sm:p-7 shadow-soft"
              >
                <div className="flex gap-0.5 text-brand">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm sm:text-base text-foreground/90 leading-relaxed">"{t.quote}"</p>
                <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-border">
                  <div className="font-medium">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="container-x py-16 sm:py-20 lg:py-28">
        <div className="rounded-3xl bg-ink text-background p-7 sm:p-10 lg:p-16 relative overflow-hidden">
          <div className="absolute inset-0 grain opacity-30" />
          <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.18em] text-background/60">
                Why Luminae
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl text-balance">
                Engineering you can lean on, for a decade and beyond.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-background/70 max-w-lg">
                Every Luminae window is fabricated in our ISO-certified facility,
                installed by trained technicians, and backed by a comprehensive
                10-year warranty.
              </p>
              <button
                onClick={() => openQuote()}
                className="mt-6 sm:mt-8 inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3.5 text-sm font-medium hover:-translate-y-0.5 transition-transform"
              >
                Get Free Quote <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: ShieldCheck, k: "ISO 9001", v: "Certified facility" },
                { icon: Award, k: "BIS", v: "Tested profiles" },
                { icon: Star, k: "4.9 / 5", v: "12k+ reviews" },
                { icon: Zap, k: "10 yr", v: "Warranty" },
              ].map((b) => (
                <div
                  key={b.k}
                  className="rounded-2xl border border-background/10 bg-background/5 p-4 sm:p-5"
                >
                  <b.icon className="h-5 w-5 text-background/80" />
                  <div className="mt-2 sm:mt-3 font-display text-xl sm:text-2xl">{b.k}</div>
                  <div className="text-xs sm:text-sm text-background/60">{b.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
