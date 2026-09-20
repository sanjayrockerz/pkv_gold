"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { contact, purityOptions, buildMapEmbedUrl } from "@/lib/constants";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { calculateGoldValue, formatIndianRupees } from "@/lib/calculator";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { HeroScrollTransition } from "@/components/hero/HeroScrollTransition";
import { Hero } from "@/components/hero/Hero";
import { AppointmentForm } from "@/components/contact/AppointmentForm";

const faqs = [
  [
    "Is the calculator value final?",
    "No. It is an indicative estimate. Final value is confirmed after physical assessment of purity and net weight.",
  ],
  [
    "What can I bring to PKV Gold?",
    "Old gold, jewellery, coins, broken or unused gold can be brought for assessment.",
  ],
  [
    "How does PKV Gold determine value?",
    "We assess purity and net gold weight, then explain the applicable rate and valuation clearly.",
  ],
  [
    "Does the rate change?",
    "The public calculator requests the current active rate managed by PKV Gold.",
  ],
  [
    "Do I need an appointment?",
    "Appointments help us prepare for your visit, but you can also call or WhatsApp PKV Gold first.",
  ],
];
const reviewData = [
  [
    "Lokesh Lokesh",
    "1 review",
    "6 months ago",
    "Pkv gold provides excellent door step service got good amount of cash for gold, very much happy with the service",
  ],
  [
    "Ramya",
    "2 reviews",
    "5 months ago",
    "Pkv gold gives good price for gold and the process is very easy. Their staff are very friendly",
  ],
  [
    "Kaviya S",
    "1 review",
    "5 months ago",
    "I had some jewellery pledged at a bank and the interest was piling up, but I didn’t have the ready cash to release it before selling. Reached out to PKV Gold and they made it so easy.",
  ],
  [
    "VINOTH KUMAR K",
    "2 reviews",
    "5 months ago",
    "Good service and quick payment. Staff was polite and explained everything clearly. Worth visiting if you want to sell gold",
  ],
  [
    "Dreamboy MD",
    "1 review",
    "5 months ago",
    "Great hospitality and service. Please keep up the good work",
  ],
  [
    "ANITHA RAJESH",
    "3 reviews",
    "11 months ago",
    "I honestly couldn’t be happier with my experience at PKV Gold. The staff were very supportive and made the process smooth.",
  ],
] as const;
const galleryImages = [
  "ChatGPT Image Sep 20, 2026, 10_26_42 AM.png",
  "ChatGPT Image Sep 20, 2026, 10_53_59 AM.png",
  "ChatGPT Image Sep 20, 2026, 10_54_08 AM.png",
  "ChatGPT Image Sep 20, 2026, 11_10_49 AM.png",
];
const proofImages = [
  "pkv-gold-payment-proof-1.jpg",
  "pkv-gold-payment-proof-2.jpg",
  "pkv-gold-payment-proof-3.jpg",
  "pkv-gold-payment-proof-4.jpg",
];
function Arrow() {
  return <span aria-hidden="true">→</span>;
}
function Button({
  href,
  children,
  tone = "green",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "green" | "gold" | "light";
}) {
  const external = href.startsWith("http");
  const label = href === "#value" ? "Calculate My Value" : children;
  return (
    <a
      className={`button button-${tone}`}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {label}
      <Arrow />
    </a>
  );
}
function Intro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
}) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}
function HeaderIcon({ type }: { type: "phone" | "mail" | "whatsapp" }) {
  if (type === "phone")
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M7.2 3.5 9.7 3l2 4.8-1.9 1.5a14.5 14.5 0 0 0 4.9 4.9l1.5-1.9 4.8 2-.5 2.5a2 2 0 0 1-2.1 1.6A15.4 15.4 0 0 1 5.6 5.6a2 2 0 0 1 1.6-2.1Z" />
      </svg>
    );
  if (type === "mail")
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M3.5 5.5h17v13h-17z" />
        <path d="m4 6 8 6 8-6" />
      </svg>
    );
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M19.2 4.8A9.9 9.9 0 0 0 3.6 16.7L3 21l4.4-1.1a9.9 9.9 0 0 0 11.8-15.1Zm-7.1 14.1a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.6.7.7-2.5-.2-.3a8.2 8.2 0 1 1 6.6 3.5Z" />
      <path d="M9 7.8c.2-.2.4-.2.6-.1l1.1 1.7c.1.2.1.4 0 .6l-.5.6a6.8 6.8 0 0 0 3.2 3.2l.6-.5c.2-.1.4-.1.6 0l1.7 1.1c.2.2.2.4.1.6l-.4.8c-.2.4-.7.7-1.2.6a8.9 8.9 0 0 1-6.8-6.8c-.1-.5.2-1 .6-1.2Z" />
    </svg>
  );
}
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const ticker = [
    "Know the value of your gold",
    "Transparent gold valuation",
    "Clear value. Clear process.",
    "Visit PKV Gold, Kolathur",
    "Cash for gold",
    "Professional gold assessment",
  ];
  const navigation = [
    ["HOME", "#top"],
    ["ABOUT", "#reviews"],
    ["SERVICES", "#value"],
    ["FAQ", "#faq"],
    ["CONTACT", "#contact"],
  ] as const;
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
    <header className="masthead">
      <div className="announcement" aria-label="PKV Gold announcements">
        <div className="announcement-track">
          {[...ticker, ...ticker].map((message, i) => (
            <span className="announcement-item" key={`${message}-${i}`}>
              <b aria-hidden="true">◆</b>
              {message}
            </span>
          ))}
        </div>
      </div>
      <div className={`navbar ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand-lockup" href="#top" aria-label="PKV Gold home">
          <Image
            className="brand-logo"
            src="/images/PKV%20LOGO.png"
            alt="PKV Gold"
            width={1254}
            height={1254}
            priority
          />
        </a>
        <nav className="glass-nav-links" aria-label="Primary navigation">
          {navigation.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
        <div className="header-contacts">
          <a
            className="whatsapp-cta"
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact PKV Gold on WhatsApp"
          >
            <HeaderIcon type="whatsapp" />
            <span>WhatsApp Us</span>
            <b aria-hidden="true">→</b>
          </a>
        </div>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">Toggle navigation</span>
          <i /><i /><i />
        </button>
      </div>
      {menuOpen && (
        <nav id="mobile-navigation" className="mobile-glass-menu" aria-label="Mobile navigation">
          {navigation.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className="mobile-glass-menu-action" href={buildGeneralWhatsAppUrl()} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
            <HeaderIcon type="whatsapp" /> WhatsApp Us <span aria-hidden="true">→</span>
          </a>
        </nav>
      )}
    </header>
    </>
  );
}
function Nav() {
  return <Header />;
}
function Floating() {
  return (
    <aside className="floating-contact" aria-label="Contact PKV Gold">
      <a href={`tel:${contact.phone}`}>CALL</a>
      <a
        href={buildGeneralWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
      >
        WHATSAPP
      </a>
    </aside>
  );
}
function Calculator() {
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [karat, setKarat] = useState("22");
  const [weight, setWeight] = useState("1");
  const selected =
    purityOptions.find((x) => String(x.karat) === karat) ?? purityOptions[1];
  const rate = rates?.[karat] ?? null;
  const estimate =
    rate === null ? null : calculateGoldValue(Number(weight) || 0, rate);
  useEffect(() => {
    fetch("/api/rate")
      .then((r) => r.json())
      .then((d) => setRates(d.rates))
      .catch(() => setRates(null));
  }, []);
  return (
    <div className="calculator-card gold-calculator">
      <div className="calculator-title">
        <h3>Gold Value Calculator</h3>
        <p>Know What Your Gold Could Be Worth Today</p>
      </div>
      <label className="calculator-field">
        <span>Select Gold Purity</span>
        <select
          value={karat}
          onChange={(e) => setKarat(e.target.value)}
          aria-label="Select gold purity"
        >
          {purityOptions.map((o) => (
            <option key={o.karat} value={o.karat}>
              {o.karat}K Gold
            </option>
          ))}
        </select>
      </label>
      <label className="calculator-field">
        <span>Enter Your Gold Weight (grams)</span>
        <input
          type="number"
          min="0.1"
          max="150"
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          aria-label="Gold weight in grams"
        />
      </label>
      <div className="calculator-rate">
        <span>Current {selected.karat}K Gold Rate</span>
        <strong>{rate === null ? "—" : `₹${formatIndianRupees(rate)}`}</strong>
        <small>per gram</small>
      </div>
      <div className="calculator-value">
        <span>Your Gold Value</span>
        <strong>
          {estimate === null ? "—" : `₹${formatIndianRupees(estimate)}`}
        </strong>
        <small>Based on current gold rate × your weight</small>
      </div>
      <a className="calculator-submit" href="#contact">
        Get Your Final Price <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
function CustomerGallery() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  useEffect(() => {
    const update = () =>
      setVisible(
        window.innerWidth <= 560 ? 1 : window.innerWidth <= 1100 ? 2 : 3,
      );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const maxIndex = Math.max(0, galleryImages.length - visible);
  const move = (next: number) =>
    setIndex(Math.max(0, Math.min(next, maxIndex)));
  const offset = visible === 1
    ? `calc(-${index * 100}% - ${index * 0.75}rem)`
    : visible === 2
      ? `calc(-${index * 50}% - ${index}rem)`
      : `calc(-${index * 33.333333}% - ${index}rem)`;
  return (
    <section
      className="section customer-gallery-section"
      aria-labelledby="gallery-title"
    >
      <div className="customer-gallery-heading">
        <p className="eyebrow">HAPPY CUSTOMER GALLERY</p>
        <h2 id="gallery-title">
          Real customers. <em>Real trust.</em>
        </h2>
        <p>
          Real transactions and real moments from the PKV Gold customer
          experience.
        </p>
      </div>
      <div
        className="gallery-carousel"
        tabIndex={0}
        role="region"
        aria-label="Happy customer gallery"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") move(index - 1);
          if (e.key === "ArrowRight") move(index + 1);
        }}
        onTouchStart={(e) => setTouchStart(e.changedTouches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStart === null) return;
          const distance = e.changedTouches[0].clientX - touchStart;
          if (Math.abs(distance) > 40) move(index + (distance < 0 ? 1 : -1));
          setTouchStart(null);
        }}
      >
        <button
          className="gallery-arrow gallery-arrow-left"
          type="button"
          onClick={() => move(index - 1)}
          aria-label="Previous gallery image"
          disabled={index === 0}
        >
          ‹
        </button>
        <div className="gallery-viewport">
          <div
            className="gallery-track"
            style={
              {
                "--gallery-offset": offset,
              } as React.CSSProperties
            }
          >
            {galleryImages.map((image, i) => (
              <figure className="gallery-slide" key={image}>
                <Image
                  src={`/images/gallery/${encodeURIComponent(image)}`}
                  alt={`PKV Gold customer gallery image ${i + 1}`}
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 1100px) 45vw, 30vw"
                />
                <figcaption>PKV Gold customer moment</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <button
          className="gallery-arrow gallery-arrow-right"
          type="button"
          onClick={() => move(index + 1)}
          aria-label="Next gallery image"
          disabled={index === maxIndex}
        >
          ›
        </button>
      </div>
      <div className="gallery-dots" aria-label="Gallery pages">
        {Array.from({ length: maxIndex + 1 }, (_, i) => (
          <button
            key={i}
            type="button"
            className={i === index ? "active" : ""}
            onClick={() => move(i)}
            aria-label={`Show gallery page ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}

