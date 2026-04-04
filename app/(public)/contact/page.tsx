import { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact — Rajdhany Realtors",
  description:
    "Begin a conversation with Rajdhany Realtors. Ultra-premium real estate in Guwahati, Assam.",
};

const INFO = [
  {
    label: "Address",
    lines: ["GS Road, Christian Basti", "Guwahati, Assam — 781005"],
  },
  {
    label: "Phone",
    lines: ["+91 12345 67890"],
    href: "tel:+911234567890",
  },
  {
    label: "Email",
    lines: ["info@rajdhanyrealtors.com"],
    href: "mailto:info@rajdhanyrealtors.com",
  },
  {
    label: "Hours",
    lines: ["Mon – Sat, 9 AM – 7 PM", "Sun, 10 AM – 4 PM"],
  },
];

const FAQ = [
  {
    q: "How do I arrange a property viewing?",
    a: "Fill out the form or call us directly. We will arrange a private, unhurried viewing at a time that suits you.",
  },
  {
    q: "Is your consultation service complimentary?",
    a: "Our advisory and search services are entirely complimentary for buyers. We earn our fee only upon successful completion of a transaction.",
  },
  {
    q: "Do you work with a select clientele?",
    a: "Yes. Rajdhany operates as a boutique firm — we work with a limited number of clients at any one time to ensure absolute dedication to each.",
  },
  {
    q: "Can Rajdhany assist with investment properties?",
    a: "Absolutely. We advise on residential investment, yield optimisation, and portfolio strategy for high-net-worth clients across Assam.",
  },
];

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>

      {/* ════════ HEADER ════════ */}
      <div className="px-8 sm:px-12 lg:px-20 pt-20 pb-14 lg:pt-28 lg:pb-16">
        <span
          className="block font-sans uppercase mb-4"
          style={{ fontSize: 7.5, letterSpacing: "0.5em", color: "rgba(0,0,0,0.22)" }}
        >
          Contact
        </span>
        <h1
          className="font-display font-normal"
          style={{
            fontSize: "clamp(2.2rem, 5vw, 5rem)",
            letterSpacing: "-0.03em",
            color: "rgba(0,0,0,0.85)",
            lineHeight: 1.05,
          }}
        >
          Begin a
          <br />
          <span className="italic">conversation.</span>
        </h1>
      </div>

      {/* ════════ RULE ════════ */}
      <div
        className="mx-8 sm:mx-12 lg:mx-20"
        style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(0,0,0,0.07), transparent)" }}
      />

      {/* ════════ SPLIT LAYOUT ════════ */}
      <div className="px-8 sm:px-12 lg:px-20 pt-14 pb-24 lg:pt-16 lg:pb-36 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-14 lg:gap-20 items-start">

        {/* Left: contact info */}
        <div>
          <p
            className="font-sans leading-relaxed max-w-sm mb-14"
            style={{ fontSize: 13.5, color: "rgba(0,0,0,0.38)", lineHeight: 1.75 }}
          >
            We welcome enquiries from those who are genuinely ready to elevate their address. Please reach out through any of the channels below, or use the form.
          </p>

          {/* Info rows */}
          <div className="space-y-0">
            {INFO.map((item, i) => (
              <div
                key={item.label}
                className="flex gap-8 py-6"
                style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}
              >
                <span
                  className="font-sans uppercase shrink-0 pt-0.5"
                  style={{ fontSize: 6.5, letterSpacing: "0.42em", color: "rgba(0,0,0,0.2)", width: 60 }}
                >
                  {item.label}
                </span>
                <div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="block font-sans leading-relaxed transition-colors duration-300 hover:text-black/55"
                      style={{ fontSize: 13.5, color: "rgba(0,0,0,0.55)" }}
                    >
                      {item.lines[0]}
                    </a>
                  ) : (
                    item.lines.map((line, j) => (
                      <span
                        key={j}
                        className="block font-sans leading-relaxed"
                        style={{ fontSize: 13.5, color: "rgba(0,0,0,0.45)" }}
                      >
                        {line}
                      </span>
                    ))
                  )}
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }} />
          </div>
        </div>

        {/* Right: form */}
        <div
          className="p-8 lg:p-10"
          style={{ backgroundColor: "#f3f3f3", borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)" }}
        >
          <span
            className="block font-sans uppercase mb-7"
            style={{ fontSize: 7, letterSpacing: "0.44em", color: "rgba(0,0,0,0.22)" }}
          >
            Send a Message
          </span>
          <ContactForm />
        </div>
      </div>

      {/* ════════ FAQ ════════ */}
      <div
        className="mx-8 sm:mx-12 lg:mx-20"
        style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(0,0,0,0.06), transparent)" }}
      />
      <div className="px-8 sm:px-12 lg:px-20 pt-16 pb-28 lg:pt-20 lg:pb-36">
        <span
          className="block font-sans uppercase mb-12"
          style={{ fontSize: 7.5, letterSpacing: "0.45em", color: "rgba(0,0,0,0.22)" }}
        >
          Common Questions
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-0">
          {FAQ.map((item, i) => (
            <div
              key={i}
              className="py-8"
              style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}
            >
              <h3
                className="font-display font-normal mb-3"
                style={{ fontSize: "1.05rem", letterSpacing: "-0.02em", color: "rgba(0,0,0,0.82)" }}
              >
                {item.q}
              </h3>
              <p
                className="font-sans leading-relaxed"
                style={{ fontSize: 12.5, color: "rgba(0,0,0,0.38)" }}
              >
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
