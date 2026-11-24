import { Globe, GraduationCap } from 'lucide-react';
import {
  EDUCATION_ENTRIES,
  EDUCATION_META,
  LANGUAGE_ENTRIES,
} from '../data/education';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { PageTransition, RevealSection } from '../components/ui/MotionPrimitives';
import { DownloadCvButton, PrimaryLinkButton } from '../components/buttons/ActionButtons';

export default function Education() {
  useDocumentMeta({
    title: 'Education & Languages | Zara Rafiq Portfolio',
    description:
      'Academic background and language proficiency of Zara Rafiq, currently pursuing a Bachelor’s in Business & Information Technology at Allama Iqbal Open University.',
    canonicalPath: '/education',
  });

  return (
    <PageTransition>
      <section className="px-5 sm:px-8 lg:px-12 pt-10 pb-16 md:py-16">
        <div className="max-w-[1140px] mx-auto space-y-12">
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F7D928]">
              {EDUCATION_META.eyebrow}
            </p>
            <h1 className="inner-h1 font-display font-extrabold text-white">
              {EDUCATION_META.heading}
            </h1>
            <p className="text-[15px] sm:text-base leading-relaxed text-[#C6C6BE]">
              Academic progression combining business studies and computer science fundamentals.
            </p>
          </div>

          {/* Education Timeline */}
          <RevealSection className="bg-[#181816] border border-white/12 rounded-[28px] md:rounded-[36px] p-6 sm:p-8 lg:p-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#F7D928]/15 border border-[#F7D928]/40 text-[#F7D928] flex items-center justify-center">
                <GraduationCap className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <h2 className="card-h3 font-display font-bold text-white">
                Academic Qualifications
              </h2>
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {EDUCATION_ENTRIES.map((entry, idx) => (
                <li
                  key={entry.id}
                  className="rounded-2xl bg-[#111110] border border-white/10 p-5 sm:p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/10 text-[#F7D928] text-xs font-bold">
                      0{idx + 1}
                    </span>
                    <h3 className="font-display font-bold text-lg text-white leading-snug">
                      {entry.qualification}
                    </h3>
                    {entry.institution && (
                      <p className="text-sm font-medium text-[#D4D4CE]">
                        {entry.institution}
                      </p>
                    )}
                    {entry.status && (
                      <span className="inline-block px-3 py-1 rounded-full bg-[#F7D928] text-[#111111] text-xs font-bold">
                        {entry.status}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#B8B8B2] pt-3 border-t border-white/10">
                    {entry.focus}
                  </p>
                </li>
              ))}
            </ol>
          </RevealSection>

          {/* Languages */}
          <RevealSection className="bg-[#181816] border border-white/12 rounded-[28px] md:rounded-[36px] p-6 sm:p-8 lg:p-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#F7D928]/15 border border-[#F7D928]/40 text-[#F7D928] flex items-center justify-center">
                <Globe className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <h2 className="card-h3 font-display font-bold text-white">
                {EDUCATION_META.languagesHeading}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {LANGUAGE_ENTRIES.map((lang) => (
                <div
                  key={lang.id}
                  className="rounded-2xl bg-[#111110] border border-white/10 p-5 sm:p-6 space-y-2"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display font-bold text-lg text-white">
                      {lang.language}
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-[#393A2E] text-[#F7D928] text-xs font-semibold">
                      {lang.proficiency}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#B8B8B2]">
                    {lang.note}
                  </p>
                </div>
              ))}
            </div>
          </RevealSection>

          <div className="flex flex-wrap items-center gap-3">
            <PrimaryLinkButton to="/contact" showArrow>
              Get in Touch
            </PrimaryLinkButton>
            <DownloadCvButton variant="outline-dark" />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
