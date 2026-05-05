import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { PROFILE } from "../../data/profile";

const SERVICES = [
  {
    icon: "fa-solid fa-code",
    title: "Full Stack Web Development",
    pitch:
      "Production-ready web apps with React.js / Next.js front-ends and Node.js / Express back-ends. SSR, REST + GraphQL, JWT auth.",
    deliverables: [
      "Marketing sites & SaaS dashboards",
      "Server-side rendered Next.js apps",
      "Auth, payments, REST/GraphQL APIs",
    ],
    stack: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind"],
    accent: "from-sky-blue to-cyan-glow",
  },
  {
    icon: "fa-solid fa-mobile-screen-button",
    title: "Cross-Platform Mobile Apps",
    pitch:
      "Ship Android & iOS from a single codebase using Capacitor.js or Flutter. Native plugins, biometric login, push notifications.",
    deliverables: [
      "Capacitor.js (React) Android + iOS apps",
      "Flutter / Dart apps with Material 3",
      "Play Store & App Store deployment",
    ],
    stack: ["Capacitor.js", "React", "Flutter", "Swift UI"],
    accent: "from-mint to-cyan-glow",
  },
  {
    icon: "fa-solid fa-cube",
    title: "SDK & Package Development",
    pitch:
      "Reusable npm and pub.dev libraries for your team or product. Already authored 3 npm SDKs + 1 Flutter SDK in production use.",
    deliverables: [
      "Typed npm packages with docs",
      "Flutter packages on pub.dev",
      "Versioning, CI, semantic releases",
    ],
    stack: ["TypeScript", "npm", "pub.dev", "Rollup", "Vite"],
    accent: "from-sky-blue to-mint",
  },
  {
    icon: "fa-solid fa-server",
    title: "REST APIs & Backend Architecture",
    pitch:
      "Scalable Node.js services with clean architecture, JWT auth, third-party integrations, and database design that won't melt at scale.",
    deliverables: [
      "Node.js / Express REST APIs",
      "MongoDB / MySQL schema design",
      "JWT, OAuth, third-party integrations",
    ],
    stack: ["Node.js", "Express", "MongoDB", "MySQL", "REST", "GraphQL"],
    accent: "from-cyan-glow to-mint",
  },
  {
    icon: "fa-solid fa-paintbrush",
    title: "UI / UX Implementation",
    pitch:
      "Pixel-perfect Figma → code with Tailwind, Chakra UI, or your design system. Accessibility, responsive, performant.",
    deliverables: [
      "Design-to-code from Figma",
      "Component libraries with Storybook",
      "Tailwind / Chakra UI theming",
    ],
    stack: ["Figma", "Tailwind", "Chakra UI", "Framer"],
    accent: "from-sky-blue to-cyan-glow",
  },
  {
    icon: "fa-solid fa-rotate",
    title: "Maintenance & Code Audits",
    pitch:
      "Inherit a messy React/Node project? I do refactors, performance audits, and bug fixes with clear writeups and PRs.",
    deliverables: [
      "Performance audits & lighthouse fixes",
      "Refactors & dependency upgrades",
      "Bug-fix retainer engagements",
    ],
    stack: ["React", "Node.js", "Vite", "Webpack"],
    accent: "from-mint to-sky-blue",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discovery Call",
    desc: "30-min call to understand your goals, users, and constraints.",
  },
  {
    step: "02",
    title: "Scope & Quote",
    desc: "Fixed-scope proposal with milestones, timeline, and pricing.",
  },
  {
    step: "03",
    title: "Build in Public",
    desc: "Weekly demos, live preview links, and a shared GitHub repo.",
  },
  {
    step: "04",
    title: "Launch & Handoff",
    desc: "Production deploy, docs, and 2 weeks of free support.",
  },
];

