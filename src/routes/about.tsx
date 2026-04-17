import { createFileRoute } from "@tanstack/react-router";
import { Award, ShieldCheck, Wrench, Ruler, Truck, Sparkles } from "lucide-react";
import projectImg from "@/assets/project1.jpg";
import { useQuote } from "@/components/site/QuoteProvider";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Luminae — Our Story & Process" },
      {
        name: "description",
        content:
          "We're a team of architects, engineers and installers building the most refined UPVC windows in India. Learn about our process and certifications.",
      },
      { property: "og:title", content: "About Luminae" },
      { property: "og:description", content: "Architects, engineers & installers obsessed with UPVC." },
      { property: "og:image", content: projectImg },
    ],
  }),
  component: AboutPage,
});

const steps = [
  { icon: Ruler, title: "Site survey", body: "Free measurement and consultation at your home." },
  { icon: Sparkles, title: "Design & quote", body: "3D mockup and a transparent, line-itemed quote." },
  { icon: Wrench, title: "Fabrication", body: "Cut, welded and finished in our ISO-certified facility." },
  { icon: Truck, title: "Installation", body: "Trained crew, dust sheets, and a same-day clean-up." },
];

function AboutPage() {
  const { openQuote } = useQuote();
  return (
    <>
      <section className="container-x pt-12 pb-12 lg:pt-20 lg:pb-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.18em] text-brand">Our story</span>
          <h1 className="mt-2 font-display text-5xl sm:text-6xl text-balance">
            Windows are details. We obsess over details.
          </h1>
          <p className="mt-5 text-muted-foreground text-lg">
            Luminae was started in 2014 by a small team of architects and
            fabricators who couldn't find UPVC windows that matched the homes they
            were designing. So we built our own — with German profiles, Indian
            craftsmanship, and uncompromising tolerances.
          </p>
        </div>
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
          <img src={projectImg} alt="Modern home with Luminae windows" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="container-x py-16 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {[
            { k: "12,400+", v: "Windows installed", b: "across 18 cities" },
            { k: "10 yr", v: "Warranty", b: "on profile and hardware" },
            { k: "ISO 9001", v: "Certified facility", b: "in Bengaluru" },
          ].map((s) => (
            <div key={s.v} className="bg-card p-8 lg:p-10">
              <div className="font-display text-4xl">{s.k}</div>
              <div className="mt-1 text-foreground">{s.v}</div>
              <div className="text-sm text-muted-foreground">{s.b}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-12 lg:py-20">
        <span className="text-xs uppercase tracking-[0.18em] text-brand">How we work</span>
        <h2 className="mt-2 font-display text-4xl sm:text-5xl">Our installation process</h2>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl border border-border bg-card p-6">
              <div className="absolute -top-3 left-6 rounded-full bg-brand text-brand-foreground text-xs font-medium px-2.5 py-1">
                Step {i + 1}
              </div>
              <s.icon className="h-6 w-6 text-brand mt-3" />
              <h3 className="mt-4 font-display text-xl">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-16 lg:py-24">
        <h2 className="font-display text-3xl">Certifications</h2>
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          {[
            { icon: ShieldCheck, k: "ISO 9001:2015" },
            { icon: Award, k: "BIS Certified Profiles" },
            { icon: Sparkles, k: "GreenPro Eco-Label" },
          ].map((c) => (
            <div key={c.k} className="flex items-center gap-4 rounded-xl border border-border bg-surface p-5">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-card border border-border">
                <c.icon className="h-5 w-5 text-brand" />
              </div>
              <div className="font-medium">{c.k}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-brand text-brand-foreground p-10 lg:p-14 text-center">
          <h3 className="font-display text-3xl sm:text-4xl text-balance">
            Ready to upgrade your windows?
          </h3>
          <button
            onClick={() => openQuote()}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-background text-foreground px-6 py-3 text-sm font-medium hover:-translate-y-0.5 transition-transform"
          >
            Get Free Quote
          </button>
        </div>
      </section>
    </>
  );
}
