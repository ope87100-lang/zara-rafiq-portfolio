import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { PortfolioProject } from '../../data/projects';

export function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <article className="group bg-white text-[#111111] rounded-[24px] p-5 sm:p-6 border border-[#E6E6E0] shadow-sm transition-all duration-300 hover:-translate-y-[3px] flex flex-col justify-between h-full">
      <div>
        {/* Preview Visual */}
        <div className="relative rounded-2xl overflow-hidden bg-[#F2F2EE] border border-[#E5E5DF] aspect-[3/2] mb-5">
          <img
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            width={project.coverImage.width}
            height={project.coverImage.height}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.025]"
          />
          <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full bg-[#111111]/88 text-[#F7D928] text-[11px] font-semibold tracking-wide">
            {project.coverImage.badge}
          </span>
        </div>

        {/* Classification & Categories */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F7D928] text-[#111111] text-[11px] font-bold">
            {project.classification}
          </span>
          {project.categories.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F2F2EE] text-[#333330] text-[11px] font-semibold"
            >
              {cat}
            </span>
          ))}
        </div>

        <h3 className="card-h3 font-display font-bold text-[#111111] mb-2.5">
          {project.title}
        </h3>

        <p className="text-sm sm:text-[15px] leading-relaxed text-[#4B4B4E]">
          {project.shortDescription}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-[#E6E6E0] flex items-center justify-between">
        <Link
          to={`/portfolio/${project.slug}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#111111] hover:text-[#424D2B] transition-colors min-h-[44px] py-2"
        >
          <span>View Project</span>
          <span className="w-8 h-8 rounded-full bg-[#111111] group-hover:bg-[#F7D928] text-white group-hover:text-[#111111] flex items-center justify-center transition-colors">
            <ArrowUpRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
              strokeWidth={1.85}
              aria-hidden="true"
            />
          </span>
        </Link>
      </div>
    </article>
  );
}
