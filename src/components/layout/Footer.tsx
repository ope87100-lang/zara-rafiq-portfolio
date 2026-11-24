import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Download, FileText } from 'lucide-react';
import { PROFILE } from '../../data/profile';
import { CORE_SKILLS } from '../../data/skills';

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Skills', to: '/skills' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Education', to: '/education' },
  { label: 'Contact', to: '/contact' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#0A0A0A]">
      {/* Curved-top vibrant yellow footer card matching approved reference */}
      <div className="bg-[#F7D928] text-[#111111] rounded-t-[36px] md:rounded-t-[68px] px-5 sm:px-8 lg:px-12 pt-12 pb-10">
        <div className="max-w-[1280px] mx-auto">
          {/* Top Brand + Summary Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10 border-b border-[#111111]/15 items-start">
            <div className="lg:col-span-5">
              <Link
                to="/"
                className="inline-block font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-[#111111]"
              >
                {PROFILE.wordmark}
              </Link>
              <p className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#111111]/75">
                {PROFILE.rolesLine}
              </p>
            </div>
            <p className="lg:col-span-7 text-sm sm:text-base leading-relaxed text-[#111111]/85 max-w-2xl lg:ml-auto">
              {PROFILE.footer.summary}
            </p>
          </div>

          {/* 4-Column Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-10">
            {/* Column 1: Quick Links */}
            <div>
              <h2 className="font-display font-bold text-sm uppercase tracking-wider text-[#111111] mb-4">
                Quick Links
              </h2>
              <ul className="space-y-2.5 text-sm font-medium text-[#111111]/85">
                {QUICK_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="inline-block py-0.5 hover:underline underline-offset-4"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Capabilities */}
            <div>
              <h2 className="font-display font-bold text-sm uppercase tracking-wider text-[#111111] mb-4">
                Core Capabilities
              </h2>
              <ul className="space-y-2.5 text-sm font-medium text-[#111111]/85">
                {CORE_SKILLS.slice(0, 5).map((skill) => (
                  <li key={skill.id}>
                    <Link to="/skills" className="inline-block py-0.5 hover:underline underline-offset-4">
                      {skill.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Get in Touch */}
            <div>
              <h2 className="font-display font-bold text-sm uppercase tracking-wider text-[#111111] mb-4">
                Get in Touch
              </h2>
              <ul className="space-y-3 text-sm font-medium text-[#111111]/90">
                <li className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="hover:underline underline-offset-4 break-all"
                  >
                    {PROFILE.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  <a href={PROFILE.phoneHref} className="hover:underline underline-offset-4">
                    {PROFILE.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  <span>{PROFILE.location}</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Resources */}
            <div>
              <h2 className="font-display font-bold text-sm uppercase tracking-wider text-[#111111] mb-4">
                Resources
              </h2>
              <div className="space-y-3">
                <a
                  href={PROFILE.cvPath}
                  download={PROFILE.cvFileName}
                  className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-full bg-[#111111] hover:bg-[#242422] text-white text-sm font-semibold transition-colors"
                >
                  <Download className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                  <span>Download CV (PDF)</span>
                </a>
                <div>
                  <Link
                    to="/privacy"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111111] hover:underline underline-offset-4"
                  >
                    <FileText className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                    <span>Privacy Policy</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Black Copyright Bar matching approved reference */}
      <div className="bg-[#050505] text-neutral-400 px-5 sm:px-8 lg:px-12 py-4 pb-[calc(1rem+68px)] md:pb-4 border-t border-white/10">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm">
          <p>© {year} {PROFILE.footer.copyrightOwner}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-[#F7D928] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-[#F7D928] transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
