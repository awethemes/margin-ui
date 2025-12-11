import { createFileRoute } from "@tanstack/react-router"
import { HomeLayout } from "fumadocs-ui/layouts/home"
import { LandingPage } from "@/components/landing-page"
import { baseOptions } from "@/lib/layout.shared"

export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  return (
      <LandingPage />
    // <HomeLayout {...baseOptions()}>
    // </HomeLayout>
  )
}
