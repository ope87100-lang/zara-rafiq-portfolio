import { Mail, MapPin, Phone } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { PageTransition, RevealSection } from '../components/ui/MotionPrimitives';
import { ContactForm } from '../components/forms/ContactForm';
import { DownloadCvButton } from '../components/buttons/ActionButtons';

export default function Contact() {
  useDocumentMeta({
    title: 'Contact | Zara Rafiq Digital Marketing & E-commerce Portfolio',
    description:
      'Contact Zara Rafiq in Lahore, Pakistan for entry-level opportunities in digital marketing, e-commerce assistance, and eBay listing preparation.',
    canonicalPath: '/contact',
  });

  return (
    <PageTransition>
      <section className="px-5 sm:px-8 lg:px-12 pt-10 pb-16 md:py-16">
        <div className="max-w-[1280px] mx-auto space-y-10">
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F7D928]">
              {PROFILE.contactBanner.eyebrow}
            </p>
            <h1 className="inner-h1 font-display font-extrabold text-white">
              {PROFILE.contactBanner.heading}
            </h1>
            <p className="text-[15px] sm:text-base leading-relaxed text-[#C6C6BE]">
              {PROFILE.contactBanner.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Info Column */}
            <RevealSection className="lg:col-span-5 space-y-5">
              <div className="bg-[#181816] border border-white/12 rounded-[28px] p-6 sm:p-7 space-y-5">
                <h2 className="card-h3 font-display font-bold text-white">
                  Direct Contact Details
                </h2>

                <div className="space-y-4 text-sm sm:text-base">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#F7D928]/15 text-[#F7D928] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                        Email Address
                      </p>
                      <a
                        href={`mailto:${PROFILE.email}`}
                        className="text-white font-medium hover:text-[#F7D928] transition-colors break-all"
                      >
                        {PROFILE.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#F7D928]/15 text-[#F7D928] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                        Phone
                      </p>
                      <a
                        href={PROFILE.phoneHref}
                        className="text-white font-medium hover:text-[#F7D928] transition-colors"
                      >
                        {PROFILE.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#F7D928]/15 text-[#F7D928] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                        Location
                      </p>
                      <p className="text-white font-medium">{PROFILE.location}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  <p className="text-xs text-[#B8B8B2]">
                    Looking for my printable resume? Download the verified PDF copy below.
                  </p>
                  <DownloadCvButton variant="yellow" />
                </div>
              </div>
            </RevealSection>

            {/* Right Form Column */}
            <RevealSection className="lg:col-span-7">
              <ContactForm />
            </RevealSection>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
