import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
import Services from "../components/sections/Services";
import Portfolio from "../components/sections/Portfolio";
import Process from "../components/sections/Process";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";
import UniverseBackground from "../components/universe/UniverseBackgroundMount";
import OrientationProvider from "../components/motion/OrientationProvider";

export default function Home() {
  return (
    <OrientationProvider>
      <main id="top" className="relative text-foreground">
        <UniverseBackground />
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <Services />
          <Portfolio />
          <Process />
          <Contact />
          <Footer />
        </div>
      </main>
    </OrientationProvider>
  );
}
