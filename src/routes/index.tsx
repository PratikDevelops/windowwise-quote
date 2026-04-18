import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Volume2,
  Zap,
  CloudRain,
  ShieldCheck,
  Star,
  Award,
  Ruler,
  Hammer,
  PencilRuler,
  PackageCheck,
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
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
          {/* Stronger left-fade on mobile, softer on desktop for full-bleed feel */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/40 sm:bg-gradient-to-r sm:from-background sm:via-background/85 sm:to-background/30" />
        </div>

        <div className="container-x relative pt-10 pb-20 sm:pt-16 sm:pb-24 lg:pt-28 lg:pb-40">
          <motion.div
            initial={false}
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
        <div className="max-w-2xl mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-[0.18em] text-brand">Engineered for living</span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl text-balance">
            Three things every Luminae window does, beautifully.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {[
            {
              icon: Volume2,
              title: "Sound Insulation",
              body: "Multi-chamber profiles with acoustic glazing reduce outside noise by up to 38 dB.",
              stat: "−38 dB",
              label: "Noise reduction",
            },
            {
              icon: Zap,
              title: "Energy Efficiency",
              body: "Low-E coated double glazing keeps interiors cool — slashing AC load year-round.",
              stat: "−30%",
              label: "Cooling load",
            },
            {
              icon: CloudRain,
              title: "Weather Resistance",
              body: "Triple gasket sealing, UV-stable profiles. Engineered for monsoons and coastal winds.",
              stat: "IP 65",
              label: "Sealed rating",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="group relative rounded-2xl border border-border bg-card p-6 sm:p-8 hover:border-foreground/15 hover:shadow-card hover:-translate-y-0.5 transition-all overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-brand-soft/60 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl bg-brand-soft text-brand group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
                  <f.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="text-right">
                  <div className="font-display text-xl sm:text-2xl text-brand leading-none">{f.stat}</div>
                  <div className="mt-1 text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground">{f.label}</div>
                </div>
              </div>
              <h3 className="relative mt-6 sm:mt-8 font-display text-xl sm:text-2xl">{f.title}</h3>
              <p className="relative mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">{f.body}</p>
              <div className="relative mt-6 pt-4 border-t border-border/70 flex items-center text-xs font-medium text-muted-foreground group-hover:text-brand transition-colors">
                Learn more <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </motion.div>
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

      {/* Process */}
      <section className="container-x py-16 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <span className="text-xs uppercase tracking-[0.18em] text-brand">How it works</span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl text-balance">
              From measurement to install, one calm process.
            </h2>
            <p className="mt-4 text-base text-muted-foreground max-w-md">
              No surprises. No site mess. Every Luminae project follows the
              same four-step rhythm — refined over a decade of installations.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium hover:text-brand transition-colors"
            >
              Read our story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ol className="space-y-3">
            {[
              { icon: PencilRuler, n: "01", t: "Free site survey", b: "A specialist visits, measures every opening, and discusses configurations." },
              { icon: Ruler, n: "02", t: "Custom design & quote", b: "We render your windows in 3D and send a transparent, itemised quotation." },
              { icon: Hammer, n: "03", t: "Precision fabrication", b: "Profiles cut and welded in our ISO-certified Bengaluru facility, to the millimetre." },
              { icon: PackageCheck, n: "04", t: "White-glove installation", b: "Trained technicians install, seal, and clean — leaving the site spotless." },
            ].map((s) => (
              <li
                key={s.n}
                className="group rounded-2xl border border-border bg-card p-5 sm:p-6 hover:shadow-card hover:border-foreground/15 transition-all"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="grid h-12 w-12 sm:h-14 sm:w-14 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
                    <s.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-sm text-muted-foreground">{s.n}</span>
                      <h3 className="font-display text-lg sm:text-xl">{s.t}</h3>
                    </div>
                    <p className="mt-1.5 text-sm sm:text-[0.95rem] text-muted-foreground leading-relaxed">{s.b}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Key Benefits / Value Proposition */}
      <section className="border-y border-border bg-surface/60 py-16 sm:py-20 lg:py-24">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.18em] text-brand">Why it matters</span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl text-balance">
              The difference is in the details you don't see.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Every Luminae window is a system — engineered, fabricated and finished
              with the same obsession a watchmaker brings to a movement.
            </p>
          </div>
          <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              { k: "5-chamber", v: "Profile system", b: "Superior insulation, structural rigidity.", n: "01" },
              { k: "Ø 1.5mm", v: "Steel reinforcement", b: "Galvanised core in every sash and frame.", n: "02" },
              { k: "EPDM", v: "Triple gaskets", b: "Watertight seal, zero air leakage.", n: "03" },
              { k: "Low-E", v: "Double glazing", b: "Reflects heat, lets in pure daylight.", n: "04" },
            ].map((b, i) => (
              <motion.div
                key={b.v}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
                className="group relative rounded-2xl bg-card border border-border p-6 sm:p-7 hover:border-brand/40 hover:shadow-card hover:-translate-y-0.5 transition-all overflow-hidden"
              >
                <div className="absolute top-4 right-5 font-display text-[11px] tracking-wider text-muted-foreground/60">{b.n}</div>
                <div className="absolute left-0 top-0 h-full w-[3px] bg-brand/0 group-hover:bg-brand transition-colors" />
                <div className="font-display text-2xl sm:text-3xl text-brand leading-tight">{b.k}</div>
                <div className="mt-2 text-sm font-semibold text-foreground tracking-tight">{b.v}</div>
                <div className="mt-2 text-xs sm:text-[13px] text-muted-foreground leading-relaxed">{b.b}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-surface py-16 sm:py-20 lg:py-28">
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
