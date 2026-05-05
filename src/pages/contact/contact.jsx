import { useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { PROFILE } from "../../data/profile";

const QUICK_CHANNELS = [
  {
    label: "Email",
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    icon: "fa-solid fa-envelope",
    desc: "Best for project briefs & detailed inquiries.",
  },
  {
    label: "WhatsApp",
    value: PROFILE.phone,
    href: `https://wa.me/${PROFILE.whatsapp}`,
    icon: "fa-brands fa-whatsapp",
    desc: "Fastest reply — usually within a few hours.",
  },
  {
    label: "LinkedIn",
    value: "Connect with me",
    href: PROFILE.linkedin,
    icon: "fa-brands fa-linkedin",
    desc: "For introductions, networking & roles.",
  },
];

const INQUIRY_TYPES = [
  "Freelance Project",
  "Full-Time Hiring",
  "Help on My Open-Source Project",
  "Code Review / Consulting",
  "Just Saying Hi",
  "Other",
];

const Field = ({ label, children, hint }) => (
  <label className="block">
    <span className="block text-xs font-medium uppercase tracking-wider text-text-muted mb-2">
      {label}
    </span>
    {children}
    {hint && <span className="block mt-1 text-[11px] text-text-muted/70">{hint}</span>}
  </label>
);

const inputCls =
  "w-full px-4 py-3 rounded-xl bg-dark-bg border border-border text-text-white placeholder:text-text-muted/60 focus:outline-none focus:border-sky-blue focus:ring-2 focus:ring-sky-blue/20 transition-all";

const buildEmail = (formData) => {
  const name = (formData.get("name") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim();
  const inquiry = (formData.get("inquiry") || "Inquiry").toString();
  const message = (formData.get("message") || "").toString().trim();

  const subject = `[Portfolio] ${inquiry} — ${name}`;
  const body = `Hi Lokesh,

${message}

—
Name: ${name}
Reply to: ${email}
Inquiry type: ${inquiry}

(Sent from lokeshburade007.github.io)`;

  return { to: PROFILE.email, subject, body };
};

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | opened | copied
  const [composed, setComposed] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formRef.current) return;
    const data = buildEmail(new FormData(formRef.current));
    setComposed(data);
    setStatus("opened");

    const url = `mailto:${data.to}?subject=${encodeURIComponent(
      data.subject
    )}&body=${encodeURIComponent(data.body)}`;

    // Open the visitor's email app with the message pre-composed
    window.location.href = url;
  };

  const handleCopy = async () => {
    if (!composed) return;
    const text = `To: ${composed.to}\nSubject: ${composed.subject}\n\n${composed.body}`;
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
      setTimeout(() => setStatus("opened"), 2200);
    } catch {
      // Clipboard API blocked — fall back to selection
      const ta = document.getElementById("composed-fallback");
      if (ta) {
        ta.focus();
        ta.select();
      }
    }
  };

  return (
    <div className="w-full">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-10 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint/10 border border-mint/30 text-mint text-xs font-medium">
          <span className="relative inline-flex w-2 h-2 rounded-full text-mint pulse-dot">
            <span className="absolute inset-0 rounded-full bg-mint" />
          </span>
          Open for new projects
        </span>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold leading-tight">
          Let's build something{" "}
          <span className="bg-gradient-to-r from-sky-blue to-cyan-glow bg-clip-text text-transparent">
            together.
          </span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-text-muted">
          Hiring, freelance, open-source help, or just saying hi — pick a
          channel below or fill the form. The form opens your email app
          pre-composed and sends straight to my inbox.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-16 grid gap-6 md:grid-cols-3">
        {QUICK_CHANNELS.map(({ label, value, href, icon, desc }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group p-6 rounded-2xl bg-surface border border-border hover:border-sky-blue/50 transition-all"
          >
            <div className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-sky-blue/20 to-cyan-glow/10 text-sky-blue text-xl group-hover:scale-110 transition-transform">
              <i className={icon} />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-text-white">
              {label}
            </h3>
            <p className="mt-1 text-sm text-text-white break-all">{value}</p>
            <p className="mt-2 text-sm text-text-muted">{desc}</p>
          </a>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20 grid lg:grid-cols-[1fr_1.2fr] gap-10">
        <div className="p-8 rounded-2xl bg-surface border border-border h-fit">
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-blue">
            Based in
          </p>
          <h3 className="mt-2 text-2xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-location-dot text-sky-blue" />{" "}
            {PROFILE.location}
          </h3>
          <p className="mt-3 text-text-muted text-sm">
            Working hybrid with my Pune team and remotely with clients
            worldwide. Comfortable with async collaboration across time zones —
            most clients are in IST, EST, or PST.
          </p>

          <div className="mt-6 space-y-4 text-sm">
            <div>
              <p className="text-xs uppercase tracking-wider text-text-muted">
                Response time
              </p>
              <p className="text-text-white mt-1">Usually within a few hours</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-text-muted">
                Currently
              </p>
              <p className="text-text-white mt-1">
                Full-time hybrid at{" "}
                <a
                  href="https://techcoderlabz.com"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-sky-blue/50 hover:decoration-sky-blue underline-offset-2"
                >
                  SN AnyDevice / TechCoderLabz
                </a>
                ; freelance hours evenings & weekends.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-text-muted">
                Best fit
              </p>
              <p className="text-text-white mt-1">
                Founders, product teams, agencies needing MERN / React + Vite /
                Capacitor.js builds.
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-surface border border-border">
          <h2 className="text-2xl font-bold">Get in touch</h2>
          <p className="mt-1 text-sm text-text-muted">
            No backend, no spam — submitting opens your email app with a
            pre-filled message addressed to{" "}
            <span className="text-text-white">{PROFILE.email}</span>. Just hit
            Send.
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Your Name">
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Jane Doe"
                  className={inputCls}
                />
              </Field>
              <Field label="Your Email">
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="jane@company.com"
                  className={inputCls}
                />
              </Field>
            </div>

            <Field label="What's this about?">
              <select required name="inquiry" defaultValue="" className={inputCls}>
                <option value="" disabled>
                  Select one
                </option>
                {INQUIRY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Message"
              hint="Add timeline, budget, links — anything that helps me reply faster."
            >
              <textarea
                required
                name="message"
                rows={6}
                placeholder="Tell me what you're working on, who it's for, and what kind of help you need."
                className={`${inputCls} resize-none`}
              />
            </Field>

            <button
              type="submit"
              className="w-full inline-flex justify-center items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-blue to-cyan-glow text-dark-bg font-semibold hover:opacity-90 transition-opacity"
            >
              <i className="fa-solid fa-paper-plane" /> Open in my email app
            </button>

            <p className="text-[11px] text-text-muted/80 text-center">
              No data is stored or sent through any third-party service. The
              button just opens your default email app with the message
              pre-filled — you stay in control of when (and whether) to send.
            </p>
          </form>

          {status !== "idle" && composed && (
            <div className="mt-6 p-5 rounded-xl bg-dark-bg border border-mint/30">
              <div className="flex items-center gap-2 text-mint">
                <i className="fa-solid fa-circle-check" />
                <p className="text-sm font-semibold">
                  {status === "copied"
                    ? "Copied to clipboard!"
                    : "Your email app should have opened."}
                </p>
              </div>
              <p className="mt-2 text-sm text-text-muted">
                Didn't open?{" "}
                <a
                  href={`mailto:${composed.to}?subject=${encodeURIComponent(
                    composed.subject
                  )}&body=${encodeURIComponent(composed.body)}`}
                  className="text-sky-blue hover:underline"
                >
                  Try again
                </a>
                , or copy the message below and send it to{" "}
                <a
                  href={`mailto:${composed.to}`}
                  className="text-sky-blue hover:underline"
                >
                  {composed.to}
                </a>
                .
              </p>

              <div className="mt-4 grid gap-3">
                <div className="text-xs text-text-muted">
                  <span className="text-text-white font-medium">Subject:</span>{" "}
                  {composed.subject}
                </div>
                <textarea
                  id="composed-fallback"
                  readOnly
                  value={composed.body}
                  rows={8}
                  className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-text-white text-sm font-mono resize-none focus:outline-none focus:border-sky-blue"
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border text-text-white text-sm hover:border-sky-blue hover:text-sky-blue transition-colors"
                  >
                    <i className="fa-solid fa-copy" /> Copy message
                  </button>
                  <a
                    href={`https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(
                      composed.body
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-mint/15 border border-mint/40 text-mint text-sm hover:bg-mint hover:text-dark-bg transition-colors"
                  >
                    <i className="fa-brands fa-whatsapp" /> Send on WhatsApp
                    instead
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
