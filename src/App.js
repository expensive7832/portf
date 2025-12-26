import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------- CONFIG ---------------- */
const DOCK_APPS = [
  { id: "about", icon: "👤", label: "About", color: "bg-blue-500/20" },
  { id: "projects", icon: "📁", label: "Projects", color: "bg-purple-500/20" },
  { id: "skills", icon: "🛠️", label: "Skills", color: "bg-green-500/20" },
  { id: "contact", icon: "✉️", label: "Contact", color: "bg-red-500/20" },
];

/* ---------------- TIME COMPONENT ---------------- */
const TimeDisplay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="font-mono tabular-nums text-xs sm:text-sm">
      {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </span>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */
export default function MacOSPortfolio() {
  const [dark, setDark] = useState(true);
  const [openWindows, setOpenWindows] = useState(["about"]);
  const [active, setActive] = useState("about");
  const [minimized, setMinimized] = useState([]);
  const [maximized, setMaximized] = useState([]);
  const [windowPositions, setWindowPositions] = useState({});

  const handleDownloadCV = () => {
    // CV is in the public folder, so we can access it directly
    const cvUrl = "/cv.pdf"; // or whatever your CV filename is
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Jimoh_Kayode_Yusuf_CV.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const windows = {
    about: {
      title: "About Me",
      content: (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-3xl sm:text-4xl">
              👨‍💻
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-lg sm:text-xl font-semibold">Jimoh Kayode Yusuf</h2>
              <p className="text-sm opacity-70">Full-Stack Developer</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-center sm:text-left">
            Full-stack software developer with 5+ years building secure fintech
            and enterprise applications using Python, Django, React, Next.js,
            PostgreSQL, and cloud infrastructure currently expanding my knowledge to SpringBoot. Passionate about creating
            scalable solutions and elegant user experiences.
          </p>
          <button
            onClick={handleDownloadCV}
            className={`w-full px-4 py-3 rounded-lg font-medium text-sm transition-all
              ${dark ? "bg-gray-500 hover:bg-gray-600" : "bg-gray-600 hover:bg-gray-700"} 
              text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105`}
          >
            <span className="text-lg">📄</span>
            Download CV
          </button>
        </div>
      ),
    },
    projects: {
      title: "Projects",
      content: (
        <div className="space-y-3">
          {[
            { name: "Fintech Transaction Monitoring", tech: "Django, Odoo, Reactjs, Javascript, PostgreSQL" },
            { name: "AI-Powered LMS", tech: "Python, Azure, Celery, Websocket" },
            { name: "Bank Risk & Compliance System", tech: "Odoo, Javascript, odoo-queue" },
            { name: "Recruiter Platform API", tech: "DRF, PostgreSQL, Celery, Nextjs"},
            { name: "Pcash", tech: "Laravel, Tailwind, Livewire" },
          ].map((project, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg ${dark ? "bg-white/5" : "bg-black/5"} hover:bg-white/10 transition-colors cursor-pointer`}
            >
              <div className="font-medium text-sm">{project.name}</div>
              <div className="text-xs opacity-60 mt-1 break-words">{project.tech}</div>
            </div>
          ))}
        </div>
      ),
    },
    skills: {
      title: "Skills",
      content: (
        <div className="space-y-4">
          {[
            { category: "Backend", skills: ["Python", "Django", "DRF", "Node.js", "Laravel", "Java"] },
            { category: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind"] },
            { category: "Database", skills: ["PostgreSQL", "Redis", "MongoDB"] },
            { category: "DevOps", skills: ["Docker", "AWS", "CI/CD", "Linux"] },
          ].map((group, i) => (
            <div key={i}>
              <div className="text-xs font-semibold opacity-60 mb-2">{group.category}</div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, j) => (
                  <span
                    key={j}
                    className={`px-3 py-1 rounded-full text-xs ${dark ? "bg-white/10" : "bg-black/10"}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    contact: {
      title: "Contact",
      content: (
        <div className="space-y-4">
          <a 
            href="mailto:jimohkayodeyusuf@gmail.com"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <div className="text-2xl">📧</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs opacity-60">Email</div>
              <div className="text-sm font-medium truncate">jimohkayodeyusuf@gmail.com</div>
            </div>
          </a>
          <a 
            href="https://github.com/expensive7832"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <div className="text-2xl">💻</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs opacity-60">GitHub</div>
              <div className="text-sm font-medium truncate">github.com/expensive7832</div>
            </div>
          </a>
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
            <div className="text-2xl">🌍</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs opacity-60">Location</div>
              <div className="text-sm font-medium">Lagos, Nigeria</div>
            </div>
          </div>
        </div>
      ),
    },
  };

  const openWindow = (id) => {
    if (!openWindows.includes(id)) {
      setOpenWindows([...openWindows, id]);
      // Set initial position for new window
      const newIndex = openWindows.length;
      const baseX = typeof window !== 'undefined' ? Math.min(100, window.innerWidth * 0.1) : 100;
      const baseY = typeof window !== 'undefined' ? Math.min(80, window.innerHeight * 0.1) : 80;
      setWindowPositions({
        ...windowPositions,
        [id]: { x: baseX + newIndex * 30, y: baseY + newIndex * 30 }
      });
    }
    setActive(id);
    setMinimized(minimized.filter((w) => w !== id));
  };

  const closeWindow = (id) => {
    setOpenWindows(openWindows.filter((w) => w !== id));
    setMinimized(minimized.filter((w) => w !== id));
    setMaximized(maximized.filter((w) => w !== id));
  };

  const minimizeWindow = (id) => {
    setMinimized([...minimized, id]);
  };

  const toggleMaximize = (id) => {
    if (maximized.includes(id)) {
      setMaximized(maximized.filter((w) => w !== id));
    } else {
      setMaximized([...maximized, id]);
    }
  };

  /* ---------------- WINDOW COMPONENT ---------------- */
  const Window = ({ id, index }) => {
    const isMax = maximized.includes(id);
    const isMin = minimized.includes(id);
    const isActive = active === id;
    const position = windowPositions[id] || { x: 100 + index * 30, y: 80 + index * 30 };

    // Calculate responsive dimensions
    const getWindowDimensions = () => {
      if (typeof window !== 'undefined') {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const maxWidth = Math.min(500, vw * 0.9);
        const maxHeight = Math.min(400, vh * 0.7);
        return {
          maxWidth,
          maxHeight,
          constraintRight: Math.max(0, vw - maxWidth - 20),
          constraintBottom: Math.max(0, vh - maxHeight - 120) // Account for dock and menu
        };
      }
      return { maxWidth: 500, maxHeight: 400, constraintRight: 0, constraintBottom: 0 };
    };

    const dims = getWindowDimensions();

    return (
      <motion.div
        drag={!isMax}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={{
          left: 0,
          right: dims.constraintRight,
          top: 0,
          bottom: dims.constraintBottom
        }}
        onMouseDown={() => setActive(id)}
        onTouchStart={() => setActive(id)}
        initial={{ 
          opacity: 0, 
          scale: 0.9, 
          x: isMax ? 0 : Math.min(position.x, dims.constraintRight), 
          y: isMax ? 0 : Math.min(position.y, dims.constraintBottom) 
        }}
        animate={{
          opacity: isMin ? 0 : 1,
          scale: isMin ? 0.8 : 1,
          x: isMax ? 0 : Math.min(position.x, dims.constraintRight),
          y: isMax ? 0 : Math.min(position.y, dims.constraintBottom),
          width: isMax ? "100vw" : `min(500px, 90vw)`,
          height: isMax ? "100vh" : `min(400px, 70vh)`,
        }}
        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed rounded-xl shadow-2xl overflow-hidden
          ${dark ? "bg-zinc-900/95" : "bg-white/95"} 
          backdrop-blur-xl border ${isActive ? "border-blue-500/50" : "border-white/10"}`}
        style={{ 
          zIndex: isActive ? 100 : 50 - index,
          pointerEvents: isMin ? "none" : "auto"
        }}
      >
        {/* HEADER */}
        <div 
          className={`flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 border-b ${dark ? "border-white/10" : "border-black/10"} cursor-move select-none`}
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
              title="Close"
            />
            <button
              onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors"
              title="Minimize"
            />
            <button
              onClick={(e) => { e.stopPropagation(); toggleMaximize(id); }}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
              title="Maximize"
            />
          </div>
          <span className="text-xs sm:text-sm font-medium opacity-80 truncate max-w-[200px]">
            {windows[id].title}
          </span>
          <div className="w-12 sm:w-16" /> {/* Spacer for centering */}
        </div>

        {/* BODY */}
        <div className="p-4 sm:p-6 h-[calc(100%-48px)] sm:h-[calc(100%-52px)] overflow-auto">
          {windows[id].content}
        </div>
      </motion.div>
    );
  };

  /* ---------------- RENDER ---------------- */
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        dark
          ? "bg-gradient-to-br from-zinc-900 via-zinc-800 to-black text-zinc-100"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-zinc-900"
      }`}
    >
      {/* MENU BAR */}
      <div
        className={`h-7 sm:h-8 px-2 sm:px-4 flex items-center justify-between text-xs sm:text-sm font-medium
          ${dark ? "bg-black/40 text-zinc-200" : "bg-white/40 text-zinc-800"} 
          backdrop-blur-xl border-b ${dark ? "border-white/10" : "border-black/10"}`}
      >
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto max-w-[60vw] scrollbar-hide">
          <span className="text-base sm:text-lg hidden sm:inline">💼</span>
          <span className="font-semibold text-xs sm:text-sm whitespace-nowrap">Portfolio</span>
          <div className="flex gap-2 sm:gap-3 opacity-70">
            {openWindows.map(id => (
              <button 
                key={id}
                onClick={() => setActive(id)}
                className={`hover:opacity-100 transition-opacity whitespace-nowrap text-xs sm:text-sm ${active === id ? "opacity-100" : "opacity-50"}`}
              >
                {windows[id].title}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setDark(!dark)}
            className="hover:bg-white/10 p-1 rounded transition-colors text-base sm:text-lg"
            title="Toggle theme"
          >
            {dark ? "🌙" : "☀️"}
          </button>
          <TimeDisplay />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="relative h-[calc(100vh-28px)] sm:h-[calc(100vh-32px)] overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <div 
          className="absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: `url('/img1.jpeg')`, 
            opacity: dark ? 0.25 : 0.35 
          }}
        />
        
        {/* WALLPAPER PATTERN OVERLAY */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* EMPTY STATE */}
        {openWindows.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 flex items-center justify-center text-center px-4"
          >
            <div>
              <div className="text-5xl sm:text-7xl mb-4">🖥️</div>
              <p className="text-base sm:text-lg opacity-70">Click an app in the Dock to get started</p>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {openWindows.filter(id => !minimized.includes(id)).map((id, i) => (
            <Window key={id} id={id} index={i} />
          ))}
        </AnimatePresence>

        {/* DOCK */}
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2 px-2 sm:px-3 py-2 
            max-w-[95vw] overflow-x-auto rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {DOCK_APPS.map((app) => {
            const isOpen = openWindows.includes(app.id);
            const isMinimized = minimized.includes(app.id);
            
            return (
              <motion.div key={app.id} className="relative flex-shrink-0">
                <motion.button
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  onClick={() => openWindow(app.id)}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl
                    relative overflow-hidden transition-all
                    ${dark ? "bg-white/10 hover:bg-white/20" : "bg-black/10 hover:bg-black/20"}`}
                  title={app.label}
                >
                  {app.icon}
                </motion.button>
                {isOpen && (
                  <motion.div
                    layoutId={`indicator-${app.id}`}
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: isMinimized ? 0.5 : 1 }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}