import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";

// CHANGE THESE THREE LINES:
import { Navbar } from "../components/site/Navbar";
import { Footer } from "../components/site/Footer";
import { QuoteProvider } from "../components/site/QuoteProvider";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Luminae - Premium UPVC Windows for Modern Homes" },
      {
        name: "description",
        content:
          "German-engineered UPVC windows custom built for Indian homes. Sliding, casement, tilt & turn — energy efficient, sound insulated, weather resistant.",
      },
      { property: "og:title", content: "Luminae - Premium UPVC Windows for Modern Homes" },
      { property: "og:description", content: "WindowWise Quote is a UPVC windows e-commerce and quotation website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Luminae - Premium UPVC Windows for Modern Homes" },
      { name: "description", content: "WindowWise Quote is a UPVC windows e-commerce and quotation website." },
      { name: "twitter:description", content: "WindowWise Quote is a UPVC windows e-commerce and quotation website." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2cb06ab3-d83b-4d08-b667-46bb0e65c47e/id-preview-db11144f--eba9b247-bf10-4126-be0e-577787b69894.lovable.app-1776513516110.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2cb06ab3-d83b-4d08-b667-46bb0e65c47e/id-preview-db11144f--eba9b247-bf10-4126-be0e-577787b69894.lovable.app-1776513516110.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <QuoteProvider>
      <Navbar />
      <main className="pt-16 lg:pt-20">
        <Outlet />
      </main>
      <Footer />
    </QuoteProvider>
  );
}
