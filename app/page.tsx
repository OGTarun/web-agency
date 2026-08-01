import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
import Services from "../components/sections/Services";
import Portfolio from "../components/sections/Portfolio";
import Process from "../components/sections/Process";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";

export default function Home() {
  return (
    <main id="top" className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
