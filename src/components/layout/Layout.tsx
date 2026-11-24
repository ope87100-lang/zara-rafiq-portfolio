import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../navigation/Header';
import { MobileBottomNav } from '../navigation/MobileBottomNav';
import { Footer } from './Footer';

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <div className="min-h-dvh flex flex-col bg-[#0A0A0A] text-[#F5F5F4] overflow-x-clip">
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      <Header />

      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        className="flex-1 outline-none"
      >
        {children}
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
