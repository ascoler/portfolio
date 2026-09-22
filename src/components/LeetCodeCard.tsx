import React from 'react';
import { USER_INFO } from '../data';
import { Award, ExternalLink, Flame, Brain, Code } from 'lucide-react';

export const LeetCodeCard: React.FC = () => {
  return (
    <section id="leetcode" className="py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-2xl bg-gradient-to-r from-amber-500/10 via-zinc-900/80 to-zinc-900/60 border border-amber-500/20 p-6 sm:p-8 backdrop-blur-xl overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] pointer-events-none -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-3">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Алгоритмическая подготовка & LeetCode</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                Решаю задачи на LeetCode
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed mb-4 max-w-xl">
                Прокачиваю алгоритмы, структуры данных и оптимизацию по времени и памяти (Big-O). 
                Пишу решения на Go и C++, уделяя внимание читаемости и эффективному управлению памятью.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={USER_INFO.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs font-mono transition-all shadow-lg shadow-amber-500/20 select-none cursor-pointer active:scale-95 touch-manipulation"
                >
                  <span>Профиль: @{USER_INFO.socials.leetcodeHandle}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <span className="text-xs font-mono text-zinc-400">
                  Data Structures · Graphs · Dynamic Programming · Concurrency
                </span>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center md:justify-end">
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/10 text-left font-mono text-xs w-full max-w-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                  <span className="text-zinc-400">Platform:</span>
                  <span className="text-amber-400 font-bold">LeetCode</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">User:</span>
                    <span className="text-white">{USER_INFO.socials.leetcodeHandle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Main Focus:</span>
                    <span className="text-emerald-400">Trees, Arrays, Hash</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Target:</span>
                    <span className="text-cyan-400">System Design & High-Load</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
