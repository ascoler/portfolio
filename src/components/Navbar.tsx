import React, { useState, useEffect } from 'react';
import { USER_INFO } from '../data';
import { useProjects } from '../context/ProjectsContext';
import { Terminal, Send, Check, Copy, Star, Menu, X } from 'lucide-react';
import { scrollToElement, isScrollLocked } from '../utils/scroll';
import { copyText } from '../utils/clipboard';

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const NAV_LINKS = [
  { href: '#projects', label: 'Проекты', id: 'projects' },
  { href: '#stack', label: 'Стек', id: 'stack' },
  { href: '#terminal', label: 'Консоль', id: 'terminal', badge: true },
  { href: '#leetcode', label: 'LeetCode', id: 'leetcode' },
  { href: '#contact', label: 'Контакты', id: 'contact' },
];

export const Navbar: React.FC = () => {
  const { totalStars } = useProjects();
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sectionIds = ['projects', 'stack', 'terminal', 'leetcode', 'contact'];

    const handleScroll = () => {
      if (isScrollLocked()) return;

      const scrollY = window.scrollY; // Используем современный scrollY вместо устаревшего pageYOffset
      const headerOffset = 100; // Компенсация высоты шапки

      // Сброс активного пункта, если мы в самом верху страницы
      if (scrollY < 100) {
        setActiveSection('');
        return;
      }

      // Принудительно подсвечиваем "Контакты", если доскроллили до самого низа
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveSection('contact');
        return;
      }

      // Определяем текущую секцию
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.getBoundingClientRect().top + window.scrollY;
          // Если верх секции пересек линию скролла с учетом шапки
          if (scrollY >= top - headerOffset) {
            setActiveSection(sectionIds[i]);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyTelegram = async () => {
    const success = await copyText(USER_INFO.socials.telegramHandle);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    // Обработка клика по логотипу (скролл в самый верх)
    if (href === '#') {
      setActiveSection('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const id = href.replace('#', '');
    setActiveSection(id);
    scrollToElement(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#09090b]/80 border-b border-white/[0.05] transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, '#')}
          className="flex items-center gap-3 group transition-transform duration-200 active:scale-95 select-none cursor-pointer focus:outline-none rounded-lg"
        >
          <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] group-hover:bg-cyan-500/10 transition-all duration-300 shadow-sm">
            <Terminal className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-zinc-100 group-hover:text-white transition-colors duration-200">
              {USER_INFO.handle}
            </span>
            <span className="text-[11px] font-mono text-zinc-500 group-hover:text-cyan-400/80 transition-colors duration-200">
              {USER_INFO.name} <span className="text-zinc-600">·</span> backend
            </span>
          </div>
        </a>

        {/* Navigation links (desktop) */}
        <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-xl bg-zinc-900/40 border border-white/[0.04] backdrop-blur-md shadow-inner">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1.5 group select-none cursor-pointer border ${
                  isActive
                    ? 'text-white bg-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.1)] border-white/10'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.06] border-transparent'
                }`}
              >
                {link.badge && (
                  <span className={`w-1.5 h-1.5 rounded-full bg-cyan-400 ${isActive ? '' : 'animate-pulse'}`} />
                )}
                <span>{link.label}</span>
                {/* Active animated indicator underline */}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 rounded-t-full shadow-[0_-2px_8px_rgba(6,182,212,0.5)]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href={USER_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-white/20 transition-all duration-200 select-none cursor-pointer group active:scale-95"
            title={`GitHub profile (${totalStars} stars)`}
          >
            <GithubIcon className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            <span className="text-xs font-mono text-amber-400/90 group-hover:text-amber-400 flex items-center gap-1 font-medium transition-colors">
              <Star className="w-3.5 h-3.5 fill-amber-400/90 group-hover:fill-amber-400 transition-colors" />
              <span>{totalStars}</span>
            </span>
          </a>

          <a
            href={USER_INFO.socials.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="p-2 rounded-lg bg-zinc-900/60 border border-white/10 text-zinc-400 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all duration-200 select-none cursor-pointer active:scale-95"
          >
            <Send className="w-4 h-4" />
          </a>

          {/* Copy Telegram button */}
          <button
            type="button"
            onClick={handleCopyTelegram}
            className="hidden sm:flex items-center justify-center gap-2 w-[145px] px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-zinc-400 hover:text-white transition-all duration-200 select-none cursor-pointer active:scale-95 touch-manipulation"
            title="Скопировать Telegram"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-emerald-400 font-medium truncate tracking-wide">Скопировано!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-zinc-500 group-hover:text-zinc-400 shrink-0" />
                <span className="truncate tracking-wide">{USER_INFO.socials.telegramHandle}</span>
              </>
            )}
          </button>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-zinc-900/60 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200 select-none cursor-pointer active:scale-95 touch-manipulation"
            aria-label="Переключить меню"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-white/[0.05] bg-[#09090b]/95 backdrop-blur-2xl ${
          mobileMenuOpen ? 'max-h-96 opacity-100 py-3 px-4 pointer-events-auto shadow-2xl' : 'max-h-0 opacity-0 py-0 px-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-1.5">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between select-none cursor-pointer border ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20 shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5 border-transparent'
                }`}
              >
                <span className="flex items-center gap-3">
                  {link.badge && (
                    <span className={`w-1.5 h-1.5 rounded-full bg-cyan-400 ${isActive ? '' : 'animate-pulse'}`} />
                  )}
                  {link.label}
                </span>
                {isActive && (
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                    активно
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
};