const commitmentPoints = [
  ["scale", "ACCURATE ASSESSMENT", "Your gold is assessed carefully before its value is calculated."],
  ["shield", "TRANSPARENT TESTING", "The assessment process is explained clearly before proceeding."],
  ["calculator", "CLEAR VALUE CALCULATION", "We explain how the value is determined from the assessment."],
  ["document", "NO SURPRISES", "The process and applicable deductions are explained clearly before you proceed."],
  ["payment", "QUICK PAYMENT", "Once the transaction is confirmed, payment is processed through the available payment method."],
  ["people", "TRUSTED LOCAL SERVICE", "Personal assistance from a local PKV GOLD team."],
] as const;

function CommitmentIcon({ type }: { type: (typeof commitmentPoints)[number][0] }) {
  const paths = {
    scale: <><path d="M12 4v15M6 20h12M4 7h16M7 7l-3 6h6L7 7Zm10 0-3 6h6l-3-6Z" /></>,
    shield: <path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Zm-3 9 2 2 4-4" />,
    calculator: <path d="M6 3h12v18H6zM9 7h6M9 12h1M13 12h1M9 16h1M13 16h1" />,
    document: <path d="M7 3h8l3 3v15H7zM15 3v4h4M9 12l2 2 4-4" />,
    payment: <path d="M5 12h12M13 8l4 4-4 4M5 5h8" />,
    people: <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm6-1a2.5 2.5 0 1 0 0-5M3 19c0-3 2.7-5 6-5s6 2 6 5M15 14c2.8.1 5 1.8 5 4" />,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24">{paths[type]}</svg>;
}

function ValueCommitment() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVisible(true); return; }
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.16 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <section ref={ref} id="value-commitment" className={`value-commitment ${visible ? 'is-visible' : ''}`} aria-labelledby="value-commitment-title"><div className="value-commitment-heading"><p className="eyebrow">OUR VALUE COMMITMENT</p><h2 id="value-commitment-title">Clear Value. <em>Clear Process.</em></h2><p>We value the gold you already own with a clear assessment, transparent calculation and straightforward payment.</p><i aria-hidden="true" /></div><div className="commitment-grid">{commitmentPoints.map(([icon,title,description],index)=><article className="commitment-card" style={{'--commitment-delay':`${index*0.07}s`} as React.CSSProperties} key={title}><span className="commitment-icon"><CommitmentIcon type={icon} /></span><h3>{title}</h3><p>{description}</p></article>)}</div></section>;
}

