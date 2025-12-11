import * as React from "react"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export const SiteNavbar = () => {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "bg-white/90 backdrop-blur-md backdrop-saturate-150 border-b border-neutral-200/50 py-0"
          : "bg-transparent border-b border-transparent py-6"
      )}
    >
      <div className="h-16 md:h-20 flex items-center justify-between px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-3 h-3 bg-stone-900 group-hover:scale-125 transition-transform duration-300" />
          <div className="font-medium text-lg tracking-tight text-stone-900">
            margin<span className="font-light text-stone-400">.ui</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide text-stone-500">
          {["Components", "Foundations", "Showcase"].map((item) => (
            <a
              key={item}
              href="#"
              className="relative group overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 rounded-sm"
            >
              <span className="group-hover:-translate-y-full block transition-transform duration-300 text-xs uppercase tracking-widest">
                {item}
              </span>
              <span className="absolute top-0 left-0 translate-y-full group-hover:translate-y-0 block transition-transform duration-300 text-stone-900 text-xs uppercase tracking-widest">
                {item}
              </span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/awethemes/margin-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-[10px] font-medium uppercase tracking-widest hover:bg-stone-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
          >
            GitHub <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </nav>
  )
}
