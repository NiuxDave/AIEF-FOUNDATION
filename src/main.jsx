import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  CircleArrowOutUpRight,
  Cpu,
  GraduationCap,
  Handshake,
  Lightbulb,
  Mail,
  Menu,
  Mic,
  Moon,
  Network,
  Sparkles,
  Sun,
  Target,
  Users,
  X,
} from "lucide-react";
import "./styles/site.css";

const A = "/assets/";

const contactActionPattern = /(partner|volunteer|register interest|join the programme|join the program|join the movement|start a conversation|send a message|book a session|book a consultation|invite adebola|sponsor)/i;

function resolveActionRoute(label, fallback = "contact") {
  return contactActionPattern.test(label || "") ? "contact" : fallback;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const softScale = {
  rest: { y: 0, scale: 1 },
  hover: { y: -5, scale: 1.01, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } },
  tap: { y: 0, scale: 0.985 },
};

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "founder", label: "Founder" },
  {
    id: "initiatives",
    label: "Initiatives",
    children: [
      { id: "conference", label: "AI in Action Conference" },
      { id: "mentorship", label: "Mentorship Programme" },
      { id: "speaking", label: "Leadership and Advisory" },
    ],
  },
  { id: "conference", label: "Conference" },
  { id: "gallery", label: "Gallery" },
  { id: "mentorship", label: "Mentorship" },
  { id: "get-involved", label: "Get Involved" },
  { id: "contact", label: "Contact" },
];

const pageCopy = {
  home: {
    eyebrow: "Adebola Ibiyode Empowerment Foundation",
    title: "AI for real impact, not just hype",
    body: "We help people understand AI, use it with confidence, and turn knowledge into opportunity, leadership, and practical innovation.",
    primary: "Explore Initiatives",
    secondary: "Join the Movement",
  },
  about: {
    eyebrow: "About the Foundation",
    title: "Building the future through AI empowerment",
    body: "AIEF exists to make artificial intelligence accessible, practical, and useful for people who want to create real social and economic value.",
    primary: "Explore Our Work",
    secondary: "Get Involved",
  },
  founder: {
    eyebrow: "Founder and AI Builder",
    title: "Built on real AI experience",
    body: "Adebola Ibiyode is an AI expert, engineer, founder, speaker, and product builder with more than 20 years of experience building technology solutions.",
    primary: "Invite Adebola to Speak",
    secondary: "Explore the Foundation",
  },
  initiatives: {
    eyebrow: "Our Initiatives",
    title: "Turning AI into action",
    body: "AIEF initiatives are designed to help people learn, connect, build, and lead with artificial intelligence in practical ways.",
    primary: "Explore Programmes",
    secondary: "Partner With Us",
  },
  conference: {
    eyebrow: "Flagship Conference",
    title: "AI in Action Now",
    body: "A practical conference where AI moves from theory to execution, from conversation to use, and from hype to real impact.",
    primary: "Register Interest",
    secondary: "Partner With Us",
  },
  gallery: {
    eyebrow: "Conference Gallery",
    title: "AI in Action Now in pictures",
    body: "Explore moments from the conference, founder highlights, panel conversations, community learning, and the people turning AI knowledge into action.",
    primary: "View Gallery",
    secondary: "Explore Conference",
  },
  mentorship: {
    eyebrow: "Mentorship Programme",
    title: "From learning AI to using AI",
    body: "We guide people who want to understand AI, build confidence, and apply what they learn in careers, products, businesses, and leadership.",
    primary: "Join the Programme",
    secondary: "Register Interest",
  },
  speaking: {
    eyebrow: "Leadership, Speaking and Advisory",
    title: "AI leadership that delivers",
    body: "We help organisations, leaders, and communities understand AI clearly and use it in ways that create practical value.",
    primary: "Book a Session",
    secondary: "Start a Conversation",
  },
  "get-involved": {
    eyebrow: "Get Involved",
    title: "Be part of the movement",
    body: "AIEF is building a practical AI ecosystem. You can support the mission by partnering, sponsoring, volunteering, joining the community, or helping us reach more people.",
    primary: "Partner With Us",
    secondary: "Volunteer",
  },
  contact: {
    eyebrow: "Contact Us",
    title: "Start a conversation with AIEF",
    body: "Have a question, partnership idea, speaking request, sponsorship inquiry, or programme interest? Send us a message and the team will respond.",
    primary: "Send a Message",
    secondary: "Follow Us Online",
  },
};