const whyPkvPoints = [
  ['release', 'GOLD FROM OTHER VENDORS? WE CAN HELP.', 'If your gold is pledged or held with another buyer or pawn shop, we can help you understand the release or takeover process and purchase it once available for sale.'],
  ['home', 'DOORSTEP SERVICE ACROSS CHENNAI', 'Convenient local assistance for eligible customers across Chennai.'],
  ['payment', 'IMMEDIATE PAYMENT', 'Once the valuation is confirmed and the transaction is completed, payment is processed promptly through the available payment method.'],
  ['scale', 'CLEAR GOLD VALUATION', 'Your gold is assessed carefully, with the purity, weight and value explained clearly before you proceed.'],
  ['people', 'PERSONAL SERVICE', 'You deal directly with the PKV GOLD team instead of navigating a complicated process.'],
  ['pin', 'LOCAL & EASY TO REACH', 'PKV GOLD is based in Kolathur, Chennai, serving customers from the surrounding local areas.'],
  ['calendar', 'DISCIPLINED SERVICE OVER THE YEARS', 'PKV GOLD has built its local business around consistent service, straightforward transactions and long-term customer relationships.'],
  ['check', 'YOUR GOLD. YOUR DECISION.', 'We explain the assessment and value clearly so you can make your decision with confidence before completing the transaction.'],
] as const;

