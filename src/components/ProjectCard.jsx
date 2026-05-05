import { useState } from "react";
import { PREVIEW_TYPES } from "../data/projects";

const ProjectCard = ({
  title,
  tagline,
  description,
  tags,
  badge,
  techStack,
  previews,
}) => {
  const [idx, setIdx] = useState(0);
  const total = previews.length;
  const current = previews[idx];
  const meta = PREVIEW_TYPES[current.type];
  const isPrivateGit = current.type === "git" && current.private;

  const next = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIdx((i) => (i + 1) % total);
  };

  const prev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIdx((i) => (i - 1 + total) % total);
  };

  return (
    <article className="group flex flex-col rounded-2xl overflow-hidden bg-surface border border-border hover:border-sky-blue/50 transition-all">
      {/* Carousel */}
      <div className="relative aspect-[5/4] bg-gradient-to-br from-dark-bg via-dark-bg to-surface-2 overflow-hidden">
        <a
          href={current.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open on ${meta.label}`}
          className="block w-full h-full"
          title={
            isPrivateGit
              ? "Private repo — opens on GitHub (visible to authorized members)"
              : `Open on ${meta.label}`
          }
        >
          <img
            src={current.image}
            alt={`${title} — ${meta.label} preview`}
            className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          {isPrivateGit && (
            <div className="absolute inset-0 bg-dark-bg/55 backdrop-blur-[2px] grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-center px-6">
                <div className="grid place-items-center w-14 h-14 mx-auto rounded-full bg-dark-bg/80 border border-border text-sky-blue text-xl">
                  <i className="fa-solid fa-lock" />
                </div>
                <p className="mt-3 text-sm text-text-white font-semibold">
                  Private repository
                </p>
                <p className="mt-1 text-xs text-text-muted max-w-[260px] mx-auto leading-relaxed">
                  Opens on GitHub — visible if you're signed in as an
                  authorized maintainer.
                </p>
              </div>
            </div>
          )}
        </a>

        {/* Type badge (top-left) */}
        <span
          className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-dark-bg/85 backdrop-blur border border-border text-[11px] font-medium ${meta.color}`}
        >
          <i className={meta.icon} />
          {meta.label}
          {isPrivateGit && (
            <i className="fa-solid fa-lock text-text-muted ml-0.5" />
          )}
        </span>

        {/* Status badge (top-right) */}
        {badge && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-mint/15 border border-mint/40 text-[11px] text-mint font-medium">
            {badge}
          </span>
        )}

        {/* Carousel controls (only when >1 preview) */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous preview"
              className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 rounded-full bg-dark-bg/80 backdrop-blur border border-border text-text-white opacity-0 group-hover:opacity-100 hover:bg-sky-blue hover:text-dark-bg hover:border-sky-blue transition-all"
            >
              <i className="fa-solid fa-chevron-left" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next preview"
              className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 rounded-full bg-dark-bg/80 backdrop-blur border border-border text-text-white opacity-0 group-hover:opacity-100 hover:bg-sky-blue hover:text-dark-bg hover:border-sky-blue transition-all"
            >
              <i className="fa-solid fa-chevron-right" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-dark-bg/70 backdrop-blur border border-border">
              {previews.map((p, i) => {
                const m = PREVIEW_TYPES[p.type];
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIdx(i);
                    }}
                    aria-label={`Show ${m.label}`}
                    title={m.label}
                    className={`grid place-items-center w-5 h-5 rounded-full border transition-all ${
                      i === idx
                        ? `bg-sky-blue text-dark-bg border-sky-blue scale-110`
                        : `bg-transparent text-text-muted border-border hover:text-text-white`
                    }`}
                  >
                    <i className={`${m.icon} text-[9px]`} />
                  </button>
                );
              })}
            </div>

            <span className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-dark-bg/70 backdrop-blur border border-border text-[10px] text-text-muted">
              {idx + 1} / {total}
            </span>
          </>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col p-6">
        <h3 className="text-lg font-semibold text-text-white">{title}</h3>
        {tagline && (
          <p className="mt-1 text-sm text-sky-blue/90">{tagline}</p>
        )}
        <p className="mt-3 text-sm text-text-muted leading-relaxed">
          {description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {techStack.map((t) => (
            <span
              key={t}
              className="px-2 py-1 rounded-md bg-dark-bg border border-border text-[11px] text-text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-border flex flex-wrap items-center gap-4 text-sm">
          {previews.map((p) => {
            const m = PREVIEW_TYPES[p.type];
            const isPrivate = p.type === "git" && p.private;
            return (
              <a
                key={p.type + p.url}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                title={
                  isPrivate
                    ? `${m.label} (private repo)`
                    : `Open on ${m.label}`
                }
                className={`inline-flex items-center gap-1.5 ${m.color} hover:brightness-125 transition-all`}
              >
                <i className={m.icon} />
                <span>{m.label}</span>
                {isPrivate && (
                  <i className="fa-solid fa-lock text-text-muted text-[10px]" />
                )}
              </a>
            );
          })}
        </div>

        {tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-full bg-sky-blue/10 border border-sky-blue/20 text-[10px] uppercase tracking-wider text-sky-blue/80"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
