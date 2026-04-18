import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-x py-16 grid gap-12 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-brand text-brand-foreground font-display text-lg">
              L
            </div>
            <div className="font-display text-lg">Luminae</div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Premium German-engineered UPVC windows, custom-fabricated and
            installed across India.
          </p>
          <div className="mt-6 flex gap-2">
            {[Instagram, Linkedin, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-brand hover:text-brand-foreground hover:border-brand transition-colors"
                aria-label="Social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Windows</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-foreground">Sliding</Link></li>
            <li><Link to="/products" className="hover:text-foreground">Casement</Link></li>
            <li><Link to="/products" className="hover:text-foreground">Tilt &amp; Turn</Link></li>
            <li><Link to="/products" className="hover:text-foreground">Bay &amp; French</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About us</Link></li>
            <li><Link to="/gallery" className="hover:text-foreground">Projects</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><a href="#" className="hover:text-foreground">Warranty</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Get in touch</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Phone className="h-4 w-4 mt-0.5" /> <span>+91 99999 00000</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="h-4 w-4 mt-0.5" /> <span>hello@luminae.in</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span>Studio 07, Lower Parel, Mumbai 400013</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Luminae Windows Pvt. Ltd. All rights reserved.</p>
          <p>Crafted with precision in Mumbai.</p>
        </div>
      </div>
    </footer>
  );
}
