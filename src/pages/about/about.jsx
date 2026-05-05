import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import meImage from "../../images/my-new-image.png";
import snPlaystoreApps from "../../images/sn-any-device-playstore-apps.png";
import snAppstoreApps from "../../images/sn-any-device-appstore-apps.png";
import {
  ACHIEVEMENTS,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  SKILL_GROUPS,
} from "../../data/profile";

const SHOWCASE_IMAGES = {
  "sn-any-device-playstore-apps.png": snPlaystoreApps,
  "sn-any-device-appstore-apps.png": snAppstoreApps,
};

const QUICK_FACTS = [
  { label: "Location", value: PROFILE.location, icon: "fa-location-dot" },
  { label: "Work Mode", value: "Hybrid · Open to remote", icon: "fa-laptop" },
  { label: "Experience", value: "1.5+ Years", icon: "fa-briefcase" },
  { label: "Availability", value: "Open to freelance", icon: "fa-clock" },
];

const SectionHeader = ({ eyebrow, title, sub }) => (
  <div className="max-w-2xl">
    <p className="text-sm font-semibold uppercase tracking-wider text-sky-blue">
      {eyebrow}
    </p>
    <h2 className="mt-2 text-3xl sm:text-4xl font-bold">{title}</h2>
    {sub && <p className="mt-3 text-text-muted">{sub}</p>}
  </div>
);

