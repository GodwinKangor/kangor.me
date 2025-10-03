import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

// ---------- Editable data ----------
const LINKS = {
  email: "mailto:godwin.k.kangor.27@dartmouth.edu",
  github: "https://github.com/GodwinKangor",
  linkedin: "https://www.linkedin.com/in/",
  portfolio: "https://kangor.me/",
  resume: "/resume.pdf", // place a resume.pdf in the public/ folder
};

const PROJECTS = [
  {
    title: "CalendAI",
    year: "2025",
    tags: ["TypeScript", "React", "Firebase", "Google APIs"],
    description:
      "Collaborative calendar that syncs Google/Apple Calendars, integrates Canvas, scrapes PDFs & websites for deadlines, tracks progress, and uses an AI assistant for smart scheduling & reminders.",
    link: "#",
    highlights: [
      "Canvas + OAuth integrations",
      "PDF/HTML scraping pipeline",
      "AI assistant for summaries & scheduling",
    ],
  },
  {
    title: "Gold Nuggets (Multiplayer)",
    year: "2024",
    tags: ["C", "Sockets", "Algorithms"],
    description:
      "Server–client treasure-hunt game with fog-of-war visibility, gold distribution, and efficient map data structures enabling responsive play across 200+ nodes.",
    link: "#",
    highlights: ["Fog-of-war", "BFS pathfinding", "Sets/Counters/Map struct"],
  },
  {
    title: "Tiny Search Engine",
    year: "2024",
    tags: ["C", "Indexer", "Crawler"],
    description:
      "C-based crawler, indexer, and querier with memory-safe data structures; scalable to thousands of pages with optimized indexing performance.",
    link: "#",
    highlights: ["Crawl → Index → Query", "Inverted index", "Memory safety"],
  },
  {
    title: "Kevin Bacon Graph",
    year: "2024",
    tags: ["Java", "Graphs"],
    description:
      "BFS-based tool that discovers shortest actor connections; handles large graphs with sub-second queries.",
    link: "#",
    highlights: ["BFS", "Adjacency lists", "CLI tool"],
  },
  {
    title: "2D Space Manager",
    year: "2023",
    tags: ["Java", "Point Quadtree"],
    description:
      "Spatial indexing with Point Quadtree to significantly reduce collision-detection time in real-time 2D scenes.",
    link: "#",
    highlights: ["Quadtree", "Collision pruning", "Interactive demo"],
  },
  {
    title: "POS Tagger (HMM)",
    year: "2023",
    tags: ["Java", "Viterbi"],
    description:
      "Hidden Markov Model with Viterbi decoding; practical accuracy on student corpus with fast tag throughput.",
    link: "#",
    highlights: ["HMM", "Viterbi", "Tokenizer"],
  },
];

// NEW: 3D & Animation showcase data
const MODELS = [
  {
    title: "Robot Character — Texture & LookDev",
    year: "2024",
    medium: ["Autodesk Maya", "Substance 3D"],
    thumb: "/images/robot_thumb.jpg", // place file in public/images/
    link: "#", // ArtStation/Drive/YouTube/Sketchfab link
    description:
      "Hard-surface robot with hand-painted roughness/metallic maps; HDRI lighting and turntable render.",
  },
  {
    title: "Nganya Bus — Environment Prop",
    year: "2024",
    medium: ["Maya", "Substance 3D"],
    thumb: "/images/nganya_thumb.jpg",
    link: "#",
    description:
      "Low-poly vehicle with Kenyan matatu decals; UV-unwrapped, baked normals, and PBR textures.",
  },
  {
    title: "Biped Walk Cycle",
    year: "2025",
    medium: ["Maya Animation"],
    thumb: "/images/walkcycle_thumb.jpg",
    link: "#",
    description:
      "12-principles-informed walk cycle; blocking → splining → polish; viewport playblast.",
  },
];

const EXPERIENCES = [
  {
    org: "CodeKenya",
    role: "Teaching Assistant & Logistics Manager",
    time: "Dec 2024 – Present",
    bullets: [
      "Mentored dozens of students in Python/JS/React; improved onboarding efficiency.",
      "Helped roll out new teaching methods for algorithms & data structures.",
    ],
  },
  {
    org: "Street Codes",
    role: "Co-founder",
    time: "Jun 2022 – Present",
    bullets: [
      "Organized bootcamps for 50+ youth; designed a 12-unit Python curriculum.",
      "Follow-up system: 60% advanced to intermediate projects; 20% earned scholarships.",
    ],
  },
  {
    org: "Dartmouth Outdoor Rentals",
    role: "Rental Desk Worker",
    time: "2024 – Present",
    bullets: [
      "Managed gear check-outs/returns and built a Google Forms feedback flow.",
      "Supported logistics for campus trips; strengthened service & ops skills.",
    ],
  },
];

const SKILLS = {
  languages: ["Java", "Python", "JavaScript/TypeScript", "C"],
  frameworks: ["React", "Next.js", "Node.js", "Express"],
  tools: [
    "Git/GitHub",
    "Firebase",
    "Vite",
    "ESLint",
    "Zustand",
    "Google APIs (OAuth, Calendar)",
    "Autodesk Maya",
    "Adobe Substance 3D",
    "Figma",
    "LaTeX",
  ],
};

// ---------- Helpers ----------
function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl font-bold tracking-tight mb-8"
        >
          {title}
        </motion.h2>
        {children}
      </div>
    </section>
  );
}

