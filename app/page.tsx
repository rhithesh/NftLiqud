import { Hero } from "@/components/globals/Hero";
export default function Home() {
  return (<main>
    <section>
      <div className="absolute top-0 h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_100%_100%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <Hero />
      </div>

    </section>
  </main>);
}
