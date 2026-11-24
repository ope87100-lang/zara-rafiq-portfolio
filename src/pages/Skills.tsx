import { CheckCircle2 } from 'lucide-react';
import {
  ADDITIONAL_SKILLS,
  CORE_SKILLS,
  SKILLS_SECTION_META,
} from '../data/skills';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { PageTransition, RevealSection } from '../components/ui/MotionPrimitives';
import { SkillIcon } from '../components/ui/GeometricAccents';
import { PrimaryLinkButton, DownloadCvButton } from '../components/buttons/ActionButtons';

export default function Skills() {
  useDocumentMeta({
    title: 'Skills & Capabilities | Zara Rafiq Portfolio',
    description:
      'Explore Zara Rafiq’s practical e-commerce, eBay listing preparation, product research, Canva design, and social media content planning skills.',
    canonicalPath: '/skills',
  });

  return (
    <PageTransition>
      <section className="px-5 sm:px-8 lg:px-12 pt-10 pb-16 md:py-16">
        <div className="max-w-[1280px] mx-auto space-y-12">
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F7D928]">
              {SKILLS_SECTION_META.eyebrow}
            </p>
            <h1 className="inner-h1 font-display font-extrabold text-white">
              {SKILLS_SECTION_META.headingPrefix}{' '}
              <span className="bg-[#F7D928] text-[#111111] px-3 py-0.5 rounded-lg inline-block">
                {SKILLS_SECTION_META.headingHighlight}
              </span>
            </h1>
            <p className="text-[15px] sm:text-base leading-relaxed text-[#C6C6BE]">
              {SKILLS_SECTION_META.description}
            </p>
          </div>

          {/* Core 6 Skills Grid */}
          <RevealSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CORE_SKILLS.map((skill) => (
                <article
                  key={skill.id}
                  className="bg-[#181816] border border-white/12 hover:border-[#F7D928]/60 rounded-[26px] p-6 transition-all duration-200 hover:-translate-y-[3px] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-2xl bg-[#F7D928]/15 border border-[#F7D928]/40 text-[#F7D928] flex items-center justify-center">
                        <SkillIcon name={skill.icon} className="w-5 h-5" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/8 text-xs font-bold text-[#F7D928]">
                        {skill.number}
                      </span>
                    </div>

                    <h2 className="card-h3 font-display font-bold text-white mb-2.5">
                      {skill.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-[#C6C6BE] mb-4">
                      {skill.summary}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-4 border-t border-white/10">
                    {skill.practicalFocus.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs sm:text-[13px] text-neutral-300">
                        <CheckCircle2
                          className="w-4 h-4 text-[#F7D928] shrink-0 mt-0.5"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </RevealSection>

          {/* Additional Supporting Skills from CV */}
          <RevealSection>
            <div className="bg-[#181816] border border-white/12 rounded-[28px] md:rounded-[36px] p-6 sm:p-8 lg:p-10">
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F7D928] mb-2">
                  SUPPORTING CAPABILITIES
                </p>
                <h2 className="section-h2 font-display font-bold text-white">
                  Additional Practical Strengths
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ADDITIONAL_SKILLS.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl bg-[#111110] border border-white/10 p-5 space-y-2"
                  >
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#393A2E] text-[11px] font-semibold text-[#F7D928]">
                      {item.category}
                    </span>
                    <h3 className="font-display font-bold text-base text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#B8B8B2]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
                <PrimaryLinkButton to="/portfolio" showArrow>
                  View Related Projects
                </PrimaryLinkButton>
                <DownloadCvButton variant="outline-dark" />
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </PageTransition>
  );
}