function WhyPkvIcon({ type }: { type: (typeof whyPkvPoints)[number][0] }) {
  const paths = {
    release: <><path d="M4 12h12" /><path d="m12 7 5 5-5 5" /><path d="M4 6h5" /></>,
    home: <><path d="m3 11 9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></>,
    payment: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></>,
    scale: <><path d="M12 4v15M6 20h12M4 7h16M7 7l-3 6h6L7 7Zm10 0-3 6h6l-3-6Z" /></>,
    people: <><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 6.5a2.5 2.5 0 0 1 0 5M17 14c2.2.6 4 2.7 4 6" /></>,
    pin: <><path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></>,
    calendar: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3v4M16 3v4M4 10h16M8 14h3" /></>,
    check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24">{paths[type]}</svg>;
}

function WhyPkvGold() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVisible(true); return; }
    const section = ref.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.12 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  return <section ref={ref} id="why-pkv" className={`why-pkv-section ${visible ? 'is-visible' : ''}`} aria-labelledby="why-pkv-title">
    <div className="why-pkv-heading">
      <div>
        <p className="eyebrow">WHY PKV GOLD</p>
        <h2 id="why-pkv-title">Why People Choose <em>PKV GOLD</em></h2>
      </div>
      <p>A clear process, personal service and practical support when you need to turn the gold you already own into value.</p>
    </div>
    <div className="why-pkv-layout">
      <div className="why-pkv-statement"><p className="eyebrow">WHY PKV GOLD</p><h3>Clear value.<br /><em>Practical service.<br />Local trust.</em></h3><p>From first conversation to completed transaction, the important details stay understandable.</p></div>
      <div className="why-pkv-grid">{whyPkvPoints.map(([icon, title, description], index) => <article className={`why-pkv-item${index === 0 ? ' is-featured' : ''}`} key={title}>
        <div className="why-pkv-marker"><span>{String(index + 1).padStart(2, '0')}</span><WhyPkvIcon type={icon} /></div>
        <div><h3>{title}</h3><p>{description}</p></div>
      </article>)}</div>
    </div>
  </section>;
}

