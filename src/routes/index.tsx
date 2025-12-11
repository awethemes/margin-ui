import { createFileRoute } from "@tanstack/react-router"
import { HomeLayout } from "fumadocs-ui/layouts/home"
import { LandingPage } from "@/components/landing-page"

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
