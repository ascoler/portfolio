import React, { useState, useEffect } from 'react';
import { USER_INFO } from '../data';
import { useProjects } from '../context/ProjectsContext';
import { Terminal, Send, Check, Copy, Star, Menu, X } from 'lucide-react';
import { scrollToElement } from '../utils/scroll';

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
      const scrollPosition = window.pageYOffset + 140;

      if (window.pageYOffset < 200) {
        setActiveSection('');
        return;
      }

      if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 50) {
        setActiveSection('contact');
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
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

  const copyTelegram = () => {
    navigator.clipboard.writeText(USER_INFO.socials.telegramHandle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    setActiveSection(id);
    setMobileMenuOpen(false);
    scrollToElement(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#09090b]/85 border-b border-white/[0.08] transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, '#')}
          className="flex items-center gap-3 group transition-transform duration-200 active:scale-95"
        >
          <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all shadow-sm">
            <Terminal className="w-4 h-4 transition-transform group-hover:scale-110 duration-200" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              {USER_INFO.handle}
            </span>
            <span className="text-[11px] font-mono text-zinc-400">
              {USER_INFO.name} · backend
            </span>
          </div>
        </a>

        {/* Navigation links (desktop) */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900/60 border border-white/[0.06] backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 group ${
                  isActive
                    ? 'text-white bg-white/10 shadow-[0_0_12px_rgba(255,255,255,0.05)] border border-white/10'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.05]'
                }`}
              >
                {link.badge && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                )}
                <span>{link.label}</span>
                {/* Active animated indicator underline */}
                {isActive && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href={USER_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all group"
            title={`GitHub profile (${totalStars} stars)`}
          >
            <GithubIcon className="w-4 h-4 text-zinc-300 group-hover:text-white" />
            <span className="text-xs font-mono text-amber-400 flex items-center gap-0.5 font-medium">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{totalStars}</span>
            </span>
          </a>

          <a
            href={USER_INFO.socials.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="p-2 rounded-lg bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
          >
            <Send className="w-4 h-4" />
          </a>

          <button
            onClick={copyTelegram}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all active:scale-95"
            title="Скопировать Telegram"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Скопировано!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>{USER_INFO.socials.telegramHandle}</span>
              </>
            )}
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-white transition-all active:scale-95"
            aria-label="Переключить меню"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer menu with smooth slide & fade animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-white/[0.08] bg-[#09090b]/95 backdrop-blur-2xl ${
          mobileMenuOpen ? 'max-h-80 opacity-100 py-3 px-4' : 'max-h-0 opacity-0 py-0 px-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.badge && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                  {link.label}
                </span>
                {isActive && (
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
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