function CustomerTrustChapter() {
  return (
    <>
      <section
        className="section google-reviews-composition google-reviews-final"
        id="reviews"
      >
        <div className="google-reviews-summary">
          <span className="google-mark" aria-hidden="true">
            G
          </span>
          <p className="eyebrow">GOOGLE REVIEWS</p>
          <h2>
            What Our Customers
            <br />
            <em>Say</em>
          </h2>
          <p>
            Real experiences. Real trust. Hear from customers who chose PKV
            Gold.
          </p>
          <div
            className="review-stars"
            aria-label="Five star Google review display"
          >
            ★★★★★
          </div>
          <strong>Customer feedback from PKV Gold</strong>
          <span className="review-quote">
            Your trust means everything to us.
          </span>
        </div>
        <div className="google-review-list">
          {reviewData.map(([name, count, time, text]) => (
            <article className="google-review-card" key={name}>
              <div className="review-avatar" aria-hidden="true">
                {name.slice(0, 1)}
              </div>
              <div>
                <strong>{name}</strong>
                <small>{count}</small>
                <div
                  className="review-card-stars"
                  aria-label={`Five stars, ${time}`}
                >
                  ★★★★★ <span>{time}</span>
                </div>
                <p>{text}</p>
              </div>
              <b className="review-menu" aria-hidden="true">
                ⋮
              </b>
            </article>
          ))}
        </div>
      </section>
      <CustomerGallery />
    </>
  );
}

function PaymentProofCarousel() {
  return (
    <div className="proof-grid" role="region" aria-label="Recent customer payment proofs">
      {proofImages.map((image, proofIndex) => (
        <figure className="proof-slide" key={image}>
          <Image src={`/images/proofs/${image}`} alt={`PKV Gold payment proof ${proofIndex + 1}`} fill sizes="(max-width: 900px) 50vw, 20vw" />
        </figure>
      ))}
    </div>
  );
}

