import React from 'react';
import { USER_INFO } from '../data';
import { ArrowDown, Send, Terminal, Sparkles, ExternalLink, ShieldCheck, Database, Layers } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-transparent blur-[120px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-5xl mx-auto">
        {/* Status pill badge */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 mb-6 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-zinc-300">
            Готов к сложным задачам и проектам
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Open for opportunities
          </span>
        </div>

        {/* Main headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              Пишу надежный <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">бэкенд</span> и распределенные сервисы.
            </h1>
            
            <p className="text-lg sm:text-xl text-zinc-300 font-normal leading-relaxed max-w-2xl mb-8">
              Привет! Я <strong className="text-white font-semibold">{USER_INFO.name}</strong> ({USER_INFO.handle}) — {USER_INFO.role}, {USER_INFO.age}. 
              Проектирую микросервисы на <span className="text-cyan-300 font-mono">Go</span>, автоматизирую процессы на <span className="text-amber-300 font-mono">Python</span> и ценю чистую системную архитектуру.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-all shadow-lg shadow-white/5 active:scale-[0.98]"
              >
                <span>Смотреть проекты</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={USER_INFO.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white font-medium text-sm hover:bg-zinc-800 hover:border-cyan-500/40 transition-all active:scale-[0.98]"
              >
                <Send className="w-4 h-4 text-cyan-400" />
                <span>Написать в Telegram</span>
              </a>

              <a
                href="#terminal"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/15 font-mono text-xs transition-all"
              >
                <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                <span>$ ./wake_up --interactive</span>
              </a>
            </div>
          </div>

          {/* Avatar and quick profile card */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-500"></div>
              
              <div className="relative rounded-2xl bg-zinc-900/90 border border-white/10 p-5 backdrop-blur-xl flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img
                    src={USER_INFO.avatarUrl}
                    alt={USER_INFO.name}
                    className="w-28 h-28 rounded-2xl object-cover border-2 border-white/10 shadow-2xl"
                  />
                  <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-zinc-950 border border-emerald-500/40 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    online
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-0.5">
                  Фёдор Соковнин
                </h3>
                <p className="text-xs font-mono text-zinc-400 mb-3">
                  @{USER_INFO.githubUser} · {USER_INFO.location}
                </p>

                <div className="w-full pt-3 border-t border-white/10 flex flex-col gap-1.5 text-left text-xs font-mono text-zinc-300">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Role:</span>
                    <span className="text-cyan-300">Backend Go/Python</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Focus:</span>
                    <span className="text-white">Distributed / HighLoad</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Philosophy:</span>
                    <span className="text-amber-300/90">Не сплю, кодю ☕</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature highlight metrics row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-8">
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <Layers className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Стек</span>
            </div>
            <div className="text-lg font-bold text-white">Go & Python</div>
            <p className="text-xs text-zinc-400">Gin, gRPC, FastAPI, AsyncIO</p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Database className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Данные</span>
            </div>
            <div className="text-lg font-bold text-white">Redis & SQL</div>
            <p className="text-xs text-zinc-400">Postgres, MySQL, Redis Queues</p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-indigo-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Паттерны</span>
            </div>
            <div className="text-lg font-bold text-white">Microservices</div>
            <p className="text-xs text-zinc-400">Producer-Consumer, Daemons</p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Алгоритмы</span>
            </div>
            <div className="text-lg font-bold text-white">LeetCode</div>
            <p className="text-xs text-zinc-400">Профиль: wake_upik</p>
          </div>
        </div>
      </div>
    </section>
  );
};
