import { MapPin, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { PageTransition, RevealSection } from '../components/ui/MotionPrimitives';
import { DownloadCvButton, PrimaryLinkButton } from '../components/buttons/ActionButtons';

export default function About() {
  useDocumentMeta({
    title: 'About Me | Zara Rafiq Portfolio',
    description:
      'Learn about Zara Rafiq, an entry-level digital marketing and e-commerce candidate based in Lahore, Pakistan.',
    canonicalPath: '/about',
  });

  return (
    <PageTransition>
      <section className="px-5 sm:px-8 lg:px-12 pt-10 pb-16 md:py-16">
        <div className="max-w-[1280px] mx-auto space-y-12">
          {/* Header Block */}
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F7D928]">
              ABOUT ME
            </p>
            <h1 className="inner-h1 font-display font-extrabold text-white">
              {PROFILE.aboutHeading}
            </h1>
            <p className="text-sm sm:text-base font-medium text-[#F7D928]">
              {PROFILE.rolesLine}
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Portrait Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#FCFDFF] rounded-[32px] p-5 sm:p-6 text-[#111111]">
                <div className="rounded-t-full rounded-b-2xl bg-[#E1E3E0] aspect-[4/4.2] overflow-hidden">
                  <picture>
                    <source srcSet={PROFILE.portraitWebp} type="image/webp" />
                    <img
                      src={PROFILE.portraitSrc}
                      alt={PROFILE.portraitAlt}
                      width={1024}
                      height={682}
                      className="w-full h-full object-cover object-[56%_14%]"
                    />
                  </picture>
                </div>
                <div className="mt-5 pt-4 border-t border-[#E5E5DF] space-y-2 text-sm">
                  <p className="font-display font-bold text-lg">{PROFILE.name}</p>
                  <p className="flex items-center gap-2 text-[#4B4B4E]">
                    <MapPin className="w-4 h-4 text-[#424D2B]" strokeWidth={1.75} aria-hidden="true" />
                    <span>{PROFILE.location}</span>
                  </p>
                  <p className="flex items-center gap-2 text-[#4B4B4E]">
                    <Mail className="w-4 h-4 text-[#424D2B]" strokeWidth={1.75} aria-hidden="true" />
                    <a href={`mailto:${PROFILE.email}`} className="hover:underline">
                      {PROFILE.email}
                    </a>
                  </p>
                  <p className="flex items-center gap-2 text-[#4B4B4E]">
                    <Phone className="w-4 h-4 text-[#424D2B]" strokeWidth={1.75} aria-hidden="true" />
                    <a href={PROFILE.phoneHref} className="hover:underline">
                      {PROFILE.phoneDisplay}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* CV-Verified Introduction & Working Approach */}
            <div className="lg:col-span-7 space-y-8">
              <RevealSection className="bg-[#181816] border border-white/12 rounded-[28px] p-6 sm:p-8 space-y-5">
                <h2 className="card-h3 font-display font-bold text-white">
                  Professional Summary
                </h2>
                <div className="space-y-4 text-[15px] sm:text-base leading-[1.75] text-[#D4D4CE]">
                  {PROFILE.aboutParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                  <p>
                    Eager to support an online business with accurate listing content, organized work, and a strong willingness to learn.
                  </p>
                </div>
              </RevealSection>

              <RevealSection className="bg-[#181816] border border-white/12 rounded-[28px] p-6 sm:p-8 space-y-5">
                <h2 className="card-h3 font-display font-bold text-white">
                  Work Approach &amp; Strengths
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {PROFILE.attributes.map((attr) => (
                    <div
                      key={attr}
                      className="rounded-2xl bg-[#111110] border border-white/10 p-4 flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#F7D928] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                      <span className="font-semibold text-sm sm:text-base text-white">{attr}</span>
                    </div>
                  ))}
                </div>
              </RevealSection>

              <div className="flex flex-wrap items-center gap-3">
                <PrimaryLinkButton to="/portfolio" showArrow>
                  View Practical Projects
                </PrimaryLinkButton>
                <DownloadCvButton variant="outline-dark" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