function ProjectCard({ p }) {
  return (
    <motion.a
      href={p.link}
      target={p.link === "#" ? undefined : "_blank"}
      rel="noreferrer"
      className="group block rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-xl transition-shadow bg-white/70 dark:bg-zinc-900/60 backdrop-blur"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{p.title}</h3>
        <span className="text-sm text-zinc-500">{p.year}</span>
      </div>
      <p className="mt-3 text-zinc-700 dark:text-zinc-300 leading-relaxed">
        {p.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-1 rounded-full border border-zinc-300 dark:border-zinc-700"
          >
            {t}
          </span>
        ))}
      </div>
      <ul className="mt-4 list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400">
        {p.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
    </motion.a>
  );
}

// NEW: 3D card
function ModelCard({ m }) {
  return (
    <motion.a
      href={m.link}
      target={m.link === "#" ? undefined : "_blank"}
      rel="noreferrer"
      className="group block rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 hover:shadow-xl"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="aspect-video bg-zinc-200 dark:bg-zinc-800">
        <img src={m.thumb} alt={m.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{m.title}</h3>
          <span className="text-sm text-zinc-500">{m.year}</span>
        </div>
        <p className="mt-2 text-zinc-700 dark:text-zinc-300">{m.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {m.medium.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded-full border border-zinc-300 dark:border-zinc-700">{t}</span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

function Navbar({ dark, setDark }) {
  return (
    <div className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className="font-bold text-lg tracking-tight">
          Godwin Kangor
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#projects" className="hover:underline">Projects</a>
          <a href="#showcase" className="hover:underline">3D & Animation</a>
          <a href="#experience" className="hover:underline">Experience</a>
          <a href="#skills" className="hover:underline">Skills</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={LINKS.resume}
            className="text-sm px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:shadow"
          >
            Resume
          </a>
          <button
            aria-label="Toggle theme"
            className="text-sm px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-700"
            onClick={() => setDark((d) => !d)}
          >
            {dark ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioApp() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className={classNames("min-h-screen text-zinc-900 dark:text-zinc-100", "bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900")}>      
      <Navbar dark={dark} setDark={setDark} />

      {/* Hero */}
      <section id="home" className="pt-12 md:pt-20 pb-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Software Engineer & Digital Arts Enthusiast
            </h1>
            <p className="mt-5 text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              I build usable systems, from C-based engines to React apps. Passionate about
              algorithms, UI/UX, and learning-by-shipping.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" className="px-5 py-2.5 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow">
                View Projects
              </a>
              <a href={LINKS.github} target="_blank" className="px-5 py-2.5 rounded-2xl border border-zinc-300 dark:border-zinc-700">
                GitHub
              </a>
              <a href={LINKS.linkedin} target="_blank" className="px-5 py-2.5 rounded-2xl border border-zinc-300 dark:border-zinc-700">
                LinkedIn
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-10 bg-white/70 dark:bg-zinc-900/60 backdrop-blur"
          >
            <h3 className="font-semibold text-xl">Highlights</h3>
            <ul className="mt-4 space-y-2 text-zinc-700 dark:text-zinc-300">
              <li>• CalendAI: Canvas + PDF/HTML scraping + AI assistant</li>
              <li>• Gold Nuggets: Multiplayer + fog-of-war in C</li>
              <li>• Tiny Search Engine: Crawl → Index → Query</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <Section id="projects" title="Projects">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <ProjectCard p={p} key={p.title} />
          ))}
        </div>
      </Section>

      {/* 3D & Animation */}
      <Section id="showcase" title="3D & Animation">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODELS.map((m) => (
            <ModelCard m={m} key={m.title} />
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience & Leadership">
        <div className="grid md:grid-cols-2 gap-6">
          {EXPERIENCES.map((e) => (
            <motion.div
              key={e.org}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white/70 dark:bg-zinc-900/60 backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{e.org}</h3>
                <span className="text-sm text-zinc-500">{e.time}</span>
              </div>
              <p className="text-sm text-zinc-500 mt-0.5">{e.role}</p>
              <ul className="mt-2 list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white/70 dark:bg-zinc-900/60">
            <h4 className="font-semibold mb-2">Languages</h4>
            <p className="text-zinc-700 dark:text-zinc-300">{SKILLS.languages.join(", ")}</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white/70 dark:bg-zinc-900/60">
            <h4 className="font-semibold mb-2">Frameworks</h4>
            <p className="text-zinc-700 dark:text-zinc-300">{SKILLS.frameworks.join(", ")}</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white/70 dark:bg-zinc-900/60">
            <h4 className="font-semibold mb-2">Tools</h4>
            <p className="text-zinc-700 dark:text-zinc-300">{SKILLS.tools.join(", ")}</p>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Get in touch">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white/70 dark:bg-zinc-900/60">
          <p className="text-lg text-zinc-700 dark:text-zinc-300">
            Open to software engineering internships & research.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700" href={LINKS.email}>
              Email Me
            </a>
            <a className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700" href={LINKS.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700" href={LINKS.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="pb-10">
        <div className="max-w-6xl mx-auto px-6 text-sm text-zinc-500">
          © {year} Godwin Kangor · <a className="underline" href={LINKS.portfolio}>kangor.me</a>
        </div>
      </footer>
    </div>
  );
}
