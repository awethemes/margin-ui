import * as React from "react"
import { Container } from "./container"

const Separator = () => <div className="w-full h-px bg-stone-200" />

export const SiteFooter = () => (
  <footer className="bg-white pt-24 md:pt-32 pb-12 border-t border-stone-200">
    <Container>
      <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">
        <div className="max-w-md">
          <h2 className="text-7xl md:text-8xl font-light tracking-tighter text-stone-900 mb-8">
            M.
          </h2>

          <p className="text-stone-500 font-light text-lg">
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
              <h4 className="font-mono text-xs text-stone-400 uppercase tracking-widest">
                {col.title}
              </h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm font-medium text-stone-900 hover:text-stone-500 transition-colors focus-visible:outline-none focus-visible:underline"
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

      <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono text-stone-400 uppercase tracking-widest">
        <div>&copy; 2025 Margin.UI. All rights reserved.</div>
        <div className="flex items-center gap-2">
          <span>
            Crafted by{" "}
            <a
              href="https://awethemes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 transition-colors focus-visible:outline-none focus-visible:underline"
            >
              AweThemes
            </a>
          </span>
        </div>
      </div>
    </Container>
  </footer>
)
