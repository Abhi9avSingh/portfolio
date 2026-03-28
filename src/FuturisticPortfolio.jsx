import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiDownload, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";







/* ---------------------------------------------------------
   DATA (JSON)
--------------------------------------------------------- */
const data = {
  name: "ABHINAV SINGH",
  email: " abhinavsingh762006@gmail.com",

  /* Work Timeline */
  timeline: [
    { title: "Frontend Developer", company: "College  Hakaton", range: "2024" },
      { title: "Backend Developer", company: "TchExpo", range: "2025" },
    // { title: "Intern", company: "Startup X", range: "2019 - 2020" },
  ],

  /* Skills */
  skills: {
    Languages: ["JavaScript", " C++", "Python", "C" ],
    Frontend: ["React", "Tailwind", "Framer Motion","Next.js"],
    Backend: ["Node.js", "Express.js"],
    Databases: ["MySQL", "MongoDB"],
    Tools: ["VSCode", "Neovim","Intellij IDEA"],
    VersionControl: ["Git", "GitHub"],
    OS: ["Linux", "Windows"],
  },
 /* Projects */
  projects: [
    {
      id: 1,
      title: "MADE A GAME OF PING PONG ",
      desc: "Can be played by a duo",
      tech: ["React", "Node.js", "Express.js"],
    },
    {
      id: 2,
      title: "Sci-Fi Weather Dashboard",
      desc: "Floating glass cards, parallax layers, 3D tilt UI.",
      tech: ["React", "Three.js", "OpenAI API"],
    },
    // {
    //   id: 3,
    //   title: "Realtime Dev Analytics",
    //   desc: "Live activity heatmap + glowing hologram graphs.",
    //   tech: ["Next.js", "Socket.IO", "Postgres"],
    // },
  ],
  // /* Featured Articles */
  // articles: [
  //   { id: 1, title: "Mastering React Performance", desc: "Advanced memoization, batching, concurrency." },
  //   // { id: 2, title: "Framer Motion Super Guide", desc: "Cinematic UI animation techniques." },
  //   // { id: 3, title: "Tailwind for Large Systems", desc: "Architecture, scaling, and patterns." },
  // ],

 

  /* Achievements */
  achievements: [
    { id: 1, title: "HAKATHON FINALIST", desc: "Reached finals of hakathon having 4000+ teams" },
    { id: 2, title: "CERTIFICATIONS", desc: "HackerRank (5 certifications: Java, DSA, SQL, React, CSS)" },
    // { id: 3, title: "Open Source Contributor", desc: "50+ contributions to major OSS repos." },
  ],

  /* Certificates */
  certificates: [
    { id: 1, title: "React", org: "Udemy", date: "2024-06-12" },
    // { id: 2, title: "Framer Motion Mastery", org: "Egghead", date: "2023-11-01" },
    { id: 2, title: "Full-Stack Bootcamp", org: "Coursera", date: "2025-05-01" },
    { id: 3, title: "Python", org: "Infosys springboard", date: "2025-03-25" },
  ],
};

/* ---------------------------------------------------------
   3D Tilt Hook
   (returns a ref to attach to any card)
--------------------------------------------------------- */
function useTilt() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function handleMove(e) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dx = (x - rect.width / 2) / (rect.width / 2);
      const dy = (y - rect.height / 2) / (rect.height / 2);
      el.style.transform = `perspective(1000px) rotateX(${dy * 6}deg) rotateY(${dx * -6}deg)`;
      el.style.transition = "transform 0.08s ease-out";
    }
    function reset() {
      el.style.transform = "";
      el.style.transition = "transform 0.4s cubic-bezier(.2,.9,.2,1)";
    }
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);
  return ref;
}

