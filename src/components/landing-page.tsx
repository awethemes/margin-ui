import React, { useState } from "react"
import { Link } from "@tanstack/react-router"
import { ArrowUpRight, Check, Copy, Maximize2, MoveRight } from "lucide-react"
import { motion, useScroll, useTransform } from "motion/react"
import { Container } from "./container"
import { Ruler } from "./ruler"
import { SiteFooter } from "./site-footer"
import { SiteHeader } from "./site-header"

const Hero = () => {
  const [copied, setCopied] = useState(false)

  const { scrollY } = useScroll()
  const y2 = useTransform(scrollY, [0, 500], [0, -100])

  const command = "npx shadcn@latest add @margin-ui/react"

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
              <span className="h-px w-8 bg-stone-900" />
              <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
                100% Open Source
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] leading-[0.85] font-light tracking-tighter text-stone-900 mb-10"
            >
              The Space <br />
              Defines the{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-stone-400 to-stone-200">
                Form.
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-col md:flex-row gap-8 md:items-end max-w-3xl"
            >
              <p className="text-lg md:text-xl text-stone-500 font-light leading-relaxed max-w-md">
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
                  <div className="h-14 px-6 bg-white border border-stone-200 flex items-center gap-4 group-hover:border-stone-900 transition-colors duration-300">
                    <span className="font-mono text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                      <span className="text-stone-300 select-none">$ </span>
                      {command}
                    </span>
                    <div className="w-px h-4 bg-stone-200 group-hover:bg-stone-900 transition-colors" />
                    {copied ? (
                      <Check
                        size={16}
                        className="text-stone-900"
                      />
                    ) : (
                      <Copy
                        size={16}
                        className="text-stone-400 group-hover:text-stone-900"
                      />
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 bg-stone-900 w-0 group-hover:w-full transition-all duration-500 ease-out" />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            style={{ y: y2 }}
            className="lg:col-span-4 hidden lg:flex justify-end relative"
          >
            <div className="w-72 xl:w-80 h-80 xl:h-96 border border-stone-200 relative p-6 xl:p-8 flex flex-col justify-between group hover:border-stone-400 transition-colors duration-500 bg-white">
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-stone-900" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-stone-900" />

              <div className="space-y-4 xl:space-y-6 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-full h-24 xl:h-32 bg-stone-100 border border-stone-200 relative overflow-hidden">
                  <div className="absolute inset-0 grid grid-cols-6 gap-px bg-white opacity-20">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-stone-200"
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-3 font-mono text-[10px] text-stone-500">
                  <div className="flex justify-between border-b border-stone-100 pb-2">
                    <span>CONTAINER_WIDTH</span>
                    <span className="text-stone-900">1440px</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-100 pb-2">
                    <span>GRID_GUTTER</span>
                    <span className="text-stone-900">24px</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-100 pb-2">
                    <span>BASE</span>
                    <span className="text-stone-900">Base UI</span>
                  </div>
                </div>
              </div>

              <div className="font-mono text-xs text-stone-900 uppercase tracking-widest text-right">
                Fig. 01 — Layout
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

const PreviewCard = ({
  label,
  children,
  colSpan = "col-span-1",
  ...props
}: React.ComponentProps<"div"> & {
  label: string
  colSpan?: string
}) => (
  <div
    {...props}
    className={`group relative bg-white border-r border-b border-stone-200 p-6 md:p-8 lg:p-10 min-h-[280px] md:min-h-80 flex flex-col justify-between hover:bg-stone-50/50 transition-colors duration-300 ${colSpan}`}
  >
    <div className="flex justify-between items-start w-full mb-8">
      <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400 group-hover:text-stone-900 transition-colors">
        {label}
      </span>
      <Maximize2
        size={14}
        className="text-stone-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
    </div>

    <div className="w-full flex items-center justify-center">{children}</div>

    {/* Corner Accents refined */}
    <div className="absolute top-0 right-0 w-3 h-3 border-l border-b border-stone-900 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="absolute bottom-0 left-0 w-3 h-3 border-r border-t border-stone-900 opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
)

const ComponentPreview = () => {
  return (
    <section className="bg-stone-100 border-t border-stone-200">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-stone-200 bg-white">
          <PreviewCard label="Typography / Heading">
            <div className="text-left w-full space-y-4">
              <h2 className="text-3xl md:text-4xl font-light tracking-tighter text-stone-900">
                Hello World.
              </h2>
              <p className="text-stone-500 text-sm font-light max-w-[200px]">
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
          </PreviewCard>

          <PreviewCard label="Interaction / Button">
            <div className="flex flex-col gap-3 w-full max-w-[200px]">
              <button className="h-11 px-6 bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-all active:scale-95 flex justify-between items-center group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2">
                <span>Deploy</span>
                <ArrowUpRight
                  size={14}
                  className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
                />
              </button>
              <button className="h-11 px-6 bg-white border border-stone-200 text-stone-900 text-sm font-medium hover:border-stone-900 transition-colors active:scale-95 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2">
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
                  className="peer w-full h-8 bg-transparent border-b border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900 transition-colors placeholder-transparent font-mono text-sm focus-visible:ring-0"
                />
                <label className="absolute left-0 top-1 text-stone-400 text-xs font-mono uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-stone-900 peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-stone-900 cursor-text">
                  Email Address
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-500">Notifications</span>
                <div className="w-10 h-5 bg-stone-200 rounded-full relative cursor-pointer hover:bg-stone-300 transition-colors">
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
              <div className="text-6xl font-light tracking-tighter text-stone-900 mb-2 font-mono">
                84.5<span className="text-2xl text-stone-400">%</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-stone-500 uppercase tracking-widest">
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
              <div className="aspect-square bg-stone-100 border border-stone-200 flex items-center justify-center">
                <div className="w-16 h-16 border border-dashed border-stone-400 rounded-full animate-spin-slow" />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="h-2 w-32 bg-stone-200" />
                <div className="h-2 w-24 bg-stone-200" />
                <div className="h-2 w-full bg-stone-100" />
                <div className="h-2 w-full bg-stone-100" />
              </div>
            </div>
          </PreviewCard>
        </div>
      </div>
    </section>
  )
}

export function LandingPage() {
  return (
    <>
      <SiteHeader />

      <Hero />
      <ComponentPreview />

      <section className="py-24 md:py-32 lg:py-40 bg-white text-center border-t border-stone-100">
        <Container>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter mb-6">
            Production-ready components.
          </h2>

          <p className="text-stone-500 mb-8 font-light">
            Built on Base UI. Fully accessible. 100% open source.
          </p>

          <Link
            to="/docs/$"
            params={{ _splat: "components" }}
            className="inline-flex items-center gap-2 text-sm font-medium border-b border-stone-900 pb-0.5 hover:text-stone-600 hover:border-stone-600 transition-colors font-mono uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
          >
            View All Components <MoveRight size={14} />
          </Link>
        </Container>
      </section>

      <SiteFooter />
    </>
  )
}
