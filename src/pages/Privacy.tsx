import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { PageTransition } from '../components/ui/MotionPrimitives';

export default function Privacy() {
  useDocumentMeta({
    title: 'Privacy Policy | Zara Rafiq Portfolio',
    description:
      'Privacy policy explaining how contact inquiries and local audio preferences are handled on Zara Rafiq’s personal portfolio.',
    canonicalPath: '/privacy',
  });

  return (
    <PageTransition>
      <section className="px-5 sm:px-8 lg:px-12 pt-10 pb-16 md:py-16">
        <div className="max-w-[840px] mx-auto space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F7D928]">
              LEGAL &amp; TRANSPARENCY
            </p>
            <h1 className="inner-h1 font-display font-extrabold text-white">
              Privacy Policy
            </h1>
            <p className="text-sm text-neutral-400">
              Last updated: {new Date().getFullYear()}
            </p>
          </div>

          <div className="bg-[#181816] border border-white/12 rounded-[28px] p-6 sm:p-8 space-y-6 text-sm sm:text-base leading-[1.75] text-[#D4D4CE]">
            <section className="space-y-2">
              <h2 className="font-display font-bold text-lg text-white">1. Purpose of This Website</h2>
              <p>
                This website serves solely as the personal professional portfolio of {PROFILE.name}, presenting practical experience, core capabilities, educational background, and a downloadable CV for potential employers and professional networking.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display font-bold text-lg text-white">2. Information Submitted via the Contact Form</h2>
              <p>
                When you choose to submit a message on the Contact page, your name, email address, subject, and message are used strictly to review and respond to your professional inquiry. Information is never sold, rented, or shared with third-party advertisers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display font-bold text-lg text-white">3. Local Browser Preferences</h2>
              <p>
                This website does not run invasive advertising trackers. The optional background music player stores only your audio volume and mute settings locally in your browser via <code>localStorage</code> so your preference persists while browsing pages.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display font-bold text-lg text-white">4. Contact Regarding Privacy</h2>
              <p>
                If you have any questions regarding your inquiry or privacy on this site, please email{' '}
                <a href={`mailto:${PROFILE.email}`} className="text-[#F7D928] hover:underline">
                  {PROFILE.email}
                </a>
                .
              </p>
            </section>
          </div>

          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full border border-white/20 hover:border-[#F7D928] text-sm font-semibold text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
