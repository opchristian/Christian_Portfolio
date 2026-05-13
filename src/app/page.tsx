import { PortfolioView } from "@/components/portfolio-view";
import { resolveProjectImages } from "@/lib/resolve-project-images";

export default function Home() {
  const projects = resolveProjectImages();
  return <PortfolioView projects={projects} />;
}
