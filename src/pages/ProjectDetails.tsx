import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { PageTransition, RevealSection } from '../components/ui/MotionPrimitives';
import NotFound from './NotFound';

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = projectIndex >= 0 ? PROJECTS[projectIndex] : undefined;

  useDocumentMeta({
    title: project ? `${project.title} | Zara Rafiq Portfolio` : 'Project Not Found | Zara Rafiq',
    description: project
      ? project.shortDescription
      : 'Requested project page could not be found.',
    canonicalPath: project ? `/portfolio/${project.slug}` : '/portfolio',
  });

  if (!project) {
    return <NotFound />;
  }

  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  return (
    <PageTransition>
      <article className="px-5 sm:px-8 lg:px-12 pt-10 pb-16 md:py-16">
        <div className="max-w-[1140px] mx-auto space-y-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#B8B8B2]">
            <Link to="/" className="hover:text-[#F7D928] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-neutral-500" aria-hidden="true" />
            <Link to="/portfolio" className="hover:text-[#F7D928] transition-colors">
              Portfolio
            </Link>
            <ChevronRight className="w-4 h-4 text-neutral-500" aria-hidden="true" />
            <span className="text-white font-medium">{project.title}</span>
          </nav>

          {/* Header */}
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full bg-[#F7D928] text-[#111111] text-xs font-bold">
                {project.classification}
              </span>
              {project.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 rounded-full bg-[#181816] border border-white/15 text-xs font-semibold text-neutral-200"
                >
                  {cat}
                </span>
              ))}
            </div>

            <h1 className="inner-h1 font-display font-extrabold text-white">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#D4D4CE] max-w-3xl">
              {project.overview}
            </p>
          </header>

          {/* Objective & Process */}
          <RevealSection className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-[#181816] border border-white/12 rounded-[26px] p-6 sm:p-7 space-y-3">
              <h2 className="card-h3 font-display font-bold text-[#F7D928]">Objective</h2>
              <p className="text-sm sm:text-[15px] leading-relaxed text-[#D4D4CE]">
                {project.objective}
              </p>
            </div>

            <div className="lg:col-span-7 bg-[#181816] border border-white/12 rounded-[26px] p-6 sm:p-7 space-y-4">
              <h2 className="card-h3 font-display font-bold text-white">Research Process</h2>
              <ul className="space-y-3">
                {project.researchProcess.map((step) => (
                  <li key={step} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-[#D4D4CE]">
                    <CheckCircle2 className="w-4 h-4 text-[#F7D928] shrink-0 mt-1" aria-hidden="true" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealSection>

          {/* Work Performed & Skills Demonstrated */}
          <RevealSection className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-[#181816] border border-white/12 rounded-[26px] p-6 sm:p-7 space-y-4">
              <h2 className="card-h3 font-display font-bold text-white">Work Performed</h2>
              <ul className="space-y-3">
                {project.workPerformed.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-[#D4D4CE]">
                    <CheckCircle2 className="w-4 h-4 text-[#F7D928] shrink-0 mt-1" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 bg-[#181816] border border-white/12 rounded-[26px] p-6 sm:p-7 space-y-4">
              <h2 className="card-h3 font-display font-bold text-white">Skills Demonstrated</h2>
              <div className="flex flex-wrap gap-2">
                {project.skillsDemonstrated.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 rounded-full bg-[#111110] border border-white/14 text-xs sm:text-sm font-medium text-neutral-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* Illustrative Project Gallery */}
          <RevealSection className="space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F7D928] mb-1">
                PROJECT GALLERY
              </p>
              <h2 className="section-h2 font-display font-bold text-white">
                Visual Structure &amp; Workflow Previews
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((item) => (
                <figure
                  key={item.src}
                  className="bg-[#181816] border border-white/12 rounded-[24px] p-4 space-y-3"
                >
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/2]">
                    <img
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#111111]/90 text-[#F7D928] text-[11px] font-bold">
                      {item.badge}
                    </span>
                  </div>
                  <figcaption className="text-xs sm:text-sm text-[#C6C6BE] px-1">
                    {item.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </RevealSection>

          {/* Bottom Navigation */}
          <div className="pt-6 border-t border-white/14 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full border border-white/20 hover:border-[#F7D928] text-white font-semibold text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
              <span>Back to Portfolio</span>
            </Link>

            {nextProject && (
              <Link
                to={`/portfolio/${nextProject.slug}`}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[#F7D928] hover:bg-[#e5c617] text-[#111111] font-semibold text-sm transition-colors"
              >
                <span>Next Project: {nextProject.title}</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </article>
    </PageTransition>
  );
}
