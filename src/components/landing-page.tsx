import React, { useEffect, useState } from "react"
import { ArrowUpRight, Check, Copy, Maximize2, MoveRight } from "lucide-react"
import { motion, useScroll, useTransform } from "motion/react"

const Container = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div
    className={`max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 ${className}`}
  >
    {children}
  </div>
)

const Separator = () => <div className="w-full h-px bg-neutral-200" />

const Ruler = ({
  orientation = "horizontal",
  className = "",
}: {
  orientation?: "horizontal" | "vertical"
  className?: string
}) => {
  const isHorizontal = orientation === "horizontal"

  return (
    <div
      className={`flex overflow-hidden opacity-20 pointer-events-none select-none ${
        isHorizontal
          ? "w-full h-5 border-b border-neutral-400"
          : "h-full w-5 flex-col border-r border-neutral-400"
      } ${className}`}
    >
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className={`flex-1 flex ${
            isHorizontal
              ? "items-end justify-center"
              : "flex-col items-end justify-center"
          }`}
        >
          <div
            className={`${
              isHorizontal ? "h-2 w-px" : "w-2 h-px"
            } ${i % 5 === 0 ? "bg-neutral-500" : "bg-neutral-300"}`}
          />
        </div>
      ))}
    </div>
  )
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-neutral-200/50 py-0"
          : "bg-transparent border-b border-transparent py-6"
      }`}
    >
      <div className="h-16 md:h-20 flex items-center justify-between px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-3 h-3 bg-neutral-900 group-hover:scale-125 transition-transform duration-300" />
          <div className="font-medium text-lg tracking-tight text-neutral-900">
            margin<span className="font-light text-neutral-400">.ui</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide text-neutral-500">
          {["Components", "Foundations", "Showcase"].map((item) => (
            <a
              key={item}
              href="#"
              className="relative group overflow-hidden pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 rounded-sm"
            >
              <span className="group-hover:-translate-y-full block transition-transform duration-300 font-mono text-xs uppercase tracking-widest">
                {item}
              </span>
              <span className="absolute top-0 left-0 translate-y-full group-hover:translate-y-0 block transition-transform duration-300 text-neutral-900 font-mono text-xs uppercase tracking-widest">
                {item}
              </span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#"
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-[10px] font-mono font-medium uppercase tracking-widest hover:bg-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
          >
            GitHub <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </nav>
  )
}

const Hero = () => {
  const [copied, setCopied] = useState(false)

  const { scrollY } = useScroll()
  const y2 = useTransform(scrollY, [0, 500], [0, -100])

  const command = "npm install @margin-ui/core"

  return (
    <section className="relative pt-28 pb-16 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32 min-h-screen flex flex-col justify-between bg-white overflow-hidden">
      <div className="absolute top-28 left-0 w-full hidden md:block opacity-50">
        <Ruler />
      </div>
      <div className="absolute top-0 left-6 md:left-12 h-full hidden lg:block opacity-50">
        <Ruler orientation="vertical" />
      </div>

      <Container className="relative z-10 w-full grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="h-px w-8 bg-neutral-900" />
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                100% Open Source
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] leading-[0.85] font-light tracking-tighter text-neutral-900 mb-10"
            >
              The Space <br />
              Defines the{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-neutral-400 to-neutral-200">
                Form.
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-col md:flex-row gap-8 md:items-end max-w-3xl"
            >
              <p className="text-lg md:text-xl text-neutral-500 font-light leading-relaxed max-w-md">
                High-quality React components built on Base UI.
                Production-ready, fully accessible, and designed with precision.
                Open source and free forever.
              </p>

              <div className="shrink-0">
                <div
                  onClick={() => {
                    void navigator.clipboard.writeText(command)
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                  }}
                  className="group relative overflow-hidden flex items-center gap-4 cursor-pointer"
                >
                  <div className="h-14 px-6 bg-white border border-neutral-200 flex items-center gap-4 group-hover:border-neutral-900 transition-colors duration-300">
                    <span className="font-mono text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                      <span className="text-neutral-300 select-none">$ </span>
                      {command}
                    </span>
                    <div className="w-px h-4 bg-neutral-200 group-hover:bg-neutral-900 transition-colors" />
                    {copied ? (
                      <Check
                        size={16}
                        className="text-neutral-900"
                      />
                    ) : (
                      <Copy
                        size={16}
                        className="text-neutral-400 group-hover:text-neutral-900"
                      />
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 bg-neutral-900 w-0 group-hover:w-full transition-all duration-500 ease-out" />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            style={{ y: y2 }}
            className="lg:col-span-4 hidden lg:flex justify-end relative"
          >
            <div className="w-72 xl:w-80 h-80 xl:h-96 border border-neutral-200 relative p-6 xl:p-8 flex flex-col justify-between group hover:border-neutral-400 transition-colors duration-500 bg-white">
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-neutral-900" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-neutral-900" />

              <div className="space-y-4 xl:space-y-6 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-full h-24 xl:h-32 bg-neutral-100 border border-neutral-200 relative overflow-hidden">
                  <div className="absolute inset-0 grid grid-cols-6 gap-px bg-white opacity-20">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-neutral-200"
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-3 font-mono text-[10px] text-neutral-500">
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span>CONTAINER_WIDTH</span>
                    <span className="text-neutral-900">1440px</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span>GRID_GUTTER</span>
                    <span className="text-neutral-900">24px</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span>BASE</span>
                    <span className="text-neutral-900">Base UI</span>
                  </div>
                </div>
              </div>

              <div className="font-mono text-xs text-neutral-900 uppercase tracking-widest text-right">
                Fig. 01 — Layout
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

// --- Philosophy Section ---

const PhilosophyItem = ({
  number,
  title,
  desc,
}: {
  number: string
  title: string
  desc: string
}) => {
  return (
    <div className="min-h-[50vh] md:min-h-[60vh] flex flex-col justify-center opacity-100">
      <div className="flex items-baseline gap-4 mb-6">
        <span className="font-mono text-sm text-neutral-900">{number}</span>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-900">
          {title}
        </h3>
      </div>
      <p className="text-lg md:text-xl text-neutral-500 font-light max-w-xl leading-relaxed pl-8 md:pl-12 border-l border-neutral-200">
        {desc}
      </p>
    </div>
  )
}

const Philosophy = () => (
  <section className="bg-white relative border-t border-neutral-100">
    <Container>
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        <div className="lg:w-5/12">
          <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center py-20">
            <div className="mb-12 relative">
              <div className="absolute -left-8 top-1.5 w-4 h-px bg-neutral-900 hidden lg:block" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6">
                Manifesto
              </h2>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter text-neutral-900 leading-[0.9]">
                Core <br />
                Principles
              </h2>
            </div>
            <p className="text-neutral-500 font-light leading-relaxed max-w-xs text-lg">
              We believe that the most elegant interfaces are those that
              disappear. Focus on the content, not the container.
            </p>
            <div className="mt-16 flex items-center gap-4">
              <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
              <div className="h-px w-12 bg-neutral-200" />
              <span className="font-mono text-xs text-neutral-400">
                SCROLL TO EXPLORE
              </span>
            </div>
          </div>
        </div>

        <div className="lg:w-7/12 py-20 lg:py-32 xl:py-48">
          <PhilosophyItem
            number="01"
            title="Invisible Structure"
            desc="Structure should be felt, not seen. We use whitespace (margins) as the primary active element to define hierarchy, grouping, and flow. No unnecessary borders. No decorative shadows."
          />
          <PhilosophyItem
            number="02"
            title="Type as Interface"
            desc="Typography is 95% of the web. We treat typeface selection, scale, and weight with obsessive detail. The font itself becomes the UI control."
          />
          <PhilosophyItem
            number="03"
            title="Geometric Precision"
            desc="Chaos is eliminated through strict constraints. Every component aligns to a 4px grid. Dimensions are mathematical, not arbitrary. The result is visual harmony."
          />
        </div>
      </div>
    </Container>
  </section>
)

// --- Component Preview ---

const PreviewCard = ({
  label,
  children,
  colSpan = "col-span-1",
}: {
  label: string
  children: React.ReactNode
  colSpan?: string
}) => (
  <div
    className={`group relative bg-white border-r border-b border-neutral-200 p-6 md:p-8 lg:p-10 min-h-[280px] md:min-h-80 flex flex-col justify-between hover:bg-neutral-50/50 transition-colors duration-300 ${colSpan}`}
  >
    <div className="flex justify-between items-start w-full mb-8">
      <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 group-hover:text-neutral-900 transition-colors">
        {label}
      </span>
      <Maximize2
        size={14}
        className="text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
    </div>

    <div className="w-full flex items-center justify-center">{children}</div>

    {/* Corner Accents refined */}
    <div className="absolute top-0 right-0 w-3 h-3 border-l border-b border-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="absolute bottom-0 left-0 w-3 h-3 border-r border-t border-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
)

const ComponentPreview = () => {
  return (
    <section className="bg-neutral-100 border-t border-neutral-200">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-neutral-200 bg-white">
          <PreviewCard label="Typography / Heading">
            <div className="text-left w-full space-y-4">
              <h2 className="text-3xl md:text-4xl font-light tracking-tighter text-neutral-900">
                Hello World.
              </h2>
              <p className="text-neutral-500 text-sm font-light max-w-[200px]">
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
          </PreviewCard>

          <PreviewCard label="Interaction / Button">
            <div className="flex flex-col gap-3 w-full max-w-[200px]">
              <button className="h-11 px-6 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all active:scale-95 flex justify-between items-center group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2">
                <span>Deploy</span>
                <ArrowUpRight
                  size={14}
                  className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
                />
              </button>
              <button className="h-11 px-6 bg-white border border-neutral-200 text-neutral-900 text-sm font-medium hover:border-neutral-900 transition-colors active:scale-95 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2">
                Documentation
              </button>
            </div>
          </PreviewCard>

          <PreviewCard label="Data Entry / Input">
            <div className="w-full max-w-60 space-y-6">
              <div className="group/input relative">
                <input
                  type="text"
                  placeholder=" "
                  className="peer w-full h-8 bg-transparent border-b border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors placeholder-transparent font-mono text-sm focus-visible:ring-0"
                />
                <label className="absolute left-0 top-1 text-neutral-400 text-xs font-mono uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-neutral-900 peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-neutral-900 cursor-text">
                  Email Address
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">Notifications</span>
                <div className="w-10 h-5 bg-neutral-200 rounded-full relative cursor-pointer hover:bg-neutral-300 transition-colors">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            </div>
          </PreviewCard>

          <PreviewCard
            label="Data Display / Stat"
            colSpan="md:col-span-2 lg:col-span-1"
          >
            <div className="w-full">
              <div className="text-6xl font-light tracking-tighter text-neutral-900 mb-2 font-mono">
                84.5<span className="text-2xl text-neutral-400">%</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                System Status: Operational
              </div>
            </div>
          </PreviewCard>

          <PreviewCard
            label="Layout / Card"
            colSpan="md:col-span-2"
          >
            <div className="grid grid-cols-2 gap-8 w-full max-w-md">
              <div className="aspect-square bg-neutral-100 border border-neutral-200 flex items-center justify-center">
                <div className="w-16 h-16 border border-dashed border-neutral-400 rounded-full animate-spin-slow" />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="h-2 w-32 bg-neutral-200" />
                <div className="h-2 w-24 bg-neutral-200" />
                <div className="h-2 w-full bg-neutral-100" />
                <div className="h-2 w-full bg-neutral-100" />
              </div>
            </div>
          </PreviewCard>
        </div>
      </div>
    </section>
  )
}

// --- Footer ---

const Footer = () => (
  <footer className="bg-white pt-24 md:pt-32 pb-12 border-t border-neutral-200">
    <Container>
      <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">
        <div className="max-w-md">
          <h2 className="text-7xl md:text-8xl font-light tracking-tighter text-neutral-900 mb-8">
            M.
          </h2>
          <p className="text-neutral-500 font-light text-lg">
            High-quality React components built on Base UI. <br />
            Open source and free forever.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24 w-full md:w-auto">
          {[
            {
              title: "Product",
              links: ["Features", "Components", "Templates"],
            },
            {
              title: "Resources",
              links: ["Documentation", "Figma Kit", "Changelog"],
            },
            { title: "Company", links: ["About", "Careers", "Legal"] },
          ].map((col) => (
            <div
              key={col.title}
              className="space-y-6"
            >
              <h4 className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                {col.title}
              </h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm font-medium text-neutral-900 hover:text-neutral-500 transition-colors focus-visible:outline-none focus-visible:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono text-neutral-400 uppercase tracking-widest">
        <div>&copy; 2025 Margin.UI. All rights reserved.</div>
        <div className="flex items-center gap-2">
          <span>
            Crafted by{" "}
            <a
              href="https://awethemes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 transition-colors focus-visible:outline-none focus-visible:underline"
            >
              AweThemes
            </a>
          </span>
        </div>
      </div>
    </Container>
  </footer>
)

export function LandingPage() {
  return (
    <div className="font-sans min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <ComponentPreview />
      <div className="py-24 md:py-32 lg:py-40 bg-white text-center border-t border-neutral-100">
        <Container>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter mb-6">
            Production-ready components.
          </h2>
          <p className="text-neutral-500 mb-8 font-light">
            Built on Base UI. Fully accessible. 100% open source.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium border-b border-neutral-900 pb-0.5 hover:text-neutral-600 hover:border-neutral-600 transition-colors font-mono uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
          >
            View All Components <MoveRight size={14} />
          </a>
        </Container>
      </div>
      <Footer />
    </div>
  )
}
