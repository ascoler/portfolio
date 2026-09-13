import React, { useState } from 'react';
import { USER_INFO } from '../data';
import { Send, Mail, Copy, Check, MessageSquare, Coffee, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedTg, setCopiedTg] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyToClipboard = (text: string, type: 'tg' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'tg') {
      setCopiedTg(true);
      setTimeout(() => setCopiedTg(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl bg-zinc-900/60 border border-white/10 p-8 sm:p-12 backdrop-blur-2xl overflow-hidden text-center">
          {/* Ambient center spotlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/10 blur-[120px] pointer-events-none -z-10" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get in touch</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Давайте создадим что-то мощное вместе
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Открыт для предложений по бэкенд-разработке, стажировкам, совместным опенсорс проектам или интересным архитектурным задачам.
          </p>

          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-10">
            {/* Telegram card */}
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 flex items-center justify-between group hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-zinc-400">Telegram</div>
                  <a
                    href={USER_INFO.socials.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-white hover:text-cyan-400 transition-colors flex items-center gap-1"
                  >
                    <span>{USER_INFO.socials.telegramHandle}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(USER_INFO.socials.telegramHandle, 'tg')}
                className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                title="Копировать юзернейм"
              >
                {copiedTg ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Email card */}
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 flex items-center justify-between group hover:border-indigo-500/40 transition-all">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-zinc-400">Email</div>
                  <a
                    href={`mailto:${USER_INFO.socials.email}`}
                    className="text-sm font-bold text-white hover:text-indigo-400 transition-colors flex items-center gap-1"
                  >
                    <span>{USER_INFO.socials.email}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(USER_INFO.socials.email, 'email')}
                className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                title="Копировать email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quote */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950/60 border border-white/5 text-xs font-mono text-zinc-400">
            <Coffee className="w-3.5 h-3.5 text-amber-400" />
            <span>«{USER_INFO.quote}»</span>
          </div>
        </div>
      </div>
    </section>
  );
};
