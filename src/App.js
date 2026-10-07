import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROFILE } from "./data/profile";

/* ─── TRAFFIC LIGHT COLORS ───────────────────────────────────────── */
const TL = { red: "#FF5F57", yellow: "#FFBD2E", green: "#28C840" };

/* ─── SVG DOCK ICONS ─────────────────────────────────────────────── */
const IconAbout = () => (
  <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6">
    <circle cx="14" cy="10" r="4.5" fill="white" fillOpacity="0.95" />
    <path d="M5 25c0-4.97 4.03-9 9-9s9 4.03 9 9" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IconProjects = () => (
  <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6">
    <path d="M3 9a2 2 0 012-2h7l2.5 3H23a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" fill="white" fillOpacity="0.9" />
  </svg>
);
const IconSkills = () => (
  <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6">
    <circle cx="14" cy="14" r="3.5" fill="white" fillOpacity="0.95" />
    <path d="M14 3v3M14 22v3M3 14h3M22 14h3M6.22 6.22l2.12 2.12M19.66 19.66l2.12 2.12M6.22 21.78l2.12-2.12M19.66 8.34l2.12-2.12" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IconContact = () => (
  <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6">
    <rect x="2" y="7" width="24" height="16" rx="3" fill="white" fillOpacity="0.9" />
    <path d="M2 10l12 7.5L26 10" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const IconExperience = () => (
  <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6">
    <rect x="2" y="13" width="24" height="13" rx="3" fill="white" fillOpacity="0.9" />
    <path d="M9 13v-3a5 5 0 0110 0v3" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <rect x="11" y="17" width="6" height="4" rx="1" fill="rgba(0,0,0,0.2)" />
  </svg>
);

/* ─── DOCK APP CONFIG ─────────────────────────────────────────────── */
const DOCK_APPS = [
  { id: "about",      Icon: IconAbout,      label: "About Me",    gradient: "from-blue-500 to-blue-600",       pos: { x: 60,  y: 52  } },
  { id: "projects",   Icon: IconProjects,   label: "Projects",    gradient: "from-indigo-500 to-blue-500",     pos: { x: 100, y: 84  } },
  { id: "skills",     Icon: IconSkills,     label: "Skills",      gradient: "from-gray-500 to-gray-600",       pos: { x: 140, y: 116 } },
  { id: "contact",    Icon: IconContact,    label: "Contact",     gradient: "from-sky-500 to-cyan-500",        pos: { x: 180, y: 148 } },
  { id: "experience", Icon: IconExperience, label: "Experience",  gradient: "from-emerald-500 to-green-600",   pos: { x: 220, y: 180 } },
];

const WINDOW_SIZES = {
  about:      { w: "min(460px, 94vw)", h: "min(540px, 82vh)" },
  projects:   { w: "min(700px, 97vw)", h: "min(530px, 82vh)" },
  skills:     { w: "min(600px, 96vw)", h: "min(510px, 80vh)" },
  contact:    { w: "min(400px, 94vw)", h: "auto"             },
  experience: { w: "min(560px, 94vw)", h: "min(540px, 82vh)" },
};

/* ─── TIME ───────────────────────────────────────────────────────── */
const TimeDisplay = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const day = now.toLocaleDateString("en-GB", { weekday: "short" });
  const date = now.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return <span className="tabular-nums text-xs sm:text-sm select-none">{day} {date} {time}</span>;
};

/* ─── ARCHITECTURE DIAGRAM ───────────────────────────────────────── */
const ArchDiagram = ({ dark }) => (
  <div className="mb-5 rounded-xl overflow-hidden">
    <svg viewBox="0 0 500 190" className="w-full" style={{ background: dark ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.04)" }}>
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0L10 5L0 10z" fill={dark ? "#555" : "#bbb"} />
        </marker>
      </defs>
      {/* Core Banking */}
      <rect x="8" y="68" width="96" height="52" rx="8" fill="#3B5BDB" />
      <text x="56" y="90" textAnchor="middle" fill="white" fontSize="9" fontWeight="600" fontFamily="-apple-system,sans-serif">Core Banking</text>
      <text x="56" y="104" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="8" fontFamily="-apple-system,sans-serif">Systems</text>
      {/* Arrow */}
      <line x1="104" y1="94" x2="146" y2="94" stroke={dark?"#555":"#bbb"} strokeWidth="1.5" markerEnd="url(#arr)" />
      {/* SeaTunnel */}
      <rect x="148" y="68" width="96" height="52" rx="8" fill="#7048E8" />
      <text x="196" y="90" textAnchor="middle" fill="white" fontSize="9" fontWeight="600" fontFamily="-apple-system,sans-serif">SeaTunnel ETL</text>
      <text x="196" y="104" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="8" fontFamily="-apple-system,sans-serif">Pipeline</text>
      {/* Arrow */}
      <line x1="244" y1="94" x2="286" y2="94" stroke={dark?"#555":"#bbb"} strokeWidth="1.5" markerEnd="url(#arr)" />
      {/* PostgreSQL */}
      <rect x="288" y="68" width="96" height="52" rx="8" fill="#2F9E44" />
      <text x="336" y="90" textAnchor="middle" fill="white" fontSize="9" fontWeight="600" fontFamily="-apple-system,sans-serif">PostgreSQL</text>
      <text x="336" y="104" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="8" fontFamily="-apple-system,sans-serif">Database</text>
      {/* Branch to ML */}
      <polyline points="336,68 336,48 412,48 412,62" fill="none" stroke={dark?"#555":"#bbb"} strokeWidth="1.5" markerEnd="url(#arr)" />
      {/* Branch to Case Mgmt */}
      <polyline points="336,120 336,142 412,142 412,128" fill="none" stroke={dark?"#555":"#bbb"} strokeWidth="1.5" markerEnd="url(#arr)" />
      {/* ML Service */}
      <rect x="384" y="8" width="108" height="52" rx="8" fill="#E8590C" />
      <text x="438" y="31" textAnchor="middle" fill="white" fontSize="9" fontWeight="600" fontFamily="-apple-system,sans-serif">FastAPI ML Service</text>
      <text x="438" y="44" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="7.5" fontFamily="-apple-system,sans-serif">Isolation Forest · Random Forest</text>
      {/* Case Mgmt */}
      <rect x="384" y="128" width="108" height="52" rx="8" fill="#1971C2" />
      <text x="438" y="150" textAnchor="middle" fill="white" fontSize="9" fontWeight="600" fontFamily="-apple-system,sans-serif">Case Management</text>
      <text x="438" y="163" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="7.5" fontFamily="-apple-system,sans-serif">Python · Odoo · Compliance</text>
      {/* Footer */}
      <text x="250" y="183" textAnchor="middle" fill={dark?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.25)"} fontSize="7.5" fontFamily="-apple-system,sans-serif">
        Each service in its own Docker container · Up to 5M transactions / peak day
      </text>
    </svg>
  </div>
);

/* ─── WINDOW CONTENT COMPONENTS ──────────────────────────────────── */

const AboutContent = ({ dark }) => {
  const [view, setView] = useState("backend");
  const cv = view === "backend" ? PROFILE.cv.django : PROFILE.cv.odoo;
  const summary = view === "backend" ? PROFILE.summaries.backend : PROFILE.summaries.odoo;
  const skills = view === "backend" ? PROFILE.skills.backend : PROFILE.skills.odoo;

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src="/img1.jpeg"
          alt={PROFILE.name}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
          style={{ boxShadow: "0 0 0 2px rgba(255,255,255,0.15)" }}
        />
        <div>
          <h2 className={`text-base font-semibold ${dark ? "text-zinc-100" : "text-zinc-900"}`}>{PROFILE.name}</h2>
          <p className={`text-xs mt-0.5 ${dark ? "text-zinc-400" : "text-zinc-500"}`}>{PROFILE.title}</p>
          <p className={`text-xs mt-0.5 flex items-center gap-1 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            {PROFILE.location}
          </p>
        </div>
      </div>

      {/* Segmented control */}
      <div className={`flex p-0.5 rounded-lg ${dark ? "bg-white/10" : "bg-black/10"}`}>
        {[["backend", "Backend / Django"], ["odoo", "Odoo Developer"]].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className={`flex-1 py-1 text-xs rounded-md font-medium transition-all
              ${view === key
                ? dark ? "bg-white/20 text-white shadow" : "bg-white text-zinc-900 shadow-sm"
                : dark ? "text-zinc-400 hover:text-zinc-200" : "text-zinc-500 hover:text-zinc-700"
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Summary */}
      <p className={`text-[13px] leading-relaxed flex-1 overflow-auto scrollbar-thin ${dark ? "text-zinc-300" : "text-zinc-700"}`}>
        {summary}
      </p>

      {/* Key skills */}
      <div>
        <p className={`text-[11px] font-semibold mb-2 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>KEY SKILLS</p>
        <div className="flex flex-wrap gap-1.5">
          {skills.slice(0, 4).flatMap(g => g.items.slice(0, 2)).slice(0, 8).map((s, i) => (
            <span key={i} className={`px-2.5 py-1 rounded-full text-xs ${dark ? "bg-white/10 text-zinc-300" : "bg-black/8 text-zinc-700"}`}>{s}</span>
          ))}
        </div>
      </div>

      {/* CV download */}
      <a
        href={cv.url}
        download={cv.filename}
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90 active:opacity-75"
        style={{ background: "#007AFF" }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        {cv.label}
      </a>
    </div>
  );
};

const ProjectsContent = ({ dark }) => {
  const [selected, setSelected] = useState(PROFILE.projects[0].id);
  const project = PROFILE.projects.find(p => p.id === selected);

  return (
    <div className="flex h-full -m-5 sm:-m-6">
      {/* Sidebar */}
      <div className={`w-40 sm:w-44 flex-shrink-0 border-r ${dark ? "border-white/10 bg-black/20" : "border-black/8 bg-black/4"} p-2 flex flex-col gap-0.5`}>
        <p className={`text-[10px] font-semibold px-2 py-1.5 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>PROJECTS</p>
        {PROFILE.projects.map(p => (
          <button
            key={p.id}
            onClick={() => setSelected(p.id)}
            className={`w-full text-left px-2 py-1.5 rounded-md text-xs transition-colors leading-tight
              ${selected === p.id ? "text-white" : dark ? "text-zinc-300 hover:bg-white/5" : "text-zinc-700 hover:bg-black/5"}`}
            style={selected === p.id ? { background: "#007AFF" } : {}}
          >
            {p.name}
          </button>
        ))}
        <div className={`mt-3 border-t pt-2 ${dark ? "border-white/10" : "border-black/8"}`}>
          <p className={`text-[10px] font-semibold px-2 py-1 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>GITHUB</p>
          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`block px-2 py-1.5 rounded-md text-xs transition-colors ${dark ? "text-zinc-400 hover:bg-white/5" : "text-zinc-500 hover:bg-black/5"}`}
          >
            Personal projects ↗
          </a>
        </div>
      </div>

      {/* Detail */}
      <div className="flex-1 p-5 sm:p-6 overflow-auto scrollbar-thin">
        <h2 className={`text-sm font-semibold mb-0.5 ${dark ? "text-zinc-100" : "text-zinc-900"}`}>{project.name}</h2>
        <p className={`text-[11px] mb-3 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>{project.clients}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map((t, i) => (
            <span key={i} className={`px-2 py-0.5 rounded text-[11px] ${dark ? "bg-white/10 text-zinc-300" : "bg-black/6 text-zinc-700"}`}>{t}</span>
          ))}
        </div>
        {project.hasArchDiagram && <ArchDiagram dark={dark} />}
        {[["Problem", project.problem], ["What I built", project.built], ["Outcome", project.outcome]].map(([label, text]) => (
          <div key={label} className="mb-4">
            <p className={`text-[11px] font-semibold mb-1 ${dark ? "text-zinc-400" : "text-zinc-500"}`}>{label}</p>
            <p className={`text-[13px] leading-relaxed ${dark ? "text-zinc-300" : "text-zinc-700"}`}>{text}</p>
          </div>
        ))}
        <p className={`text-[11px] mt-4 ${dark ? "text-zinc-600" : "text-zinc-400"}`}>
          Client code is held in private company repositories. GitHub shows personal projects.
        </p>
      </div>
    </div>
  );
};

const SkillsContent = ({ dark }) => {
  const [view, setView] = useState("backend");
  const [cat, setCat] = useState(0);
  const categories = view === "backend" ? PROFILE.skills.backend : PROFILE.skills.odoo;
  const selected = categories[cat] || categories[0];

  return (
    <div className="flex h-full -m-5 sm:-m-6">
      {/* Sidebar */}
      <div className={`w-40 sm:w-44 flex-shrink-0 border-r ${dark ? "border-white/10 bg-black/20" : "border-black/8 bg-black/4"} p-2 flex flex-col gap-0.5`}>
        <div className={`flex p-0.5 rounded-lg mb-2 ${dark ? "bg-white/10" : "bg-black/10"}`}>
          {[["backend", "Backend"], ["odoo", "Odoo"]].map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setView(key); setCat(0); }}
              className={`flex-1 py-0.5 text-[11px] rounded-md font-medium transition-all
                ${view === key
                  ? dark ? "bg-white/20 text-white" : "bg-white text-zinc-900 shadow-sm"
                  : dark ? "text-zinc-400" : "text-zinc-500"}`}
            >
              {label}
            </button>
          ))}
        </div>
        {categories.map((c, i) => (
          <button
            key={i}
            onClick={() => setCat(i)}
            className={`w-full text-left px-2 py-1.5 rounded-md text-xs transition-colors
              ${cat === i ? "text-white" : dark ? "text-zinc-300 hover:bg-white/5" : "text-zinc-700 hover:bg-black/5"}`}
            style={cat === i ? { background: "#007AFF" } : {}}
          >
            {c.category}
          </button>
        ))}
      </div>

      {/* Skills */}
      <div className="flex-1 p-5 sm:p-6 overflow-auto scrollbar-thin">
        <p className={`text-xs font-semibold mb-4 ${dark ? "text-zinc-400" : "text-zinc-500"}`}>{selected.category}</p>
        <div className="flex flex-wrap gap-2">
          {selected.items.map((item, i) => (
            <span
              key={i}
              className={`px-3 py-1.5 rounded-lg text-sm ${dark ? "bg-white/10 text-zinc-200" : "bg-black/6 text-zinc-800"}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactContent = ({ dark }) => {
  const [copied, setCopied] = useState(null);

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const items = [
    { key: "email",    label: "Email",    value: PROFILE.email,    href: `mailto:${PROFILE.email}`, copyable: true,  external: false },
    { key: "phone",    label: "Phone",    value: PROFILE.phone,    href: `tel:${PROFILE.phone}`,    copyable: true,  external: false },
    { key: "linkedin", label: "LinkedIn", value: PROFILE.linkedin, href: PROFILE.linkedinUrl,       copyable: false, external: true  },
    { key: "github",   label: "GitHub",   value: PROFILE.github,   href: PROFILE.githubUrl,         copyable: false, external: true  },
    { key: "location", label: "Location", value: PROFILE.location, href: null,                      copyable: false, external: false },
  ];

  return (
    <div className="space-y-2">
      {items.map(c => (
        <div key={c.key} className={`flex items-center gap-3 p-3 rounded-xl transition-colors group ${dark ? "bg-white/5 hover:bg-white/8" : "bg-black/3 hover:bg-black/6"}`}>
          <div className="flex-1 min-w-0">
            <p className={`text-[11px] mb-0.5 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>{c.label}</p>
            {c.href ? (
              <a
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className={`text-sm font-medium block truncate transition-colors ${dark ? "text-zinc-200 hover:text-blue-400" : "text-zinc-800 hover:text-blue-600"}`}
              >
                {c.value}
              </a>
            ) : (
              <p className={`text-sm font-medium ${dark ? "text-zinc-200" : "text-zinc-800"}`}>{c.value}</p>
            )}
          </div>
          {c.copyable && (
            <button
              onClick={() => copy(c.value, c.key)}
              className={`px-2.5 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all
                ${copied === c.key ? "text-green-400" : dark ? "bg-white/10 text-zinc-300 hover:bg-white/20" : "bg-black/8 text-zinc-700 hover:bg-black/15"}`}
            >
              {copied === c.key ? "✓ Copied" : "Copy"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

const ExperienceContent = ({ dark }) => (
  <div className="overflow-auto scrollbar-thin h-full">
    {PROFILE.experience.map((job, i) => (
      <div key={i} className="relative pl-7 pb-6">
        {i < PROFILE.experience.length - 1 && (
          <div className={`absolute left-[7px] top-5 bottom-0 w-px ${dark ? "bg-white/10" : "bg-black/10"}`} />
        )}
        <div
          className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 ${
            job.current
              ? "border-[#007AFF]"
              : dark ? "bg-zinc-700 border-zinc-600" : "bg-gray-200 border-gray-300"
          }`}
          style={job.current ? { background: "#007AFF" } : {}}
        />
        <div className="ml-1">
          <p className={`text-sm font-semibold ${dark ? "text-zinc-100" : "text-zinc-900"}`}>{job.title}</p>
          <p className={`text-xs mb-2 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>{job.company} · {job.period}</p>
          <ul className="space-y-1.5">
            {job.highlights.map((h, j) => (
              <li key={j} className={`text-xs leading-relaxed flex gap-2 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>
                <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-current opacity-40" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
);

const WINDOW_CONTENT = {
  about:      (dark) => <AboutContent dark={dark} />,
  projects:   (dark) => <ProjectsContent dark={dark} />,
  skills:     (dark) => <SkillsContent dark={dark} />,
  contact:    (dark) => <ContactContent dark={dark} />,
  experience: (dark) => <ExperienceContent dark={dark} />,
};

const WINDOW_TITLES = {
  about: "About Me",
  projects: "Projects",
  skills: "Skills & Tools",
  contact: "Contact",
  experience: "Experience",
};

/* ─── SPOTLIGHT ───────────────────────────────────────────────────── */
const Spotlight = ({ dark, onClose, onOpen }) => {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const results = DOCK_APPS.filter(a => a.label.toLowerCase().includes(q.toLowerCase()));
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel(s => Math.min(s + 1, results.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setSel(s => Math.max(s - 1, 0)); }
    if (e.key === "Enter" && results[sel]) { onOpen(results[sel].id); onClose(); }
    if (e.key === "Escape") onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[400] flex items-start justify-center pt-28 sm:pt-36 px-4"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -8 }}
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
        onClick={e => e.stopPropagation()}
        className={`w-full max-w-[560px] rounded-2xl overflow-hidden shadow-2xl border ${
          dark ? "bg-zinc-800/95 border-white/10" : "bg-white/95 border-black/10"
        }`}
        style={{ backdropFilter: "blur(20px) saturate(180%)", WebkitBackdropFilter: "blur(20px) saturate(180%)" }}
      >
        <div className={`flex items-center gap-3 px-4 py-3 border-b ${dark ? "border-white/10" : "border-black/8"}`}>
          <svg className="w-4 h-4 opacity-40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={e => { setQ(e.target.value); setSel(0); }}
            onKeyDown={handleKey}
            placeholder="Spotlight Search"
            className={`flex-1 bg-transparent outline-none text-sm ${dark ? "text-zinc-100 placeholder-zinc-500" : "text-zinc-900 placeholder-zinc-400"}`}
          />
          <kbd className={`text-[11px] px-1.5 py-0.5 rounded ${dark ? "bg-white/10 text-zinc-400" : "bg-black/8 text-zinc-500"}`}>esc</kbd>
        </div>
        {results.length > 0 && (
          <div className="py-1.5">
            {results.map((a, i) => (
              <button
                key={a.id}
                onClick={() => { onOpen(a.id); onClose(); }}
                onMouseEnter={() => setSel(i)}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors
                  ${i === sel ? "text-white" : dark ? "text-zinc-300" : "text-zinc-700"}`}
                style={i === sel ? { background: "#007AFF" } : {}}
              >
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${a.gradient} flex items-center justify-center flex-shrink-0`}>
                  <a.Icon />
                </div>
                {a.label}
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

/* ─── WINDOW COMPONENT (top-level — not inside render) ───────────── */
const AppWindow = React.memo(function AppWindow({
  id, dark, isActive, isMin, isMax,
  onClose, onMin, onMax, onFocus,
  desktopRef, initialPos,
}) {
  const [tlHover, setTlHover] = useState(false);
  const sz = WINDOW_SIZES[id];

  return (
    <motion.div
      drag={!isMax}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={desktopRef}
      onMouseDown={onFocus}
      onTouchStart={onFocus}
      initial={{ opacity: 0, scale: 0.94, x: initialPos.x, y: initialPos.y }}
      animate={{ opacity: isMin ? 0 : 1, scale: isMin ? 0.85 : 1, ...(isMax ? { x: 0, y: 0 } : {}) }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 340, damping: 32 }}
      className={`${isMax ? "fixed inset-0 z-[150] rounded-none" : "absolute rounded-xl"} overflow-hidden flex flex-col`}
      style={{
        width:  isMax ? "100vw" : sz.w,
        height: isMax ? "100vh" : sz.h,
        zIndex: isMax ? 150 : isActive ? 100 : 50,
        pointerEvents: isMin ? "none" : "auto",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        background: dark ? "rgba(30,30,32,0.88)" : "rgba(242,242,247,0.92)",
        border: `1px solid ${dark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)"}`,
        boxShadow: isActive
          ? "0 24px 64px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(255,255,255,0.06)"
          : "0 12px 32px rgba(0,0,0,0.35), 0 0 0 0.5px rgba(255,255,255,0.04)",
      }}
    >
      {/* Title bar */}
      <div
        className={`flex items-center px-3 py-2.5 flex-shrink-0 select-none border-b ${
          dark ? "border-white/[0.07]" : "border-black/[0.07]"
        }`}
        style={{ cursor: isMax ? "default" : "move" }}
      >
        {/* Traffic lights */}
        <div
          className="flex items-center gap-1.5"
          onMouseEnter={() => setTlHover(true)}
          onMouseLeave={() => setTlHover(false)}
        >
          {[
            { color: TL.red,    glyph: "✕", action: onClose },
            { color: TL.yellow, glyph: "−", action: onMin   },
            { color: TL.green,  glyph: "+", action: onMax   },
          ].map(({ color, glyph, action }) => (
            <button
              key={color}
              onClick={(e) => { e.stopPropagation(); action(); }}
              className="w-3 h-3 rounded-full flex items-center justify-center transition-opacity"
              style={{ background: color }}
            >
              {tlHover && (
                <span className="text-[7px] font-black leading-none" style={{ color: "rgba(0,0,0,0.45)" }}>{glyph}</span>
              )}
            </button>
          ))}
        </div>

        {/* Title */}
        <span
          className={`absolute left-1/2 -translate-x-1/2 text-xs font-medium transition-opacity ${
            isActive ? (dark ? "text-zinc-200 opacity-100" : "text-zinc-700 opacity-100") : "opacity-40"
          }`}
        >
          {WINDOW_TITLES[id]}
        </span>
      </div>

      {/* Body */}
      <div className={`flex-1 overflow-auto p-5 sm:p-6 ${dark ? "text-zinc-100" : "text-zinc-900"}`}>
        {WINDOW_CONTENT[id](dark)}
      </div>
    </motion.div>
  );
});

/* ─── MOBILE LAYOUT ──────────────────────────────────────────────── */
const MobileLayout = ({ dark, setDark }) => {
  const [activeApp, setActiveApp] = useState(null);

  return (
    <div
      className={`min-h-screen ${dark ? "text-white" : "text-zinc-900"}`}
      style={{
        background: dark
          ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
          : "linear-gradient(135deg, #e0e7ff 0%, #dbeafe 50%, #e0f2fe 100%)",
      }}
    >
      {/* Wallpaper */}
      <img
        src="/img1.jpeg"
        alt=""
        aria-hidden="true"
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ objectFit: "cover", objectPosition: "center center", opacity: dark ? 0.25 : 0.35 }}
      />

      {/* Status bar */}
      <div
        className="relative z-10 flex items-center justify-between px-5 pt-12 pb-3"
        style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
      >
        <span className="text-sm font-semibold">{PROFILE.name.split(" ")[0]}</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setDark(!dark)} className="text-base p-1">{dark ? "🌙" : "☀️"}</button>
          <TimeDisplay />
        </div>
      </div>

      {/* App grid */}
      <div className="relative z-10 px-8 pt-8 grid grid-cols-4 gap-5">
        {DOCK_APPS.map(app => (
          <button
            key={app.id}
            onClick={() => setActiveApp(app.id)}
            className="flex flex-col items-center gap-1.5"
          >
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.gradient} flex items-center justify-center shadow-lg`}
              style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}
            >
              <app.Icon />
            </div>
            <span className={`text-[11px] font-medium ${dark ? "text-white" : "text-zinc-800"}`}>{app.label}</span>
          </button>
        ))}
      </div>

      {/* Full-screen app */}
      <AnimatePresence>
        {activeApp && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 36 }}
            className={`fixed inset-0 z-50 flex flex-col ${dark ? "bg-zinc-900" : "bg-gray-50"}`}
          >
            {/* Nav bar */}
            <div
              className={`flex items-center px-4 border-b ${dark ? "border-white/10" : "border-black/10"}`}
              style={{ paddingTop: "env(safe-area-inset-top, 44px)", paddingBottom: 12 }}
            >
              <button
                onClick={() => setActiveApp(null)}
                className="text-sm font-medium flex items-center gap-1"
                style={{ color: "#007AFF" }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Home
              </button>
              <span className={`flex-1 text-center text-sm font-semibold ${dark ? "text-zinc-100" : "text-zinc-900"}`}>
                {WINDOW_TITLES[activeApp]}
              </span>
              <div className="w-14" />
            </div>
            <div className={`flex-1 overflow-auto p-5 ${dark ? "text-zinc-100" : "text-zinc-900"}`}>
              {WINDOW_CONTENT[activeApp](dark)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── MENU BAR DROPDOWN ───────────────────────────────────────────── */
const MenuDropdown = ({ dark, onClose, onOpenAbout }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96, y: -4 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.96, y: -4 }}
    transition={{ duration: 0.1 }}
    className={`absolute top-full left-0 mt-0.5 w-56 rounded-lg overflow-hidden shadow-2xl border z-[200] ${
      dark ? "bg-zinc-800/95 border-white/10" : "bg-white/95 border-black/10"
    }`}
    style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
  >
    <button
      onClick={() => { onOpenAbout(); onClose(); }}
      className={`w-full text-left px-4 py-1.5 text-xs transition-colors ${dark ? "text-zinc-300 hover:text-white hover:bg-blue-500" : "text-zinc-700 hover:text-white hover:bg-blue-500"}`}
    >
      About This Portfolio
    </button>
    <div className={`h-px mx-2 my-1 ${dark ? "bg-white/10" : "bg-black/10"}`} />
    <a
      href={PROFILE.cv.django.url}
      download={PROFILE.cv.django.filename}
      onClick={onClose}
      className={`block px-4 py-1.5 text-xs transition-colors ${dark ? "text-zinc-300 hover:text-white hover:bg-blue-500" : "text-zinc-700 hover:text-white hover:bg-blue-500"}`}
    >
      Download Django / Python CV
    </a>
    <a
      href={PROFILE.cv.odoo.url}
      download={PROFILE.cv.odoo.filename}
      onClick={onClose}
      className={`block px-4 py-1.5 text-xs transition-colors ${dark ? "text-zinc-300 hover:text-white hover:bg-blue-500" : "text-zinc-700 hover:text-white hover:bg-blue-500"}`}
    >
      Download Odoo CV
    </a>
  </motion.div>
);

/* ─── MAIN COMPONENT ─────────────────────────────────────────────── */
export default function MacOSPortfolio() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("portfolio-dark") !== "false"; } catch { return true; }
  });
  const [openWindows, setOpenWindows] = useState(["about"]);
  const [active, setActive] = useState("about");
  const [minimized, setMinimized] = useState([]);
  const [maximized, setMaximized] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [spotlight, setSpotlight] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const desktopRef = useRef(null);

  useEffect(() => {
    try { localStorage.setItem("portfolio-dark", dark ? "true" : "false"); } catch {}
  }, [dark]);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  const openWindow = useCallback((id) => {
    setOpenWindows(prev => prev.includes(id) ? prev : [...prev, id]);
    setMinimized(prev => prev.filter(w => w !== id));
    setActive(id);
  }, []);

  const closeWindow = useCallback((id) => {
    setOpenWindows(prev => prev.filter(w => w !== id));
    setMinimized(prev => prev.filter(w => w !== id));
    setMaximized(prev => prev.filter(w => w !== id));
    setActive(prev => prev === id ? null : prev);
  }, []);

  const minimizeWindow = useCallback((id) => {
    setMinimized(prev => prev.includes(id) ? prev : [...prev, id]);
  }, []);

  const toggleMaximize = useCallback((id) => {
    setMaximized(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]);
  }, []);

  const focusWindow = useCallback((id) => {
    setActive(id);
    setMinimized(prev => prev.filter(w => w !== id));
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSpotlight(s => !s);
      }
      if (e.key === "Escape") {
        if (spotlight) { setSpotlight(false); return; }
        if (menuOpen) { setMenuOpen(false); return; }
        if (active && openWindows.includes(active)) closeWindow(active);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [spotlight, menuOpen, active, openWindows, closeWindow]);

  if (isMobile) {
    return <MobileLayout dark={dark} setDark={setDark} />;
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{
        fontFamily: '-apple-system, "SF Pro Text", "SF Pro Display", Inter, system-ui, sans-serif',
        background: dark
          ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)"
          : "linear-gradient(135deg, #d0d9f0 0%, #c5d9ef 50%, #bcd8f0 100%)",
      }}
    >
      {/* Wallpaper */}
      <img
        src="/img1.jpeg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          objectFit: "cover",
          objectPosition: "center center",
          opacity: dark ? 0.28 : 0.38,
        }}
      />
      {/* Gradient overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background: dark
            ? "radial-gradient(ellipse at 70% 40%, rgba(15,30,80,0.4) 0%, rgba(0,0,0,0.55) 100%)"
            : "radial-gradient(ellipse at 70% 40%, rgba(200,220,255,0.3) 0%, rgba(180,210,240,0.45) 100%)",
        }}
      />

      {/* ── MENU BAR ── */}
      <div
        className="relative z-[300] flex items-center justify-between px-3 h-7"
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          background: dark ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.65)",
          borderBottom: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
        }}
      >
        {/* Left */}
        <div className="flex items-center gap-3 relative">
          {/* Apple-style logo */}
          <span className={`text-base font-semibold ${dark ? "text-zinc-100" : "text-zinc-900"}`}>
            <svg className="w-3.5 h-3.5" viewBox="0 0 814 1000" fill="currentColor">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105-33.3-155.5-127.2C46.7 790.7 0 663 0 541.8c0-194.3 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
            </svg>
          </span>

          {/* Portfolio menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(m => !m)}
              className={`text-xs font-semibold px-1 py-0.5 rounded transition-colors ${
                menuOpen
                  ? "bg-white/20 text-white"
                  : dark ? "text-zinc-100 hover:bg-white/10" : "text-zinc-900 hover:bg-black/8"
              }`}
            >
              Portfolio
            </button>
            <AnimatePresence>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-[199]" onClick={() => setMenuOpen(false)} />
                  <MenuDropdown
                    dark={dark}
                    onClose={() => setMenuOpen(false)}
                    onOpenAbout={() => openWindow("about")}
                  />
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Open windows */}
          <div className="flex items-center gap-2">
            {openWindows.map(id => (
              <button
                key={id}
                onClick={() => focusWindow(id)}
                className={`text-xs px-1 py-0.5 rounded transition-colors ${
                  active === id
                    ? dark ? "text-zinc-100 opacity-100" : "text-zinc-900 opacity-100"
                    : dark ? "text-zinc-400 hover:text-zinc-200" : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {WINDOW_TITLES[id]}
              </button>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setSpotlight(true)}
            className={`p-1 rounded transition-colors ${dark ? "hover:bg-white/10 text-zinc-300" : "hover:bg-black/8 text-zinc-600"}`}
            title="Spotlight Search (⌘K)"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button
            onClick={() => setDark(d => !d)}
            className={`p-1 rounded transition-colors text-sm ${dark ? "hover:bg-white/10" : "hover:bg-black/8"}`}
            title="Toggle dark mode"
          >
            {dark ? "🌙" : "☀️"}
          </button>
          <TimeDisplay />
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div
        ref={desktopRef}
        className="absolute inset-0 top-7"
        style={{ bottom: 88 }}
      >
        <AnimatePresence>
          {openWindows.map((id, i) => (
            <AppWindow
              key={id}
              id={id}
              dark={dark}
              isActive={active === id}
              isMin={minimized.includes(id)}
              isMax={maximized.includes(id)}
              onClose={() => closeWindow(id)}
              onMin={() => minimizeWindow(id)}
              onMax={() => toggleMaximize(id)}
              onFocus={() => focusWindow(id)}
              desktopRef={desktopRef}
              initialPos={DOCK_APPS.find(a => a.id === id)?.pos || { x: 60 + i * 30, y: 52 + i * 30 }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* ── DOCK ── */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[200] flex items-end gap-1.5 px-3 py-2"
        style={{
          backdropFilter: "blur(24px) saturate(200%)",
          WebkitBackdropFilter: "blur(24px) saturate(200%)",
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: 20,
          boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
        }}
      >
        {DOCK_APPS.map((app) => {
          const isOpen = openWindows.includes(app.id);
          const isMin = minimized.includes(app.id);

          return (
            <div key={app.id} className="relative flex flex-col items-center">
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.9 }}
                whileHover={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.15 }}
                className={`absolute bottom-full mb-2 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap pointer-events-none ${
                  dark ? "bg-zinc-700/95 text-zinc-100" : "bg-zinc-800/90 text-white"
                }`}
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
              >
                {app.label}
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.22, y: -6 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                onClick={() => openWindow(app.id)}
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${app.gradient} flex items-center justify-center`}
                style={{
                  boxShadow: isOpen
                    ? "0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.25)"
                    : "0 2px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
              >
                <app.Icon />
              </motion.button>

              {/* Open indicator dot */}
              {isOpen && (
                <motion.div
                  layoutId={`dot-${app.id}`}
                  className="mt-1 rounded-full bg-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: isMin ? 0.5 : 1, opacity: isMin ? 0.4 : 0.8 }}
                  style={{ width: 4, height: 4 }}
                />
              )}
            </div>
          );
        })}
      </motion.div>

      {/* ── SPOTLIGHT ── */}
      <AnimatePresence>
        {spotlight && (
          <Spotlight
            dark={dark}
            onClose={() => setSpotlight(false)}
            onOpen={(id) => { openWindow(id); setSpotlight(false); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