const About = () => {
  return (
    <div className="w-full">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-16 grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
        <div className="relative group select-none">
          <div className="absolute -inset-6 bg-gradient-to-tr from-sky-blue/20 via-cyan-glow/15 to-mint/10 rounded-[2rem] blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-0 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-[-30%] profile-ring blur-[2px]" />
          </div>

          <div className="gradient-border relative rounded-3xl bg-surface p-1.5 transition-transform duration-500 group-hover:scale-[1.01]">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-dark-bg">
              <img
                src={meImage}
                alt="Lokesh Burade"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />

              {/* Overlay revealing key facts — visible by default on mobile,
                  hover-revealed on md+ (touch devices have no hover) */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-dark-bg via-dark-bg/85 to-transparent transition-all duration-500 translate-y-0 opacity-100 md:translate-y-6 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                <div className="flex items-center gap-2">
                  <span className="relative inline-flex w-2 h-2 rounded-full text-mint pulse-dot">
                    <span className="absolute inset-0 rounded-full bg-mint" />
                  </span>
                  <p className="text-[11px] uppercase tracking-wider text-mint font-medium">
                    Open for freelance
                  </p>
                </div>
                <p className="mt-2 text-lg font-bold text-text-white">
                  {PROFILE.name}
                </p>
                <p className="text-xs text-sky-blue">
                  {PROFILE.title} · {PROFILE.yearsOfExperience} yrs
                </p>

                <div className="mt-3 grid grid-cols-2 gap-1.5 text-[11px]">
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface/80 border border-border text-text-muted backdrop-blur">
                    <i className="fa-solid fa-cube text-sky-blue" /> 6+ apps
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface/80 border border-border text-text-muted backdrop-blur">
                    <i className="fa-brands fa-npm text-red-400" /> 3 SDKs
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface/80 border border-border text-text-muted backdrop-blur">
                    <i className="fa-solid fa-location-dot text-sky-blue" />{" "}
                    Pune
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface/80 border border-border text-text-muted backdrop-blur">
                    <i className="fa-solid fa-graduation-cap text-sky-blue" />{" "}
                    9.04 CGPA
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    aria-label="Email"
                    className="grid place-items-center w-8 h-8 rounded-md bg-surface/80 border border-border text-text-muted hover:text-sky-blue hover:border-sky-blue transition-colors backdrop-blur"
                  >
                    <i className="fa-solid fa-envelope text-xs" />
                  </a>
                  <a
                    href={`https://wa.me/${PROFILE.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="WhatsApp"
                    className="grid place-items-center w-8 h-8 rounded-md bg-mint/15 border border-mint/40 text-mint hover:bg-mint hover:text-dark-bg transition-colors backdrop-blur"
                  >
                    <i className="fa-brands fa-whatsapp text-xs" />
                  </a>
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="grid place-items-center w-8 h-8 rounded-md bg-surface/80 border border-border text-text-muted hover:text-sky-blue hover:border-sky-blue transition-colors backdrop-blur"
                  >
                    <i className="fa-brands fa-linkedin text-xs" />
                  </a>
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="grid place-items-center w-8 h-8 rounded-md bg-surface/80 border border-border text-text-muted hover:text-sky-blue hover:border-sky-blue transition-colors backdrop-blur"
                  >
                    <i className="fa-brands fa-github text-xs" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {QUICK_FACTS.map(({ label, value, icon }) => (
              <div
                key={label}
                className="p-4 rounded-xl bg-surface border border-border"
              >
                <div className="flex items-center gap-2 text-sky-blue text-xs uppercase tracking-wider">
                  <i className={`fa-solid ${icon}`} />
                  {label}
                </div>
                <p className="mt-1 text-sm text-text-white font-medium break-words">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-blue">
            About Me
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold leading-tight">
            Full Stack Developer who turns specs into{" "}
            <span className="bg-gradient-to-r from-sky-blue to-cyan-glow bg-clip-text text-transparent">
              shipped products.
            </span>
          </h1>
          <div className="mt-6 space-y-4 text-text-muted leading-relaxed">
            <p>
              I'm Lokesh, a Full Stack Developer based in Pune with{" "}
              <span className="text-text-white font-medium">
                {PROFILE.yearsOfExperience} years of professional experience
              </span>{" "}
              building web and cross-platform mobile apps. I currently work in
              a{" "}
              <span className="text-text-white font-medium">hybrid setup</span>{" "}
              at{" "}
              <a
                href="https://techcoderlabz.com"
                target="_blank"
                rel="noreferrer"
                className="text-text-white font-medium underline decoration-sky-blue/40 underline-offset-4 hover:decoration-sky-blue transition-colors"
              >
                SN Any Device Software Solutions
              </a>{" "}
              — also operating as{" "}
              <a
                href="https://techcoderlabz.com"
                target="_blank"
                rel="noreferrer"
                className="text-text-white font-medium underline decoration-cyan-glow/40 underline-offset-4 hover:decoration-cyan-glow transition-colors"
              >
                TechCoderLabz
              </a>{" "}
              for our open-source / dev-tools work — where I've shipped 6+
              production apps using React.js, Vite, Tailwind CSS, Node.js, and
              Capacitor.js.
            </p>
            <p>
              I've published{" "}
              <span className="text-text-white font-medium">
                3 npm SDKs and 1 Flutter SDK on pub.dev
              </span>{" "}
              that power 5+ live applications, and I've architected REST APIs
              and authentication systems for production traffic. Whether it's a
              Next.js commerce platform, a Capacitor mobile app, or a Swift UI
              vault — I focus on clean architecture and reliable delivery.
            </p>
            <p>
              I graduated from GH Raisoni College of Engineering with a CGPA of{" "}
              <span className="text-text-white font-medium">9.04 / 10</span> in
              B.Tech Computer Science. Outside work I'm into chess, the gym,
              and shipping side projects on weekends.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={PROFILE.resume}
              download="Lokesh_Burade_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-blue to-cyan-glow text-dark-bg font-semibold hover:opacity-90 transition-opacity"
            >
              <i className="fa-solid fa-download" /> Download Resume
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface border border-border text-text-white font-semibold hover:border-sky-blue hover:text-sky-blue transition-colors"
            >
              <i className="fa-brands fa-linkedin" /> Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <SectionHeader
          eyebrow="Experience"
          title="Work history"
          sub="Building production apps remotely from Pune."
        />
        <div className="mt-10 relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2" />
          <ul className="space-y-10">
            {EXPERIENCE.map((job, idx) => (
              <li
                key={job.company}
                className={`relative md:grid md:grid-cols-2 md:gap-12 ${
                  idx % 2 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 grid place-items-center w-3 h-3 rounded-full bg-sky-blue ring-4 ring-dark-bg" />
                <div
                  className={`pl-12 md:pl-0 ${
                    idx % 2 ? "md:pl-12" : "md:pr-12 md:text-right"
                  }`}
                >
                  <p className="text-xs uppercase tracking-wider text-text-muted">
                    {job.period}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-text-white">
                    {job.role}
                  </h3>
                  <p className="text-sm">
                    {job.companyUrl ? (
                      <a
                        href={job.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-blue hover:underline underline-offset-4 decoration-sky-blue/50"
                      >
                        {job.company}
                      </a>
                    ) : (
                      <span className="text-sky-blue">{job.company}</span>
                    )}
                    {job.companyAlt && (
                      <>
                        {" "}
                        <span className="text-text-muted">·</span>{" "}
                        {job.companyUrl ? (
                          <a
                            href={job.companyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-cyan-glow hover:underline underline-offset-4 decoration-cyan-glow/50"
                          >
                            {job.companyAlt}
                          </a>
                        ) : (
                          <span className="text-cyan-glow">
                            {job.companyAlt}
                          </span>
                        )}
                      </>
                    )}
                  </p>
                  <p className="text-text-muted text-xs mt-1">
                    {job.location}
                  </p>
                  {job.aliasNote && (
                    <p
                      className={`text-text-muted text-xs italic mt-2 max-w-sm ${
                        idx % 2 ? "md:ml-auto" : ""
                      }`}
                    >
                      {job.aliasNote}
                    </p>
                  )}
                  {job.current && (
                    <span className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-mint/10 border border-mint/30 text-mint text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                      Current
                    </span>
                  )}
                </div>
                <div
                  className={`mt-4 md:mt-0 pl-12 md:pl-0 ${
                    idx % 2 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <ul className="space-y-2 text-sm text-text-muted">
                    {job.points.map((point, i) => (
                      <li key={i} className="leading-relaxed">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {job.showcase && (
                  <div className="mt-6 pl-12 md:pl-12 md:col-span-2">
                    <div className="rounded-2xl bg-surface border border-border p-6 md:p-8 text-left">
                      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-sky-blue">
                            Company Showcase
                          </p>
                          <h4 className="mt-1 text-base md:text-lg font-semibold text-text-white">
                            {job.showcase.title}
                          </h4>
                          {job.showcase.blurb && (
                            <p className="mt-1 text-sm text-text-muted max-w-2xl">
                              {job.showcase.blurb}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 grid gap-5 md:grid-cols-2">
                        {job.showcase.stores.map((store) => (
                          <a
                            key={store.label}
                            href={store.url}
                            target="_blank"
                            rel="noreferrer"
                            title={`Open the ${store.label} developer page`}
                            className="group relative block rounded-xl overflow-hidden bg-gradient-to-br from-dark-bg via-dark-bg to-surface-2 border border-border hover:border-sky-blue/50 transition-all aspect-[4/3]"
                          >
                            <div
                              className={`absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-dark-bg/85 backdrop-blur border border-border text-[11px] font-medium ${store.color}`}
                            >
                              <i className={store.icon} />
                              {store.label}
                            </div>
                            <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-dark-bg/85 backdrop-blur border border-border text-[11px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                              Visit developer page{" "}
                              <i className="fa-solid fa-arrow-up-right-from-square" />
                            </span>
                            <img
                              src={SHOWCASE_IMAGES[store.image]}
                              alt={`Apps shipped by ${job.company} on ${store.label}`}
                              loading="lazy"
                              className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <SectionHeader
          eyebrow="Tech Stack"
          title="What I work with"
          sub="The tools and frameworks I reach for in production."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map(({ title, skills }) => (
            <div
              key={title}
              className="p-6 rounded-2xl bg-surface border border-border hover:border-sky-blue/50 transition-colors"
            >
              <h3 className="text-text-white font-semibold">{title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-md bg-dark-bg border border-border text-xs text-text-muted hover:text-sky-blue hover:border-sky-blue/40 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-2 gap-10">
        <div className="p-8 rounded-2xl bg-surface border border-border">
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-blue">
            Education
          </p>
          <h3 className="mt-2 text-2xl font-bold">{EDUCATION.school}</h3>
          <p className="mt-1 text-text-white">{EDUCATION.degree}</p>
          <p className="mt-2 text-text-muted text-sm">
            {EDUCATION.period} · {EDUCATION.location}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-blue/10 border border-sky-blue/30 text-sky-blue text-sm font-medium">
            <i className="fa-solid fa-trophy" /> CGPA {EDUCATION.cgpa}
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-surface border border-border">
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-blue">
            Achievements
          </p>
          <ul className="mt-4 space-y-4">
            {ACHIEVEMENTS.map(({ title, desc }) => (
              <li key={title} className="flex gap-3">
                <i className="fa-solid fa-award mt-1 text-sky-blue" />
                <div>
                  <p className="text-text-white font-medium">{title}</p>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
