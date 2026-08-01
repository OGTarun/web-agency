import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
    </main>
  );
}
