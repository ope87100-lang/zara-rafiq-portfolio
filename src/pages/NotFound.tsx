import { Link } from 'react-router-dom';
import { Home, Briefcase } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { PageTransition } from '../components/ui/MotionPrimitives';

export default function NotFound() {
  useDocumentMeta({
    title: 'Page Not Found (404) | Zara Rafiq Portfolio',
    description: 'The requested page could not be found on Zara Rafiq’s portfolio.',
  });

  return (
    <PageTransition>
      <section className="px-5 sm:px-8 lg:px-12 py-20 md:py-28">
        <div className="max-w-xl mx-auto text-center bg-[#181816] border border-white/12 rounded-[32px] p-8 sm:p-12 space-y-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F7D928] text-[#111111] text-xs font-extrabold tracking-widest uppercase">
            404 — Page Not Found
          </span>
          <h1 className="section-h2 font-display font-extrabold text-white">
            This page doesn’t exist.
          </h1>
          <p className="text-sm sm:text-base text-[#C6C6BE] leading-relaxed">
            The link you visited may be outdated or mistyped. You can return to Zara Rafiq’s homepage or browse her practical portfolio projects.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[#F7D928] hover:bg-[#e5c617] text-[#111111] font-semibold text-sm transition-colors"
            >
              <Home className="w-4 h-4" aria-hidden="true" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full border border-white/20 hover:border-[#F7D928] text-white font-semibold text-sm transition-colors"
            >
              <Briefcase className="w-4 h-4" aria-hidden="true" />
              <span>View Portfolio</span>
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
