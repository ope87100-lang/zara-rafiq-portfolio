import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Download } from 'lucide-react';
import { PROFILE } from '../../data/profile';

const primaryBtnClass =
  'group inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[#F7D928] hover:bg-[#e5c617] text-[#111111] font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] whitespace-nowrap';

const secondaryLightBtnClass =
  'group inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-transparent border border-[#CFCFC9] hover:border-[#111111] hover:bg-[#111111] text-[#111111] hover:text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] whitespace-nowrap';

const secondaryDarkBtnClass =
  'group inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-transparent border border-white/25 hover:border-[#F7D928] hover:bg-white/10 text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] whitespace-nowrap';

export function PrimaryLinkButton({
  to,
  children,
  className = '',
  showArrow = false,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
}) {
  return (
    <Link to={to} className={`${primaryBtnClass} ${className}`}>
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRight
          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      )}
    </Link>
  );
}

export function SecondaryLinkButton({
  to,
  children,
  tone = 'dark',
  className = '',
}: {
  to: string;
  children: React.ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const base = tone === 'light' ? secondaryLightBtnClass : secondaryDarkBtnClass;
  return (
    <Link to={to} className={`${base} ${className}`}>
      {children}
    </Link>
  );
}

export function DownloadCvButton({
  variant = 'outline-light',
  className = '',
  compact = false,
}: {
  variant?: 'yellow' | 'outline-light' | 'outline-dark' | 'dark-pill';
  className?: string;
  compact?: boolean;
}) {
  const variants: Record<string, string> = {
    yellow:
      'group inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-[#F7D928] hover:bg-[#e5c617] text-[#111111] font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] whitespace-nowrap',
    'outline-light': secondaryLightBtnClass,
    'outline-dark': secondaryDarkBtnClass,
    'dark-pill':
      'group inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-[#111111] hover:bg-[#242422] text-white border border-white/15 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] whitespace-nowrap',
  };

  return (
    <a
      href={PROFILE.cvPath}
      download={PROFILE.cvFileName}
      className={`${variants[variant]} ${compact ? 'min-h-[40px] px-4 py-2 text-xs' : ''} ${className}`}
      aria-label="Download Zara Rafiq CV PDF"
    >
      <Download className="w-4 h-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
      <span>Download CV</span>
    </a>
  );
}