const initiatives = [
  {
    title: "AI in Action Now",
    text: "Our flagship conference and platform for practical AI learning, real use cases, expert conversations, and valuable networking.",
    icon: CalendarDays,
    action: "Explore AI in Action Now",
    route: "conference",
  },
  {
    title: "Mentorship Programme",
    text: "Guidance for learners, career switchers, professionals, and builders who want to move from interest to action.",
    icon: Users,
    action: "Join the Mentorship Programme",
    route: "mentorship",
  },
  {
    title: "Leadership and Advisory",
    text: "Workshops, speaking, AI readiness conversations, and strategic direction for organisations and leaders.",
    icon: Building2,
    action: "Book a Consultation",
    route: "speaking",
  },
];

const focusCards = [
  ["Education", "Making AI knowledge simple, structured, and practical for different levels of learners.", BookOpen],
  ["Access", "Creating opportunities for people who may not normally have access to AI tools, networks, and mentors.", Network],
  ["Leadership", "Equipping professionals, founders, and leaders to make better decisions in the AI era.", Target],
  ["Innovation", "Encouraging people to use AI to build useful products, improve services, and solve real problems.", Brain],
];

const gallery = [
  `${A}gallery-panel-1.jpg`,
  `${A}gallery-panel-2.jpg`,
  `${A}gallery-panel-3.jpg`,
  `${A}gallery-panel-4.jpg`,
  `${A}gallery-event-1.jpg`,
  `${A}gallery-event-2.jpg`,
  `${A}gallery-event-3.jpg`,
  `${A}event-panel.jpg`,
  `${A}event-speaker.jpg`,
  `${A}event-audience.jpg`,
  `${A}event-redcarpet.jpg`,
  `${A}event-registration.jpg`,
];

const founderImages = [
  `${A}founder-debola-hero.jpg`,
  `${A}founder-debola-1.jpg`,
  `${A}founder-debola-2.jpg`,
  `${A}founder-debola-3.jpg`,
  `${A}founder-debola-4.jpg`,
  `${A}founder-debola-5.jpg`,
  `${A}founder-debola-6.jpg`,
  `${A}founder-debola-7.jpg`,
];

const galleryGroups = [
  {
    id: "founder-highlights",
    title: "Founder Highlights",
    body: "Adebola Ibiyode leading, speaking, connecting, and representing the foundation's practical AI mission.",
    images: founderImages,
  },
  {
    id: "panel-sessions",
    title: "Panel Sessions",
    body: "Thoughtful conversations with builders, leaders, founders, professionals, and AI practitioners.",
    images: [`${A}gallery-panel-1.jpg`, `${A}gallery-panel-2.jpg`, `${A}gallery-panel-3.jpg`, `${A}gallery-panel-4.jpg`, `${A}event-panel.jpg`],
  },
  {
    id: "event-highlights",
    title: "Event Highlights",
    body: "Audience moments, community interaction, conference learning, networking, and real people in the room.",
    images: [`${A}gallery-event-1.jpg`, `${A}gallery-event-2.jpg`, `${A}gallery-event-3.jpg`, `${A}event-audience.jpg`, `${A}event-redcarpet.jpg`, `${A}event-registration.jpg`],
  },
  {
    id: "girls-mentorship",
    title: "Girls Mentorship",
    body: "Mentorship moments helping young learners discover AI, technology, confidence, and practical digital skills.",
    images: [`${A}girls-mentorship-1.jpeg`, `${A}girls-mentorship-2.jpeg`, `${A}girls-mentorship-3.jpeg`],
  },
];

function routeFromHash() {
  const route = window.location.hash.replace("#", "");
  return pageCopy[route] ? route : "home";
}