/*
      className="proof-carousel"
      tabIndex={0}
      role="region"
      aria-label="Recent customer payment proofs"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") move(index - 1);
        if (event.key === "ArrowRight") move(index + 1);
      }}
      onTouchStart={(event) => setTouchStart(event.changedTouches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchStart === null) return;
        const distance = event.changedTouches[0].clientX - touchStart;
        if (Math.abs(distance) > 40) move(index + (distance < 0 ? 1 : -1));
        setTouchStart(null);
      }}
    >
      <button className="proof-arrow" type="button" onClick={() => move(index - 1)} disabled={index === 0} aria-label="Previous payment proof">‹</button>
      <div className="proof-viewport">
        <div className="proof-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {proofImages.map((image, proofIndex) => (
            <figure className="proof-slide" key={image}>
              <Image src={`/images/proofs/${image}`} alt={`PKV Gold payment proof ${proofIndex + 1}`} fill sizes="(max-width: 900px) 90vw, 38vw" />
            </figure>
          ))}
        </div>
      </div>
      <button className="proof-arrow" type="button" onClick={() => move(index + 1)} disabled={index === proofImages.length - 1} aria-label="Next payment proof">›</button>
      <div className="proof-dots" aria-label="Payment proof pages">{proofImages.map((image, proofIndex) => <button key={image} type="button" className={proofIndex === index ? "active" : ""} onClick={() => move(proofIndex)} aria-label={`Show payment proof ${proofIndex + 1}`} aria-current={proofIndex === index ? "true" : undefined} />)}</div>
    </div>
  );
}

*/

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <div className="site" id="top">
      <Nav />
      <main>
        <HeroScrollTransition>
          <Hero />
          <section className="value-section pkv-value-section" id="value">
            <div className="value-calculator-layout">
              <Calculator />
              <div className="know-value-visual">
                <Image
                  src="/images/know%20the%20true%20value.png"
                  alt="PKV Gold assessment and value process"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
            </div>
          </section>
        </HeroScrollTransition>
        {/* Legacy placeholder review block removed; verified customer reviews render below. */}{/*
        <section
          className="section proof-section google-reviews-section"
          id="reviews"
        >
          <Intro
            eyebrow="GOOGLE REVIEWS"
            title={
              <>
                What our customers
                <br />
                <em>say about PKV.</em>
              </>
            }
            copy="Verified Google reviews will be shown here when the PKV Gold review source is connected."
          />
          <div className="review-placeholder">
            <span>GOOGLE REVIEWS / PLACEHOLDER</span>
            <blockquote>
              Customer review content will be added from verified PKV Gold
              feedback.
            </blockquote>
            <small>No invented testimonials are shown.</small>
          </div>
        </section>
        <section className="section google-reviews-composition">
          <div className="google-reviews-summary">
            <span className="google-mark" aria-hidden="true">
              G
            </span>
            <p className="eyebrow">GOOGLE REVIEWS</p>
            <h2>
              What our customers
              <br />
              <em>say about PKV.</em>
            </h2>
            <p>
              Real experiences. Real trust. Verified customer feedback will be
              connected here.
            </p>
            <div
              className="review-stars"
              aria-label="Google review rating placeholder"
            >
              ★★★★★
            </div>
            <strong>Verified reviews coming soon</strong>
            <span className="review-quote">
              Your trust means everything to us.
            </span>
          </div>
          <div className="google-review-list">
            {reviewPlaceholders.map((label) => (
              <article className="google-review-card" key={label}>
                <div className="review-avatar" aria-hidden="true">
                  PK
                </div>
                <div>
                  <strong>{label}</strong>
                  <small>Verified Google review placeholder</small>
                  <div className="review-card-stars" aria-hidden="true">
                    ★★★★★ <span>Awaiting verified content</span>
                  </div>
                  <p>
                    Customer review content will be added from the connected PKV
                    Gold Google review source.
                  </p>
                </div>
                <b className="review-menu" aria-hidden="true">
                  ⋮
                </b>
              </article>
            ))}
          </div>
        </section> */}
        <CustomerTrustChapter />
        <section className="section payments-section" aria-labelledby="payment-proofs-title">
          <div className="payment-section-heading">
            <p className="eyebrow">TRUSTED BY SELLERS ACROSS THE CITY</p>
            <h2 id="payment-proofs-title">Recent Customer Payments</h2>
            <p>Real payout receipts from people who sold with us this month.</p>
          </div>
          <PaymentProofCarousel />
        </section>
        <ValueCommitment />
        <WhyPkvGold />
        {/* Owner portrait is reserved for the final CTA. */}
        {/* <section className="section owner-section">
          <MediaPlaceholder
            label="PKV GOLD OWNER"
            caption="Owner image integration point — add the verified PKV owner asset here"
            aspectRatio="4 / 5"
            visualType="portrait"
          />
          <div>
            <Intro
              eyebrow="THE PEOPLE BEHIND YOUR GOLD VALUATION"
              title={
                <>
                  PKV Gold owner
                </>
              }
              copy="PKV Gold is a local business where the value conversation is personal, clear and accountable. The verified owner portrait will be placed here when available."
            />
            <p className="asset-note">
              No owner image was present in the repository at rebuild time, so
              no person has been invented.
            </p>
          </div>
        </section> */}
        {/* Removed public displayed-rate marketing section.
        <section className="rate-explainer">
          <div>
            <p className="eyebrow">RATE ≠ FINAL VALUE</p>
            <h2>
              The displayed rate
              <br />
              <em>is a starting point.</em>
            </h2>
          </div>
          <p>
            The final amount depends on the physical assessment of your gold —
            including purity and net weight. The calculator helps you understand
            the relationship, not promise a final payout.
          </p>
        </section> */}
        {/* Legacy generic Why section removed; WhyPkvGold now follows Our Value Commitment. */}
        {/* <section className="section why-section">
          <Intro
            eyebrow="WHY PKV GOLD"
            title={
              <>
                A clearer gold conversation
                <br />
                <em>made understandable.</em>
              </>
            }
          />
          <div className="why-grid">
            {[
              "Current rate under PKV control",
              "Purity and weight explained",
              "Professional in-person assessment",
              "Clear value before you decide",
              "Secure handling of your gold",
              "A local team you can contact",
            ].map((item) => (
              <article key={item}>
                <span>◆</span>
                <h3>{item}</h3>
                <p>Useful information, without confusing sales language.</p>
              </article>
            ))}
          </div>
        </section> */}
        <section className="section contact-section" id="contact">
          <div>
            <Intro
              eyebrow="CONTACT / APPOINTMENT"
              title={
                <>
                  Bring your gold.
                  <br />
                  <em>Bring your questions.</em>
                </>
              }
              copy="Share the essentials and send a professional appointment request to PKV Gold on WhatsApp."
            />
            <div className="contact-details">
              <b>{contact.businessName.toUpperCase()}</b>
              <span>{contact.displayPhone}</span>
              <span>{contact.locationLabel}</span>
            </div>
            <div className="contact-buttons">
              <Button href={`tel:${contact.phone}`} tone="light">
                Call PKV Gold
              </Button>
              <Button href={buildGeneralWhatsAppUrl()} tone="light">
                WhatsApp PKV Gold
              </Button>
            </div>
          </div>
          <AppointmentForm />
        </section>
        <section className="section location-section" id="location">
          <div>
            <Intro
              eyebrow="LOCATION"
              title={
                <>
                  Visit PKV Gold
                  <br />
                  <em>in {contact.locationLabel}.</em>
                </>
              }
              copy="Physical assessment happens at the address below. Use the same source of truth for the map, address and directions."
            />
            <div className="address-card">
              <b>{contact.businessName}</b>
              <p>{contact.address}</p>
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GET DIRECTIONS <Arrow />
              </a>
            </div>
          </div>
          <div className="map-frame">
            <iframe
              title="PKV Gold location"
              src={buildMapEmbedUrl()}
              loading="lazy"
            />
            <MediaPlaceholder
              label="MAP"
              caption="PKV Gold location / map fallback"
              aspectRatio="4 / 3"
              visualType="map"
            />
          </div>
        </section>
        <section className="section faq-section" id="faq">
          <Intro
            eyebrow="FAQ"
            title={
              <>
                Good to
                <br />
                <em>know.</em>
              </>
            }
          />
          <div className="faq-list">
            {faqs.map(([q, a], i) => (
              <div className="faq-item" key={q}>
                <button
                  type="button"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  <span>{q}</span>
                  <b>{openFaq === i ? "−" : "+"}</b>
                </button>
                {openFaq === i && <p>{a}</p>}
              </div>
            ))}
          </div>
        </section>
        <section className="final-cta final-cta-visual">
          <div className="final-cta-copy">
            <p className="eyebrow">READY WHEN YOU ARE</p>
            <h2>
              See the value
              <br />
              <em>in what you own.</em>
            </h2>
            <p>
              Start with a clear estimate, understand what shapes the value,
              then speak with PKV Gold when you are ready for a physical assessment.
            </p>
            <div className="final-cta-trust" aria-label="PKV Gold trust points">
              <span>
                <b>TRUSTED GOLD VALUATION</b>
                <small>Clear process</small>
              </span>
              <span>
                <b>LOCAL SERVICE</b>
                <small>Personal attention</small>
              </span>
            </div>
            <Button href="#value" tone="gold">
              Calculate your value
            </Button>
          </div>
          <div className="final-cta-visual-frame">
            <Image
              src="/images/owner%20hero.png"
              alt="PKV Gold owner"
              fill
              sizes="(max-width: 767px) 100vw, 52vw"
            />
          </div>
        </section>
      </main>
      <footer className="footer">
        <a className="wordmark" href="#top">
          PKV <i>GOLD</i>
          <small>GOLD BUYING · VALUATION</small>
        </a>
        <nav>
          <a href="#value">Know your value</a>
          <a href="#reviews">Google reviews</a>
          <a href="#why-pkv">Why PKV Gold</a>
          <a href="#location">Location</a>
          <a href="#contact">Contact</a>
        </nav>
        <div>
          <a href={`tel:${contact.phone}`}>{contact.displayPhone}</a>
          <a
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp PKV Gold
          </a>
          <span>{contact.address}</span>
        </div>
        <small>© 2026 PKV Gold</small>
      </footer>
      <Floating />
    </div>
  );
}