/* ---------------------------------------------------------
   Particle Canvas Background
--------------------------------------------------------- */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let particles = [];
    const count = Math.floor((w * h) / 85000) + 40;

    function init() {
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.3,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        a: Math.random() * 0.6 + 0.2,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // very subtle grid lines (light)
      const grid = 80;
      ctx.save();
      ctx.globalAlpha = 0.02;
      ctx.strokeStyle = "#07b6d4";
      for (let gx = 0; gx < w; gx += grid) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += grid) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }
      ctx.restore();

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.fillStyle = `rgba(6,182,212,${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    init();
    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
}

/* ---------------------------------------------------------
   Loading Screen
--------------------------------------------------------- */
function LoadingScreen({ onFinish }) {
  useEffect(() => {
    const t = setTimeout(onFinish, 1800);
    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070D]">
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="flex flex-col items-center gap-6">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2.5, loop: Infinity, ease: "linear" }} className="w-28 h-28 border border-[#06b6d4]/40 rounded-full flex items-center justify-center">
          <div className="w-16 h-16 rounded-full backdrop-blur-md border border-[#06b6d430] flex items-center justify-center">
            {/* <img  className="rounded-full" src="../public/asdfgh.jpg" alt="" /> */}
            A S
          </div>
        </motion.div>
        <motion.p animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.6, loop: Infinity }} className="text-[#9EE6FF]">Initializing Portfolio...</motion.p>
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------
   Small Reusable UI Cards (Article / Project / Certificate)
--------------------------------------------------------- */
function HoloCard({ children, className = "" }) {
  const ref = useTilt();
  return (
    <motion.div ref={ref} whileHover={{ scale: 1.02 }} className={`p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-white/5 backdrop-blur-md ${className}`}>
      {children}
    </motion.div>
  );
}
function ProjectCard({ p }) {
  return (
    <HoloCard className="flex flex-col justify-between">
      <div>
        <div className="text-sm uppercase text-[#9EE6FF] tracking-wider mb-2">Project</div>
        <div className="text-lg font-semibold text-[#E8FBFF]">{p.title}</div>
        <div className="text-sm text-[#9ED8EE] mt-2">{p.desc}</div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2 text-xs">
          {p.tech.map((t) => (
            <div key={t} className="px-2 py-1 rounded-full bg-[rgba(255,255,255,0.02)] border text-xs">{t}</div>
          ))}
        </div>
        <div>
          <button className="px-3 py-1 rounded-lg text-sm bg-gradient-to-r from-[#06b6d4]/30 to-[#60a5fa]/20 border border-[#06b6d460]">Open</button>
        </div>
      </div>
    </HoloCard>
  );
}

function ArticleCard({ a }) {
  return (
    <HoloCard>
      <div className="text-sm uppercase text-[#9EE6FF] tracking-wider mb-2">Article</div>
      <div className="text-lg font-semibold text-[#E8FBFF]">{a.title}</div>
      <div className="text-sm text-[#9ED8EE] mt-2">{a.desc}</div>
      <div className="mt-3 flex gap-2">
        <button className="px-3 py-1 rounded-lg text-sm bg-[rgba(6,182,212,0.06)] border border-[#06b6d430]">Read</button>
        <button className="px-3 py-1 rounded-lg text-sm bg-[rgba(255,255,255,0.02)] border">Share</button>
      </div>
    </HoloCard>
  );
}


function AchieveBadge({ a }) {
  const ref = useTilt();
  return (
    <motion.div ref={ref} whileHover={{ scale: 1.03 }} className="p-3 rounded-lg bg-[rgba(6,182,212,0.04)] border border-[#06b6d430] text-sm">
      <div className="font-semibold text-[#E8FBFF]">{a.title}</div>
      <div className="text-xs text-[#9ED8EE]">{a.desc}</div>
    </motion.div>
  );
}

/* ---------------------------------------------------------
   Certifications Grid
--------------------------------------------------------- */
function CertificationsGrid({ certs }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certs.map((c) => (
        <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <HoloCard>
            <div className="h-36 rounded-lg bg-gradient-to-br from-[rgba(6,182,212,0.06)] to-[rgba(96,165,250,0.02)] flex items-center justify-center">
              <div className="uppercase text-xs tracking-wider text-[#AEEBFF]">Certificate Preview</div>
            </div>
            <div className="mt-3">
              <div className="text-sm font-semibold text-[#E8FBFF]">{c.title}</div>
              <div className="text-xs text-[#9ED8EE]">{c.org}</div>
              <div className="text-xs text-[#7FC7DD]">{c.date}</div>
            </div>
          </HoloCard>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------
   Left & Right Sidebars
--------------------------------------------------------- */
function LeftSidebar({ person }) {
  return (
    <aside className="w-72 min-w-[18rem] bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-white/6 rounded-2xl p-5 fixed left-6 top-6 bottom-6 flex flex-col gap-6 text-sm">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full overflow-hidden ring-1 ring-[#06b6d440]">
          <img src={`/asdfgh.jpg`} alt="avatar" className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="font-semibold text-[#E6F9FF]">{person.name}</div>
          <div className="text-xs text-[#99DDEE]">{person.email}</div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["Engineer", "Developer", "Builder"].map((t) => (
          <div key={t} className="px-3 py-1 rounded-full text-xs bg-[rgba(255,255,255,0.03)] border border-white/6">{t}</div>
        ))}
      </div>

      <div className="flex-1 overflow-auto">
        <h4 className="text-xs uppercase text-[#9EE6FF] mb-2">EXPERIENCE</h4>
        <div className="flex flex-col gap-3">
          {person.timeline.map((it, idx) => (
            <div key={idx} className="p-3 bg-[rgba(255,255,255,0.02)] rounded-xl border border-white/4">
              <div className="text-sm font-medium text-[#E8FBFF]">{it.title}</div>
              <div className="text-xs text-[#9ED8EE]">{it.company}</div>
              <div className="text-xs text-[#7FC7DD]">{it.range}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs uppercase text-[#9EE6FF] mb-2">Contact</h4>
        <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
          <input aria-label="email" placeholder="Email" className="px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.02)] border border-white/6 text-sm" />
          <textarea aria-label="message" placeholder="Message" rows={3} className="px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.02)] border border-white/6 text-sm" />
          <button className="mt-1 px-4 py-2 rounded-lg bg-gradient-to-r from-[#06b6d4]/30 to-[#60a5fa]/20 border border-[#06b6d460] text-sm">Send Message</button>
        </form>
      </div>
    </aside>
  );
}

function RightSidebar({ skills }) {
  return (
    <aside className="w-64 min-w-[16rem] bg-[rgba(255,255,255,0.02)] backdrop-blur-md border border-white/6 rounded-2xl p-5 fixed right-6 top-6 bottom-6 flex flex-col gap-6 text-sm">
      <div className="flex items-center justify-between">
        <h4 className="uppercase text-xs text-[#9EE6FF]">Skills</h4>
        {/* <button className="text-xs px-3 py-1 rounded-lg bg-[rgba(255,255,255,0.02)] border">Download</button> */}
      </div>
      <div className="flex-1 overflow-auto">
        {Object.entries(skills).map(([cat, list]) => (
          <div key={cat} className="mb-3">
            <div className="text-xs text-[#BDEFFB] mb-2">{cat}</div>
            <div className="flex flex-wrap gap-2">
              {list.map((s) => (
                <div key={s} className="px-3 py-1 rounded-lg bg-[rgba(255,255,255,0.02)] border border-white/6 text-xs">{s}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="pt-2">
        <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-[#06b6d4]/30 to-[#60a5fa]/20 border border-[#06b6d460]">Download Resume</button>
      </div>
    </aside>
  );
}

/* ---------------------------------------------------------
   TOP NAV with scroll & active tab tracking
--------------------------------------------------------- */
function TopNav({ onOpenMenu, active, onNavigate }) {
  return (
    <div className="fixed left-0 right-0 top-6 flex items-center justify-center pointer-events-none z-30">
      <nav className="pointer-events-auto backdrop-blur-md bg-[rgba(10,15,26,0.45)] border border-white/5 px-6 py-3 rounded-3xl flex items-center gap-6">
        <div className="flex items-center gap-3">
          <img  className="max-h-10 rounded-full" src="../public/asdfgh.jpg" alt="" />
        </div>

        <ul className="flex gap-4 text-sm text-[#BCEFFB]">
          <li onClick={() => onNavigate("articles")} className={`nav-btn ${active === "articles" ? "active" : ""}`}>Articles</li>
          <li onClick={() => onNavigate("projects")} className={`nav-btn ${active === "projects" ? "active" : ""}`}>Projects</li>
          <li onClick={() => onNavigate("achievements")} className={`nav-btn ${active === "achievements" ? "active" : ""}`}>Achievements</li>
          <li onClick={() => onNavigate("certifications")} className={`nav-btn ${active === "certifications" ? "active" : ""}`}>Certifications</li>
        </ul>

        <div className="ml-4 hidden md:flex items-center gap-3">
  {/* GitHub */}
  <a
    href="https://github.com/Abhi9avSingh"
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-lg hover:scale-110 transition-transform text-[#BCEFFB] hover:text-white"
  >
    <FaGithub size={20} />
  </a>

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/abhinav-singh-a7949a336/"
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-lg hover:scale-110 transition-transform text-[#BCEFFB] hover:text-white"
  >
    <FaLinkedin size={20} />
  </a>
</div>


        <div className="md:hidden">
          <button onClick={onOpenMenu} className="p-2 rounded-lg bg-[rgba(255,255,255,0.02)]"><FiMenu /></button>
        </div>
      </nav>
    </div>
  );
}

/* ---------------------------------------------------------
   MAIN COMPONENT
--------------------------------------------------------- */
export default function FuturisticPortfolio() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("certifications");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  // inject small global CSS (nav button styles + smooth scroll)
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      html { scroll-behavior: smooth; }
      .nav-btn { padding: 6px 12px; border-radius: 12px; cursor: pointer; transition: all .22s ease; }
      .nav-btn:hover{ transform: scale(1.05); color: #fff; }
      .nav-btn.active{ background: rgba(6,182,212,0.08); border: 1px solid rgba(6,182,212,0.25); color: #E8FBFF; box-shadow: 0 0 18px rgba(6,182,212,0.22); }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // scroll to section helper
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    // offset for top nav (approx)
    const offset = 90;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // observe sections to set active nav tab
  useEffect(() => {
    const ids = ["hero", "articles", "projects", "achievements", "certifications"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            setActive(en.target.id);
          }
        });
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen font-sans text-[#C9F4FF] bg-gradient-to-b from-[#05070D] via-[#050913] to-[#04050A] relative overflow-x-hidden">
      <ParticleCanvas />
      <AnimatePresence>{loading && <LoadingScreen onFinish={() => setLoading(false)} />}</AnimatePresence>

      <TopNav onOpenMenu={() => setMenuOpen(true)} active={active} onNavigate={scrollTo} />

      <LeftSidebar person={data} />
      <RightSidebar skills={data.skills} />

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/40">
            <div className="absolute top-6 left-6">
              <button onClick={() => setMenuOpen(false)} className="p-2 rounded-lg bg-[rgba(255,255,255,0.02)]"> <FiX /> </button>
            </div>
            <div className="h-full flex items-center justify-center">
              <div className="w-11/12 max-w-md p-6 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-white/5">
                <ul className="flex flex-col gap-4 text-lg">
                  <li onClick={() => { setMenuOpen(false); scrollTo("articles"); }}>Articles</li>
                  <li onClick={() => { setMenuOpen(false); scrollTo("projects"); }}>Projects</li>
                  <li onClick={() => { setMenuOpen(false); scrollTo("achievements"); }}>Achievements</li>
                  <li onClick={() => { setMenuOpen(false); scrollTo("certifications"); }} className="font-semibold">Certifications</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN - note padding to avoid fixed sidebars */}
      <main
        className="
          px-6 py-20 md:py-28 relative 
          max-w-7xl mx-auto 
          lg:pl-[22rem] lg:pr-[20rem]
        "
      >
        {/* GRID container */}
        <div className="grid grid-cols-1 gap-6">
          {/* HERO */}
          <section id="hero" className="relative rounded-3xl p-6 bg-[rgba(255,255,255,0.02)] border border-white/5 backdrop-blur-md overflow-hidden">
            <div className="absolute -left-20 -top-20 w-72 h-72 opacity-30 bg-gradient-to-br from-[#06b6d4]/20 to-[#60a5fa]/10 blur-3xl rounded-full" />
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <motion.h1 initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-bold text-[#E8FBFF]">
                  Hi, I’m {data.name}
                </motion.h1>
                <motion.p initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.12 }} className="text-lg text-[#AEEBFF] mt-2">
                  I build futuristic, interactive UIs and delightful developer experiences.
                </motion.p>
                <div className="mt-4 flex gap-3">
                  <button onClick={() => scrollTo("projects")} className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#06b6d4]/30 to-[#60a5fa]/20 border border-[#06b6d460]">View Portfolio</button>
                  <button className="px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.02)] border border-white/6 flex items-center gap-2"> <FiDownload /> Download Resume</button>
                </div>
              </div>
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-xl bg-[rgba(255,255,255,0.02)] border border-white/5 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#06b6d4]/30 to-[#60a5fa]/20 flex items-center justify-center">
                  <img  className="w-40 h-40 rounded-full" src="../public/asdfgh.jpg" alt="" />
                </div>
              </div>
            </div>
          </section>

          {/* ARTICLES */}
          <section id="articles" className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-[#E8FBFF]">Articles</h2>
              <div className="text-sm text-[#9ED8EE]">Featured writings</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.articles.map((a) => (
                <ArticleCard key={a.id} a={a} />
              ))}
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects" className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-[#E8FBFF]">Projects</h2>
              <div className="text-sm text-[#9ED8EE]">Selected work</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.projects.map((p) => (
                <ProjectCard key={p.id} p={p} />
              ))}
            </div>
          </section>

          {/* ACHIEVEMENTS */}
          <section id="achievements" className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-[#E8FBFF]">Achievements</h2>
              <div className="text-sm text-[#9ED8EE]">Highlights & awards</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.achievements.map((a) => (
                <AchieveBadge key={a.id} a={a} />
              ))}
            </div>
          </section>

          {/* CERTIFICATIONS */}
          <section id="certifications" className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-sm text-[#9EE6FF]">Filter by Organization</div>
                <select className="px-3 py-1 rounded-lg bg-[rgba(255,255,255,0.02)] border border-white/6 text-sm">
                  <option>All</option>
                  <option>Udemy</option>
                  <option>Coursera</option>
                </select>
              </div>
              <div className="text-sm text-[#9ED8EE]">Showing {data.certificates.length} certificates</div>
            </div>

            <CertificationsGrid certs={data.certificates} />
          </section>
        </div>
      </main>

      <footer className="absolute left-0 right-0 bottom-6 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto px-6 py-3 rounded-3xl bg-[rgba(255,255,255,0.01)] border border-white/5 text-xs flex items-center gap-3">
          {/* <div className="w-8 h-8">
            <img  className="rounded-full" src="../public/asdfgh.jpg" alt="" />
          </div> */}
          {/* <div className="text-[#9ED8EE]">Crafted with ❤️ · Built with React + Tailwind + Framer Motion</div> */}
        </div>
      </footer>
    </div>
  );
}
