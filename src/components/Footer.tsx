import React from 'react';
import { USER_INFO } from '../data';
import { Terminal, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 px-4 sm:px-6 border-t border-white/[0.06] bg-zinc-950">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-zinc-400">
            © {new Date().getFullYear()} {USER_INFO.name} ({USER_INFO.handle}). Built with Dark Tech precision.
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={USER_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={USER_INFO.socials.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Telegram
          </a>
          <a
            href={USER_INFO.socials.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LeetCode
          </a>
        </div>
      </div>
    </footer>
  );
};
