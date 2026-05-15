import Link from "next/link";

const NAV_LINKS = [
  { href: "/properties", label: "Residences" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative w-full select-none"
      style={{ backgroundColor: "#080809" }}
    >
      {/* Top rule */}
      <div
        className="mx-8 sm:mx-12 lg:mx-20"
        style={{
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)",
        }}
      />

      {/* Main grid */}
      <div className="px-8 sm:px-12 lg:px-20 pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto] gap-12 lg:gap-24">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 max-w-xs">
            <Link href="/" className="inline-block mb-7">
              <span
                className="font-sans uppercase"
                style={{
                  fontSize: 8,
                  letterSpacing: "0.55em",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                Rajdhany Realtors
              </span>
            </Link>

            <p
              className="font-sans leading-relaxed"
              style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}
            >
              Ultra-premium real estate in the heart of Guwahati, Assam.
              Curating extraordinary residences for those who seek more.
            </p>

            {/* Est. marker */}
            <div className="flex items-center gap-3 mt-8">
              <div
                style={{
                  height: 1,
                  width: 18,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
              />
              <span
                className="font-sans uppercase"
                style={{
                  fontSize: 6.5,
                  letterSpacing: "0.42em",
                  color: "rgba(255,255,255,0.14)",
                }}
              >
                Est. 2013
              </span>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <span
              className="block font-sans uppercase mb-7"
              style={{
                fontSize: 7,
                letterSpacing: "0.42em",
                color: "rgba(255,255,255,0.18)",
              }}
            >
              Navigate
            </span>
            <ul className="space-y-3.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-sans text-white/30 hover:text-white/60 transition-colors duration-300"
                    style={{ fontSize: 12.5 }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reach us */}
          <div>
            <span
              className="block font-sans uppercase mb-7"
              style={{
                fontSize: 7,
                letterSpacing: "0.42em",
                color: "rgba(255,255,255,0.18)",
              }}
            >
              Reach Us
            </span>
            <ul
              className="space-y-3.5 font-sans"
              style={{ fontSize: 12.5, color: "rgba(255,255,255,0.26)" }}
            >
              <li className="leading-relaxed">
                Phaguna Rabha High School Path, House No-3, Kahilipara Road, Jatia
                <br />
                Guwahati, Assam — 781006
              </li>
              <li>
                <a
                  href="tel:+917577957640"
                  className="hover:text-white/55 transition-colors duration-300"
                >
                  +91 75779 57640
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@rajdhanyrealtors.com"
                  className="hover:text-white/55 transition-colors duration-300"
                >
                  info@rajdhanyrealtors.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="mx-8 sm:mx-12 lg:mx-20"
        style={{
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.04), transparent)",
        }}
      />
      <div className="px-8 sm:px-12 lg:px-20 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p
          className="font-sans"
          style={{ fontSize: 10.5, color: "rgba(255,255,255,0.14)" }}
        >
          &copy; {year} Rajdhany Realtors. All rights reserved.
        </p>
        <div className="flex items-center gap-1">
          <Link
            href="/terms"
            className="font-sans text-white/15 hover:text-white/40 transition-colors duration-300 px-2 py-1"
            style={{ fontSize: 10.5 }}
          >
            Terms
          </Link>
          <span style={{ fontSize: 8, color: "rgba(255,255,255,0.1)" }}>·</span>
          <Link
            href="/privacy"
            className="font-sans text-white/15 hover:text-white/40 transition-colors duration-300 px-2 py-1"
            style={{ fontSize: 10.5 }}
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
