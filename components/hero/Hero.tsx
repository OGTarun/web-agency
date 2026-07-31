export default function Hero() {
    return (
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#05010A] px-6">
        {/* Background Glow */}
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/20 blur-[140px]" />
  
        {/* Grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>
  
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="mb-6 inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            🚀 Premium Web Design • AI Automation • Branding
          </p>
  
          <h1 className="text-5xl font-extrabold leading-tight text-white md:text-7xl">
            We Build
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              {" "}
              Digital Experiences
            </span>
            <br />
            That Grow Businesses.
          </h1>
  
          <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-400">
            OG Studios creates premium websites, AI solutions, and digital
            experiences that help modern businesses stand out and convert more
            customers.
          </p>
  
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="rounded-full bg-violet-600 px-8 py-4 font-semibold transition hover:bg-violet-500">
              Get Started
            </button>
  
            <button className="rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition hover:border-violet-500 hover:text-violet-400">
              View Portfolio
            </button>
          </div>
        </div>
      </section>
    );
  }