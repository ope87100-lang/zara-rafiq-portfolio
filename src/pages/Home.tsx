import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  GraduationCap,
  MapPin,
  Mail,
} from 'lucide-react';
import { PROFILE } from '../data/profile';
import { CORE_SKILLS, SKILLS_SECTION_META } from '../data/skills';
import { PORTFOLIO_META, PROJECTS } from '../data/projects';
import { EDUCATION_ENTRIES, EDUCATION_META, LANGUAGE_ENTRIES } from '../data/education';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  EDITORIAL_EASE,
  PageTransition,
  RevealSection,
} from '../components/ui/MotionPrimitives';
import {
  SkillIcon,
  SparkleAccent,
  StarburstAccent,
} from '../components/ui/GeometricAccents';
import {
  DownloadCvButton,
  PrimaryLinkButton,
  SecondaryLinkButton,
} from '../components/buttons/ActionButtons';
import { ProjectCard } from '../components/portfolio/ProjectCard';

export default function Home() {
  useDocumentMeta({
    title: 'Zara Rafiq | Digital Marketing & E-commerce Portfolio',
    description:
      'Explore Zara Rafiq’s professional portfolio featuring eBay listing preparation, product research, Canva design, social media content planning and digital marketing skills.',
    canonicalPath: '/',
  });

  const [activeSkillIndex, setActiveSkillIndex] = useState(0);
  const activeSkill = CORE_SKILLS[activeSkillIndex];

  return (
    <PageTransition>
      {/* 1. CURVED WHITE HERO SECTION MATCHING APPROVED REFERENCE */}
      <section
        aria-labelledby="hero-heading"
        className="bg-[#FCFDFF] text-[#111111] rounded-b-[40px] sm:rounded-b-[56px] lg:rounded-b-[88px] px-5 sm:px-8 lg:px-12 pt-4 sm:pt-6 pb-10 lg:pb-0 overflow-hidden"
      >
        <div className="max-w-[1280px] mx-auto relative">
          {/* Top-left 8-petal yellow starburst accent */}
          <div className="hidden sm:block absolute left-0 top-1 pointer-events-none">
            <StarburstAccent className="w-11 h-11 lg:w-12 lg:h-12 xl:w-14 xl:h-14" />
          </div>

          {/* Center Eyebrow & 2-Line Display Headline */}
          <div className="text-center max-w-4xl mx-auto pt-1">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05, ease: EDITORIAL_EASE }}
              className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#4B4B4E] mb-2"
            >
              {PROFILE.eyebrow}
            </motion.p>

            <h1 id="hero-heading" className="hero-headline font-display font-extrabold text-[#111111]">
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EDITORIAL_EASE }}
                className="block"
              >
                {PROFILE.heroHeadlineLine1}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.09, ease: EDITORIAL_EASE }}
                className="block text-[#424D2B]"
              >
                {PROFILE.heroHeadlineLine2}
              </motion.span>
            </h1>
          </div>

          {/* 3-Column Hero Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-8 lg:gap-6 mt-5 lg:mt-6">
            {/* Left Column (comes first below headline on mobile per Section 13): Intro Paragraph & Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18, ease: EDITORIAL_EASE }}
              className="lg:col-span-3 lg:pb-10 xl:pb-14 text-center lg:text-left order-1"
            >
              <p className="text-[15px] sm:text-base leading-relaxed text-[#4B4B4E] max-w-md mx-auto lg:mx-0">
                {PROFILE.heroIntro}
              </p>

              {/* Mobile-aligned full-width dual buttons & desktop outline CV button */}
              <div className="mt-5 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-start justify-center gap-3">
                <Link
                  to="/portfolio"
                  className="lg:hidden inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[#424D2B] hover:bg-[#303B1E] text-white font-semibold text-sm transition-colors"
                >
                  <span>View My Portfolio</span>
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                </Link>
                <DownloadCvButton variant="outline-light" className="w-full sm:w-auto" />
              </div>
            </motion.div>

            {/* Center Column: Organic Arch + Original Portrait + Dual-Pill Floating Dock */}
            <motion.div
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.14, ease: EDITORIAL_EASE }}
              className="lg:col-span-6 order-2 flex flex-col items-center justify-end relative"
            >
              <div className="relative w-full max-w-[330px] sm:max-w-[370px] lg:max-w-[345px] xl:max-w-[400px] aspect-[4/3.85] rounded-t-full bg-[#E1E3E0] overflow-hidden shadow-sm">
                <picture>
                  <source srcSet={PROFILE.portraitWebp} type="image/webp" />
                  <img
                    src={PROFILE.portraitSrc}
                    alt={PROFILE.portraitAlt}
                    width={1024}
                    height={682}
                    fetchPriority="high"
                    className="w-full h-full object-cover object-[56%_14%]"
                  />
                </picture>
              </div>

              {/* Dual-Pill Floating Dock positioned cleanly below portrait base (never obscures face) */}
              <div className="hidden lg:flex relative -mt-7 mb-6 xl:mb-8 z-20 bg-[#141414]/92 backdrop-blur-md border border-white/25 rounded-full p-1.5 items-center gap-1.5 shadow-xl">
                <Link
                  to="/portfolio"
                  className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-full bg-[#F7D928] hover:bg-[#e5c617] text-[#111111] font-semibold text-sm transition-all duration-200 whitespace-nowrap"
                >
                  View My Portfolio
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-full text-white hover:bg-white/10 font-medium text-sm transition-all duration-200 whitespace-nowrap"
                >
                  Contact Me
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Compact Expertise & Location Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.24, ease: EDITORIAL_EASE }}
              className="lg:col-span-3 lg:pb-10 xl:pb-14 order-3 flex flex-col items-center lg:items-end text-center lg:text-right"
            >
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#424D2B] mb-2">
                <MapPin className="w-3.5 h-3.5" strokeWidth={1.85} aria-hidden="true" />
                <span>{PROFILE.location}</span>
              </div>
              <p className="text-xs font-medium text-[#4B4B4E] mb-3">
                Core Focus Areas
              </p>
              <ul className="flex flex-wrap justify-center lg:justify-end gap-1.5 max-w-[260px]">
                {PROFILE.expertiseIndicators.map((item) => (
                  <li
                    key={item.label}
                    className="px-3 py-1 rounded-full bg-[#F0EFEA] border border-[#DFDFD6] text-[12px] font-semibold text-[#111111]"
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. DARK SUMMARY PILL BAR (TRUTHFUL FOCUS AREAS — NO FAKE COUNTERS) */}
      <section aria-label="Core Focus Areas" className="bg-[#0A0A0A] px-4 sm:px-8 lg:px-12 pt-10 sm:pt-12 pb-6">
        <div className="max-w-[1040px] mx-auto">
          <RevealSection>
            <div className="bg-[#23241E]/95 border border-white/14 rounded-[28px] lg:rounded-full px-6 sm:px-10 py-6 grid grid-cols-2 lg:grid-cols-4 gap-5 text-center">
              {PROFILE.expertiseIndicators.map((item) => (
                <div key={item.label} className="space-y-1">
                  <p className="font-display font-bold text-base sm:text-lg text-white">
                    {item.label}
                  </p>
                  <p className="text-xs text-[#C6C6BE]">{item.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-center text-xs sm:text-sm text-[#B8B8B2]">
              {PROFILE.attributes.join(' · ')} — Practical experience in e-commerce listings &amp; digital content.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* 3. ABOUT ME ASYMMETRIC SECTION */}
      <section
        aria-labelledby="about-heading"
        className="bg-[#0A0A0A] px-5 sm:px-8 lg:px-12 py-12 md:py-16"
      >
        <div className="max-w-[1280px] mx-auto">
          <RevealSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Heading + Preview Card with Yellow Sparkle */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#F7D928] mb-2">
                    ABOUT ME
                  </p>
                  <h2 id="about-heading" className="section-h2 font-display font-extrabold text-white">
                    {PROFILE.aboutHeading}
                  </h2>
                </div>

                <div className="relative">
                  <SparkleAccent className="w-7 h-7 sm:w-8 sm:h-8 absolute -left-3 -top-3 z-10" />
                  <div className="rounded-[24px] overflow-hidden border border-white/14 bg-[#181816] aspect-[3/2] relative">
                    <img
                      src="/images/ebay-research-preview.webp"
                      alt="Illustrative preview of Zara Rafiq's self-directed product research and item specifics checklist"
                      width={960}
                      height={640}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/80 border border-white/15 text-[11px] font-semibold text-[#F7D928]">
                      Illustrative Preview — Listing Research
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Copy + Attributes + Second Card + Learn More */}
              <div className="lg:col-span-6 space-y-6 lg:pt-2">
                <div className="space-y-4 text-[15px] sm:text-base leading-[1.7] text-[#D4D4CE]">
                  {PROFILE.aboutParagraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {PROFILE.attributes.map((attr) => (
                    <div
                      key={attr}
                      className="px-3 py-2.5 rounded-xl bg-[#181816] border border-white/12 text-center text-xs font-semibold text-white"
                    >
                      {attr}
                    </div>
                  ))}
                </div>

                <div className="rounded-[24px] overflow-hidden border border-white/14 bg-[#181816] aspect-[16/10] relative">
                  <img
                    src="/images/canva-social-preview.webp"
                    alt="Illustrative preview of social media content grid and Canva visual layout planning"
                    width={960}
                    height={640}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/80 border border-white/15 text-[11px] font-semibold text-[#F7D928]">
                    Illustrative Preview — Canva &amp; Social Planning
                  </span>
                </div>

                <div>
                  <PrimaryLinkButton to="/about" showArrow>
                    Learn More
                  </PrimaryLinkButton>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* 4. SKILLS & CAPABILITIES ROUNDED DARK CONTAINER */}
      <section
        aria-labelledby="skills-heading"
        className="bg-[#0A0A0A] px-4 sm:px-8 lg:px-12 py-8 md:py-12"
      >
        <div className="max-w-[1280px] mx-auto">
          <RevealSection>
            <div className="relative bg-[#181816] border border-white/12 rounded-[28px] md:rounded-[38px] p-6 sm:p-8 lg:p-11 overflow-hidden ambient-gold-glow">
              {/* Top-right decorative starburst */}
              <div className="hidden md:block absolute -right-4 top-6 pointer-events-none opacity-95">
                <StarburstAccent className="w-16 h-16" />
              </div>

              <div className="mb-8 max-w-2xl">
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#F7D928] mb-2">
                  {SKILLS_SECTION_META.eyebrow}
                </p>
                <h2 id="skills-heading" className="section-h2 font-display font-extrabold text-white">
                  {SKILLS_SECTION_META.headingPrefix}{' '}
                  <span className="bg-[#F7D928] text-[#111111] px-3 py-0.5 rounded-lg inline-block">
                    {SKILLS_SECTION_META.headingHighlight}
                  </span>
                </h2>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#C6C6BE]">
                  {SKILLS_SECTION_META.description}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Left Column: 6 Numbered Interactive Skill Pills */}
                <div className="lg:col-span-5 flex flex-col gap-2.5">
                  {CORE_SKILLS.map((skill, idx) => {
                    const isSelected = idx === activeSkillIndex;
                    return (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => setActiveSkillIndex(idx)}
                        aria-pressed={isSelected}
                        className={`w-full min-h-[48px] px-4 py-2.5 rounded-full border text-left flex items-center gap-3 transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-[#0C0C0B] border-[#F7D928] text-white'
                            : 'bg-[#121210]/70 border-white/14 text-neutral-300 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[#F7D928] text-[#111111]'
                              : 'bg-white/10 text-[#F7D928]'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className="text-sm font-semibold truncate">{skill.title}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Center Column: Selected Skill Practical Detail Card */}
                <div className="lg:col-span-4 bg-[#111110] border border-white/12 rounded-[24px] p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-11 h-11 rounded-2xl bg-[#F7D928]/15 border border-[#F7D928]/35 text-[#F7D928] flex items-center justify-center mb-4">
                      <SkillIcon name={activeSkill.icon} className="w-5 h-5" />
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#F7D928] mb-1">
                      Skill {activeSkill.number}
                    </p>
                    <h3 className="card-h3 font-display font-bold text-white mb-2.5">
                      {activeSkill.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#C6C6BE] mb-4">
                      {activeSkill.summary}
                    </p>
                    <ul className="space-y-2">
                      {activeSkill.practicalFocus.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-xs sm:text-[13px] text-neutral-300">
                          <CheckCircle2
                            className="w-4 h-4 text-[#F7D928] shrink-0 mt-0.5"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/10">
                    <Link
                      to="/skills"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F7D928] hover:underline underline-offset-4"
                    >
                      <span>See full capability breakdown</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Two Stacked Square Action Cards matching reference */}
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  <Link
                    to="/skills"
                    className="group rounded-[22px] bg-[#393A2E] hover:bg-[#464739] border border-white/12 p-5 flex flex-col justify-between min-h-[140px] transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                      Capabilities
                    </span>
                    <div className="flex items-end justify-between gap-2 mt-4">
                      <span className="font-display font-bold text-lg text-white leading-snug">
                        Explore All Skills
                      </span>
                      <span className="w-9 h-9 rounded-full bg-white text-[#111111] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
                        <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>

                  <Link
                    to="/portfolio"
                    className="group rounded-[22px] bg-[#F7D928] hover:bg-[#e5c617] text-[#111111] p-5 flex flex-col justify-between min-h-[140px] transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider text-[#111111]/75">
                      Practical Work
                    </span>
                    <div className="flex items-end justify-between gap-2 mt-4">
                      <span className="font-display font-bold text-lg leading-snug">
                        View My Portfolio
                      </span>
                      <span className="w-9 h-9 rounded-full bg-[#111111] text-white flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
                        <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* 5. ATTRIBUTES SPARKLE DIVIDER */}
      <section aria-label="Professional Attributes" className="bg-[#0A0A0A] px-5 sm:px-8 lg:px-12 py-8 md:py-10">
        <div className="max-w-[1140px] mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-8 gap-y-3 pb-7 border-b border-white/20">
            {PROFILE.attributes.map((attr, idx) => (
              <div key={attr} className="flex items-center gap-5 sm:gap-8">
                <span className="font-display font-bold text-lg sm:text-2xl text-white tracking-tight">
                  {attr}
                </span>
                {idx < PROFILE.attributes.length - 1 && (
                  <SparkleAccent className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SELECTED PROJECTS ROUNDED CONTAINER WITH WHITE CARDS */}
      <section
        aria-labelledby="portfolio-heading"
        className="bg-[#0A0A0A] px-4 sm:px-8 lg:px-12 py-8 md:py-12"
      >
        <div className="max-w-[1280px] mx-auto">
          <RevealSection>
            <div className="bg-[#181816] border border-white/12 rounded-[28px] md:rounded-[38px] p-6 sm:p-8 lg:p-11">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#F7D928] mb-2">
                    {PORTFOLIO_META.eyebrow}
                  </p>
                  <h2 id="portfolio-heading" className="section-h2 font-display font-extrabold text-white">
                    {PORTFOLIO_META.headingPrefix}{' '}
                    <span className="bg-[#F7D928] text-[#111111] px-3 py-0.5 rounded-lg inline-block">
                      {PORTFOLIO_META.headingHighlight}
                    </span>
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-[#C6C6BE] max-w-2xl">
                    {PORTFOLIO_META.description}
                  </p>
                </div>

                <SecondaryLinkButton to="/portfolio" tone="dark" className="self-start md:self-auto">
                  All Projects
                </SecondaryLinkButton>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROJECTS.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* 7. MY EDUCATION & LANGUAGES TWO-CARD PREVIEW */}
      <section
        aria-labelledby="education-heading"
        className="bg-[#0A0A0A] px-5 sm:px-8 lg:px-12 py-10 md:py-14"
      >
        <div className="max-w-[1280px] mx-auto">
          <RevealSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Education Card */}
              <div className="bg-[#161614] border border-white/14 rounded-[26px] p-6 sm:p-8">
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#F7D928]/15 border border-[#F7D928]/45 text-[#F7D928] flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F7D928]">
                      {EDUCATION_META.eyebrow}
                    </p>
                    <h2 id="education-heading" className="card-h3 font-display font-bold text-white">
                      {EDUCATION_META.heading}
                    </h2>
                  </div>
                </div>

                <ol className="space-y-4">
                  {EDUCATION_ENTRIES.map((edu) => (
                    <li
                      key={edu.id}
                      className="pl-4 border-l-2 border-[#F7D928]/60 space-y-1"
                    >
                      <p className="font-semibold text-base text-white">{edu.qualification}</p>
                      {edu.institution && (
                        <p className="text-sm text-[#D4D4CE]">{edu.institution}</p>
                      )}
                      {edu.status && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#F7D928]/15 text-[#F7D928] text-xs font-semibold">
                          {edu.status}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Languages Card */}
              <div className="bg-[#161614] border border-white/14 rounded-[26px] p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#F7D928]/15 border border-[#F7D928]/45 text-[#F7D928] flex items-center justify-center shrink-0">
                      <Globe className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F7D928]">
                        COMMUNICATION
                      </p>
                      <h2 className="card-h3 font-display font-bold text-white">
                        {EDUCATION_META.languagesHeading}
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    {LANGUAGE_ENTRIES.map((lang) => (
                      <div
                        key={lang.id}
                        className="rounded-2xl bg-[#111110] border border-white/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4"
                      >
                        <div>
                          <p className="font-semibold text-base text-white">{lang.language}</p>
                          <p className="text-xs sm:text-sm text-[#B8B8B2] mt-0.5">{lang.note}</p>
                        </div>
                        <span className="self-start sm:self-center shrink-0 px-3 py-1 rounded-full bg-white/10 text-[#F7D928] text-xs font-semibold">
                          {lang.proficiency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="mt-6 pt-4 border-t border-white/10 text-xs sm:text-sm text-[#B8B8B2]">
                  {PROFILE.rolesLine}
                </p>
              </div>
            </div>

            {/* Centered circular navigation button matching reference */}
            <div className="mt-6 flex justify-center">
              <Link
                to="/education"
                aria-label="View full Education and Languages page"
                className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-white hover:bg-[#F7D928] text-[#111111] font-semibold text-sm transition-colors"
              >
                <span>Education Details</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* 8. LET'S CONNECT SPLIT BANNER ABOVE CURVED FOOTER */}
      <section
        aria-labelledby="connect-heading"
        className="bg-[#0A0A0A] px-5 sm:px-8 lg:px-12 pt-8 pb-14 md:pb-16"
      >
        <div className="max-w-[1280px] mx-auto">
          <RevealSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#F7D928] mb-2">
                    {PROFILE.contactBanner.eyebrow}
                  </p>
                  <h2 id="connect-heading" className="section-h2 font-display font-extrabold text-white">
                    {PROFILE.contactBanner.heading}
                  </h2>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-[#C6C6BE] max-w-xl">
                  {PROFILE.contactBanner.description}
                </p>

                {/* Dark pill bar + Yellow Contact Me button matching reference */}
                <div className="bg-[#1D1D1A] border border-white/15 rounded-[24px] sm:rounded-full p-2 sm:p-1.5 sm:pl-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 max-w-lg">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#D4D4CE] hover:text-white py-2 sm:py-0 truncate"
                  >
                    <Mail className="w-4 h-4 text-[#F7D928] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <span className="truncate">{PROFILE.email}</span>
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-2.5 rounded-full bg-[#F7D928] hover:bg-[#e5c617] text-[#111111] font-semibold text-sm transition-colors whitespace-nowrap"
                  >
                    <span>{PROFILE.contactBanner.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Clean Editorial Availability Card */}
              <div className="lg:col-span-5">
                <div className="bg-[#181816] border border-white/14 rounded-[28px] p-6 sm:p-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#F7D928] text-[#111111] text-xs font-bold">
                      Open to Opportunities
                    </span>
                    <span className="text-xs text-neutral-400">{PROFILE.location}</span>
                  </div>
                  <p className="font-display font-bold text-xl text-white leading-snug">
                    Ready to support your e-commerce &amp; digital content workflow.
                  </p>
                  <p className="text-xs sm:text-sm text-[#B8B8B2] leading-relaxed">
                    Suitable for entry-level roles in Digital Marketing Assistance, E-commerce Assistance, and eBay Listing Preparation.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <DownloadCvButton variant="outline-dark" />
                  </div>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </PageTransition>
  );
}
