import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { PROFILE } from "../data/profile";

const NAV_ITEMS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

const linkClass = ({ isActive }) =>
  `relative px-3 py-1.5 text-sm font-medium transition-colors ${
    isActive ? "text-sky-blue" : "text-text-muted hover:text-text-white"
  } after:absolute after:left-3 after:right-3 after:-bottom-1 after:h-[2px] after:rounded-full after:bg-gradient-to-r after:from-sky-blue after:to-cyan-glow after:transition-all ${
    isActive ? "after:opacity-100" : "after:opacity-0 hover:after:opacity-60"
  }`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-dark-bg/80 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-sky-blue to-cyan-glow text-dark-bg font-black">
            L
          </span>
          <span className="text-base font-bold text-text-white">
            Lokesh<span className="text-sky-blue">.</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {PROFILE.availableForFreelance && (
            <span className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint/10 border border-mint/30 text-mint text-xs font-medium">
              <span className="relative inline-flex w-2 h-2 rounded-full text-mint pulse-dot">
                <span className="absolute inset-0 rounded-full bg-mint" />
              </span>
              Available for Freelance
            </span>
          )}
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-sky-blue to-cyan-glow text-dark-bg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Hire Me
          </Link>

          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="lg:hidden grid place-items-center w-10 h-10 rounded-lg bg-surface border border-border text-text-white hover:text-sky-blue transition-colors"
            aria-label="Toggle menu"
          >
            <i
              className={isMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}
            />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-dark-bg/95 backdrop-blur-md">
          <ul className="max-w-7xl mx-auto px-6 py-3 flex flex-col">
            {NAV_ITEMS.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? "text-sky-blue bg-surface"
                        : "text-text-muted hover:text-text-white hover:bg-surface"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li className="mt-2">
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block text-center px-3 py-3 rounded-lg bg-gradient-to-r from-sky-blue to-cyan-glow text-dark-bg font-semibold"
              >
                Hire Me
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
