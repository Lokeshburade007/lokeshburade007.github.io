import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProjectCard from "../../components/ProjectCard";
import {
  EARLIER_PROJECTS,
  PROJECT_CATEGORIES,
  PROJECTS,
} from "../../data/projects";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const matches = (project) =>
    activeCategory === "All" || project.tags?.includes(activeCategory);

  const recent = useMemo(() => PROJECTS.filter(matches), [activeCategory]);
  const earlier = useMemo(
    () => EARLIER_PROJECTS.filter(matches),
    [activeCategory]
  );

  return (
    <div className="w-full">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-sky-blue">
          Selected Work
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold leading-tight">
          Recent{" "}
          <span className="bg-gradient-to-r from-sky-blue to-cyan-glow bg-clip-text text-transparent">
            projects
          </span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-text-muted">
          A snapshot of production apps, SDKs, and platforms I've shipped at{" "}
          <span className="text-text-white">
            SN Any Device Software Solutions
          </span>{" "}
          (also operating as{" "}
          <span className="text-text-white">TechCoderLabz</span>) and as
          personal open-source work. Hover any preview to navigate between web,
          store, and source views.
        </p>

        <div className="mt-8 inline-flex flex-wrap justify-center gap-2 p-1 rounded-full bg-surface border border-border">
          {PROJECT_CATEGORIES.map((cat) => {
            const all = [...PROJECTS, ...EARLIER_PROJECTS];
            const count =
              cat === "All"
                ? all.length
                : all.filter((p) => p.tags?.includes(cat)).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-sky-blue to-cyan-glow text-dark-bg"
                    : "text-text-muted hover:text-text-white"
                }`}
              >
                {cat}
                <span className="ml-1.5 text-[11px] opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-12">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Recent Work</h2>
            <p className="text-sm text-text-muted mt-1">
              Production apps & SDKs from 2024 – 2025
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-surface border border-border text-xs text-text-muted shrink-0">
            {recent.length} project{recent.length === 1 ? "" : "s"}
          </span>
        </div>

        {recent.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recent.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>
        ) : (
          <p className="text-center text-text-muted py-10">
            No recent projects in this category.
          </p>
        )}
      </section>

      {earlier.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-16">
          <div className="relative my-10 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs uppercase tracking-[0.2em] text-text-muted">
              Earlier Projects
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">
                College & First Freelance Work
              </h2>
              <p className="text-sm text-text-muted mt-1">
                The projects that started it all — internships, final-year
                project, and early freelance builds.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-surface border border-border text-xs text-text-muted shrink-0">
              {earlier.length} project{earlier.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {earlier.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="rounded-3xl bg-gradient-to-br from-surface to-surface-2 border border-border p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold">
            Want to be the next case study?
          </h3>
          <p className="mt-2 text-text-muted max-w-xl mx-auto">
            I'm currently taking on freelance projects. Tell me about your idea
            and let's see if we're a fit.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-blue to-cyan-glow text-dark-bg font-semibold hover:opacity-90 transition-opacity"
            >
              <i className="fa-solid fa-rocket" /> Start a Project
            </Link>
            <a
              href="https://github.com/Lokeshburade007"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-dark-bg border border-border text-text-white font-semibold hover:border-sky-blue hover:text-sky-blue transition-colors"
            >
              <i className="fa-brands fa-github" /> View All on GitHub
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
