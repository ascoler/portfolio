import React, { useState } from 'react';
import { USER_INFO } from '../data';
import { Terminal, Send, Mail, Check, Copy } from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Navbar: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyTelegram = () => {
    navigator.clipboard.writeText(USER_INFO.socials.telegramHandle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#09090b]/80 border-b border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/50 transition-colors shadow-sm">
            <Terminal className="w-4 h-4" />
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

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-400">
          <a href="#projects" className="hover:text-white transition-colors">
            Проекты
          </a>
          <a href="#stack" className="hover:text-white transition-colors">
            Стек
          </a>
          <a href="#terminal" className="hover:text-white transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            Консоль
          </a>
          <a href="#leetcode" className="hover:text-white transition-colors">
            LeetCode
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Контакты
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href={USER_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-lg bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all"
          >
            <GithubIcon className="w-4 h-4" />
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
        </div>
      </div>
    </header>
  );
};