function App() {
  const [route, setRoute] = useState(routeFromHash);
  const [theme, setTheme] = useState(() => localStorage.getItem("aief-theme") || "light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  useEffect(() => {
    const onHash = () => setRoute(routeFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("aief-theme", theme);
  }, [theme]);

  const page = useMemo(() => pageCopy[route] || pageCopy.home, [route]);

  const navigate = (id) => {
    window.location.hash = id;
    setMenuOpen(false);
    setDropOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header
        route={route}
        theme={theme}
        onTheme={() => setTheme(theme === "light" ? "dark" : "light")}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        dropOpen={dropOpen}
        setDropOpen={setDropOpen}
        navigate={navigate}
      />
      <main>
        {route === "home" && <Home page={page} navigate={navigate} />}
        {route === "about" && <About page={page} navigate={navigate} />}
        {route === "founder" && <Founder page={page} navigate={navigate} />}
        {route === "initiatives" && <Initiatives page={page} navigate={navigate} />}
        {route === "conference" && <Conference page={page} navigate={navigate} />}
        {route === "gallery" && <Gallery page={page} navigate={navigate} />}
        {route === "mentorship" && <Mentorship page={page} navigate={navigate} />}
        {route === "speaking" && <Speaking page={page} navigate={navigate} />}
        {route === "get-involved" && <GetInvolved page={page} navigate={navigate} />}
        {route === "contact" && <Contact page={page} />}
      </main>
      <Footer navigate={navigate} />
    </>
  );
}

