import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";

export default function Home() {
  return (
    <main id="top" className="bg-background text-foreground">
      <Navbar />
      <Hero />
    </main>
  );
}
