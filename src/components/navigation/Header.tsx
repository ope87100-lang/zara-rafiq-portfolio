import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Download, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { PROFILE } from '../../data/profile';
import { DrawerAudioControls, HeaderAudioButton } from '../audio/AudioControls';
import { EDITORIAL_EASE } from '../ui/MotionPrimitives';

const LEFT_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Skills', to: '/skills' },
];

const RIGHT_LINKS = [
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Education', to: '/education' },
  { label: 'Contact', to: '/contact' },
];

const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS];

function BrandMark() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-1 font-display font-extrabold text-base sm:text-lg tracking-tight text-white hover:text-[#F7D928] transition-colors whitespace-nowrap"
      aria-label="Zara Rafiq Home"
    >
      <span>Zara</span>
      <span className="relative inline-block text-[#F7D928]">
        Rafiq.
        <span
          className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-[#F7D928]"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const prevMenuOpenRef = useRef(false);

  // Close drawer on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Body scroll lock, Escape handling, and focus management
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = '';
      if (prevMenuOpenRef.current) {
        menuButtonRef.current?.focus();
      }
    }
    prevMenuOpenRef.current = menuOpen;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative py-1 text-[13px] lg:text-[14px] font-medium transition-colors whitespace-nowrap ${
      isActive ? 'text-white' : 'text-neutral-300 hover:text-white'
    }`;

  return (
    <>
      <header
        className={`w-full z-40 px-4 sm:px-6 lg:px-10 ${
          isHome
            ? 'bg-[#FCFDFF] pt-4 pb-2'
            : 'sticky top-0 bg-[#0A0A0A]/90 backdrop-blur-md pt-3 pb-3 border-b border-white/10'
        }`}
      >
        <div className="max-w-[1280px] mx-auto">
          {/* Desktop & Mobile Floating Pill Header matching approved reference */}
          <nav
            aria-label="Primary navigation"
            className="bg-[#0C0C0C] border border-white/12 rounded-full px-4 sm:px-6 lg:px-7 min-h-[60px] lg:min-h-[68px] flex items-center justify-between gap-3"
          >
            {/* Mobile Left: Wordmark */}
            <div className="lg:hidden">
              <BrandMark />
            </div>

            {/* Desktop Left Links */}
            <div className="hidden lg:flex items-center gap-6">
              {LEFT_LINKS.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.to === '/'} className={navLinkClass}>
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="desktop-nav-underline"
                          transition={{ duration: 0.25, ease: EDITORIAL_EASE }}
                          className="absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-[#F7D928]"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Desktop Center Wordmark */}
            <div className="hidden lg:flex items-center justify-center">
              <BrandMark />
            </div>

            {/* Desktop Right Links + Audio + CV */}
            <div className="hidden lg:flex items-center gap-5">
              {RIGHT_LINKS.map((item) => (
                <NavLink key={item.to} to={item.to} className={navLinkClass}>
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="desktop-nav-underline"
                          transition={{ duration: 0.25, ease: EDITORIAL_EASE }}
                          className="absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-[#F7D928]"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}

              <div className="flex items-center gap-2 pl-1">
                <HeaderAudioButton />
                <a
                  href={PROFILE.cvPath}
                  download={PROFILE.cvFileName}
                  className="inline-flex items-center gap-1.5 min-h-[42px] px-4 py-2 rounded-full bg-[#F7D928] hover:bg-[#e5c617] text-[#111111] font-semibold text-[13px] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                  <span>Download CV</span>
                </a>
              </div>
            </div>

            {/* Mobile Right Controls */}
            <div className="flex lg:hidden items-center gap-2">
              <HeaderAudioButton />
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation-drawer"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <Menu className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Accessible Slide-and-Fade Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end lg:hidden"
            onClick={(e) => {
              if (e.target === e.currentTarget) setMenuOpen(false);
            }}
          >
            <motion.div
              initial={{ x: 24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 24, opacity: 0 }}
              transition={{ duration: 0.26, ease: EDITORIAL_EASE }}
              className="w-full max-w-xs h-full bg-[#111110] border-l border-white/12 p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <BrandMark />
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close navigation menu"
                    className="w-11 h-11 rounded-full border border-white/15 text-neutral-300 hover:text-white hover:border-white/35 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                  </button>
                </div>

                <nav aria-label="Mobile menu links" className="mt-6 flex flex-col gap-1.5">
                  {ALL_LINKS.map((item, idx) => (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.22, delay: idx * 0.035, ease: EDITORIAL_EASE }}
                    >
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between min-h-[48px] px-4 rounded-xl text-base font-medium transition-colors ${
                            isActive
                              ? 'bg-[#F7D928] text-[#111111] font-semibold'
                              : 'text-neutral-200 hover:bg-white/8 hover:text-white'
                          }`
                        }
                      >
                        <span>{item.label}</span>
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-3">
                <DrawerAudioControls />
                <a
                  href={PROFILE.cvPath}
                  download={PROFILE.cvFileName}
                  onClick={() => setMenuOpen(false)}
                  className="w-full min-h-[48px] px-5 py-3 rounded-full bg-[#F7D928] hover:bg-[#e5c617] text-[#111111] font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" strokeWidth={1.85} aria-hidden="true" />
                  <span>Download CV</span>
                </a>
                <p className="text-xs text-neutral-400 text-center">
                  {PROFILE.location} · {PROFILE.email}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
