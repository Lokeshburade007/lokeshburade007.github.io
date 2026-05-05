import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import profilePic from "../../images/my-new-image.png";
import { PROFILE, SOCIAL_LINKS, STATS, TYPED_ROLES } from "../../data/profile";

const HIGHLIGHTS = [
  {
    icon: "fa-solid fa-bolt",
    title: "Ship Fast",
    desc: "From spec to production in days, not months — proven across 6+ live apps.",
  },
  {
    icon: "fa-solid fa-mobile-screen-button",
    title: "One Codebase, Two Stores",
    desc: "Cross-platform Android & iOS apps via Capacitor.js — 50% less effort.",
  },
  {
    icon: "fa-solid fa-cube",
    title: "SDK & Open-Source",
    desc: "3 npm packages + 1 Flutter SDK already powering 5+ live apps.",
  },
];

const TECH_BADGES = [
  "React",
  "Vite",
  "Capacitor.js",
  "Flutter",
  "Dart",
  "Node.js",
  "MongoDB",
  "Express",
  "Tailwind",
  "TypeScript",
  "dhive",
  "aioha",
];

const Home = () => {
  useEffect(() => {
    if (!window.Typed) return;
    const typed = new window.Typed(".auto-input", {
      strings: TYPED_ROLES,
      typeSpeed: 60,
      backSpeed: 40,
      startDelay: 300,
      backDelay: 1500,
      loop: true,
    });
    return () => typed.destroy();
  }, []);

  return (
    <div className="w-full">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 lg:pt-16 pb-20 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint/10 border border-mint/30 text-mint text-xs font-medium">
              <span className="relative inline-flex w-2 h-2 rounded-full text-mint pulse-dot">
                <span className="absolute inset-0 rounded-full bg-mint" />
              </span>
              Open to Freelance & Contract Projects
            </span>

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
              Hi, I'm <span className="text-text-white">Lokesh Burade</span> —
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-sky-blue via-cyan-glow to-mint bg-clip-text text-transparent">
                <span className="auto-input"></span>
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-text-muted max-w-2xl leading-relaxed">
              {PROFILE.yearsOfExperience} years building production-grade web
              and cross-platform mobile apps with the{" "}
              <span className="text-text-white font-medium">MERN stack</span>,{" "}
              <span className="text-text-white font-medium">React + Vite</span>,
              and{" "}
              <span className="text-text-white font-medium">Capacitor.js</span>.
              Currently shipping{" "}
              <span className="text-text-white font-medium">
                hybrid
              </span>{" "}
              at{" "}
              <a
                href="https://sagarkothari88.one"
                target="_blank"
                rel="noreferrer"
                className="text-text-white font-medium underline decoration-sky-blue/40 underline-offset-4 hover:decoration-sky-blue transition-colors"
              >
                SN Any Device Software Solutions
              </a>{" "}
              <span className="text-text-muted">/</span>{" "}
              <a
                href="https://techcoderlabz.com"
                target="_blank"
                rel="noreferrer"
                className="text-text-white font-medium underline decoration-cyan-glow/40 underline-offset-4 hover:decoration-cyan-glow transition-colors"
              >
                TechCoderLabz
              </a>{" "}
              while taking on select freelance work for founders and product
              teams.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-blue to-cyan-glow text-dark-bg font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-sky-blue/20"
              >
                <i className="fa-solid fa-rocket" /> Start a Project
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface border border-border text-text-white font-semibold hover:border-sky-blue hover:text-sky-blue transition-colors"
              >
                <i className="fa-solid fa-folder-open" /> View Projects
              </Link>
              <a
                href={PROFILE.resume}
                download="Lokesh_Burade_Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-text-muted hover:text-text-white transition-colors"
              >
                <i className="fa-solid fa-download" /> Resume
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {TECH_BADGES.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md bg-surface border border-border text-xs text-text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="relative group select-none">
            {/* Soft outer glow */}
            <div className="absolute -inset-8 bg-gradient-to-tr from-sky-blue/25 via-cyan-glow/15 to-mint/10 rounded-[2rem] blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Rotating conic ring (only visible on hover) */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-0 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-[-30%] profile-ring blur-[2px]" />
            </div>

            {/* Card — no overflow-hidden here, so the floating chips below
                can extend past the card edges */}
            <div className="gradient-border relative rounded-3xl bg-surface/80 p-1.5 backdrop-blur-sm transition-transform duration-500 group-hover:scale-[1.01]">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-dark-bg">
                <img
                  src={profilePic}
                  alt="Lokesh Burade"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />

                {/* Bottom-up reveal panel — visible by default on mobile,
                    hover-revealed on md+ (touch devices have no hover) */}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-dark-bg via-dark-bg/95 to-transparent transition-all duration-500 translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  <div className="flex items-center gap-2">
                    <span className="relative inline-flex w-2 h-2 rounded-full text-mint pulse-dot">
                      <span className="absolute inset-0 rounded-full bg-mint" />
                    </span>
                    <p className="text-xs uppercase tracking-wider text-mint font-medium">
                      Available for freelance
                    </p>
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-text-white">
                    {PROFILE.name}
                  </h3>
                  <p className="text-sm text-sky-blue">
                    {PROFILE.title} · {PROFILE.yearsOfExperience} yrs
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface border border-border text-text-muted">
                      <i className="fa-solid fa-location-dot text-sky-blue" />
                      {PROFILE.location}
                    </span>
                    <a
                      href="https://sagarkothari88.one"
                      target="_blank"
                      rel="noreferrer"
                      title="Visit SN AnyDevice Software Solutions"
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface border border-border text-text-muted hover:text-sky-blue hover:border-sky-blue/40 transition-colors"
                    >
                      <i className="fa-solid fa-briefcase text-sky-blue" />
                      SN AnyDevice · TechCoderLabz
                      <i className="fa-solid fa-arrow-up-right-from-square text-[8px] opacity-70" />
                    </a>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    {SOCIAL_LINKS.map(({ href, icon, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        className="grid place-items-center w-9 h-9 rounded-lg bg-surface border border-border text-text-muted hover:text-sky-blue hover:border-sky-blue transition-colors"
                      >
                        <i className={icon} />
                      </a>
                    ))}
                    <a
                      href={`https://wa.me/${PROFILE.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="WhatsApp"
                      className="grid place-items-center w-9 h-9 rounded-lg bg-mint/15 border border-mint/40 text-mint hover:bg-mint hover:text-dark-bg transition-colors"
                    >
                      <i className="fa-brands fa-whatsapp" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Floating: current company chip (bottom-left) — clickable.
                  Hidden on mobile (info already in the always-visible bottom
                  panel) and fades out on desktop hover so it never sits on
                  top of the social-link row when the panel reveals. */}
              <a
                href="https://sagarkothari88.one"
                target="_blank"
                rel="noreferrer"
                title="Visit SN AnyDevice Software Solutions"
                className="hidden md:block absolute -bottom-4 -left-4 max-w-[calc(100%-1.5rem)] bg-dark-bg border border-border rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 shadow-xl profile-card-float transition-all duration-300 hover:!border-sky-blue/60 md:group-hover:opacity-0 md:group-hover:scale-95 md:group-hover:pointer-events-none"
              >
                <div className="flex items-center gap-3">
                  <div className="grid place-items-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-mint/10 text-mint shrink-0">
                    <i className="fa-solid fa-circle-check" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-text-muted flex items-center gap-1">
                      Currently at
                      <i className="fa-solid fa-arrow-up-right-from-square text-[8px] opacity-70" />
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-text-white leading-tight">
                      SN AnyDevice Software Solutions
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-cyan-glow leading-tight mt-0.5">
                      operating as TechCoderLabz
                    </p>
                  </div>
                </div>
              </a>

              {/* Floating: location chip (top-right) — hidden on mobile
                  (location is in the always-visible panel) so the photo
                  isn't cluttered on small screens. */}
              <div
                className="hidden md:block absolute -top-4 -right-4 bg-dark-bg border border-border rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 shadow-xl profile-card-float transition-all duration-500 group-hover:-translate-y-1 group-hover:border-sky-blue/40"
                style={{ animationDelay: "1.2s" }}
              >
                <p className="text-[10px] sm:text-xs text-text-muted">
                  Based in
                </p>
                <p className="text-xs sm:text-sm font-semibold text-text-white flex items-center gap-1.5">
                  <i className="fa-solid fa-location-dot text-sky-blue" />
                  Pune, India
                </p>
                <p className="text-[10px] text-mint/90 mt-0.5">Hybrid · Open to remote</p>
              </div>

              {/* Floating: stats chip (mid-right, only on hover) */}
              <div className="absolute right-[-1rem] top-1/2 -translate-y-1/2 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 bg-dark-bg border border-sky-blue/30 rounded-xl px-3 py-2 shadow-xl">
                <p className="text-[10px] uppercase tracking-wider text-text-muted">
                  Shipped
                </p>
                <p className="text-sm font-bold bg-gradient-to-r from-sky-blue to-cyan-glow bg-clip-text text-transparent">
                  6+ apps
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center md:text-left">
              <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-sky-blue to-cyan-glow bg-clip-text text-transparent">
                {value}
              </p>
              <p className="mt-1 text-sm text-text-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-blue">
            Why work with me
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
            A reliable partner for shipping real products.
          </h2>
          <p className="mt-3 text-text-muted">
            Whether you need a polished web app, a cross-platform mobile launch,
            or a reusable SDK — I deliver production-quality code, clean
            architecture, and clear communication.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {HIGHLIGHTS.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="group p-6 rounded-2xl bg-surface border border-border hover:border-sky-blue/50 transition-colors"
            >
              <div className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-sky-blue/20 to-cyan-glow/10 text-sky-blue text-xl group-hover:scale-110 transition-transform">
                <i className={icon} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="rounded-3xl bg-gradient-to-br from-surface to-surface-2 border border-border p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold">
              Have a project in mind?
            </h3>
            <p className="mt-2 text-text-muted max-w-xl">
              I'm currently taking on a small number of freelance projects.
              Let's talk about your idea — usually I reply within a few hours.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${PROFILE.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-mint text-dark-bg font-semibold hover:opacity-90 transition-opacity"
            >
              <i className="fa-brands fa-whatsapp" /> WhatsApp
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-blue to-cyan-glow text-dark-bg font-semibold hover:opacity-90 transition-opacity"
            >
              <i className="fa-solid fa-envelope" /> Email Me
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
