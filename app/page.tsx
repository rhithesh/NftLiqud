import { Hero } from "@/components/globals/Hero";
export default function Home() {
  return (<main>
    <section>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_20%,#223_100%)]">
      </div>
      <Hero />
    </section>
  </main >);
}