function Header({ route, theme, onTheme, menuOpen, setMenuOpen, dropOpen, setDropOpen, navigate }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="AIEF Home">
        <img src={`${A}aief-logo-blue.svg`} alt="" />
        <span>AIEF</span>
      </a>
      <nav className={menuOpen ? "nav open" : "nav"} aria-label="Primary navigation">
        {navItems.map((item) =>
          item.children ? (
            <div className="nav-dropdown" key={item.id}>
              <button
                className={`nav-link ${route === item.id ? "active" : ""}`}
                onClick={() => setDropOpen(!dropOpen)}
                type="button"
              >
                {item.label} <ChevronDown size={14} />
              </button>
              <div className={dropOpen ? "dropdown-panel show" : "dropdown-panel"}>
                {item.children.map((child) => (
                  <button type="button" key={child.id} onClick={() => navigate(child.id)}>
                    {child.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              type="button"
              key={item.id}
              className={`nav-link ${route === item.id ? "active" : ""}`}
              onClick={() => navigate(item.id)}
            >
              {item.label}
            </button>
          )
        )}
      </nav>
      <div className="header-actions">
        <button className="icon-button" type="button" onClick={onTheme} aria-label="Toggle light and dark theme">
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <button className="hamburger" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

function Hero({ page, image = `${A}event-panel.jpg`, compact = false, primaryRoute = "initiatives", secondaryRoute = "get-involved", className = "" }) {
  const primaryTarget = resolveActionRoute(page.primary, primaryRoute);
  const secondaryTarget = resolveActionRoute(page.secondary, secondaryRoute);

  return (
    <section className={`${compact ? "hero compact section-shell" : "hero section-shell"} ${className}`}>
      <motion.div className="hero-copy" initial="hidden" animate="show" variants={fadeUp}>
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p className="hero-body">{page.body}</p>
        <div className="button-row">
          <a className="btn primary" href={`#${primaryTarget}`}>
            {page.primary} <ArrowRight size={16} />
          </a>
          <a className="btn secondary" href={`#${secondaryTarget}`}>
            {page.secondary}
          </a>
        </div>
      </motion.div>
      <motion.div className="hero-art" initial={{ opacity: 0, y: 28, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>
        <div className="orb-card">
          <img src={image} alt="" />
          <div className="hero-stat">
            <strong>100+</strong>
            <span>people engaged</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function PatternBand({ dark = false }) {
  return <div className={dark ? "pattern-band dark" : "pattern-band"} aria-hidden="true" />;
}

function SectionIntro({ kicker, title, body, align = "center" }) {
  return (
    <motion.div className={`section-intro ${align}`} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
      {kicker && <p className="eyebrow">{kicker}</p>}
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </motion.div>
  );
}

function FeatureCard({ title, text, icon: Icon = Sparkles, action, route, navigate, className = "" }) {
  const targetRoute = resolveActionRoute(action || title, route);

  return (
    <motion.article
      className={`feature-card ${className}`}
      initial="hidden"
      whileInView="show"
      whileHover="hover"
      whileTap="tap"
      viewport={{ once: true, amount: 0.25 }}
      variants={{ ...fadeUp, ...softScale }}
    >
      <div className="icon-disc"><Icon size={20} /></div>
      <h3>{title}</h3>
      <p>{text}</p>
      {action && (
        <button type="button" className="text-link" onClick={() => navigate(targetRoute)}>
          {action} <CircleArrowOutUpRight size={15} />
        </button>
      )}
      <PatternBand />
    </motion.article>
  );
}

function Home({ page, navigate }) {
  return (
    <>
      <Hero page={page} image={`${A}home-hero-symbol.png`} className="home-hero symbol-hero" />
      <section className="split section-shell">
        <div>
          <SectionIntro
            align="left"
            title="AI is changing how the world works"
            body="But too many people are still stuck at the level of buzzwords, fear, and confusion. AIEF exists to close that gap."
          />
          <button className="btn primary" onClick={() => navigate("initiatives")}>See What We Do</button>
        </div>
        <div className="impact-panel">
          <div className="impact-tab">Our Impact</div>
          {[
            ["1+", "Flagship conference delivered", "Our conferences bring together AI experts, students, and professionals to share knowledge, network, and showcase innovation."],
            ["100+", "Participants engaged", "Hundreds of attendees actively engage in workshops, discussions, and practical training sessions."],
            ["98%", "Practical AI clarity", "Growing clarity across builders, founders, and professionals who want to use AI in real life."],
          ].map(([number, label, text]) => (
            <div className="impact-row" key={label}>
              <div>
                <h3>{label}</h3>
                <p>{text}</p>
              </div>
              <strong>{number}</strong>
            </div>
          ))}
        </div>
      </section>
      <section className="section-shell">
        <SectionIntro
          title="We bridge the gap between AI knowledge and real world application"
          body="Through education, platforms, mentorship, and practical events, we create spaces where learning becomes action."
        />
        <div className="cards three">
          <FeatureCard title="Practical AI Education" text="Learn AI in a way you can understand and use in everyday work, business, leadership, and problem solving." icon={BookOpen} />
          <FeatureCard title="Builders and Leaders" text="Connect with people turning AI ideas into action, products, services, and stronger decisions." icon={Users} />
          <FeatureCard title="Collaboration" text="Find partners, mentors, sponsors, and opportunities to turn AI knowledge into growth." icon={Handshake} />
        </div>
      </section>
      <FounderStrip navigate={navigate} />
      <ConferencePreview navigate={navigate} />
      <CTABlock title="Be part of an AI movement that builds" body="Whether you are a learner, founder, professional, sponsor, volunteer, or organisation, there is a place for you in this work." />
    </>
  );
}

function About({ page, navigate }) {
  return (
    <>
      <Hero page={page} image={`${A}event-audience.jpg`} compact />
      <PatternBand />
      <section className="section-shell">
        <SectionIntro title="AI should create opportunity, not confusion" body="AIEF was created to make AI easier to access and easier to apply. People should not be left behind because they do not know where to start." />
        <div className="cards two">
          <FeatureCard title="Mission" text="To empower people with practical AI knowledge that drives real-world economic impact." icon={Target} />
          <FeatureCard title="Vision" text="A world where AI is understood and useful for careers, businesses, better systems, and meaningful impact." icon={Sparkles} />
        </div>
      </section>
      <section className="section-shell tinted">
        <SectionIntro title="From awareness to application" body="We do not stop at inspiration. Our programmes help people move from knowing AI exists to using it with purpose." />
        <div className="process-row modern-steps">
          {[
            ["Learn", "Understand AI clearly without fear or buzzwords."],
            ["Apply", "Use tools and methods in real work and study contexts."],
            ["Build", "Turn practical knowledge into projects, products, and systems."],
            ["Lead", "Make better decisions and guide others with confidence."],
          ].map(([step, text], i) => <div className="step" key={step}><span>{`0${i + 1}`}</span><strong>{step}</strong><p>{text}</p></div>)}
        </div>
      </section>
      <section className="section-shell">
        <div className="cards four">
          {focusCards.map(([title, text, Icon]) => <FeatureCard key={title} title={title} text={text} icon={Icon} />)}
        </div>
      </section>
      <CTABlock title="This is not just a foundation. It is a platform for empowerment." body="AIEF is building a community where people learn, connect, and turn AI into meaningful action." />
    </>
  );
}

function Founder({ page, navigate }) {
  return (
    <>
      <Hero page={page} image={`${A}founder-debola-hero.jpg`} compact />
      <section className="split section-shell">
        <div className="portrait-frame"><img src={`${A}founder-debola-hero.jpg`} alt="Adebola Ibiyode" /></div>
        <div>
          <SectionIntro align="left" title="A builder first. A leader by practice." body="Adebola's work is shaped by years of building systems, leading teams, and applying technology to real problems. AIEF is guided by lived experience in technology and innovation." />
          <div className="cards two mini">
            <FeatureCard title="Founder of CarbonAI" text="An AI driven platform focused on carbon intelligence, sustainability, and better decision making." icon={Brain} />
            <FeatureCard title="Speaker and Advisor" text="Guiding leaders, organisations, and communities on practical AI adoption." icon={Mic} />
          </div>
        </div>
      </section>
      <section className="section-shell tinted founder-statement">
        <SectionIntro title="AI must move beyond hype and deliver real value" body="For Adebola, AI is powerful when it helps people work better, think smarter, solve problems faster, and build stronger systems." />
      </section>
      <section className="section-shell">
        <SectionIntro title="Founder highlights" body="Moments from the AI in Action Now platform, showing the founder's role across leadership, convening, and practical AI conversations." />
        <div className="founder-photo-grid">
          {founderImages.slice(0, 6).map((image, index) => (
            <button className="photo-tile" key={image} type="button" onClick={() => navigate("gallery")}>
              <img src={image} alt={`Adebola Ibiyode highlight ${index + 1}`} />
            </button>
          ))}
        </div>
      </section>
      <CTABlock title="Work with a leader who understands AI from the inside" body="Adebola is available for selected speaking, advisory, leadership, and partnership opportunities aligned with the foundation's mission." />
    </>
  );
}

function Initiatives({ page, navigate }) {
  return (
    <>
      <Hero page={page} image={`${A}event-panel.jpg`} compact />
      <section className="section-shell">
        <SectionIntro title="We focus on practical impact" body="Our initiatives are built to make AI useful. Each programme helps a different group of people understand, apply, or lead with AI." />
        <div className="cards three">
          {initiatives.map((item) => <FeatureCard key={item.title} {...item} navigate={navigate} />)}
        </div>
      </section>
      <section className="section-shell banded">
        <SectionIntro title="More initiatives will grow from the same mission" body="AI bootcamps, school outreach, women in AI programmes, founder labs, community innovation challenges, and research gatherings can all grow from the same mission: real value." />
      </section>
    </>
  );
}

function Conference({ page, navigate }) {
  const [active, setActive] = useState(0);
  const tracks = [
    ["AI for Business", "Practical use cases, workflows, and decision tools for teams and organisations.", Building2],
    ["AI for Builders", "Technical ideas, product thinking, and applied AI execution for people creating things.", Cpu],
    ["AI for Careers", "Clear direction for learners and professionals turning AI knowledge into opportunity.", GraduationCap],
    ["AI for Society", "Responsible, accessible AI conversations rooted in community and real-world impact.", Users],
    ["AI Leadership", "Strategic thinking for leaders who need clarity, governance, and confident adoption.", Lightbulb],
  ];
  return (
    <>
      <Hero page={page} image={gallery[active]} compact primaryRoute="contact" secondaryRoute="contact" />
      <section className="section-shell">
        <SectionIntro title="Built for people who want to use AI, not just hear about it" body="AI in Action Now brings together builders, professionals, founders, students, leaders, and organisations to explore the practical side of artificial intelligence." />
        <div className="carousel">
          <button aria-label="Previous image" onClick={() => setActive((active + gallery.length - 1) % gallery.length)}>{"<"}</button>
          <img src={gallery[active]} alt="AI in Action Now conference moment" />
          <button aria-label="Next image" onClick={() => setActive((active + 1) % gallery.length)}>{">"}</button>
        </div>
      </section>
      <section className="section-shell">
        <SectionIntro title="Less noise. More execution." body="Every session helps attendees understand what AI can do, how it is being used, and how they can begin applying it in their own context." />
        <div className="cards four">
          {tracks.map(([track, text, Icon]) => <FeatureCard key={track} title={track} text={text} icon={Icon} />)}
        </div>
      </section>
      <SponsorStrip />
      <section className="section-shell">
        <SectionIntro title="See the conference in pictures" body="Browse the full AI in Action Now gallery across founder highlights, panel sessions, and event moments." />
        <div className="button-row center">
          <button className="btn secondary" type="button" onClick={() => navigate("gallery")}>Open Gallery <ArrowRight size={16} /></button>
        </div>
      </section>
      <CTABlock title="Ready to be part of the next edition?" body="Register your interest, partner with the event, or contact the team to explore how you can contribute." />
    </>
  );
}

function Gallery({ page, navigate }) {
  const [activeGroup, setActiveGroup] = useState(galleryGroups[0].id);
  const [selected, setSelected] = useState(galleryGroups[0].images[0]);
  const group = galleryGroups.find((item) => item.id === activeGroup) || galleryGroups[0];

  const chooseGroup = (id) => {
    const next = galleryGroups.find((item) => item.id === id) || galleryGroups[0];
    setActiveGroup(next.id);
    setSelected(next.images[0]);
  };

  return (
    <>
      <Hero page={page} image={selected} compact primaryRoute="gallery" secondaryRoute="conference" />
      <section className="section-shell gallery-section">
        <SectionIntro
          title="Conference moments, grouped for easy browsing"
          body="Use the sections below to move between founder highlights, panel sessions, and wider event moments from AI in Action Now."
        />
        <div className="gallery-tabs" role="tablist" aria-label="Gallery sections">
          {galleryGroups.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === activeGroup ? "active" : ""}
              onClick={() => chooseGroup(item.id)}
              role="tab"
              aria-selected={item.id === activeGroup}
            >
              {item.title}
            </button>
          ))}
        </div>
        <div className="gallery-feature">
          <div className="gallery-feature-image">
            <img src={selected} alt={`${group.title} selected moment`} />
          </div>
          <div className="gallery-feature-copy">
            <p className="eyebrow">{group.images.length} images</p>
            <h2>{group.title}</h2>
            <p>{group.body}</p>
            <div className="button-row">
              <button className="btn primary" type="button" onClick={() => navigate("conference")}>Explore Conference</button>
              <button className="btn secondary" type="button" onClick={() => navigate("contact")}>Request Media</button>
            </div>
          </div>
        </div>
        <div className="gallery-grid" aria-label={`${group.title} gallery`}>
          {group.images.map((image, index) => (
            <button
              className={image === selected ? "gallery-card active" : "gallery-card"}
              key={image}
              type="button"
              onClick={() => setSelected(image)}
            >
              <img src={image} alt={`${group.title} image ${index + 1}`} />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </section>
      <CTABlock title="Bring these moments into the next edition" body="Partner, sponsor, speak, volunteer, or help us expand practical AI learning through the next AI in Action Now experience." />
    </>
  );
}

function Mentorship({ page }) {
  return (
    <>
      <Hero page={page} image={`${A}event-speaker.jpg`} compact primaryRoute="contact" secondaryRoute="contact" />
      <section className="section-shell">
        <SectionIntro title="Clear guidance. Practical learning. Real direction." body="This mentorship is about helping learners build strong foundations, understand the AI landscape, and know how to move from interest to action." />
        <div className="cards three">
          {["AI basics and confidence", "Career transition into AI", "Product thinking", "Real world use cases", "Guidance from builders"].map((title) => (
            <FeatureCard key={title} title={title} text="Participants learn with simple structure, practical examples, and support that connects learning to real outcomes." icon={Check} />
          ))}
        </div>
      </section>
      <section className="section-shell tinted">
        <SectionIntro title="Suggested programme structure" />
        <div className="timeline programme-steps">
          {[
            ["Register interest", "Share your goals and current AI learning stage."],
            ["Join orientation", "Understand the track, expectations, and practical outcomes."],
            ["Learn with guidance", "Follow structured sessions, tools, and mentor direction."],
            ["Apply the learning", "Use AI in a real career, product, business, or leadership context."],
            ["Build next steps", "Leave with direction, confidence, and a practical roadmap."],
          ].map(([step, text], i) => <div key={step}><span>{String(i + 1).padStart(2, "0")}</span><strong>{step}</strong><p>{text}</p></div>)}
        </div>
      </section>
    </>
  );
}

function Speaking({ page }) {
  return (
    <>
      <Hero page={page} image={`${A}event-redcarpet.jpg`} compact primaryRoute="contact" secondaryRoute="contact" />
      <section className="section-shell">
        <SectionIntro title="AI adoption needs more than excitement" body="AIEF helps leaders move with clarity, responsibility, and practical direction through talks, workshops, and advisory support." />
        <div className="cards three">
          <FeatureCard title="Speaking Engagements" text="Clear talks for conferences, leadership retreats, universities, innovation events, and professional communities." icon={Mic} />
          <FeatureCard title="Workshops" text="Practical sessions that help teams understand tools, identify use cases, and create an adoption roadmap." icon={Users} />
          <FeatureCard title="Advisory" text="Guidance for decision makers thinking through AI opportunities, risks, and implementation steps." icon={Building2} />
        </div>
      </section>
      <CTABlock title="Bring practical AI leadership to your organisation" body="Invite AIEF for a talk, workshop, advisory session, or leadership conversation built around your audience and goals." />
    </>
  );
}

function GetInvolved({ page, navigate }) {
  return (
    <>
      <Hero page={page} image={`${A}event-registration.jpg`} compact primaryRoute="contact" secondaryRoute="contact" />
      <section className="section-shell">
        <SectionIntro title="AI empowerment needs people who care about impact" body="The future of AI should be shaped by people, communities, educators, founders, funders, leaders, and organisations who want knowledge to become opportunity." />
        <div className="cards four">
          {[
            ["Partner With Us", "Expand access, create stronger programmes, and reach new communities.", "contact", "Start Partnership Form"],
            ["Sponsor Initiatives", "Support events, mentorship, scholarships, learning resources, and outreach.", "contact", "Discuss Sponsorship"],
            ["Volunteer", "Use your time and skills to help others grow.", "contact", "Fill Volunteer Form"],
            ["Join the Community", "Stay close to updates, learning resources, and opportunities.", "contact", "Join Through Contact"],
          ].map(([title, text, route, action]) => <FeatureCard key={title} title={title} text={text} icon={Handshake} route={route} action={action} navigate={navigate} />)}
        </div>
      </section>
    </>
  );
}

function Contact({ page }) {
  const [sent, setSent] = useState(false);
  return (
    <>
      <Hero page={page} image={`${A}event-panel.jpg`} compact primaryRoute="contact" secondaryRoute="contact" />
      <section className="split section-shell contact-section">
        <div>
          <SectionIntro align="left" title="Choose the best way to reach us" body="Use the form for partnership requests, speaking invitations, mentorship questions, sponsorship inquiries, media requests, and general messages." />
          <div className="contact-options">
            {["General inquiries", "Partnership and sponsorship", "Speaking and advisory", "Mentorship interest", "Media inquiries"].map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
        <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <h2>Send a Message</h2>
          <label>Full name<input required name="name" placeholder="Your full name" /></label>
          <label>Email address<input required type="email" name="email" placeholder="name@email.com" /></label>
          <label>Organisation<input name="organisation" placeholder="Organisation or company" /></label>
          <label>Inquiry type<select name="type"><option>General inquiry</option><option>Partnership</option><option>Sponsorship</option><option>Mentorship</option><option>Speaking</option><option>Media</option><option>Volunteer</option></select></label>
          <label>Message<textarea required name="message" placeholder="Tell us what you would like to build, ask, sponsor, or explore." /></label>
          <button className="btn primary" type="submit">Submit Inquiry <ArrowRight size={16} /></button>
          {sent && (
            <div className="success" role="status" aria-live="polite">
              <Check size={18} />
              <span>Thank you for reaching out. Your message has been received.</span>
            </div>
          )}
        </form>
      </section>
    </>
  );
}

function FounderStrip({ navigate }) {
  return (
    <section className="split section-shell founder-strip">
      <div className="portrait-frame"><img src={`${A}founder-debola-hero.jpg`} alt="Adebola Ibiyode" /></div>
      <div>
        <p className="eyebrow">Founder led. Experience driven.</p>
        <h2>Meet Adebola Ibiyode</h2>
        <p>Adebola Ibiyode is an AI expert, engineer, founder, speaker, and product builder. Her work is rooted in one clear belief: AI must create real value for people and organisations.</p>
        <button className="btn secondary" type="button" onClick={() => navigate("founder")}>Read Founder Story</button>
      </div>
    </section>
  );
}

function ConferencePreview({ navigate }) {
  return (
    <section className="section-shell conference-preview">
      <div className="image-rail">
        <img src={`${A}event-panel.jpg`} alt="Panel at AI in Action Now" />
        <img src={`${A}event-speaker.jpg`} alt="Speaker at AI in Action Now" />
      </div>
      <SectionIntro
        title="AI in Action Now Conference"
        body="The foundation's flagship platform for practical AI learning, conversation, and execution. Built for people who want to create, not just observe."
      />
      <div className="button-row center">
        <button className="btn primary" type="button" onClick={() => navigate("conference")}>Explore Conference</button>
        <button className="btn secondary" type="button" onClick={() => navigate("contact")}>Partner With Us</button>
      </div>
    </section>
  );
}

function SponsorStrip() {
  const sponsors = ["sponsor-boi.png", "sponsor-digitalrealty.png", "sponsor-womeninaction.png", "sponsor-zone4.png"];
  return (
    <section className="section-shell sponsor-strip">
      <SectionIntro title="Supported by a growing ecosystem" body="Partners and sponsors help expand access, strengthen the experience, and support practical AI education." />
      <div className="sponsor-row">
        {sponsors.map((s) => <img key={s} src={`${A}${s}`} alt="AIEF sponsor logo" />)}
      </div>
      <div className="sponsor-board">
        <img src={`${A}more-sponsors.jpeg`} alt="AI in Action Now partners and sponsors" />
      </div>
    </section>
  );
}

function CTABlock({ title, body }) {
  return (
    <motion.section className="cta-block" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}>
      <PatternBand dark />
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
        <a className="btn primary light" href="#contact">Start a Conversation <ArrowRight size={16} /></a>
      </div>
    </motion.section>
  );
}

function Footer({ navigate }) {
  const groups = {
    Foundation: ["About", "Founder", "Initiatives", "Gallery", "Contact"],
    Programmes: ["Conference", "Mentorship", "Speaking", "Get Involved"],
    "Get Involved": ["Partner", "Sponsor", "Volunteer", "Join Community"],
  };
  const mapRoute = (label) => label.toLowerCase().replaceAll(" ", "-").replace("partner", "contact").replace("sponsor", "contact").replace("volunteer", "contact").replace("join-community", "contact");
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img src={`${A}aief-logo-blue.svg`} alt="" />
          <p>Adebola Ibiyode Empowerment Foundation exists to make artificial intelligence practical, accessible, and impactful.</p>
        </div>
        {Object.entries(groups).map(([group, links]) => (
          <div className="footer-col" key={group}>
            <h3>{group}</h3>
            {links.map((link) => <button key={link} onClick={() => navigate(mapRoute(link))}>{link}</button>)}
          </div>
        ))}
        <div className="footer-col">
          <h3>Connect</h3>
          <a href="mailto:hello@aiefoundation.org"><Mail size={15} /> Email</a>
          <button onClick={() => navigate("contact")}>LinkedIn</button>
          <button onClick={() => navigate("contact")}>YouTube</button>
        </div>
      </div>
      <PatternBand dark />
      <p className="copyright">© 2026 Adebola Ibiyode Empowerment Foundation. Practical AI for builders, leaders, and communities.</p>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
