import { Link } from "react-router-dom";
import { PROFILE, SOCIAL_LINKS } from "../data/profile";

const QUICK_LINKS = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-sky-blue to-cyan-glow text-dark-bg font-black">
              L
            </span>
            <span className="text-base font-bold text-text-white">
              Lokesh<span className="text-sky-blue">.</span>
            </span>
          </Link>
          <p className="text-sm text-text-muted mt-4 max-w-sm">
            Full Stack Developer building production-grade web and cross-platform
            mobile apps with MERN, Next.js, and Capacitor.js.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {SOCIAL_LINKS.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid place-items-center w-10 h-10 rounded-lg bg-dark-bg border border-border text-text-muted hover:text-sky-blue hover:border-sky-blue transition-colors"
              >
                <i className={icon} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-text-white">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {QUICK_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-text-muted hover:text-sky-blue transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-text-white">
            Get in Touch
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-text-muted">
            <li className="flex items-start gap-2">
              <i className="fa-solid fa-location-dot mt-1 text-sky-blue" />
              <span>{PROFILE.location}</span>
            </li>
            <li>
              <a
                href={`mailto:${PROFILE.email}`}
                className="flex items-start gap-2 hover:text-sky-blue transition-colors"
              >
                <i className="fa-solid fa-envelope mt-1 text-sky-blue" />
                <span>{PROFILE.email}</span>
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${PROFILE.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2 hover:text-sky-blue transition-colors"
              >
                <i className="fa-brands fa-whatsapp mt-1 text-sky-blue" />
                <span>{PROFILE.phone}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-text-muted">
          <p>
            © {new Date().getFullYear()} Lokesh Burade. Crafted with React, Vite
            & Tailwind CSS.
          </p>
          <p className="flex items-center gap-1">
            Built with <i className="fas fa-heart text-sky-blue" /> in Pune,
            India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
