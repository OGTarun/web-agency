export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#010205]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_44%,rgba(5,14,35,.18),transparent_42%),radial-gradient(ellipse_at_center,transparent_34%,rgba(1,2,5,.62)_78%,#010205_100%)]" />
      <div className="absolute bottom-0 left-0 h-64 w-full bg-gradient-to-t from-[#010205] via-[#010205]/70 to-transparent" />
    </div>
  );
}
