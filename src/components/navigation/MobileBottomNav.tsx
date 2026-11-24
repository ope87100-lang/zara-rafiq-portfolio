import { NavLink } from 'react-router-dom';
import { Home, User, Layers, Briefcase, Mail } from 'lucide-react';

const MOBILE_TABS = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'About', to: '/about', icon: User },
  { label: 'Skills', to: '/skills', icon: Layers },
  { label: 'Portfolio', to: '/portfolio', icon: Briefcase },
  { label: 'Contact', to: '/contact', icon: Mail },
];

export function MobileBottomNav() {
  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0D0D0C]/95 backdrop-blur-md border-t border-white/12 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-5 px-1 py-1.5">
        {MOBILE_TABS.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-xl text-[11px] font-medium transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'bg-[#F7D928] text-[#111111] font-semibold'
                  : 'text-neutral-300 hover:text-white'
              }`
            }
          >
            <Icon className="w-4 h-4 mb-0.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
            <span className="leading-none">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
