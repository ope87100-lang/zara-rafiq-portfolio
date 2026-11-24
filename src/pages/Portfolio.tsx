import { useState } from 'react';
import { FolderSearch } from 'lucide-react';
import { PORTFOLIO_META, PROJECTS, type ProjectCategory } from '../data/projects';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { PageTransition, RevealSection } from '../components/ui/MotionPrimitives';
import { ProjectCard } from '../components/portfolio/ProjectCard';

type FilterOption = (typeof PORTFOLIO_META.filterOptions)[number];

export default function Portfolio() {
  useDocumentMeta({
    title: 'Portfolio | Zara Rafiq Digital Marketing & E-commerce',
    description:
      'Browse Zara Rafiq’s practical self-directed projects in eBay listing practice, product research, social media content planning, and Canva design.',
    canonicalPath: '/portfolio',
  });

  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('All Projects');

  const filteredProjects =
    selectedFilter === 'All Projects'
      ? PROJECTS
      : PROJECTS.filter((p) =>
          p.filterTags.includes(selectedFilter as ProjectCategory),
        );

  return (
    <PageTransition>
      <section className="px-5 sm:px-8 lg:px-12 pt-10 pb-16 md:py-16">
        <div className="max-w-[1280px] mx-auto space-y-10">
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F7D928]">
              {PORTFOLIO_META.eyebrow}
            </p>
            <h1 className="inner-h1 font-display font-extrabold text-white">
              {PORTFOLIO_META.headingPrefix}{' '}
              <span className="bg-[#F7D928] text-[#111111] px-3 py-0.5 rounded-lg inline-block">
                {PORTFOLIO_META.headingHighlight}
              </span>
            </h1>
            <p className="text-[15px] sm:text-base leading-relaxed text-[#C6C6BE]">
              {PORTFOLIO_META.description}
            </p>
          </div>

          {/* Functional Category Filters */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2.5"
          >
            {PORTFOLIO_META.filterOptions.map((filter) => {
              const active = selectedFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setSelectedFilter(filter)}
                  aria-pressed={active}
                  className={`min-h-[44px] px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-[#F7D928] border-[#F7D928] text-[#111111]'
                      : 'bg-[#181816] border-white/15 text-neutral-300 hover:border-white/35 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Filtered Project Grid */}
          <RevealSection>
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            ) : (
              <div className="bg-[#181816] border border-white/12 rounded-[28px] p-10 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F7D928]/15 text-[#F7D928] flex items-center justify-center mx-auto">
                  <FolderSearch className="w-6 h-6" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h2 className="card-h3 font-display font-bold text-white">
                  No projects match “{selectedFilter}”
                </h2>
                <p className="text-sm text-[#B8B8B2] max-w-md mx-auto">
                  Reset the filter to view all self-directed practical projects.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedFilter('All Projects')}
                  className="min-h-[44px] px-6 py-2.5 rounded-full bg-[#F7D928] text-[#111111] font-semibold text-sm cursor-pointer"
                >
                  Show All Projects
                </button>
              </div>
            )}
          </RevealSection>
        </div>
      </section>
    </PageTransition>
  );
}
