import * as React from "react"
import { Link } from "@tanstack/react-router"
import { atom, useAtom, useAtomValue } from "jotai"
import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

const GITHUB_URL = "https://github.com/awethemes/margin-ui"

const mobileMenuOpenAtom = atom(false)

const navItems = [
  { label: "Components", href: "/docs/components" },
  { label: "Foundations", href: "/docs/foundations" },
  { label: "Showcase", href: "/showcase" },
]

function MobileMenuToggle() {
  const [open, setOpen] = useAtom(mobileMenuOpenAtom)

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="md:hidden relative w-8 h-8 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 rounded-sm"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
    >
      <div className="relative w-5 h-4 flex flex-col justify-between">
        <motion.span
          className="absolute top-0 left-0 w-full h-[1.5px] bg-stone-900 origin-center"
          animate={{
            rotate: open ? 45 : 0,
            y: open ? 7 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        />
        <motion.span
          className="absolute top-1/2 left-0 w-full h-[1.5px] bg-stone-900 origin-center -translate-y-1/2"
          animate={{
            opacity: open ? 0 : 1,
            scaleX: open ? 0 : 1,
          }}
          transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
        />
        <motion.span
          className="absolute bottom-0 left-0 w-full h-[1.5px] bg-stone-900 origin-center"
          animate={{
            rotate: open ? -45 : 0,
            y: open ? -7 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        />
      </div>
    </button>
  )
}

function MobileMenuPanel() {
  const [open, setOpen] = useAtom(mobileMenuOpenAtom)

  const handleClose = () => setOpen(false)

  return (
    <motion.div
      initial={false}
      animate={{ height: open ? "auto" : 0 }}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      className="md:hidden overflow-hidden bg-white/90 backdrop-saturate-150 backdrop-blur-md drop-shadow-2xl"
    >
      <nav className="flex flex-col px-6 py-8">
        {navItems.map((item, index) => (
          <Link
            key={item.label}
            to={item.href}
            onClick={handleClose}
            className="group flex items-center justify-between py-4 border-b border-stone-100 last:border-0"
          >
            <span className="text-2xl font-light tracking-tight text-stone-800 group-hover:text-stone-500 transition-colors duration-300">
              {item.label}
            </span>
            <span className="text-[10px] font-medium text-stone-400 uppercase tracking-widest">
              0{index + 1}
            </span>
          </Link>
        ))}

        <div className="mt-8">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="inline-flex items-center gap-3 px-6 py-3 bg-stone-900 text-white text-xs font-medium uppercase tracking-widest hover:bg-stone-800 transition-colors"
          >
            View on GitHub
            <ArrowUpRight size={14} />
          </a>
        </div>
      </nav>
    </motion.div>
  )
}

export function SiteHeader({
  className,
  position = "fixed",
  ...props
}: React.ComponentProps<"header"> & {
  position?: "fixed" | "sticky"
}) {
  const [scrolled, setScrolled] = React.useState(false)
  const mobileMenuOpen = useAtomValue(mobileMenuOpenAtom)

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      {...props}
      data-scrolled={scrolled || undefined}
      aria-expanded={mobileMenuOpen || undefined}
      className={cn(
        "top-0 w-full z-50 transition-all duration-500",
        position === "fixed" ? "fixed" : "sticky",
        scrolled || mobileMenuOpen
          ? "bg-white/90 backdrop-blur-md backdrop-saturate-150 border-b border-stone-200 py-0"
          : "bg-transparent border-b border-transparent py-6",
        className
      )}
    >
      <div className="h-16 md:h-20 flex items-center justify-between px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-3 h-3 bg-stone-900 group-hover:scale-125 transition-transform duration-300" />
          <div className="font-medium text-lg tracking-tight text-stone-900">
            margin<span className="font-light text-stone-400">.ui</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide text-stone-500">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="relative group overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 rounded-sm"
            >
              <span className="group-hover:-translate-y-full block transition-transform duration-300 text-xs uppercase tracking-widest">
                {item.label}
              </span>
              <span className="absolute top-0 left-0 translate-y-full group-hover:translate-y-0 block transition-transform duration-300 text-stone-900 text-xs uppercase tracking-widest">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-[10px] font-medium uppercase tracking-widest hover:bg-stone-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
          >
            GitHub <ArrowUpRight size={12} />
          </a>

          <MobileMenuToggle />
        </div>
      </div>

      <MobileMenuPanel />
    </header>
  )
}
