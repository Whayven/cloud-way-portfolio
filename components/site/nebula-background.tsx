export function NebulaBackground() {
  return (
    <div className="fixed inset-0 z-0">
      {/* Mobile: static image */}
      <img
        src="/assets/hero-nebula.png"
        alt=""
        className="h-full w-full object-cover opacity-40 md:hidden"
        aria-hidden
      />
      {/* Desktop: video */}
      <video
        className="hidden h-full w-full object-cover opacity-40 md:block"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      >
        <source src="/assets/hero-nebula.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 bg-linear-to-b from-cw-dark/30 via-cw-dark/60 to-cw-dark/90"
        aria-hidden
      />
    </div>
  )
}