const ENGAGEMENT_MODELS = [
  {
    title: "Fixed-Scope Project",
    bestFor: "Startups & founders with a clear MVP spec",
    range: "Project-based",
    features: [
      "Scoped deliverables & timeline",
      "Weekly demos and previews",
      "2 weeks free post-launch support",
    ],
    highlight: false,
  },
  {
    title: "Monthly Retainer",
    bestFor: "Teams that need an ongoing dev partner",
    range: "Monthly · Most Popular",
    features: [
      "Dedicated hours every week",
      "Bug fixes, features, and audits",
      "Priority Slack / WhatsApp support",
    ],
    highlight: true,
  },
  {
    title: "Hourly Consulting",
    bestFor: "Code reviews, audits, technical advice",
    range: "Hourly",
    features: [
      "Architecture & code reviews",
      "Performance audits with writeups",
      "Pair-programming sessions",
    ],
    highlight: false,
  },
];

const Services = () => {
  return (
    <div className="w-full">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-sky-blue">
          Services
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold leading-tight">
          What I can build{" "}
          <span className="bg-gradient-to-r from-sky-blue to-cyan-glow bg-clip-text text-transparent">
            for you.
          </span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-text-muted">
          From idea to launched product. I help founders, agencies, and product
          teams ship modern web and mobile apps backed by clean architecture
          and reliable delivery.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(({ icon, title, pitch, deliverables, stack, accent }) => (
          <div
            key={title}
            className="group relative p-6 rounded-2xl bg-surface border border-border hover:border-sky-blue/50 transition-all"
          >
            <div
              className={`grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br ${accent} text-dark-bg text-xl group-hover:scale-110 transition-transform`}
            >
              <i className={icon} />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-text-white">
              {title}
            </h3>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              {pitch}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-text-muted">
              {deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-sky-blue mt-1 text-xs" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {stack.map((s) => (
                <span
                  key={s}
                  className="px-2 py-1 rounded-md bg-dark-bg border border-border text-[11px] text-text-muted"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="bg-surface/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-sky-blue">
              How we'll work
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
              A simple, predictable process.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map(({ step, title, desc }) => (
              <div
                key={step}
                className="relative p-6 rounded-2xl bg-dark-bg border border-border"
              >
                <span className="text-5xl font-extrabold bg-gradient-to-r from-sky-blue to-cyan-glow bg-clip-text text-transparent opacity-60">
                  {step}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-text-white">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-text-muted leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-blue">
            Engagement models
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
            Pick what works for you.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {ENGAGEMENT_MODELS.map(
            ({ title, bestFor, range, features, highlight }) => (
              <div
                key={title}
                className={`p-8 rounded-2xl border transition-all ${
                  highlight
                    ? "bg-gradient-to-b from-sky-blue/10 to-transparent border-sky-blue/40 shadow-lg shadow-sky-blue/10"
                    : "bg-surface border-border"
                }`}
              >
                <h3 className="text-xl font-bold text-text-white">{title}</h3>
                <p className="mt-1 text-sm text-text-muted">{bestFor}</p>
                <p className="mt-4 text-2xl font-bold bg-gradient-to-r from-sky-blue to-cyan-glow bg-clip-text text-transparent">
                  {range}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-text-muted"
                    >
                      <i className="fa-solid fa-check text-sky-blue mt-1 text-xs" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`mt-6 inline-flex w-full justify-center items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-opacity ${
                    highlight
                      ? "bg-gradient-to-r from-sky-blue to-cyan-glow text-dark-bg hover:opacity-90"
                      : "bg-dark-bg border border-border text-text-white hover:border-sky-blue hover:text-sky-blue"
                  }`}
                >
                  Get in touch
                </Link>
              </div>
            )
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="rounded-3xl bg-gradient-to-br from-surface to-surface-2 border border-border p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold">
            Ready to start your project?
          </h3>
          <p className="mt-2 text-text-muted max-w-xl mx-auto">
            Tell me about your idea — most discovery calls take less than 30
            minutes and you'll leave with a clear next step.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${PROFILE.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-mint text-dark-bg font-semibold hover:opacity-90 transition-opacity"
            >
              <i className="fa-brands fa-whatsapp" /> WhatsApp Me
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-blue to-cyan-glow text-dark-bg font-semibold hover:opacity-90 transition-opacity"
            >
              <i className="fa-solid fa-envelope" /> Send a Brief
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
